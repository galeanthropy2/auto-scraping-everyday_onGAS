const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const crypto = require('node:crypto');
const { DOMParser } = require('@xmldom/xmldom');
const code = fs.readFileSync('auto_scraping_everyday.js', 'utf8');

function element(node) {
  return {
    getName: () => node.localName,
    getNamespace: () => ({ getURI: () => node.namespaceURI }),
    getValue: () => node.textContent,
    getChildren: (name, ns) => Array.from(node.childNodes).filter(n => n.nodeType === 1 && (!name || n.localName === name) && (!ns || n.namespaceURI === ns.getURI())).map(element),
    getAttribute: name => node.hasAttribute(name) ? { getValue: () => node.getAttribute(name) } : null
  };
}
class Sheet {
  constructor(name, rows = []) { this.name = name; this.rows = rows; this.maxRows = 1000; this.failWrite = false; }
  getName() { return this.name; }
  getLastRow() { return this.rows.length; }
  getMaxRows() { return this.maxRows; }
  insertRowsAfter(_, count) { this.maxRows += count; }
  getRange(row, col, height, width) {
    return {
      getValues: () => Array.from({ length: height }, (_, r) => Array.from({ length: width }, (_, c) => this.rows[row + r - 1]?.[col + c - 1] ?? '')),
      setValues: values => {
        if (this.failWrite && row > 1) throw Error('Sheet write failed');
        assert.equal(values.length, height);
        values.forEach((valuesRow, r) => {
          assert.equal(valuesRow.length, width);
          this.rows[row + r - 1] ||= [];
          valuesRow.forEach((value, c) => { this.rows[row + r - 1][col + c - 1] = value; });
        });
      }
    };
  }
  getRangeList(addresses) { return { setValue: value => addresses.forEach(a => { this.rows[Number(a.slice(1)) - 1][7] = value; }) }; }
}
function fixture(overrides = {}) {
  const props = { SPREADSHEET_ID: 'test', CINII_APP_ID: 'private-app-key', KEYWORDS_LIST: '夢', ...overrides };
  const sheets = new Map();
  const calls = [], mails = [], logs = [], sleeps = [], triggers = [];
  let time = 100000;
  const propertyStore = {
    getProperties: () => ({ ...props }), getProperty: key => props[key] ?? null,
    setProperty: (key, value) => { props[key] = value; }, deleteProperty: key => { delete props[key]; }
  };
  const state = { locked: false, released: 0, mailFails: false, quota: 100, fetch: () => ({ status: 200, text: atom([]) }) };
  const ctx = vm.createContext({
    Logger: { log: line => logs.push(line) },
    Date: class extends Date { static now() { return time; } },
    PropertiesService: { getScriptProperties: () => propertyStore },
    LockService: { getScriptLock: () => ({ tryLock: () => !state.locked, releaseLock: () => { state.released++; } }) },
    SpreadsheetApp: { openById: () => ({ getSheetByName: name => sheets.get(name), insertSheet: name => { const s = new Sheet(name); sheets.set(name, s); return s; } }), flush: () => {} },
    Utilities: { DigestAlgorithm: { SHA_256: 'sha256' }, Charset: { UTF_8: 'utf8' }, computeDigest: (_, text) => Array.from(crypto.createHash('sha256').update(text).digest()), sleep: ms => { sleeps.push(ms); time += ms; } },
    XmlService: { parse: text => {
      const doc = new DOMParser({ errorHandler: { warning() {}, error() { throw Error('XML'); }, fatalError() { throw Error('XML'); } } }).parseFromString(text, 'application/xml');
      return { getRootElement: () => element(doc.documentElement) };
    } },
    UrlFetchApp: { fetch: (url, options) => {
      calls.push({ url, options });
      const response = state.fetch(new URL(url));
      return { getResponseCode: () => response.status ?? 200, getContentText: () => response.text, getAllHeaders: () => response.headers || {} };
    } },
    MailApp: { getRemainingDailyQuota: () => state.quota, sendEmail: mail => { if (state.mailFails) throw Error('Mail failed'); mails.push(mail); } },
    ScriptApp: { WeekDay: Object.fromEntries(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'].map(v => [v, v])),
      getProjectTriggers: () => triggers.slice(), deleteTrigger: t => triggers.splice(triggers.indexOf(t), 1),
      newTrigger: handler => { const t = { getHandlerFunction: () => handler }; const builder = {}; ['timeBased', 'everyDays', 'atHour', 'inTimezone', 'onWeekDay'].forEach(k => { builder[k] = () => builder; }); builder.create = () => { triggers.push(t); return t; }; return builder; } }
  });
  vm.runInContext(code, ctx);
  return { ctx, props, sheets, calls, mails, logs, sleeps, triggers, state };
}
const escape = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
function atom(ids, total = ids.length, extra = '') {
  return `<feed xmlns="http://www.w3.org/2005/Atom" xmlns:opensearch="http://a9.com/-/spec/opensearch/1.1/" xmlns:prism="http://prismstandard.org/namespaces/basic/2.0/">${total === null ? '' : `<opensearch:totalResults>${total}</opensearch:totalResults>`}${ids.map(id => `<entry><id>https://example.org/${id}</id><title>${escape(id)}</title><link href="https://example.org/${id}"/><content>abstract</content>${extra}</entry>`).join('')}</feed>`;
}
function paged(f, ids) { f.state.fetch = url => ({ text: atom(ids.slice(Number(url.searchParams.get('start')) - 1, Number(url.searchParams.get('start')) - 1 + Number(url.searchParams.get('count'))), ids.length) }); }
function statuses(f) { return f.ctx.getHarvestStatus(); }

test('pages advance by raw fetched count; every item is saved once, then backfill stops', () => {
  const f = fixture({ MAX_ITEMS: '6', PER_KEYWORD_COUNT: '5' });
  paged(f, Array.from({ length: 13 }, (_, i) => `夢${i}`));
  assert.equal(f.ctx.runBackfillDaily().added, 6);
  assert.deepEqual(f.calls.map(c => new URL(c.url).searchParams.get('start')), ['1', '6']);
  f.ctx.runBackfillDaily(); f.ctx.runBackfillDaily();
  assert.equal(f.sheets.get('papers').rows.length, 14);
  assert.equal(statuses(f)[0].backfill.reason, 'exhausted');
  const requests = f.calls.length;
  f.ctx.runBackfillDaily();
  assert.equal(f.calls.length, requests);
  assert.equal(new Set(f.sheets.get('papers').rows.slice(1).map(r => r[6])).size, 13);
});

test('request limit does not skip later keywords; round-robin resumes across invocations', () => {
  const f = fixture({ KEYWORDS_LIST: '夢,悪夢,dream', MAX_FETCH_REQUESTS: '1' });
  f.state.fetch = url => ({ text: atom([url.searchParams.get('title')], 100) });
  f.ctx.runBackfillDaily(); f.ctx.runBackfillDaily(); f.ctx.runBackfillDaily();
  assert.deepEqual(f.calls.map(c => new URL(c.url).searchParams.get('title')), ['夢', '悪夢', 'dream']);
  assert.deepEqual(Array.from(statuses(f), s => s.backfill.offset), [1, 1, 1]);
});

test('duplicate-only / excluded pages are not mistaken for exhausted searches', () => {
  const f = fixture({ MAX_PAGES_PER_RUN: '1', PER_KEYWORD_COUNT: '1' });
  paged(f, ['映画', '夢', '悪夢']);
  assert.equal(f.ctx.runBackfillDaily().added, 0);
  assert.equal(statuses(f)[0].backfill.done, false);
  f.ctx.runBackfillDaily();
  assert.equal(f.sheets.get('papers').rows.length, 2);
});

test('legacy headers and keys migrate without overwriting or resending old rows', () => {
  const f = fixture({ NOTIFY_EMAIL: 'test@example.org' });
  const header = ['timestamp', 'source', 'title', 'link', 'abstract', 'published', 'id_key'];
  f.sheets.set('papers', new Sheet('papers', [header, ['old', 'CiNii', '夢', 'http://example.org/夢', '', '', 'http://example.org/夢']]));
  paged(f, ['夢']);
  assert.equal(f.ctx.runNewArrivalsWeekly().added, 0);
  assert.equal(f.sheets.get('papers').rows.length, 2);
  assert.equal(f.mails.length, 0);
  assert.equal(f.sheets.get('papers').rows[0][7], 'notify_status');
});

test('failed writes preserve checkpoint and release lock', () => {
  const f = fixture();
  f.ctx.runBackfillDaily();
  f.ctx.resetHarvestProgress();
  f.sheets.get('papers').failWrite = true;
  paged(f, ['夢']);
  assert.throws(() => f.ctx.runBackfillDaily(), /Sheet write failed/);
  assert.equal(statuses(f)[0].backfill.offset, 0);
  assert.ok(f.state.released);
});

test('mail failures remain pending and retry even after backfill completes', () => {
  const f = fixture({ NOTIFY_EMAIL: 'test@example.org', SEND_BACKFILL_EMAIL: 'true' });
  paged(f, ['夢']); f.state.mailFails = true;
  assert.throws(() => f.ctx.runBackfillDaily(), /Mail failed/);
  assert.equal(f.sheets.get('papers').rows[1][7], 'pending');
  f.state.mailFails = false;
  f.ctx.runBackfillDaily();
  assert.equal(f.mails.length, 1);
  assert.ok(f.mails[0].body.includes('夢'));
  assert.equal(f.sheets.get('papers').rows[1][7], 'sent');
  f.ctx.runBackfillDaily(); assert.equal(f.mails.length, 1);
});

test('weekly uses newest sort and resumes a bounded multipage sweep', () => {
  const f = fixture({ MAX_ITEMS: '1', WEEKLY_PAGES: '2', PER_KEYWORD_COUNT: '1' });
  paged(f, ['a', 'b', 'c']);
  f.ctx.runNewArrivalsWeekly(); f.ctx.runNewArrivalsWeekly();
  assert.deepEqual(f.calls.map(c => new URL(c.url).searchParams.get('start')), ['1', '2']);
  assert.equal(new URL(f.calls[0].url).searchParams.get('sortorder'), '0');
  assert.equal(statuses(f)[0].weekly.reason, 'weekly-window');
  assert.equal(statuses(f)[0].backfill.offset, 0);
  f.ctx.runNewArrivalsWeekly();
  assert.equal(new URL(f.calls[2].url).searchParams.get('start'), '1');
});

test('three topics have independent sheets/checkpoints and one failed source does not block others', () => {
  const topics = ['dream', 'experimental', 'ai'].map(id => ({ id, sheetName: id, queries: { cinii: [id] } }));
  const f = fixture({ TOPICS_JSON: JSON.stringify(topics) });
  f.state.fetch = url => url.searchParams.get('title') === 'dream' ? { status: 400 } : { text: atom([url.searchParams.get('title')]) };
  assert.throws(() => f.ctx.runBackfillDaily(), /API HTTP 400/);
  assert.equal(f.sheets.get('experimental').rows.length, 2);
  assert.equal(f.sheets.get('ai').rows.length, 2);
  assert.equal(statuses(f)[0].backfill.offset, 0);
});

test('429 retries count toward request budget and never move an unsuccessful checkpoint', () => {
  const f = fixture({ MAX_FETCH_REQUESTS: '2' });
  f.state.fetch = () => ({ status: 429, headers: { 'Retry-After': '2' } });
  f.ctx.runBackfillDaily();
  assert.equal(f.calls.length, 2);
  assert.equal(statuses(f)[0].backfill.offset, 0);
  assert.ok(f.sleeps.includes(2000));
});

test('503 retries succeed; HTML/XML failures do not become empty result sets', () => {
  const f = fixture();
  f.state.fetch = () => f.calls.length === 1 ? { status: 503 } : { text: atom(['a']) };
  f.ctx.runBackfillDaily(); assert.equal(f.calls.length, 2);
  const g = fixture(); g.state.fetch = () => ({ text: '<html>Maintenance</html>' });
  assert.throws(() => g.ctx.runBackfillDaily(), /Expected an Atom feed/);
  assert.equal(statuses(g)[0].backfill.done, false);
});

test('CiNii publication date and license flag; arXiv HTTP-200 error entry', () => {
  const { ctx } = fixture();
  const page = ctx.parseAtomPage_(atom(['夢'], 1, '<prism:publicationDate>2024-06</prism:publicationDate><abstractLicenseFlag>disallow</abstractLicenseFlag>'), 'cinii');
  assert.equal(page.items[0].published, '2024-06'); assert.equal(page.items[0].abstract, '');
  assert.throws(() => ctx.parseAtomPage_('<feed xmlns="http://www.w3.org/2005/Atom"><entry><id>http://arxiv.org/api/errors#bad_query</id><title>Error</title></entry></feed>', 'arxiv'), /error entry/);
});

test('Crossref parsing; DOI, arXiv versions and Japanese fallback deduplication', () => {
  const { ctx } = fixture();
  const page = ctx.parseCrossref_(JSON.stringify({ status: 'ok', message: { 'total-results': 1, items: [{ DOI: '10.1/ABC', title: ['title'], published: { 'date-parts': [[2025, 2, 3]] } }] } }));
  assert.equal(page.items[0].published, '2025-02-03');
  assert.equal(ctx.itemKey_(page.items[0]), 'doi:10.1/abc');
  assert.equal(ctx.itemKey_({ link: 'https://doi.org/10.1/ABC' }), 'doi:10.1/abc');
  assert.equal(ctx.itemKey_({ link: 'https://arxiv.org/pdf/2401.01234v2.pdf' }), 'arxiv:2401.01234');
  assert.notEqual(ctx.itemKey_({ title: '夢の研究' }), ctx.itemKey_({ title: '悪夢の研究' }));
});

test('API adapters use the correct offsets and arXiv spacing', () => {
  const f = fixture({ CINII_APP_ID: '', TOPICS_JSON: JSON.stringify([{ id: 'ai', sheetName: 'ai', queries: { arxiv: ['ti:consciousness'], crossref: ['artificial intelligence philosophy'] } }]), MAX_PAGES_PER_RUN: '1' });
  f.state.fetch = url => url.hostname === 'api.crossref.org' ? { text: JSON.stringify({ status: 'ok', message: { 'total-results': 0, items: [] } }) } : { text: atom(['a'], 100) };
  f.ctx.runBackfillDaily();
  assert.equal(new URL(f.calls[0].url).searchParams.get('start'), '0');
  assert.equal(new URL(f.calls[1].url).searchParams.get('offset'), '0');
  const budget = { requests: 0, deadline: 999999, lastFetch: {} };
  const config = f.ctx.getConfig_();
  f.ctx.fetchText_('https://export.arxiv.org/api/query', 'arxiv', config, budget);
  f.ctx.fetchText_('https://export.arxiv.org/api/query', 'arxiv', config, budget);
  assert.ok(f.sleeps.includes(3100));
});

test('repeated pages stop with a warning reason, not successful exhaustion', () => {
  const f = fixture(); f.state.fetch = () => ({ text: atom(['a'], 100) });
  f.ctx.runBackfillDaily();
  assert.equal(statuses(f)[0].backfill.reason, 'repeated-page');
  const count = f.calls.length; f.ctx.runBackfillDaily(); assert.equal(f.calls.length, count);
});

test('configured page cap is distinct from exhaustion', () => {
  const f = fixture({ MAX_BACKFILL_PAGES: '1' });
  f.state.fetch = () => ({ text: atom(['a'], 100) });
  assert.equal(f.ctx.runBackfillDaily().limited, 1);
  assert.equal(statuses(f)[0].backfill.reason, 'page-limit');
});

test('strict validation, changed queries restart, legacy BACKFILL_START ignored', () => {
  assert.throws(() => fixture({ MAX_ITEMS: '-1' }).ctx.getConfig_(), /MAX_ITEMS/);
  assert.throws(() => fixture({ PER_KEYWORD_COUNT: '5garbage' }).ctx.getConfig_(), /PER_KEYWORD_COUNT/);
  assert.throws(() => fixture({ TOPICS_JSON: '{}' }).ctx.getConfig_(), /TOPICS_JSON/);
  const f = fixture({ BACKFILL_START: '1000' }); paged(f, ['a']);
  f.ctx.runBackfillDaily(); assert.equal(new URL(f.calls[0].url).searchParams.get('start'), '1');
  f.props.KEYWORDS_LIST = 'new'; assert.equal(statuses(f)[0].backfill.done, false);
});

test('read-only status, locks, and trigger install/stop preserve unrelated triggers', () => {
  const f = fixture(); f.ctx.getHarvestStatus();
  assert.equal(f.sheets.size, 0); assert.equal(f.calls.length, 0); assert.equal(f.mails.length, 0);
  f.state.locked = true; assert.equal(f.ctx.runBackfillDaily().skipped, 'locked');
  f.state.locked = false;
  f.triggers.push({ getHandlerFunction: () => 'other' });
  f.ctx.installTriggers(); f.ctx.installTriggers(); assert.equal(f.triggers.length, 3);
  f.ctx.stopHarvestTriggers(); assert.equal(f.triggers.length, 1);
});

test('sheet formula / email markup escaping and unexpected columns', () => {
  const f = fixture();
  assert.equal(f.ctx.cellText_('=IMPORTXML("x")'), '\'=IMPORTXML("x")');
  assert.equal(f.ctx.safeUrl_('javascript:alert(1)'), '');
  assert.equal(f.ctx.escapeHtml_('<script>'), '&lt;script&gt;');
  f.sheets.set('papers', new Sheet('papers', [['timestamp', 'source', 'title', 'link', 'abstract', 'published', 'id_key', 'user notes']]));
  assert.throws(() => f.ctx.runBackfillDaily(), /Reserved column/);
  assert.equal(f.calls.length, 0);
});

test('no pending email does not fail when daily mail quota is exhausted', () => {
  const f = fixture({ NOTIFY_EMAIL: 'test@example.org' }); f.state.quota = 0;
  assert.equal(f.ctx.runBackfillDaily().added, 0);
});

test('an API that ignores requested count cannot silently bypass the save cap', () => {
  const f = fixture({ MAX_ITEMS: '1' }); f.state.fetch = () => ({ text: atom(['a', 'b']) });
  assert.throws(() => f.ctx.runBackfillDaily(), /more rows than requested/);
  assert.equal(statuses(f)[0].backfill.offset, 0);
  assert.equal(f.sheets.get('papers').rows.length, 1);
});

test('sample three-topic configuration validates and title groups apply AND/OR', () => {
  const f = fixture({ TOPICS_JSON: fs.readFileSync('examples/topics.json', 'utf8') });
  const config = f.ctx.getConfig_();
  assert.equal(config.topics.length, 3);
  const filtered = f.ctx.filterItems_([{ title: 'Moral agency of large language models' }, { title: 'Large language models for weather' }, { title: 'Moral philosophy' }], config.topics[2], config);
  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].title, 'Moral agency of large language models');
});

