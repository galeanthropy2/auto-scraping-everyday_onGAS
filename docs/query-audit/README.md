# 哲学を優先したクエリ検証（2026-10-06）

利用者の指定「哲学の議論を優先し、医学・工学は絞る」に合わせた調整です。更新した設定は [examples/topics.json](../../examples/topics.json)、クエリ別の実際の取得タイトル・リンク・フィルター判定は [results.md](2026-10-06/results.md) にあります。

## 確認した範囲と限界

- Crossref: 旧クエリの出版日順、候補の関連度順、新しい検索パラメーターによる関連度順・直近365日の条件を比較。92リクエスト、延べ460件のタイトル標本。
- arXiv: 旧クエリ、広げた候補、採用した3本を比較。10リクエスト、延べ50件のタイトル標本。今回はすべてHTTP 200で、前回の429による未確認を解消。
- 各リクエストは先頭5件。件数は同じ論文の重複出現を含み、510本の異なる論文を読んだという意味ではありません。本文全体や論文の質は評価していません。
- CiNii: 公開検索画面がHTTP 202、ブラウザーでも検索結果を表示できず、AppIDはこの作業環境にありません。**CiNii APIの各クエリの実結果・順位・ヒット件数は未検証**です。外部検索エンジン経由のCiNii公開レコードで検索語の意味と誤検出例を確認しました。これはネイティブ検索の代用となる精度測定ではありません。
- API応答の `total` は広い候補集合の件数です。テーマに関連する論文の件数や精度ではありません。
- 標本には抄録を保存していません。表の通過数はタイトルのみでフィルターを再実行した値で、実験哲学の本番処理が抄録も取得した場合とは異なり得ます。

## 判明した問題と修正

### Crossrefは検索語の追加だけでは改善しない

旧設定の `experimental philosophy` + 出版日降順の先頭には、チタン製インプラントの感染防止や太陽光発電の実験装置の論文が含まれました。`machine consciousness` + 出版日降順も、機械学習・侵入検知・加工技術の論文が並びました。検索語のすべてを必須とする厳密なAND検索ではありません。

そのため、次の3点をセットで変更しました。

1. 非推奨の `query.title` から、公式仕様が案内する `query.bibliographic` に移行。
2. `sort=score&order=desc` にして関連度を優先。
3. 保存前に哲学的な主題を要求するフィルターを通す。

週次は `from-pub-date` / `until-pub-date` で直近365日を指定し、関連度順で調べます。日付範囲は走査の途中で変わらないよう検索状態に保存します。過去分は関連度上位20ページを既定の上限とします。これは全件取得ではなく、無関係な検索結果の末尾まで毎日走査し続けることを避けるための範囲指定です。

