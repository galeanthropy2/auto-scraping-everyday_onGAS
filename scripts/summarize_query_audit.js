// Offline, deterministic re-evaluation of the saved search samples. No network/GAS services.
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const ctx = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(root, 'auto_scraping_everyday.js'), 'utf8'), ctx);
const after = JSON.parse(fs.readFileSync(path.join(root, 'examples/topics.json'), 'utf8'));
const base = path.join(root, 'docs/query-audit/2026-10-06');
const before = JSON.parse(fs.readFileSync(path.join(base, 'topics-before.json'), 'utf8'));
const config = { requireAbstract: false, excludeMode: 'exclude', excludeTitleKeywords: '映画,ブックガイド,特別鼎談,ニュース,連載,ガイド,旅,小説,エッセイ,随筆,対談,座談会,書評,特集'.split(',') };
const summary = [];
const files = ['crossref.json', 'arxiv.json', 'selected/crossref.json', 'selected/arxiv.json', 'production/crossref.json', 'cinii-selected-index.json'];
const lines = ['# クエリ別の保存サンプルとフィルター判定', '',
  '2026-10-06の取得結果。各APIクエリは先頭5件の標本であり、全検索結果の精度・再現率は測定していません。',
  '採用/除外は現行設定を保存タイトルへ適用した機械判定です。専門家による関連性・論文品質の評価ではありません。',
  '抄録は保存していないため、実験哲学のタイトル＋抄録判定はここではタイトルのみの保守的な評価です。',
  'totalはAPIが返す候補総数であり、テーマに合致する論文数ではありません。CiNiiは外部検索インデックスの補助確認で、APIの検索順位・件数は未検証です。', ''];
for (const file of files) {
  for (const batch of JSON.parse(fs.readFileSync(path.join(base, file), 'utf8'))) {
    const source = batch.source || 'cinii-index';
    const topic = after.find(t => t.id === batch.topic);
    const old = before.find(t => t.id === batch.topic);
    if (!topic) continue;
    const items = (batch.items || []).map(item => ({ ...item,
      beforeAccepted: ctx.filterItems_([item], old, config).length > 0,
      afterAccepted: ctx.filterItems_([item], topic, config).length > 0 }));
    const row = { file, source, topic: topic.id, query: batch.query, phase: batch.phase || 'index', order: batch.order || 'index',
      configured: (topic.queries[source === 'cinii-index' ? 'cinii' : source] || []).includes(batch.query),
      url: batch.url || null, httpStatus: batch.http_status || null, total: batch.total ?? null,
      inspected: items.length, beforeAccepted: items.filter(x => x.beforeAccepted).length,
      afterAccepted: items.filter(x => x.afterAccepted).length, items };
    summary.push(row);
    lines.push(`## ${source} / ${topic.id} / ${row.phase} / ${row.order}`, '', `クエリ: \`${batch.query}\``, '', `現在の設定: ${row.configured ? '有効' : '比較用・不採用'}`, '',
      `標本: ${row.inspected}件、旧フィルター通過: ${row.beforeAccepted}件、新フィルター通過: ${row.afterAccepted}件。${row.total === null ? '' : ' API候補総数: ' + row.total + '。'}`, '');
    if (batch.decision) lines.push(batch.decision, '');
    if (batch.url) lines.push(`[検索リクエスト](${batch.url})`, '');
    for (const item of items) lines.push(`- ${item.afterAccepted ? '採用' : '除外'}: [${item.title.replace(/[\[\]]/g, '')}](${item.url})`);
    lines.push('');
  }
}
fs.writeFileSync(path.join(base, 'evaluation.json'), JSON.stringify(summary, null, 2) + '\n');
fs.writeFileSync(path.join(base, 'results.md'), lines.join('\n') + '\n');
console.log(JSON.stringify(summary.filter(x => x.phase.startsWith('production') || (x.source === 'arxiv' && x.phase === 'selected')).map(({source,topic,query,phase,inspected,afterAccepted}) => ({source,topic,query,phase,inspected,afterAccepted})), null, 2));