test('API cap and runtime deferral do not request out-of-range pages', () => {
  const f = fixture({ MAX_ITEMS: '5', PER_KEYWORD_COUNT: '5', MAX_BACKFILL_PAGES: '10000' });
  const config = f.ctx.getConfig_(), stream = f.ctx.getStreams_(config)[0];
  const key = f.ctx.stateKey_(stream, config, 'backfill');
  f.props[key] = JSON.stringify({ offset: 9999, pages: 2, done: false, reason: '', lastPage: '' });
  f.state.fetch = url => {
    assert.equal(url.searchParams.get('start'), '10000');
    assert.equal(url.searchParams.get('count'), '1');
    return { text: atom(['last'], 10001) };
  };
  f.ctx.runBackfillDaily(); assert.equal(statuses(f)[0].backfill.reason, 'api-limit');
  assert.throws(() => f.ctx.fetchText_('https://example.org/', 'cinii', config, { requests: 0, deadline: 100001, lastFetch: {} }), /budget/);
  assert.equal(f.calls.length, 1);
});

test('real sampled titles retain philosophical papers and reject medical/engineering false positives', () => {
  const f = fixture({ TOPICS_JSON: fs.readFileSync('examples/topics.json', 'utf8') });
  const config = f.ctx.getConfig_();
  const cases = JSON.parse(fs.readFileSync('test/query-relevance-cases.json', 'utf8'));
  for (const c of cases) {
    const topic = config.topics.find(t => t.id === c.topic);
    assert.equal(f.ctx.filterItems_([{ title: c.title }], topic, config).length > 0, c.expected, `${c.title}: ${c.reason}`);
  }
});

