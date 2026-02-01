// GAS_everyday.js
// Daily backfill + weekly new arrivals with improved search precision for CiNii OpenSearch (Atom)

function runBackfillDaily() {
  var config = getConfig_();
  var sheet = getSheet_(config.spreadsheetId, config.sheetName);
  ensureHeader_(sheet);
  var existingKeys = loadExistingKeys_(sheet);

  var start = config.backfillStart;
  var maxPages = config.maxPagesPerRun;
  var added = [];
  var attempts = 0;

  for (var page = 0; page < maxPages; page++) {
    var items = fetchMergedItems_(start, config, attempts);
    attempts = items.attempts;
    var newItems = appendNewRows_(sheet, items.list, existingKeys, config.abstractMaxChars);
    if (newItems.length > 0) {
      added = added.concat(newItems);
      start = start + config.maxItems;
      break;
    }
    start = start + config.maxItems;
  }

  setScriptProperty_("BACKFILL_START", String(start));
  Logger.log("Backfill added: " + added.length + ", next start=" + start);

  if (config.sendBackfillEmail) {
    sendEmail_(added, config, "[Dream Papers][Backfill]");
  }

  return { added: added.length, nextStart: start };
}

function runNewArrivalsWeekly() {
  var config = getConfig_();
  var sheet = getSheet_(config.spreadsheetId, config.sheetName);
  ensureHeader_(sheet);
  var existingKeys = loadExistingKeys_(sheet);

  var items = fetchMergedItems_(0, config, 0);
  var newItems = appendNewRows_(sheet, items.list, existingKeys, config.abstractMaxChars);

  Logger.log("Weekly new items: " + newItems.length);
  sendEmail_(newItems, config, "[Dream Papers][Weekly]");

  return { added: newItems.length };
}

function installTriggers() {
  var config = getConfig_();
  deleteTriggersByHandler_("runBackfillDaily");
  deleteTriggersByHandler_("runNewArrivalsWeekly");

  ScriptApp.newTrigger("runBackfillDaily")
    .timeBased()
    .everyDays(1)
    .atHour(config.dailyHour)
    .create();

  ScriptApp.newTrigger("runNewArrivalsWeekly")
    .timeBased()
    .onWeekDay(config.weeklyWeekday)
    .atHour(config.weeklyHour)
    .create();

  Logger.log("Triggers installed: daily hour=" + config.dailyHour + ", weekly=" + config.weeklyWeekday + " " + config.weeklyHour + ":00");
}

