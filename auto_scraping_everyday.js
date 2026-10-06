// Paste this entire file into a single GAS V8 script. No npm dependencies.
var PAPER_HEADERS_ = ['timestamp', 'source', 'title', 'link', 'abstract', 'published', 'id_key', 'notify_status', 'notify_mode'];
var PAPER_STATE_PREFIX_ = 'PAPERS_V2_';

// Existing trigger entry points are intentionally preserved.
function runBackfillDaily() { return runHarvest_('backfill'); }
function runNewArrivalsWeekly() { return runHarvest_('weekly'); }

function runHarvest_(mode) {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(1000)) return { skipped: 'locked' };
  try {
    var config = getConfig_();
    var props = PropertiesService.getScriptProperties();
    var budget = { requests: 0, deadline: Date.now() + config.maxRuntimeMs, lastFetch: {} };
    var streams = getStreams_(config);
    var ss = SpreadsheetApp.openById(config.spreadsheetId);
    var stores = {};
    config.topics.forEach(function (topic) {
      var sheet = ss.getSheetByName(topic.sheetName) || ss.insertSheet(topic.sheetName);
      ensureHeader_(sheet);
      stores[topic.id] = { sheet: sheet, keys: loadExistingKeys_(sheet) };
    });
    var result = { mode: mode, added: 0, requests: 0, exhausted: 0, limited: 0, errors: [] };
    var rotationKey = PAPER_STATE_PREFIX_ + 'ROTATION_' + mode;
    var first = Number(props.getProperty(rotationKey) || 0) % streams.length;
    var touched = {};
    // Round-robin, one page per stream per round; no keyword can monopolize the budget.
    for (var turn = 0; turn < streams.length * config.maxPagesPerRun; turn++) {
      if (!hasBudget_(budget, config) || result.added >= config.maxItems) break;
      var index = (first + turn) % streams.length;
      var stream = streams[index];
      var key = stateKey_(stream, config, mode);
      if (touched[key] === 'stop') continue;
      var state = readState_(props, key);
      if (state.done && mode === 'backfill') continue;
      if (state.done) state = newState_(); // a fresh bounded weekly sweep
      var store = stores[stream.topic.id];
      var count = Math.min(config.perKeywordCount, config.maxItems - result.added);
      try {
        var page = fetchPage_(stream, state.offset, count, mode, config, budget, state);
        if (page.items.length > count) throw new Error('API returned more rows than requested');
        var signature = page.items.length ? hash_(JSON.stringify(page.items.map(itemKey_))) : '';
        if (signature && signature === state.lastPage) {
          // An API that ignores offsets must never cause an endless daily loop.
          state.done = true;
          state.reason = 'repeated-page';
        } else {
          var items = filterItems_(page.items, stream.topic, config);
          var added = appendNewRows_(store.sheet, items, store.keys, config, mode);
          result.added += added;
          // Flush rows before persisting progress. A restart can deduplicate committed rows.
          SpreadsheetApp.flush();
          state.offset += page.items.length;
          state.pages++;
          state.lastPage = signature;
          if (page.items.length === 0 || (page.total !== null && state.offset >= page.total) ||
              (page.total === null && page.items.length < count)) {
            state.done = true;
            state.reason = 'exhausted';
          } else if (state.offset >= sourceLimit_(stream.source)) {
            state.done = true;
            state.reason = 'api-limit';
          } else if (mode === 'backfill' && state.pages >= Math.min(config.maxBackfillPages, stream.source === 'crossref' ? config.crossrefBackfillPages : config.maxBackfillPages)) {
            state.done = true;
            state.reason = 'page-limit';
          } else if (mode === 'weekly' && state.pages >= config.weeklyPages) {
            state.done = true;
            state.reason = 'weekly-window';
          }
        }
        state.updatedAt = new Date().toISOString();
        props.setProperty(key, JSON.stringify(state));
        if (state.done) touched[key] = 'stop';
      } catch (e) {
        // Failed or budget-deferred requests do not move the stream's checkpoint.
        touched[key] = 'stop';
        if (!e.budget) result.errors.push(stream.topic.id + '/' + stream.source + ': ' + safeError_(e));
      }
      props.setProperty(rotationKey, String((index + 1) % streams.length));
    }
    streams.forEach(function (stream) {
      var state = readState_(props, stateKey_(stream, config, mode));
      if (state.done && state.reason === 'exhausted') result.exhausted++;
      else if (state.done && state.reason !== 'weekly-window') result.limited++;
    });
    config.topics.forEach(function (topic) {
      if (Date.now() >= budget.deadline) return;
      try { deliverPending_(stores[topic.id].sheet, topic, config); }
      catch (e) { result.errors.push(topic.id + '/mail: ' + safeError_(e)); }
    });
    result.requests = budget.requests;
    Logger.log(JSON.stringify(result));
    // Surface failures in GAS execution history, after giving other streams a chance.
    if (result.errors.length) throw new Error(result.errors.join('\n'));
    return result;
  } finally { lock.releaseLock(); }
}