test('token matching supports inflections, Japanese/English compounds and punctuation without substring accidents', () => {
  const { ctx } = fixture();
  assert.equal(ctx.matchesKeyword_('training moral responsibility', 'AI', 'token'), false);
  assert.equal(ctx.matchesKeyword_('explain consciousness', 'AI', 'token'), false);
  assert.equal(ctx.matchesKeyword_('生成ＡＩの哲学', 'AI', 'token'), true);
  assert.equal(ctx.matchesKeyword_('AI-mediated philosophy', 'AI', 'token'), true);
  assert.equal(ctx.matchesKeyword_('philosophical concerns', 'philosoph*', 'token'), true);
  assert.equal(ctx.matchesKeyword_('dream–reality confusion', 'dream reality', 'token'), true);
  assert.equal(ctx.matchesKeyword_('machine moral agency', 'moral agent*', 'token'), false);
  assert.equal(ctx.matchesKeyword_('foo (bar)', '(bar)', 'token'), true);
  assert.equal(ctx.matchesKeyword_('foo XbarX', '(bar)', 'token'), false);
  // Existing user configurations keep the previous substring behavior unless opted in.
  assert.equal(ctx.matchesKeyword_('philosophical', 'philosoph', 'substring'), true);
});

test('experimental philosophy can use abstract context, while title exclusions remain title-only', () => {
  const f = fixture({ TOPICS_JSON: fs.readFileSync('examples/topics.json', 'utf8') });
  const config = f.ctx.getConfig_(), topic = config.topics[1];
  const paper = { title: '表象・説明・道徳的責任', abstract: 'A theoretical explanation of moral intuitions and compatibilist responses.' };
  assert.equal(f.ctx.filterItems_([paper], topic, config).length, 1);
  assert.equal(f.ctx.filterItems_([{ title: paper.title }], topic, config).length, 0);
  assert.equal(f.ctx.filterItems_([{ title: 'Book review: Experimental Philosophy', abstract: 'Experimental philosophy' }], topic, config).length, 0);
  const stream = f.ctx.getStreams_(config).find(s => s.topic.id === topic.id && s.source === 'cinii');
  f.state.fetch = () => ({ text: atom([]) });
  f.ctx.fetchPage_(stream, 0, 5, 'weekly', config, { requests: 0, deadline: 999999, lastFetch: {} });
  const url = new URL(f.calls[0].url);
  assert.equal(url.searchParams.get('q'), stream.query);
  assert.equal(url.searchParams.has('title'), false);
});

