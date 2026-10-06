# 論文APIの選択メモ

2026-10-06に公式資料を確認。用途の評価はこの収集スクリプトへの適合性からの判断です。

| API | 状態 | この用途での位置づけ | 注意点 |
| --- | --- | --- | --- |
| CiNii Research | 実装 | 日本語の夢研究・哲学の主な入口 | AppIDが必要。抄録がないレコードもある。論文検索だけでも内容の関連性は検索語次第 |
| arXiv | 実装 | AI×哲学の技術寄りプレプリントを補完 | 哲学全般を網羅しない。査読済みとは限らない。呼び出し間隔を3秒以上に制御 |
| Crossref | 実装 | 国際誌のDOI付き論文を補完 | 本実装はjournal-articleに限定。タイトル検索は関連度検索で、厳密な条件一致とは異なる。抄録の充実度は登録データ次第 |
| OpenAlex | 今後の候補 | 分野横断の探索、著者・引用関係まで拡張したい場合 | 現行の認証ページでは基本利用はキーなしでも可能、継続運用には無料キーを推奨。利用予算・料金体系を導入時に再確認 |

## 実装に反映した仕様

CiNiiは旧 `ci.nii.ac.jp/opensearch/search` から `cir.nii.ac.jp/opensearch/articles` に変更。開始位置は1始まり、古い順は `sortorder=1`、新しい順は `0`。Atomの `prism:publicationDate` を読み、`abstractLicenseFlag=disallow` は抄録を保存しません。[CiNii公式仕様](https://support.nii.ac.jp/ja/cir/r_opensearch)

arXivは0始まりのページ番号とAtomを使い、検索式・投稿日順のソートを指定します。HTTPが成功していてもエラーを表すentryなら失敗扱いにします。[arXiv公式マニュアル](https://info.arxiv.org/help/api/user-manual.html)

Crossrefは登録なしで利用できる公開APIです。タイトル検索と出版日ソートを使い、深い全件収集はこの版では行いません。大量データ向けのcursor走査への拡張は別途設計が必要です。運用規模を増やす場合、サービスへの連絡先として専用アドレスを渡すpolite poolも検討してください。通知先アドレスをAPIへ自動転送する実装にはしていません。[アクセス・認証](https://www.crossref.org/documentation/retrieve-metadata/rest-api/access-and-authentication/)、[REST API仕様](https://github.com/CrossRef/rest-api-doc)、[ページングの説明](https://www.crossref.org/documentation/retrieve-metadata/rest-api/tips-for-using-the-crossref-rest-api)

OpenAlexは認証・予算体系の更新があるため、古い「必ずキー必須」「無制限に無料」といった前提は使わず、導入時に現行仕様を確認します。[現行の認証ページ](https://help.openalex.org/api/authentication/)

GAS側にも実行時間・メール・外部アクセスなどの制限があります。コード内の処理予算とは別の制約です。[GAS公式クォータ](https://developers.google.com/apps-script/guides/services/quotas)