function getConfig_() {
  var p = PropertiesService.getScriptProperties().getProperties();
  if (!p.SPREADSHEET_ID) throw new Error('Missing SPREADSHEET_ID');
  var config = {
    spreadsheetId: p.SPREADSHEET_ID,
    notifyEmail: p.NOTIFY_EMAIL || '',
    appId: p.CINII_APP_ID || '',
    maxItems: intSetting_(p, 'MAX_ITEMS', 10, 1, 200),
    perKeywordCount: intSetting_(p, 'PER_KEYWORD_COUNT', 5, 1, 100),
    maxFetchRequests: intSetting_(p, 'MAX_FETCH_REQUESTS', 10, 1, 100),
    maxPagesPerRun: intSetting_(p, 'MAX_PAGES_PER_RUN', 3, 1, 20),
    maxBackfillPages: intSetting_(p, 'MAX_BACKFILL_PAGES', 1000, 1, 10000),
    crossrefBackfillPages: intSetting_(p, 'CROSSREF_BACKFILL_PAGES', 20, 1, 1000),
    crossrefLookbackDays: intSetting_(p, 'CROSSREF_LOOKBACK_DAYS', 365, 1, 3650),
    weeklyPages: intSetting_(p, 'WEEKLY_PAGES', 3, 1, 100),
    maxRuntimeMs: intSetting_(p, 'MAX_RUNTIME_SECONDS', 240, 30, 270) * 1000,
    abstractMaxChars: intSetting_(p, 'ABSTRACT_MAX_CHARS', 200, 0, 5000),
    sendBackfillEmail: boolSetting_(p, 'SEND_BACKFILL_EMAIL', false),
    requireAbstract: boolSetting_(p, 'REQUIRE_ABSTRACT', false),
    excludeTitleKeywords: parseCsv_(p.EXCLUDE_TITLE_KEYWORDS === undefined ?
      '映画,ブックガイド,特別鼎談,ニュース,連載,ガイド,旅,小説,エッセイ,随筆,対談,座談会,書評,特集' : p.EXCLUDE_TITLE_KEYWORDS),
    excludeMode: p.EXCLUDE_MODE || 'exclude',
    searchFieldMode: p.SEARCH_FIELD_MODE || 'title',
    lang: p.LANG || 'ja',
    dailyHour: intSetting_(p, 'DAILY_HOUR', 9, 0, 23),
    weeklyHour: intSetting_(p, 'WEEKLY_HOUR', 9, 0, 23),
    weeklyWeekday: p.WEEKLY_WEEKDAY || 'MONDAY',
    timezone: p.TIME_ZONE || 'Asia/Tokyo'
  };
  if (['title', 'q'].indexOf(config.searchFieldMode) < 0) throw new Error('Invalid SEARCH_FIELD_MODE');
  if (['exclude', 'demote'].indexOf(config.excludeMode) < 0) throw new Error('Invalid EXCLUDE_MODE');
  if (['ja', 'en'].indexOf(config.lang) < 0) throw new Error('Invalid LANG');
  if (!ScriptApp.WeekDay[config.weeklyWeekday]) throw new Error('Invalid WEEKLY_WEEKDAY');
  var topics;
  if (p.TOPICS_JSON) {
    try { topics = JSON.parse(p.TOPICS_JSON); }
    catch (e) { throw new Error('TOPICS_JSON must be valid JSON'); }
  } else {
    var keywords = parseCsv_(p.KEYWORDS_LIST === undefined ? '夢,悪夢,dream,dreaming,lucid dream,nightmare' : p.KEYWORDS_LIST);
    if (!keywords.length && config.searchFieldMode === 'q' && p.QUERY_STRING) keywords = [p.QUERY_STRING];
    topics = [{ id: 'dream', name: '夢の研究', sheetName: p.SHEET_NAME || 'papers', queries: { cinii: keywords } }];
  }
  if (!Array.isArray(topics) || !topics.length || topics.length > 20) throw new Error('TOPICS_JSON needs 1–20 topics');
  var ids = new Set();
  var sheets = new Set();
  topics.forEach(function (t) {
    if (!t || !/^[a-z0-9_-]{1,40}$/.test(t.id) || ids.has(t.id)) throw new Error('Topic id must be unique (a-z, 0-9, _, -)');
    if (typeof t.sheetName !== 'string' || !t.sheetName.trim() || t.sheetName.length > 100 || /[\[\]:*?\/\\]/.test(t.sheetName) || sheets.has(t.sheetName)) throw new Error('Each topic needs a unique valid sheetName');
    if (!t.queries || typeof t.queries !== 'object' || !Object.keys(t.queries).length) throw new Error('Topic needs queries');
    ids.add(t.id); sheets.add(t.sheetName);
    t.name = String(t.name || t.id);
    Object.keys(t.queries).forEach(function (source) {
      if (['cinii', 'arxiv', 'crossref'].indexOf(source) < 0) throw new Error('Unknown source: ' + source);
      var queries = t.queries[source];
      if (!Array.isArray(queries) || !queries.length || queries.some(function (q) { return typeof q !== 'string' || !q.trim() || q.length > 500; })) throw new Error('queries must be non-empty string arrays');
      t.queries[source] = Array.from(new Set(queries.map(function (q) { return q.trim(); })));
      if (source === 'cinii' && !config.appId) throw new Error('Missing CINII_APP_ID');
    });
    if (t.ciniiSearchField !== undefined && ['q', 'title'].indexOf(t.ciniiSearchField) < 0) throw new Error('ciniiSearchField must be q or title');
    if (t.filterField !== undefined && ['title', 'titleAbstract'].indexOf(t.filterField) < 0) throw new Error('filterField must be title or titleAbstract');
    if (t.keywordMatch !== undefined && ['substring', 'token'].indexOf(t.keywordMatch) < 0) throw new Error('keywordMatch must be substring or token');
    if (t.excludeTitleKeywords !== undefined && (!Array.isArray(t.excludeTitleKeywords) || t.excludeTitleKeywords.some(function (v) { return typeof v !== 'string' || !v.trim(); }))) throw new Error('excludeTitleKeywords must be a string array');
    if (t.includeTitleAnyGroups !== undefined && (!Array.isArray(t.includeTitleAnyGroups) || !t.includeTitleAnyGroups.length || t.includeTitleAnyGroups.some(function (g) {
      return !Array.isArray(g) || !g.length || g.some(function (v) { return typeof v !== 'string' || !v.trim(); });
    }))) throw new Error('includeTitleAnyGroups must be non-empty arrays of non-empty strings');
    if (t.includeTitleGroups !== undefined && (!Array.isArray(t.includeTitleGroups) || t.includeTitleGroups.some(function (g) {
      return !Array.isArray(g) || !g.length || g.some(function (s) { return typeof s !== 'string' || !s.trim(); });
    }))) throw new Error('includeTitleGroups must be arrays of non-empty strings');
  });
  config.topics = topics;
  if (getStreams_(config).length > 100) throw new Error('At most 100 source/query streams');
  return config;
}