function getConfig_() {
  var props = PropertiesService.getScriptProperties();
  var spreadsheetId = props.getProperty("SPREADSHEET_ID") || "";
  var sheetName = props.getProperty("SHEET_NAME") || "papers";
  var notifyEmail = props.getProperty("NOTIFY_EMAIL") || "";
  var appId = props.getProperty("CINII_APP_ID") || "";
  var query = props.getProperty("QUERY_STRING") || '夢 OR dream OR dreaming OR "lucid dream" OR nightmare';
  var keywordsList = props.getProperty("KEYWORDS_LIST") || "夢,悪夢,dream,dreaming,lucid dream,nightmare";
  var searchFieldMode = (props.getProperty("SEARCH_FIELD_MODE") || "title").toLowerCase();
  var maxItems = parseInt(props.getProperty("MAX_ITEMS") || "10", 10);
  var perKeywordCount = parseInt(props.getProperty("PER_KEYWORD_COUNT") || "5", 10);
  var maxFetchRequests = parseInt(props.getProperty("MAX_FETCH_REQUESTS") || "10", 10);
  var abstractMaxChars = parseInt(props.getProperty("ABSTRACT_MAX_CHARS") || "200", 10);
  var backfillStart = parseInt(props.getProperty("BACKFILL_START") || "0", 10);
  var maxPagesPerRun = parseInt(props.getProperty("MAX_PAGES_PER_RUN") || "3", 10);
  var sendWhenZero = (props.getProperty("SEND_WHEN_ZERO") || "false").toLowerCase() === "true";
  var sendBackfillEmail = (props.getProperty("SEND_BACKFILL_EMAIL") || "false").toLowerCase() === "true";
  var lang = (props.getProperty("LANG") || "ja").toLowerCase();
  var requireAbstract = (props.getProperty("REQUIRE_ABSTRACT") || "false").toLowerCase() === "true";
  var excludeTitleKeywords = props.getProperty("EXCLUDE_TITLE_KEYWORDS") ||
    "映画,ブックガイド,特別鼎談,ニュース,連載,ガイド,旅,小説,エッセイ,随筆,対談,座談会,書評,特集";
  var excludeMode = (props.getProperty("EXCLUDE_MODE") || "exclude").toLowerCase();
  var dailyHour = parseInt(props.getProperty("DAILY_HOUR") || "9", 10);
  var weeklyHour = parseInt(props.getProperty("WEEKLY_HOUR") || "9", 10);
  var weeklyWeekday = parseWeekday_(props.getProperty("WEEKLY_WEEKDAY") || "MONDAY");

  var missing = [];
  if (!spreadsheetId) missing.push("SPREADSHEET_ID");
  if (!notifyEmail) missing.push("NOTIFY_EMAIL");
  if (!appId) missing.push("CINII_APP_ID");

  if (missing.length > 0) {
    var msg = "Missing script properties: " + missing.join(", ");
    Logger.log(msg);
    throw new Error(msg);
  }

  return {
    spreadsheetId: spreadsheetId,
    sheetName: sheetName,
    notifyEmail: notifyEmail,
    appId: appId,
    query: query,
    keywordsList: keywordsList,
    searchFieldMode: (searchFieldMode === "q" ? "q" : "title"),
    maxItems: isNaN(maxItems) ? 10 : maxItems,
    perKeywordCount: clampInt_(perKeywordCount, 1, 10, 5),
    maxFetchRequests: clampInt_(maxFetchRequests, 1, 20, 10),
    abstractMaxChars: isNaN(abstractMaxChars) ? 200 : abstractMaxChars,
    backfillStart: isNaN(backfillStart) ? 0 : backfillStart,
    maxPagesPerRun: isNaN(maxPagesPerRun) ? 3 : maxPagesPerRun,
    sendWhenZero: sendWhenZero,
    sendBackfillEmail: sendBackfillEmail,
    lang: (lang === "en" ? "en" : "ja"),
    requireAbstract: requireAbstract,
    excludeTitleKeywords: parseCsv_(excludeTitleKeywords),
    excludeMode: (excludeMode === "demote" ? "demote" : "exclude"),
    dailyHour: normalizeHour_(dailyHour),
    weeklyHour: normalizeHour_(weeklyHour),
    weeklyWeekday: weeklyWeekday
  };
}

function fetchMergedItems_(start, config, attempts) {
  var keywords = getSearchKeywords_(config);
  var allItems = [];
  var requestCount = attempts || 0;

  for (var i = 0; i < keywords.length; i++) {
    if (requestCount >= config.maxFetchRequests) break;
    var keyword = keywords[i];
    var items = fetchCiniiItemsForKeyword_(keyword, start, config);
    requestCount++;
    for (var j = 0; j < items.length; j++) {
      allItems.push(items[j]);
    }
  }

  var merged = mergeAndFilterItems_(allItems, config);
  return { list: merged, attempts: requestCount };
}

function getSearchKeywords_(config) {
  var list = parseCsv_(config.keywordsList);
  if (list.length === 0 && config.searchFieldMode === "q") {
    return [config.query];
  }
  if (list.length === 0) {
    list = ["夢"];
  }
  return list;
}

function fetchCiniiItemsForKeyword_(keyword, start, config) {
  var count = config.perKeywordCount;
  var url = buildCiniiUrl_(keyword, count, 1, start, config.appId, config.lang, config.searchFieldMode);
  var xml = fetchFeed_(url);
  var items = parseAtom_(xml);
  return items;
}

function mergeAndFilterItems_(allItems, config) {
  var seen = {};
  var kept = [];
  var demoted = [];

  for (var i = 0; i < allItems.length; i++) {
    var it = allItems[i];
    var key = it.link || normalizeKey_(it.title);
    if (!key || seen[key]) continue;
    seen[key] = true;

    if (config.requireAbstract && !normalizeAbstract_(it.abstract)) {
      continue;
    }

    var isExcluded = isExcludedTitle_(it.title, config);
    if (isExcluded && config.excludeMode === "exclude") {
      continue;
    }
    if (isExcluded && config.excludeMode === "demote") {
      demoted.push(it);
    } else {
      kept.push(it);
    }
  }

  var merged = kept.concat(demoted);
  if (merged.length > config.maxItems) {
    merged = merged.slice(0, config.maxItems);
  }
  return merged;
}

