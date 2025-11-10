# 🎨 LicenceHub 記事表現ルール（v3 実装運用版）

> **目的：** 「初学者でも3分で理解できる × 専門性と信頼感を両立する」
> 記事テンプレートを安定量産するための執筆・装飾ガイド。

---

## 💡 強調体系の基本方針

> **「視覚的に整理された専門性」** を基準とする。
> スマホで3秒スキャンしても**要点が伝わる**ことを最優先にする。

---

## 🩶 強調表現の分類と使用基準

| 種類                 | 記法                                          | 用途                | 使用位置・頻度             |
| ------------------ | ------------------------------------------- | ----------------- | ------------------- |
| **太字（semantic）**   | `**用語・数値**`                                 | 専門用語・数値・定義・比較指標など | 各章で2〜4回まで（全体2〜4％以内） |
| **ハイライト（summary）** | `<span class="inline-highlight">文全体</span>` | 章末や要点を明示する一文      | 各章1回（最大2）           |
| **インライン引用**        | `> 引用文`                                     | 受講者の声・外部コメント・一次情報 | 各章最大2回              |
| **補足強調**           | `<mark>文中強調</mark>`                         | 注意喚起・限定条件・例外など    | 全文で2〜3箇所以内          |
| **箇条書き強調**         | `- **ポイント名：** 内容`                           | 長文説明を整理           | 各章1セットまで            |
| **引用ボックス**         | `<blockquote>`                              | 声・まとめ・編集部コメント     | 章内1回まで（多用禁止）        |

---

## 🧭 構造パターン

### 1️⃣ 各章の基本構成

```text
## 見出しタイトル
（章リード：1文 50〜80字以内）
本文1〜2段落（太字活用）
→ 補足または引用（blockquote）
→ <span class="inline-highlight">章末サマリー文</span>
```

### 2️⃣ 強調バランスの原則

* **リード → 太字 → ハイライト** の三段構造で理解を補強。
* ハイライトは本文の「結論」に限定。
* リード文にはハイライト禁止（情報が散漫になるため）。

---

## 🧱 装飾ルール：デザイン体系

### ✅ inline-highlight（要点）

```css
.inline-highlight {
  background-color: rgba(34, 156, 142, 0.08);
  padding: 0.15em 0.3em;
  border-radius: 0.3em;
  font-weight: 500;
}
```

> 背景はブランドの**ターコイズ（#229C8E）系**を淡く使用。
> 明度を上げることで落ち着いた信頼感を維持。

---

### ✅ blockquote（引用・まとめ）

用途：受講者の声、編集部メモ、章末まとめ

```css
.article-body blockquote {
  position: relative;
  margin: 1.5rem 0;
  padding: 1.25rem 1.5rem;
  border-radius: 0.75rem;
  background: #ffffff;
  border: 2px solid transparent;
  background-image:
    linear-gradient(#ffffff, #ffffff),
    linear-gradient(135deg, var(--brand), #74d1c6);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  font-style: normal;
}
.article-body blockquote::before,
.article-body blockquote::after {
  content: none !important;
}
```

#### 用途別ルール

| 用途        | 中身                              | 補足                     |
| --------- | ------------------------------- | ---------------------- |
| **受講者の声** | 実際のコメント＋出典リンク                   | 上に「### 実際の受講者の声」見出しを置く |
| **編集部メモ** | `<blockquote>`内に短文＋LicenceHub視点 | セクション末尾に配置             |
| **章末まとめ** | 要点1〜2文＋inline-highlight併用       | 最後の段落直前に配置             |

---

### ✅ 補足（mark）

```css
mark {
  background: rgba(255, 237, 130, 0.5);
  border-radius: 0.2em;
  padding: 0 0.2em;
}
```

> 注意点・例外条件など、文中のスポット強調に使用。

---

## 📘 実例（通信講座比較記事より）

### Before

> 「動画が丁寧でわかりやすい」「質問対応が早く、独学では続かなかった勉強が進んだ」

### After

> <blockquote>  
> 「動画が丁寧でわかりやすい」「質問対応が早く、独学では続かなかった勉強が進んだ」  
> </blockquote>  
> <span class="inline-highlight">初心者でも安心して続けられるサポート体制が魅力です。</span>

---

## 🧮 構成チェックリスト（Lint対応）

* [ ] 各章に 1 ハイライトあり
* [ ] 太字比率 2〜4％
* [ ] リード文 50〜80字
* [ ] meta description 80〜120字
* [ ] blockquote の使用は 1章あたり1回まで
* [ ] CTA（AffiliateBanner/Links）が適切位置に配置
* [ ] 日付・価格情報が最新

---

## 🧭 目的再定義

| 軸        | 意図                  |
| -------- | ------------------- |
| **即理解**  | 強調構造で視線誘導を最適化       |
| **信頼性**  | 医療・教育分野に適した落ち着きと明快さ |
| **統一性**  | 記事ごとの差異を最小化してSEO強化  |
| **再利用性** | 自動生成テンプレートへの展開を容易化  |

---

## 🪄 保存推奨パス

```
/docs/writing-guidelines/licencehub-style-v3.md
```

> または `.cursor/rules/licencehub-style-v3.md` に配置すれば
> Cursor で「style: licencehub」を即参照可能。