function getStreams_(config) {
  var streams = [];
  config.topics.forEach(function (topic) {
    Object.keys(topic.queries).forEach(function (source) {
      topic.queries[source].forEach(function (query) { streams.push({ topic: topic, source: source, query: query }); });
    });
  });
  return streams;
}

function stateKey_(stream, config, mode) {
  // Config changes restart only affected searches. Old BACKFILL_START is deliberately ignored.
  return PAPER_STATE_PREFIX_ + mode + '_' + hash_(JSON.stringify([
    config.spreadsheetId, stream.topic.id, stream.topic.sheetName, stream.source, stream.query,
    config.searchFieldMode, config.lang, config.requireAbstract, config.excludeTitleKeywords,
    config.excludeMode, stream.topic.includeTitleGroups || [], config.maxBackfillPages, config.weeklyPages,
    stream.topic.ciniiSearchField || config.searchFieldMode, stream.topic.filterField || 'title',
    stream.topic.keywordMatch || 'substring', stream.topic.excludeTitleKeywords || null, stream.topic.includeTitleAnyGroups || null,
    stream.source === 'crossref' ? ['bibliographic-score-v1', config.crossrefBackfillPages, config.crossrefLookbackDays] : null
  ]));
}
function newState_() { return { offset: 0, pages: 0, done: false, reason: '', lastPage: '' }; }
function readState_(props, key) {
  var raw = props.getProperty(key);
  if (!raw) return newState_();
  var state = JSON.parse(raw);
  if (!Number.isInteger(state.offset) || state.offset < 0 || !Number.isInteger(state.pages) || state.pages < 0 || typeof state.done !== 'boolean') throw new Error('Invalid saved state; inspect getHarvestStatus');
  return state;
}
function hash_(text) {
  return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, text, Utilities.Charset.UTF_8)
    .map(function (b) { return ('0' + ((b + 256) % 256).toString(16)).slice(-2); }).join('');
}
function sourceLimit_(source) { return source === 'arxiv' ? 30000 : 10000; }
function hasBudget_(budget, config) { return budget.requests < config.maxFetchRequests && Date.now() < budget.deadline - 15000; }
function budgetError_() { var error = new Error('Run budget reached'); error.budget = true; return error; }

