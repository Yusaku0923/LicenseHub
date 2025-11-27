# チャートコンポーネント MDC 記法リファレンス

記事生成時に使用するチャートコンポーネントの MDC 記法リファレンスです。

## 基本構文

```markdown
::コンポーネント名{プロパティ 1="値 1" プロパティ 2='値 2'}
::
```

## 利用可能なコンポーネント

- `line-chart` - 折れ線グラフ
- `bar-chart` - 棒グラフ
- `doughnut-chart` - ドーナツチャート

## 共通プロパティ

| プロパティ | 必須 | 説明               | 形式                                       |
| ---------- | ---- | ------------------ | ------------------------------------------ |
| `title`    | 否   | チャートのタイトル | 文字列（例: `title="週間セッション推移"`） |
| `labels`   | 否   | X 軸のラベル       | JSON 配列文字列（シングルクォートで囲む）  |
| `datasets` | 否   | データセット       | JSON 配列文字列（シングルクォートで囲む）  |

## LineChart（折れ線グラフ）

### 基本例

```markdown
::line-chart{title="週間セッション推移" labels='["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]' datasets='[{"label":"PV","data":[12,18,9,22,15,19,25],"borderColor":"#2563eb","backgroundColor":"#2563eb20","tension":0.35}]'}
::
```

### 複数データセット

```markdown
::line-chart{title="得点推移" labels='["1 回目","2 回目","3 回目","4 回目","5 回目"]' datasets='[{"label":"平均点","data":[48,56,61,68,74],"borderColor":"#2563eb","backgroundColor":"#2563eb20","tension":0.35},{"label":"目標ライン","data":[60,60,60,60,60],"borderColor":"#f59e0b","backgroundColor":"#f59e0b20","tension":0.35}]'}
::
```

### datasets のプロパティ

- `label`: データセット名（文字列）
- `data`: データ配列（数値配列）
- `borderColor`: 線の色（カラーコード）
- `backgroundColor`: 塗りつぶしの色（カラーコード、透明度付き推奨）
- `tension`: 曲線の滑らかさ（0-1、0.35 がデフォルト）

## BarChart（棒グラフ）

### 基本例

```markdown
::bar-chart{title="都道府県別比較" labels='["北海道","東京","大阪","福岡"]' datasets='[{"label":"受験者数","data":[120,240,180,140],"backgroundColor":"#2563eb"}]'}
::
```

### 複数データセット

```markdown
::bar-chart{title="都道府県別比較" labels='["北海道","東京","大阪","福岡"]' datasets='[{"label":"受験者数","data":[120,240,180,140],"backgroundColor":"#2563eb"},{"label":"合格者数","data":[72,150,110,90],"backgroundColor":"#10b981"}]'}
::
```

### datasets のプロパティ

- `label`: データセット名（文字列）
- `data`: データ配列（数値配列）
- `backgroundColor`: 棒の色（カラーコード）

## DoughnutChart（ドーナツチャート）

### 基本例

```markdown
::doughnut-chart{title="セクション構成" labels='["法規","薬理","実務","生薬"]' datasets='[{"label":"配分","data":[25,35,30,10],"backgroundColor":["#2563eb","#10b981","#f59e0b","#ef4444"]}]'}
::
```

### datasets のプロパティ

- `label`: データセット名（文字列）
- `data`: データ配列（数値配列）
- `backgroundColor`: 各セグメントの色（カラーコードの配列）

## カラーパレット

よく使用されるカラーコード：

- `#2563eb` - 青
- `#10b981` - 緑
- `#f59e0b` - オレンジ
- `#ef4444` - 赤
- `#8b5cf6` - 紫
- `#06b6d4` - シアン

透明度付き（`backgroundColor` 用）:

- `#2563eb20` - 青（20% 透明度）
- `#10b98120` - 緑（20% 透明度）

## 重要な注意事項

1. **JSON 文字列はシングルクォートで囲む**: `labels='[...]'` のようにシングルクォートを使用
2. **プロパティ間はスペースで区切る**: `title="..." labels='...'` のようにスペースで区切る
3. **配列の要素数**: `labels` と `datasets[].data` の要素数は一致させる
4. **DoughnutChart の backgroundColor**: 配列形式で各セグメントの色を指定

## 実例集

### 時系列データ（LineChart）

```markdown
::line-chart{title="週間 PV 推移" labels='["月","火","水","木","金","土","日"]' datasets='[{"label":"PV","data":[120,180,90,220,150,190,250],"borderColor":"#2563eb","backgroundColor":"#2563eb20","tension":0.35}]'}
::
```

### カテゴリ比較（BarChart）

```markdown
::bar-chart{title="科目別配点" labels='["法規","薬理","実務","生薬"]' datasets='[{"label":"配点","data":[25,35,30,10],"backgroundColor":"#2563eb"}]'}
::
```

### 構成比（DoughnutChart）

```markdown
::doughnut-chart{title="学習時間の内訳" labels='["基礎","応用","実践","復習"]' datasets='[{"label":"時間","data":[30,25,20,25],"backgroundColor":["#2563eb","#10b981","#f59e0b","#8b5cf6"]}]'}
::
```