公式資料: [フィールド検索とソート](https://github.com/CrossRef/rest-api-doc#field-queries)。監査中、旧 `query.title` もHTTP 200を返しましたが、公式資料の非推奨指定に従って更新しています。

### 採用・不採用の判断

| テーマ | 採用する論点・語 | 不採用・縮小した語 | 理由 |
| --- | --- | --- | --- |
| 夢 | 夢と懐疑、現象学、意識、うつつ、ベルクソン。英語は `dream skepticism`, `dream phenomenology`, `dream consciousness` | 裸の `夢`, `dream`, `nightmare sleep`, `dream recall`, `lucid dreaming philosophy` | 医療、文学的比喩、願望、DREAMというアルゴリズム名が混ざる。明晰夢だけでは哲学的論点を特定できない |
| 実験哲学 | `experimental philosophy`, `folk intuitions`, `epistemic intuitions`, `Knobe effect`。日本語は実験哲学・道徳的責任と直観・自由意志と直観 | `moral judgment experiment`, `哲学 直観`, `認識 直観`、独立した `Gettier intuitions` クエリ | moral/experimentは広すぎる。「直観」一般はカント・ベルクソン等にも広がる。Gettierは今回の標本で実証・直観研究への絞り込み効率が低かった |
| AI×哲学 | 人工意識、機械の道徳的主体性、哲学、認識論、志向性、人格、道徳的地位、中国語の部屋 | 単純な `LLM AND understanding`、`large language models understanding`、広いAI倫理クエリ | 量子化、表理解、Web攻撃文字列の性能評価などが多い。論点を明示する語を優先 |

採用したCrossrefクエリのタイトルフィルター通過数です。**関連性の正解率ではありません**。少ない新着標本で0件でも、無関係な論文を無理に採用せず、過去分で有用な論点を維持します。

| クエリ | 過去分・上位5件中 | 直近365日・上位5件中 |
| --- | ---: | ---: |
| dream skepticism | 5 | 1 |
| dream phenomenology | 2 | 0 |
| dream consciousness | 1 | 3 |
| experimental philosophy | 4 | 3 |
| folk intuitions | 5 | 1 |
| epistemic intuitions | 5 | 0 |
| Knobe effect | 5 | 2 |
| artificial intelligence philosophy | 2 | 3 |
| machine consciousness | 5 | 5 |
| machine moral agency | 4 | 4 |
| artificial intelligence epistemology | 3 | 3 |

### arXivの採用クエリ

1. 人工意識: `ti:"machine consciousness" OR ti:"artificial consciousness" OR ti:"machine sentience"`
2. 道徳的主体性: `ti:"machine ethics" OR ti:"artificial moral" OR ti:"moral agency"`
3. AI/言語モデル/LLM と、philosophy/philosophical/epistemology/intentionality/personhood/moral status/Chinese room の組合せ（全文は設定ファイル）。

新しい順の先頭5件に対するフィルター通過はそれぞれ5件・5件・4件です。例えば [What Can Analogy Tell Us About Artificial Consciousness?](http://arxiv.org/abs/2610.01002v1) のような概念的議論を拾い、哲学語を含む自動運転の工学論文は除外します。人工意識の構成モデルなど境界領域は残り、これを「哲学論文の精度100%」とは評価していません。

### CiNiiで確認できた取りこぼしと雑音

- [夢とうつつ](https://cir.nii.ac.jp/crid/1390001205323846912): タイトルに「哲学」「睡眠」がなくても夢と知覚の哲学的議論。`うつつ` を採用。
- [ベルクソンにおける「夢」](https://cir.nii.ac.jp/crid/1390290699580107008): 哲学者名から拾う検索を補完。
- [表象・説明・道徳的責任](https://cir.nii.ac.jp/crid/1390300058784387712): タイトルに「実験哲学」がないが、実験哲学の直観・責任帰属を扱う。このため実験哲学だけ自由語検索とタイトル＋抄録の判定を利用。
- [人工知能と現代哲学](https://cir.nii.ac.jp/crid/1390282763108597888): 日英のタイトル表現を確認。
- 「夢うつつ」を含む映画館追悼記事は除外。「哲学 直観」のみでは近代哲学一般へ広がるので採用しない。

CiNiiの英語クエリ、自由語検索、件数は本番AppID環境での追加確認が必要です。GASにコードとTOPICS_JSONを貼り付けた後、`previewCiniiQueries` を実行できます。これはAPIを読むだけで、シート・メール・収集進捗を変更しません。ログの `nextStart` が数値なら、その値を `CINII_PREVIEW_START` に設定して続きのバッチを確認できます。エラーになった検索は同じ開始位置で再試行できます。

## フィルターと回帰テスト

- 英単語は `keywordMatch: "token"` で単語境界を確認。`AI` が `training` や `explain` の途中に一致しません。全角ＡＩ・生成AI・ハイフンにも対応。
- `philosoph*` のように末尾 `*` を付けた場合だけ英語の語尾を許容。既存の設定は `substring` のままで互換性を維持。
- 実験哲学は OR-of-AND 条件で、`Gettier` 単独を通さず `intuition*` / `experiment*` との組合せを要求。
- 除外語をテーマごとに指定。「連載」「特集」を一律に除外して哲学解説まで落とすことを避ける。
- 実結果由来の35タイトルを採否の回帰ケースに固定。これは設定に使った例の回帰確認であり、未知データでの精度評価ではありません。

なお、タイトルに現れない関連研究、英日以外のタイトル、抄録がない実験哲学論文、哲学語を使う工学論文、書評・歴史的なexperimental philosophyなど、語句だけでは判別し切れないものは残ります。検索結果を研究候補として確認する運用を想定します。

## 再現方法

```sh
# ネット接続不要。保存済み標本に現在のフィルターを再適用
node scripts/summarize_query_audit.js
npm test

# 外部APIへアクセスする再検証。別ディレクトリを指定すると新たに取得
python3 scripts/audit_queries.py --plan docs/query-audit/2026-10-06/production-plan.json --output /tmp/paper-query-audit-new
```

Crossrefは直列で1.1秒以上、arXivは直列で3.2秒以上の間隔を設け、403/429でそのサービスの取得を停止します。保存済みの同じ条件は再取得しません。日付範囲を変える場合は計画JSONも変更してください。今回の本番GAS・実シート・メール・トリガーへの変更はありません。