function fetchPage_(stream, offset, count, mode, config, budget, state) {
  count = Math.min(count, sourceLimit_(stream.source) - offset);
  if (count <= 0) throw new Error('API result limit reached');
  var ascending = mode === 'backfill';
  var params, url;
  if (stream.source === 'cinii') {
    params = { count: count, start: offset + 1, sortorder: ascending ? 1 : 0, format: 'atom', lang: config.lang, appid: config.appId };
    params[stream.topic.ciniiSearchField || config.searchFieldMode] = stream.query;
    url = 'https://cir.nii.ac.jp/opensearch/articles';
  } else if (stream.source === 'arxiv') {
    params = { search_query: stream.query, start: offset, max_results: count, sortBy: 'submittedDate', sortOrder: ascending ? 'ascending' : 'descending' };
    url = 'https://export.arxiv.org/api/query';
  } else {
    // Crossref query.bibliographic is relevance search, NOT a strict Boolean/title filter.
    // Date sorting otherwise promotes unrelated papers containing only one query term.
    params = { 'query.bibliographic': stream.query, rows: count, offset: offset, sort: 'score', order: 'desc', filter: 'type:journal-article' };
    if (mode === 'weekly') {
      state = state || {};
      if (!state.windowEnd) {
        state.windowEnd = new Date().toISOString().slice(0, 10);
        state.windowStart = new Date(Date.parse(state.windowEnd + 'T00:00:00Z') - config.crossrefLookbackDays * 86400000).toISOString().slice(0, 10);
      }
      params.filter += ',from-pub-date:' + state.windowStart + ',until-pub-date:' + state.windowEnd;
    }
    url = 'https://api.crossref.org/works';
  }
  var text = fetchText_(url + '?' + queryString_(params), stream.source, config, budget);
  return stream.source === 'crossref' ? parseCrossref_(text) : parseAtomPage_(text, stream.source);
}