test('Crossref uses supported bibliographic relevance search and a stable weekly publication window', () => {
  const f = fixture({ TOPICS_JSON: JSON.stringify([{ id: 'x', sheetName: 'x', queries: { crossref: ['experimental philosophy'] } }]), MAX_ITEMS: '1' });
  f.state.fetch = () => ({ text: JSON.stringify({ status: 'ok', message: { 'total-results': 100, items: [{ DOI: `10.test/${f.calls.length}`, title: [`paper ${f.calls.length}`] }] } }) });
  f.ctx.runNewArrivalsWeekly();
  const config = f.ctx.getConfig_(), stream = f.ctx.getStreams_(config)[0];
  const key = f.ctx.stateKey_(stream, config, 'weekly'), saved = JSON.parse(f.props[key]);
  assert.ok(saved.windowStart && saved.windowEnd);
  saved.windowStart = '2024-01-01'; saved.windowEnd = '2025-01-01'; f.props[key] = JSON.stringify(saved);
  f.ctx.runNewArrivalsWeekly();
  const url = new URL(f.calls[1].url);
  assert.equal(url.searchParams.get('query.bibliographic'), 'experimental philosophy');
  assert.equal(url.searchParams.has('query.title'), false);
  assert.equal(url.searchParams.get('sort'), 'score');
  assert.equal(url.searchParams.get('filter'), 'type:journal-article,from-pub-date:2024-01-01,until-pub-date:2025-01-01');
  assert.equal(url.searchParams.get('offset'), '1');
});