function isExcludedTitle_(title, config) {
  if (!title) return false;
  var t = String(title);
  for (var i = 0; i < config.excludeTitleKeywords.length; i++) {
    var k = config.excludeTitleKeywords[i];
    if (!k) continue;
    if (t.indexOf(k) !== -1) return true;
  }
  return false;
}

function buildCiniiUrl_(keywordOrQuery, count, sortorder, start, appId, lang, mode) {
  var base = "https://ci.nii.ac.jp/opensearch/search";
  var params = {
    count: count,
    start: start,
    sortorder: sortorder || 1,
    format: "atom",
    lang: lang || "ja",
    appid: appId
  };

  if ((mode || "title") === "q") {
    params.q = keywordOrQuery;
  } else {
    params.title = keywordOrQuery;
  }

  var qs = [];
  for (var k in params) {
    if (params.hasOwnProperty(k) && params[k] !== "" && params[k] !== null) {
      qs.push(encodeURIComponent(k) + "=" + encodeURIComponent(params[k]));
    }
  }
  return base + "?" + qs.join("&");
}

function fetchFeed_(url) {
  var resp = UrlFetchApp.fetch(url, {
    method: "get",
    muteHttpExceptions: true,
    followRedirects: true,
    headers: {
      "Accept": "application/atom+xml, application/xml;q=0.9, */*;q=0.8",
      "User-Agent": "GAS Dream Papers Bot"
    }
  });
  var code = resp.getResponseCode();
  if (code < 200 || code >= 300) {
    throw new Error("Feed fetch failed: HTTP " + code);
  }
  var text = resp.getContentText("UTF-8");
  if (text && /<html/i.test(text)) {
    throw new Error("Feed fetch returned HTML, not XML. Check query/URL.");
  }
  return text;
}

function parseAtom_(xmlText) {
  var doc;
  try {
    doc = XmlService.parse(xmlText);
  } catch (e) {
    var head = (xmlText || "").substring(0, 500);
    Logger.log("XML parse failed. Response head: " + head);
    throw e;
  }

  var root = doc.getRootElement();
  var ns = root.getNamespace();
  var entries = root.getChildren("entry", ns);
  var items = [];

  for (var i = 0; i < entries.length; i++) {
    var e = entries[i];
    var title = getChildText_(e, "title", ns);
    var summary = getChildText_(e, "summary", ns) ||
      getChildText_(e, "content", ns) ||
      getChildText_(e, "description", ns);
    var published = getChildText_(e, "published", ns) || getChildText_(e, "updated", ns) || "";
    var link = getAtomLink_(e, ns);

    items.push({
      source: "CiNii",
      title: title || "",
      link: link || "",
      abstract: summary || "",
      published: published || ""
    });
  }

  return items;
}

function getAtomLink_(entry, ns) {
  var links = entry.getChildren("link", ns);
  for (var i = 0; i < links.length; i++) {
    var l = links[i];
    var rel = l.getAttribute("rel");
    var href = l.getAttribute("href");
    if (href && (!rel || rel.getValue() === "alternate")) {
      return href.getValue();
    }
  }
  return "";
}

function getChildText_(element, name, ns) {
  var child = element.getChild(name, ns);
  if (!child) return "";
  return child.getText() || "";
}

function normalizeAbstract_(text) {
  if (!text) return "";
  var t = text.replace(/<[^>]*>/g, " ");
  t = t.replace(/\s+/g, " ").trim();
  return t;
}

function truncate_(text, maxChars) {
  if (!text) return "";
  if (text.length <= maxChars) return text;
  return text.substring(0, maxChars) + "...";
}

function getSheet_(spreadsheetId, sheetName) {
  var ss = SpreadsheetApp.openById(spreadsheetId);
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }
  return sheet;
}

function ensureHeader_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["timestamp", "source", "title", "link", "abstract", "published", "id_key"]);
  }
}