function fetchText_(url, source, config, budget) {
  for (var attempt = 0; attempt < 3; attempt++) {
    if (!hasBudget_(budget, config)) throw budgetError_();
    var interval = source === 'arxiv' ? 3100 : 1000;
    var wait = Math.max(0, interval - (Date.now() - (budget.lastFetch[source] || 0)));
    if (Date.now() + wait >= budget.deadline - 15000) throw budgetError_();
    if (wait) Utilities.sleep(wait);
    budget.requests++;
    var response;
    try {
      response = UrlFetchApp.fetch(url, { muteHttpExceptions: true, followRedirects: true,
        headers: { Accept: source === 'crossref' ? 'application/json' : 'application/atom+xml', 'User-Agent': 'GAS-Paper-Harvester/2' } });
    } catch (e) {
      // Do not include a request URL / appid in logs.
      throw new Error('Network request failed (' + source + ')');
    } finally { budget.lastFetch[source] = Date.now(); }
    var code = response.getResponseCode();
    if (code >= 200 && code < 300) return response.getContentText('UTF-8');
    if ((code !== 429 && code < 500) || attempt === 2) throw new Error('API HTTP ' + code);
    var headers = response.getAllHeaders();
    var retry = headers['Retry-After'] || headers['retry-after'];
    var delay = Math.pow(2, attempt) * 1000;
    if (retry) {
      var seconds = Number(retry);
      var retryMs = Number.isFinite(seconds) ? seconds * 1000 : Date.parse(retry) - Date.now();
      if (Number.isFinite(retryMs)) delay = Math.max(delay, retryMs);
    }
    if (Date.now() + delay >= budget.deadline - 15000 || budget.requests >= config.maxFetchRequests) throw budgetError_();
    Utilities.sleep(delay);
  }
}

function parseAtomPage_(text, source) {
  var root;
  try { root = XmlService.parse(text).getRootElement(); }
  catch (e) { throw new Error('Invalid XML response'); }
  if (root.getName() !== 'feed' || root.getNamespace().getURI() !== 'http://www.w3.org/2005/Atom') throw new Error('Expected an Atom feed');
  var ns = root.getNamespace();
  var totalText = localText_(root, 'totalResults');
  var total = totalText === '' ? null : Number(totalText);
  if (total !== null && (!Number.isInteger(total) || total < 0)) throw new Error('Invalid totalResults');
  var items = root.getChildren('entry', ns).map(function (entry) {
    var id = localText_(entry, 'id');
    if (/arxiv\.org\/api\/errors/.test(id)) throw new Error('arXiv returned an error entry');
    var links = entry.getChildren('link', ns);
    var link = '';
    links.some(function (l) {
      var rel = l.getAttribute('rel'), href = l.getAttribute('href'), type = l.getAttribute('type');
      if (href && (!rel || rel.getValue() === 'alternate') && (!type || type.getValue() !== 'application/rdf+xml')) { link = href.getValue(); return true; }
      return false;
    });
    var item = {
      source: source === 'cinii' ? 'CiNii' : 'arXiv', title: localText_(entry, 'title'), link: safeUrl_(link || id),
      abstract: localText_(entry, 'summary') || localText_(entry, 'content') || localText_(entry, 'description'),
      published: localText_(entry, 'publicationDate') || localText_(entry, 'published') || localText_(entry, 'date'),
      doi: localText_(entry, 'doi')
    };
    if (localText_(entry, 'abstractLicenseFlag') === 'disallow') item.abstract = '';
    if (!item.title || !itemKey_(item)) throw new Error('Atom entry has no title or identity');
    return item;
  });
  return { items: items, total: total };
}
function localText_(element, name) {
  var children = element.getChildren();
  for (var i = 0; i < children.length; i++) if (children[i].getName() === name) return String(children[i].getValue() || '').trim();
  return '';
}
function parseCrossref_(text) {
  var data;
  try { data = JSON.parse(text); } catch (e) { throw new Error('Invalid Crossref JSON'); }
  if (data.status !== 'ok' || !data.message || !Array.isArray(data.message.items)) throw new Error('Invalid Crossref response');
  var total = data.message['total-results'];
  if (!Number.isInteger(total) || total < 0) throw new Error('Invalid Crossref total');
  return { total: total, items: data.message.items.map(function (item) {
    var date = item.published && item.published['date-parts'];
    if (!item.DOI || !Array.isArray(item.title) || !item.title[0]) throw new Error('Crossref work lacks DOI/title');
    return { source: 'Crossref', title: item.title[0], doi: item.DOI,
      link: 'https://doi.org/' + item.DOI, abstract: item.abstract || '',
      published: date && date[0] ? date[0].map(function (v, i) { return i ? ('0' + v).slice(-2) : v; }).join('-') : '' };
  }) };
}

