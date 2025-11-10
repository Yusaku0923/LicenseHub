# 🚀 LicenceHub（登録販売者）ローンチ TODO

> v1 リリースまでの全タスク。進捗管理は `[ ]` → `[x]` で更新。

---

## ✅ 1. 情報設計・構造

- [x] サイト構造を確定（/、/licenses/tohan/、カテゴリ3種）
- [x] 汎用ページ（運営者情報・プライバシー）追加
- [x] 免責ページ追加
- [x] お問い合わせページ追加
- [x] URL/スラッグ命名ルールの統一
- [x] 記事配置ルール（exam/materials/work ディレクトリ）

---
## 📝 2. コンテンツ制作（ローンチ必須＋準備中）
---

## 📘 試験・概要（exam）

- [x] 登録販売者とは？仕事内容・資格概要をわかりやすく解説  
  `content/licenses/tohan/what-is.md`
- [x] 登録販売者試験の概要と出題範囲｜受験資格・実施要項まとめ  
  `content/licenses/tohan/exam/overview.md`
- [x] 登録販売者試験はいつ？年度別試験日程と申込スケジュール  
  `content/licenses/tohan/exam/schedule/index.md`
- [x] 登録販売者試験の難易度と合格率｜都道府県別データ比較  
  `content/licenses/tohan/exam/pass-rate.md`
- [x] 登録販売者の勉強法まとめ｜独学と通信講座どちらが合格しやすい？  
  `content/licenses/tohan/exam/how-to-study.md`

---

## 📗 教材・通信講座（materials）

- [x] 登録販売者向け通信講座3校比較｜三幸・SMART・オンスクを徹底レビュー  
  `content/licenses/tohan/materials/compare.md`
- [x] 三幸医療カレッジの口コミ・評判まとめ｜サポート・料金・合格率を徹底解説  
  `content/licenses/tohan/materials/sanko.md`
- [x] SMART合格講座の特徴・口コミまとめ｜スマホ完結で効率学習  
  `content/licenses/tohan/materials/smart.md`
- [x] オンスク.JPの評判・使い方まとめ｜月額1628円の資格学習サービス  
  `content/licenses/tohan/materials/onsuku.md`  

---

## 📙 仕事・キャリア（work）

- [x] 登録販売者の仕事内容とは？ドラッグストア・調剤薬局での役割を解説  
  `content/licenses/tohan/work/detail.md`
- [x] 登録販売者の年収・キャリアアップ実態｜昇給・転職のリアル  
  `content/licenses/tohan/work/salary.md`
- [x] 登録販売者からキャリアアップするには？資格活用・ダブルライセンス戦略  
  `content/licenses/tohan/work/career.md`

---

## 📄 共通・補助ページ（common）

- [ ] 運営者情報（LicenceHub 編集部）  
  `content/about.md` (既存ファイルを更新)
- [x] プライバシーポリシー  
  `content/privacy.md`
- [x] 免責事項  
  `content/disclaimer.md`  

---

### 画像・メタデータ関連

* [ ] 各記事のアイキャッチ画像 `/public/images/licenses/tohan/...` へ配置
* [ ] OGP共通画像生成（hero背景と統一）
* [ ] カバー画像命名規則統一（例：`exam-overview.jpg`）
* [ ] frontmatter keywords / tags の統一見直し

---

## 💻 3. フロント実装（Nuxt）

### Home ページ
- [x] Hero（ブランドラベル＋2ボタン）
- [x] クイックリンク（3カテゴリ）
- [x] 新着記事カード（全体リンク化）
- [x] 画像ホバー時のみズーム（影なし）- 実装済み（group-hover:scale-[1.02]）
- [x] カテゴリ別カードを新着と同スタイルに統一 - 実装済み
- [ ] スマホ〜PCでのレスポンシブ最終確認

### 記事ページ
- [x] `ArticleHeader`（タイトル・日付・タグ）整備
- [x] `ArticleToc`（目次）挙動確認
- [x] パンくず（`MistralBreadcrumbs`）確認
- [ ] 本文スタイル微調整（見出し・リスト・引用など）

### 共通部
- [x] `MistralSidebar` タグ表示確認
- [x] `MistralHeader` に LicenceHub ロゴ反映
- [x] グローバルナビ（Exam / Materials / Work）
- [x] `MistralFooter` コピーライト＆リンク修正

---

## 🔍 4. SEO・インデックス

- [x] robots.txt 設定（本番: index / ステージング: noindex）- nuxt.config.ts で設定済み
- [x] sitemap.xml 生成（公開記事のみ）- @nuxtjs/sitemap モジュールで設定済み
- [x] draft:true → noindex 除外 plugin（必要なら）- sitemap は公開記事のみを含む設定
- [ ] サイト全体の meta / OGP 設定
- [ ] OGP画像作成（共通1枚）
- [ ] Google Search Console 登録

---

## 💰 5. 収益導線・解析

### アクセス解析
- [ ] GA4 or 代替ツール導入
- [ ] SPA 遷移対応のイベント確認

### AdSense
- [ ] コード設置（承認済みなら）
- [ ] 自動広告 or 手動広告の方針決定
- [ ] 表示崩れ確認

### ASP
- [x] 三幸医療カレッジ導線（AffiliateBanner配置）- MistralSidebar で実装済み
- [ ] SMART合格講座導線 - 未実装
- [x] オンスク.JP 導線 - MistralSidebar で実装済み
- [x] nofollow / sponsored 属性確認 - AffiliateBanner に設定済み

---

## ⚙️ 6. パフォーマンス・品質

- [ ] Lighthouse 計測（CLS/FCP/LCP/TBT）
- [x] 画像の width/height 明示 - home.vue で実装済み（width="360" height="192"）
- [ ] 404 ページ確認
- [ ] スマホ・タブレット・PC 動作確認

---

## 🌐 7. インフラ・運用

- [ ] 本番ドメイン設定（DNS / www リダイレクト）
- [ ] Cloudflare Pages ビルド確認
- [ ] 環境変数・ビルド設定
- [ ] content/ バックアップ運用メモ
- [ ] 記事追加〜デプロイ手順ドキュメント化

---

## 🧭 8. ローンチ直前チェック

- [x] トップから全導線が遷移可能（Exam / Materials / Work）
- [x] 各カテゴリに最低1本の記事あり
- [x] プライバシーページ公開済み
- [x] 免責ページ公開済み
- [ ] GA4 / AdSense 動作確認
- [ ] Search Console エラーなし
- [ ] レイアウト崩れなし

---

## 📦 リリース後（翌週対応）

- [ ] PV・クリック率の初期データ取得
- [ ] 内部リンク・関連記事補強
- [ ] 追加記事構想リスト作成（検索ボリューム基準）
