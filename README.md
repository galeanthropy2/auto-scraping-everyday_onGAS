# auto-scraping-everyday

Daily academic paper harvesting with Google Apps Script using CiNii OpenSearch.

## Overview
- 「夢（dream）」（設定から検索設定は変更可能）に関する学術論文を自動収集
- 毎日：既存研究をリサーチして、メールアドレスに１０件通知
- 週1回：新着論文の通知
- 各リサーチ結果はスプレッドシートに自動で蓄積。
- Google Apps Script + Google Sheets + Gmail

## Features
- Official CiNii OpenSearch API usage (no illegal scraping)
- Duplicate-safe harvesting
- Configurable keyword-based title search
- Email notifications
- Designed for long-term academic research

## File Structure
- `auto_scraping_everyday.js` — main GAS script

## Setup
## 初回実行と承認の手順（GASを初めて使う人向け）

Google Apps Script（GAS）は、**初回実行時に必ず「権限の承認」**が必要です。  
この承認を行わないと、メール送信や外部APIアクセスが実行されません。

以下の手順は **最初の1回だけ** 行えば十分です。

---

### 1. Google Apps Script プロジェクトを開く

1. Google ドライブで新しい Google Apps Script プロジェクトを作成  
   （または、このリポジトリのコードを貼り付ける）
2. `GAS_everyday.js` をプロジェクトに追加
3. コードを保存（Ctrl / Cmd + S）

---

### 2. Script Properties を先に設定する（重要）

初回実行前に、必ず Script Properties を設定してください。

1. 左側メニュー「⚙ プロジェクトの設定」
2. 「スクリプト プロパティ」欄で以下を追加：
   - `SPREADSHEET_ID`
   - `NOTIFY_EMAIL`
   - `CINII_APP_ID`
   - （必要に応じて他の設定値）

※ 未設定のまま実行すると、エラーで停止します（仕様です）。

---

### 3. 初回実行（installTriggers）

1. エディタ上部の関数選択プルダウンから  
   **`installTriggers`** を選択
2. ▶（実行）ボタンをクリック

---

### 4. 権限承認（ここが一番つまずきやすい）

初回実行時、以下のダイアログが表示されます。

#### 手順

1. 「承認が必要です」というダイアログ → **続行**
2. Googleアカウントを選択
3. 「このアプリは Google によって確認されていません」と表示された場合：
   - 「詳細」をクリック
   - 「（プロジェクト名）に移動」をクリック
4. 権限一覧を確認し、「許可」

#### 承認される主な権限
- 外部サービスへのアクセス（CiNii API）
- Google スプレッドシートの読み書き
- メール送信（MailApp）
- トリガーの作成

※ これは **自分自身のスクリプト** なので、安全です。

---

### 5. トリガーが作成されたことを確認

1. 左メニュー「⏱ トリガー」を開く
2. 次の2つが存在すれば成功：

| 関数名 | 実行頻度 |
|---|---|
| `runBackfillDaily` | 毎日 |
| `runNewArrivalsWeekly` | 週1回 |

※ ここでトリガーが見えない場合、`installTriggers` を再実行してください。

---

### 6. 動作確認（任意・推奨）

#### 深掘り（毎日処理）の確認
- 関数：`runBackfillDaily`
- 手動実行 → スプレッドシートに行が追加されるか確認

#### 新着通知（週1処理）の確認
- 関数：`runNewArrivalsWeekly`
- 手動実行 → 新規があればメールが届く

※ 深掘りはデフォルトではメール通知しません  
（`SEND_BACKFILL_EMAIL=true` にすると通知されます）

---

## よくあるトラブルと対処

### メールが届かない
- `SEND_BACKFILL_EMAIL` が `false` ではないか確認
- 実行した関数が `runBackfillDaily` ではないか確認
- 迷惑メールフォルダを確認

### エラーが出る
- Script Properties の必須項目が未設定
- CiNii AppID が間違っている
- 実行ログ（`表示 → ログ`）を確認

---

## 初回セットアップはここまで

- 権限承認は **最初の1回だけ**
- 以降はすべて自動実行
- スクリプトを触らなくても、論文は静かに蓄積されていきます


## Configuration
（Script Properties の表）

## Notes on CiNii Usage
- This script uses the official CiNii OpenSearch API.
- No HTML scraping is performed.

## License
MIT License