function filterItems_(items, topic, config) {
  var kept = [], demoted = [];
  items.forEach(function (item) {
    if (config.requireAbstract && !normalizeAbstract_(item.abstract)) return;
    var title = String(item.title).normalize('NFKC').toLowerCase();
    var text = title + (topic.filterField === 'titleAbstract' ? ' ' + normalizeAbstract_(item.abstract).normalize('NFKC').toLowerCase() : '');
    var matches = function (word) { return matchesKeyword_(text, word, topic.keywordMatch || 'substring'); };
    if ((topic.includeTitleGroups || []).some(function (group) {
      return !group.some(matches);
    })) return;
    if (topic.includeTitleAnyGroups && !topic.includeTitleAnyGroups.some(function (group) { return group.every(matches); })) return;
    var exclusions = topic.excludeTitleKeywords === undefined ? config.excludeTitleKeywords : topic.excludeTitleKeywords;
    var excluded = exclusions.some(function (word) { return matchesKeyword_(title, word, topic.keywordMatch || 'substring'); });
    if (excluded && config.excludeMode === 'exclude') return;
    (excluded ? demoted : kept).push(item);
  });
  return kept.concat(demoted); // Never slice fetched results: all accepted rows are saved.
}
// Token mode prevents AI from matching "training" and supports explicit suffix stems (philosoph*).
// ASCII word boundaries allow Japanese compounds such as 生成AI; no user-supplied regex is evaluated.
function matchesKeyword_(title, keyword, mode) {
  var normalize = function (s) { return String(s).normalize('NFKC').toLowerCase().replace(/[‐‑‒–—−-]/g, ' ').replace(/\s+/g, ' ').trim(); };
  if (mode !== 'token') return title.indexOf(String(keyword).normalize('NFKC').toLowerCase()) >= 0;
  var text = normalize(title), term = normalize(keyword);
  var stem = /[a-z]\*$/.test(term);
  if (stem) term = term.slice(0, -1);
  var escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  var left = /^[a-z0-9]/.test(term) ? '(^|[^a-z0-9])' : '';
  var right = /[a-z0-9]$/.test(term) ? '($|[^a-z0-9])' : '';
  return new RegExp(left + escaped + (stem ? '[a-z]*' : '') + right).test(text);
}
function ensureHeader_(sheet) {
  if (!sheet.getLastRow()) {
    sheet.getRange(1, 1, 1, PAPER_HEADERS_.length).setValues([PAPER_HEADERS_]);
    return;
  }
  var header = sheet.getRange(1, 1, 1, PAPER_HEADERS_.length).getValues()[0];
  if (header.slice(0, 7).join('|') !== PAPER_HEADERS_.slice(0, 7).join('|')) throw new Error('Unexpected sheet header: ' + sheet.getName());
  for (var i = 7; i < PAPER_HEADERS_.length; i++) {
    if (header[i] && header[i] !== PAPER_HEADERS_[i]) throw new Error('Reserved column is occupied: ' + sheet.getName());
    if (!header[i] && sheet.getLastRow() > 1) {
      if (sheet.getRange(2, i + 1, sheet.getLastRow() - 1, 1).getValues().some(function (r) { return r[0] !== ''; })) throw new Error('Reserved column contains data: ' + sheet.getName());
    }
  }
  sheet.getRange(1, 8, 1, 2).setValues([PAPER_HEADERS_.slice(7)]);
}
function loadExistingKeys_(sheet) {
  var keys = new Set();
  if (sheet.getLastRow() < 2) return keys;
  sheet.getRange(2, 1, sheet.getLastRow() - 1, 7).getValues().forEach(function (row) {
    if (row[6]) keys.add(String(row[6])); // Preserve legacy URL-based id_key values.
    var key = itemKey_({ title: row[2], link: row[3] });
    if (key) keys.add(key);
  });
  return keys;
}
function appendNewRows_(sheet, items, keys, config, mode) {
  var rows = [], newKeys = [];
  var pending = config.notifyEmail && (mode === 'weekly' || config.sendBackfillEmail);
  items.forEach(function (item) {
    var key = itemKey_(item);
    var linkKey = itemKey_({ link: item.link });
    if (!key || keys.has(key) || (linkKey && keys.has(linkKey)) || newKeys.indexOf(key) >= 0 || (linkKey && newKeys.indexOf(linkKey) >= 0)) return;
    rows.push([new Date().toISOString(), item.source, item.title, safeUrl_(item.link),
      truncate_(normalizeAbstract_(item.abstract), config.abstractMaxChars), item.published || '', key,
      pending ? 'pending' : 'disabled', mode].map(cellText_));
    newKeys.push(key);
    if (linkKey) newKeys.push(linkKey);
  });
  if (rows.length) {
    var needed = sheet.getLastRow() + rows.length - sheet.getMaxRows();
    if (needed > 0) sheet.insertRowsAfter(sheet.getMaxRows(), needed);
    sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, PAPER_HEADERS_.length).setValues(rows);
    newKeys.forEach(function (key) { keys.add(key); });
  }
  return rows.length;
}
function itemKey_(item) {
  var doi = String(item.doi || '').trim().replace(/^https?:\/\/(?:dx\.)?doi\.org\//i, '').toLowerCase();
  var link = safeUrl_(item.link);
  var fromLink = link.match(/^https?:\/\/(?:dx\.)?doi\.org\/(.+)$/i);
  if (doi || fromLink) return 'doi:' + (doi || fromLink[1].toLowerCase());
  var arxiv = link.match(/^https?:\/\/(?:export\.)?arxiv\.org\/(?:abs|pdf)\/(.+?)(?:\.pdf)?$/i);
  if (arxiv) return 'arxiv:' + arxiv[1].replace(/v\d+$/, '');
  if (link) return link.replace(/^http:/, 'https:').replace(/#.*$/, '').replace(/\/$/, '');
  var title = String(item.title || '').normalize('NFKC').toLowerCase().replace(/\s+/g, ' ').trim();
  return title ? 'title:' + title : '';
}
function cellText_(value) {
  var text = String(value === undefined || value === null ? '' : value);
  return /^[\s]*[=+@-]/.test(text) ? "'" + text : text;
}
function safeUrl_(url) { return /^https?:\/\/[^\s<>"']+$/i.test(String(url || '')) ? String(url) : ''; }
function normalizeAbstract_(text) { return String(text || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim(); }
function truncate_(text, max) { return max === 0 ? '' : text.length > max ? text.slice(0, max) + '...' : text; }

function deliverPending_(sheet, topic, config) {
  if (!config.notifyEmail || sheet.getLastRow() < 2) return;
  var pending = [];
  sheet.getRange(2, 1, sheet.getLastRow() - 1, PAPER_HEADERS_.length).getValues().forEach(function (row, index) {
    if (row[7] === 'pending' && pending.length < 20) pending.push({ row: index + 2, title: row[2], link: row[3], abstract: row[4], source: row[1] });
  });
  if (!pending.length) return;
  var recipients = config.notifyEmail.split(/[,;]/).filter(function (v) { return v.trim(); }).length;
  if (MailApp.getRemainingDailyQuota() < recipients) throw new Error('Mail quota exhausted; pending rows retained');
  var body = pending.map(function (p) { return p.title + '\n' + p.link + '\n' + p.abstract; }).join('\n\n');
  var html = pending.map(function (p) {
    var title = escapeHtml_(p.title), link = safeUrl_(p.link);
    return '<p>' + (link ? '<a href="' + escapeHtml_(link) + '">' + title + '</a>' : title) +
      ' [' + escapeHtml_(p.source) + ']<br>' + escapeHtml_(p.abstract) + '</p>';
  }).join('');
  MailApp.sendEmail({ to: config.notifyEmail, subject: '[Papers][' + topic.name + '] ' + pending.length + '件', body: body, htmlBody: html });
  // At-least-once delivery: if execution dies after send, the next run may resend.
  sheet.getRangeList(pending.map(function (p) { return 'H' + p.row; })).setValue('sent');
  SpreadsheetApp.flush();
}
function escapeHtml_(value) {
  return String(value || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function safeError_(error) { return String(error.message || error).replace(/https?:\/\/\S+/g, '[URL omitted]').slice(0, 300); }
function queryString_(params) { return Object.keys(params).map(function (key) { return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]); }).join('&'); }
function parseCsv_(text) { return String(text || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean); }
function intSetting_(props, key, fallback, min, max) {
  if (props[key] === undefined || props[key] === '') return fallback;
  var value = Number(props[key]);
  if (!Number.isInteger(value) || value < min || value > max) throw new Error(key + ' must be an integer in ' + min + '..' + max);
  return value;
}
function boolSetting_(props, key, fallback) {
  if (props[key] === undefined || props[key] === '') return fallback;
  if (!/^(true|false)$/i.test(props[key])) throw new Error(key + ' must be true or false');
  return props[key].toLowerCase() === 'true';
}

// Read-only configuration/status check; no API requests, sheet writes or emails.
function getHarvestStatus() {
  var config = getConfig_(), props = PropertiesService.getScriptProperties();
  var status = getStreams_(config).map(function (stream) {
    return { topic: stream.topic.id, source: stream.source, query: stream.query,
      backfill: readState_(props, stateKey_(stream, config, 'backfill')),
      weekly: readState_(props, stateKey_(stream, config, 'weekly')) };
  });
  Logger.log(JSON.stringify(status));
  return status;
}
// Explicit manual reset. Existing rows remain and are deduplicated on the next run.
function resetHarvestProgress() {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(1000)) throw new Error('Harvester is running');
  try {
    var props = PropertiesService.getScriptProperties();
    Object.keys(props.getProperties()).forEach(function (key) { if (key.indexOf(PAPER_STATE_PREFIX_) === 0) props.deleteProperty(key); });
  } finally { lock.releaseLock(); }
}
function installTriggers() {
  var config = getConfig_();
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(1000)) throw new Error('Harvester is running');
  try {
    deleteHarvestTriggers_();
    ScriptApp.newTrigger('runBackfillDaily').timeBased().everyDays(1).atHour(config.dailyHour).inTimezone(config.timezone).create();
    ScriptApp.newTrigger('runNewArrivalsWeekly').timeBased().onWeekDay(ScriptApp.WeekDay[config.weeklyWeekday]).atHour(config.weeklyHour).inTimezone(config.timezone).create();
  } finally { lock.releaseLock(); }
}
function deleteHarvestTriggers_() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (['runBackfillDaily', 'runNewArrivalsWeekly'].indexOf(t.getHandlerFunction()) >= 0) ScriptApp.deleteTrigger(t);
  });
}
function stopHarvestTriggers() {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(1000)) throw new Error('Harvester is running');
  try { deleteHarvestTriggers_(); } finally { lock.releaseLock(); }
}