test('Crossref relevance tail is capped independently of the general backfill page limit', () => {
  const f = fixture({ TOPICS_JSON: JSON.stringify([{ id: 'x', sheetName: 'x', queries: { crossref: ['dream skepticism'] } }]), CROSSREF_BACKFILL_PAGES: '1' });
  f.state.fetch = () => ({ text: JSON.stringify({ status: 'ok', message: { 'total-results': 100, items: [{ DOI: '10.test/a', title: ['a'] }] } }) });
  f.ctx.runBackfillDaily();
  assert.equal(statuses(f)[0].backfill.reason, 'page-limit');
  assert.equal(new URL(f.calls[0].url).searchParams.get('filter'), 'type:journal-article');
});

test('CiNii preview batches do not write sheets, mail, or harvest checkpoints', () => {
  const f = fixture({ KEYWORDS_LIST: '夢,悪夢', MAX_FETCH_REQUESTS: '1' });
  paged(f, ['夢']);
  let result = f.ctx.previewCiniiQueries();
  assert.equal(result.totalQueries, 2); assert.equal(result.nextStart, 1);
  assert.equal(result.results[0].items[0].title, '夢');
  assert.equal(f.sheets.size, 0); assert.equal(f.mails.length, 0);
  assert.equal(Object.keys(f.props).some(k => k.startsWith('PAPERS_V2_')), false);
  f.props.CINII_PREVIEW_START = '1'; result = f.ctx.previewCiniiQueries();
  assert.equal(result.nextStart, null); assert.equal(result.results[0].query, '悪夢');
});

test('invalid per-topic filter configurations fail before side effects; filter changes reset only the affected state', () => {
  const make = change => fixture({ TOPICS_JSON: JSON.stringify([{ id: 'x', sheetName: 'x', queries: { cinii: ['x'] }, ...change }]) });
  assert.throws(() => make({ includeTitleAnyGroups: [[]] }).ctx.getConfig_(), /includeTitleAnyGroups/);
  assert.throws(() => make({ keywordMatch: 'regex' }).ctx.getConfig_(), /keywordMatch/);
  assert.throws(() => make({ filterField: 'body' }).ctx.getConfig_(), /filterField/);
  const f = make({ keywordMatch: 'token' }); f.ctx.runBackfillDaily();
  const topics = JSON.parse(f.props.TOPICS_JSON); topics[0].excludeTitleKeywords = ['x']; f.props.TOPICS_JSON = JSON.stringify(topics);
  assert.equal(statuses(f)[0].backfill.done, false);
});