function loadExistingKeys_(sheet) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return new Set();
  var idCol = 7;
  var values = sheet.getRange(2, idCol, lastRow - 1, 1).getValues();
  var set = new Set();
  for (var i = 0; i < values.length; i++) {
    var v = values[i][0];
    if (v) set.add(String(v));
  }
  return set;
}

function appendNewRows_(sheet, items, existingKeys, abstractMaxChars) {
  var newItems = [];
  var now = new Date().toISOString();
  var rows = [];

  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var idKey = item.link || normalizeKey_(item.title);
    if (!idKey || existingKeys.has(idKey)) continue;

    var abs = truncate_(normalizeAbstract_(item.abstract), abstractMaxChars);

    rows.push([
      now,
      item.source,
      item.title,
      item.link,
      abs,
      item.published,
      idKey
    ]);
    existingKeys.add(idKey);
    newItems.push({
      source: item.source,
      title: item.title,
      link: item.link,
      abstract: abs,
      published: item.published
    });
  }

  if (rows.length > 0) {
    sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);
  }

  return newItems;
}

function normalizeKey_(title) {
  if (!title) return "";
  var t = title.toLowerCase();
  t = t.replace(/[\s\W]+/g, " ").trim();
  return t;
}

function sendEmail_(newItems, config, subjectPrefix) {
  if (newItems.length === 0 && !config.sendWhenZero) return;

  var subject = (subjectPrefix || "[Dream Papers]") + " New items: " + newItems.length + " (CiNii)";
  var html = buildEmailHtml_(newItems, config.abstractMaxChars);

  MailApp.sendEmail({
    to: config.notifyEmail,
    subject: subject,
    htmlBody: html
  });
}

function buildEmailHtml_(items, abstractMaxChars) {
  var escape = function (s) {
    if (!s) return "";
    return s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  };

  var parts = [];
  parts.push("<p>New items: " + items.length + "</p>");
  for (var i = 0; i < items.length; i++) {
    var it = items[i];
    var title = escape(it.title || "");
    var link = escape(it.link || "");
    var abs = truncate_(normalizeAbstract_(it.abstract || ""), abstractMaxChars);
    abs = escape(abs);

    parts.push("<div style=\"margin-bottom:16px;\">");
    if (link) {
      parts.push("<div><a href=\"" + link + "\">" + title + "</a></div>");
    } else {
      parts.push("<div>" + title + "</div>");
    }
    if (abs) {
      parts.push("<div style=\"color:#444;\">" + abs + "</div>");
    }
    parts.push("</div>");
  }
  return parts.join("");
}

function deleteTriggersByHandler_(handlerName) {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    var t = triggers[i];
    if (t.getHandlerFunction() === handlerName) {
      ScriptApp.deleteTrigger(t);
    }
  }
}

function parseWeekday_(value) {
  var v = String(value || "").toUpperCase();
  if (v === "SUNDAY") return ScriptApp.WeekDay.SUNDAY;
  if (v === "MONDAY") return ScriptApp.WeekDay.MONDAY;
  if (v === "TUESDAY") return ScriptApp.WeekDay.TUESDAY;
  if (v === "WEDNESDAY") return ScriptApp.WeekDay.WEDNESDAY;
  if (v === "THURSDAY") return ScriptApp.WeekDay.THURSDAY;
  if (v === "FRIDAY") return ScriptApp.WeekDay.FRIDAY;
  if (v === "SATURDAY") return ScriptApp.WeekDay.SATURDAY;
  return ScriptApp.WeekDay.MONDAY;
}

function normalizeHour_(hour) {
  if (isNaN(hour)) return 9;
  if (hour < 0) return 0;
  if (hour > 23) return 23;
  return hour;
}

function setScriptProperty_(key, value) {
  PropertiesService.getScriptProperties().setProperty(key, value);
}

function parseCsv_(text) {
  if (!text) return [];
  var parts = String(text).split(",");
  var out = [];
  for (var i = 0; i < parts.length; i++) {
    var p = parts[i].replace(/^\s+|\s+$/g, "");
    if (p) out.push(p);
  }
  return out;
}

function clampInt_(value, min, max, fallback) {
  var v = parseInt(value, 10);
  if (isNaN(v)) return fallback;
  if (v < min) return min;
  if (v > max) return max;
  return v;
}