// Read-only CiNii verification in the operator's GAS/AppID environment.
// Set CINII_PREVIEW_START to nextStart from the preceding result to inspect the next batch.
function previewCiniiQueries() {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(1000)) throw new Error('Harvester is running');
  try {
    var config = getConfig_();
    var start = intSetting_(PropertiesService.getScriptProperties().getProperties(), 'CINII_PREVIEW_START', 0, 0, 100);
    var streams = getStreams_(config).filter(function (s) { return s.source === 'cinii'; });
    var budget = { requests: 0, deadline: Date.now() + config.maxRuntimeMs, lastFetch: {} };
    var result = { totalQueries: streams.length, nextStart: null, results: [] };
    var index = start;
    for (; index < streams.length && hasBudget_(budget, config); index++) {
      var stream = streams[index];
      try {
        var page = fetchPage_(stream, 0, 5, 'weekly', config, budget);
        result.results.push({ topic: stream.topic.id, query: stream.query, total: page.total,
          items: page.items.map(function (item) { return { title: item.title, link: item.link,
            accepted: filterItems_([item], stream.topic, config).length > 0 }; }) });
      } catch (e) {
        result.results.push({ topic: stream.topic.id, query: stream.query, error: safeError_(e) });
        break;
      }
    }
    result.nextStart = index < streams.length ? index : null;
    Logger.log(JSON.stringify(result));
    return result;
  } finally { lock.releaseLock(); }
}
