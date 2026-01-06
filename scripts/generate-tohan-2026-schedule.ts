import { mkdir, readFile, writeFile, access } from 'fs/promises'
import { join } from 'path'

type BlockKey =
  | 'hokkaido-tohoku'
  | 'kanto'
  | 'chubu'
  | 'kinki'
  | 'chugoku'
  | 'shikoku'
  | 'kyushu-okinawa'

type BlockMeta = {
  label: string
  examTiming: string
  examWeekday: string
  applyTiming: string
  applyLength: '短い' | '標準' | '長め'
}

const BLOCKS: Record<BlockKey, BlockMeta> = {
  // content/licenses/tohan/exam/schedule/2026.md のブロック予想を要約して転用
  'hokkaido-tohoku': {
    label: '北海道・東北ブロック',
    examTiming: '8月下旬ごろ（例年の傾向）',
    examWeekday: '平日開催が多い',
    applyTiming: '5〜7月ごろ（県により前後）',
    applyLength: '標準'
  },
  kanto: {
    label: '関東（首都圏）ブロック',
    examTiming: '9月上旬〜中旬ごろ（例年の傾向）',
    examWeekday: '日曜日開催が多い',
    applyTiming: '6月中旬〜7月上旬ごろ（県により前後）',
    applyLength: '短い'
  },
  chubu: {
    label: '中部ブロック',
    examTiming: '8月下旬〜9月上旬ごろ（例年の傾向）',
    examWeekday: '平日開催が多い',
    applyTiming: '6月下旬〜7月下旬ごろ（県により前後）',
    applyLength: '標準'
  },
  kinki: {
    label: '近畿・徳島（関西広域連合）ブロック',
    examTiming: '8月下旬ごろ（例年の傾向）',
    examWeekday: '土日（週末）開催が多い',
    applyTiming: '6月上旬〜7月上旬ごろ（県により前後）',
    applyLength: '短い'
  },
  chugoku: {
    label: '中国（中四国）ブロック',
    examTiming: '10月中〜下旬ごろ（例年の傾向）',
    examWeekday: '平日開催が多い',
    applyTiming: '7月中旬〜下旬ごろ（県により前後）',
    applyLength: '短い'
  },
  shikoku: {
    label: '四国（徳島除くは中四国）ブロック',
    examTiming: '10月中〜下旬ごろ（例年の傾向）',
    examWeekday: '平日開催が多い',
    applyTiming: '7月中旬〜下旬ごろ（県により前後）',
    applyLength: '短い'
  },
  'kyushu-okinawa': {
    label: '九州・沖縄ブロック',
    examTiming: '12月中旬〜下旬ごろ（例年の傾向）',
    examWeekday: '日曜日開催が多い',
    applyTiming: '8月下旬〜9月上旬ごろ（県により前後）',
    applyLength: '短い'
  }
}

const REGION_BY_SLUG: Record<string, BlockKey> = {
  hokkaido: 'hokkaido-tohoku',
  aomori: 'hokkaido-tohoku',
  iwate: 'hokkaido-tohoku',
  miyagi: 'hokkaido-tohoku',
  akita: 'hokkaido-tohoku',
  yamagata: 'hokkaido-tohoku',
  fukushima: 'hokkaido-tohoku',

  ibaraki: 'kanto',
  tochigi: 'kanto',
  gunma: 'kanto',
  saitama: 'kanto',
  chiba: 'kanto',
  tokyo: 'kanto',
  kanagawa: 'kanto',

  niigata: 'chubu',
  toyama: 'chubu',
  ishikawa: 'chubu',
  fukui: 'chubu',
  yamanashi: 'chubu',
  nagano: 'chubu',
  gifu: 'chubu',
  shizuoka: 'chubu',
  aichi: 'chubu',
  mie: 'chubu',

  shiga: 'kinki',
  kyoto: 'kinki',
  osaka: 'kinki',
  hyogo: 'kinki',
  nara: 'kinki',
  wakayama: 'kinki',
  tokushima: 'kinki',

  tottori: 'chugoku',
  shimane: 'chugoku',
  okayama: 'chugoku',
  hiroshima: 'chugoku',
  yamaguchi: 'chugoku',

  kagawa: 'shikoku',
  ehime: 'shikoku',
  kochi: 'shikoku',

  fukuoka: 'kyushu-okinawa',
  saga: 'kyushu-okinawa',
  nagasaki: 'kyushu-okinawa',
  kumamoto: 'kyushu-okinawa',
  oita: 'kyushu-okinawa',
  miyazaki: 'kyushu-okinawa',
  kagoshima: 'kyushu-okinawa',
  okinawa: 'kyushu-okinawa'
}

const HIGH_SCALE = new Set([
  'tokyo',
  'kanagawa',
  'osaka',
  'aichi',
  'fukuoka',
  'saitama',
  'chiba',
  'hyogo'
])

const LOW_SCALE = new Set([
  'tottori',
  'shimane',
  'tokushima',
  'kochi'
])

function ymdInTokyo(date = new Date()): string {
  return date.toLocaleDateString('sv-SE', { timeZone: 'Asia/Tokyo' })
}

async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

function pickScale(slug: string): string {
  if (HIGH_SCALE.has(slug)) return '多い（傾向）'
  if (LOW_SCALE.has(slug)) return '少ない（傾向）'
  return '普通（暫定）'
}

function inferApplication(content: string): {
  method: string
  photo: string
  extras: string[]
} {
  const extras: string[] = []
  const hasNet = /インターネット|オンライン|WEB|Web|電子申請/.test(content)
  const hasPost = /郵送/.test(content)
  const hasWindow = /窓口/.test(content)
  const hasTicketDownload = /受験票.*(ダウンロード|DL)/.test(content)

  let method = '要項で確認（例年は郵送またはオンラインのいずれか）'
  if (hasNet && hasPost) method = 'インターネット申請＋郵送（併用の可能性あり）'
  else if (hasNet) method = 'インターネット申請が中心（例年）'
  else if (hasPost && hasWindow) method = '郵送または窓口提出（例年）'
  else if (hasPost) method = '郵送提出（例年）'

  const photo = hasNet
    ? '顔写真データ：必要（例年）'
    : '顔写真：必要（写真貼付など、要項で確認）'

  if (hasTicketDownload) extras.push('受験票のダウンロード等が必要になる年があります')
  if (/必着/.test(content)) extras.push('締切「必着」指定の年があるため要注意です')
  if (/簡易書留|書留/.test(content)) extras.push('郵送は簡易書留等が推奨される年があります')

  return { method, photo, extras }
}

function extractLocalNotes(content: string): string[] {
  // frontmatter（--- ... ---）の混入を防ぐため、本文のみで解析する
  const bodyOnly = content.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '')

  // まずは「試験会場と当日の注意点」セクションの箇条書きを優先抽出
  const sectionMatch = bodyOnly.match(
    /##\s*試験会場[^\n]*\n([\s\S]*?)(?:\n##\s|\n---\n|$)/
  )
  const section = sectionMatch?.[1] ?? ''

  const bullets = (section.match(/^\s*-\s+.+$/gm) ?? [])
    .map((s) => s.replace(/^\s*-\s+/, '').trim())
    .filter(Boolean)
    .filter((b) => !/^(title|description|category|tags|date|listed|toc|draft)\s*:/.test(b))

  const picked = bullets
    .filter((b) => /会場|分散|集中|中心|市内|混雑|交通|移動|離島|山間|駐車|バス|駅|空港|宿泊|札幌|那覇/.test(b))
    .slice(0, 3)

  if (picked.length >= 1) return picked

  // 箇条書きが拾えない場合は、セクション本文から「会場が中心/集中」等の文を拾う
  const sectionLines = (section.match(/^.+$/gm) ?? []).map((l) => l.trim())
  const sectionFallback = sectionLines
    .filter((l) => /会場/.test(l))
    .filter((l) => /中心|集中|分散|市内|那覇|札幌|混雑|交通|移動|離島|山間/.test(l))
    .slice(0, 2)
    .map((l) =>
      l
        .replace(/\s+/g, ' ')
        .replace(/<[^>]+>/g, '')
        .replace(/\*\*/g, '')
        .trim()
    )

  if (sectionFallback.length >= 1) return sectionFallback

  // セクションが弱い場合は全文から特徴ワードで拾う（保険）
  const fallbackLines = (bodyOnly.match(/^.+$/gm) ?? [])
    .map((l) => l.trim())
    .filter((l) => l.length >= 8)
    .filter((l) => !/^(title|description|category|tags|date|listed|toc|draft)\s*:/.test(l))

  const fallback = fallbackLines
    .filter((l) => /離島|山間|豪雪|渋滞|混雑|会場|移動時間/.test(l))
    .slice(0, 2)

  return fallback.length ? fallback : ['会場の場所・当日の移動動線は早めに確認しましょう（要項で確定）']
}

function oneLineCharacter(block: BlockMeta, slug: string): string {
  if (slug === 'okinawa') return '離島移動が絡む受験者も多く、移動計画が合否以前の重要ポイントになりやすい地域です。'
  if (slug === 'hokkaido') return '広域移動になりやすいため、会場の確定後は交通・宿泊も含めて逆算すると安心です。'
  if (HIGH_SCALE.has(slug)) return '受験者が多く、会場が分散・混雑しやすい地域です。'
  if (block.label.includes('中四国')) return '会場は主要都市に寄りやすく、当日の移動時間を見込むと安心です。'
  return '会場の集中／分散は年度で変わるため、要項と受験票で確実に確認するのが大切です。'
}

function renderMarkdown(opts: {
  pref: string
  slug: string
  block: BlockMeta
  today: string
  confirmYm: string
  scale: string
  application: ReturnType<typeof inferApplication>
  localNotes: string[]
}): string {
  const { pref, slug, block, today, confirmYm, scale, application, localNotes } = opts

  const title = `【${pref}】登録販売者試験 2026年の日程予想と申込情報まとめ`
  const description = `2026年に${pref}で登録販売者試験を受験予定の方へ。現時点で公表されている情報と過去の傾向をもとに、試験日程・申込期間の目安、${pref}特有の注意点、今から準備すべきことを整理して解説します。`

  const localBullets = localNotes.map((n) => `* ${n}`).join('\n')
  const extraBullets = application.extras.map((x) => `* ${x}`).join('\n')
  const extrasBlock = application.extras.length ? `\n${extraBullets}\n` : ''

  const scaleNote =
    scale.includes('暫定')
      ? '（※受験者数の公式統計が見つからない場合の暫定整理です。要項や過去の公表情報で後日更新します）'
      : ''

  // tokyo 2026 と同じ骨格（YMYL安全スタンス＋更新前提）
  return `---\n` +
    `title: "${title}"\n` +
    `description: "${description}"\n` +
    `category: "exam"\n` +
    `tags: ["登録販売者","試験日程","${pref}","試験概要","よくある質問"]\n` +
    `date: ${today}\n` +
    `listed: true\n` +
    `toc: true\n` +
    `draft: false\n` +
    `---\n\n` +
    `# ${title}\n\n` +
    `2026年に**${pref}で登録販売者試験を受けたい**と考えている方に向けて、本ページでは「まず最初に確認すべき情報」を整理しています。\n` +
    `公式発表がまだ出そろっていない段階でも、**分かっていること／分かっていないことを明確に切り分ける**ことで、安心して受験判断ができる状態を作ることが目的です。\n\n` +
    `---\n\n` +
    `## ${pref}の登録販売者試験とは\n\n` +
    `登録販売者試験は、都道府県ごとに実施主体・日程・運営方法が異なります。\n` +
    `${pref}は「${block.label}」の実施パターンに沿う年が多く、例年は**${block.examTiming}**を目安に動くと計画が立てやすいです。\n\n` +
    `* 受験者数の規模感：**${scale}**${scaleNote}\n` +
    `* 試験の実施回数：**原則 年1回**（年度により変更の可能性あり）\n` +
    `* 実施主体：**${pref}（都道府県）**\n` +
    `* 申込方法：**${application.method}**\n` +
    `\n` +
    `<p>\n` +
    `  <span class="inline-highlight">${oneLineCharacter(block, slug)}</span>\n` +
    `</p>\n\n` +
    `---\n\n` +
    `## 2026年 ${pref}の試験日程はいつ？\n\n` +
    `### 現時点で分かっていること\n\n` +
    `2026年試験について、**${pref}からの正式な日程発表はまだ行われていません**（※${confirmYm}時点）。\n` +
    `そのため、本ページでは**過去数年の実施傾向**をもとに、目安となる時期を整理します。\n\n` +
    `### 過去の実施時期から見る傾向\n\n` +
    `${pref}の登録販売者試験は、例年、\n\n` +
    `* **${block.examTiming}** に実施される傾向\n` +
    `* **${block.examWeekday}**\n\n` +
    `という整理がしやすい地域です。\n\n` +
    `<mark>※これはあくまで過去傾向であり、2026年の正式日程を保証するものではありません。</mark>\n\n` +
    `<p>\n` +
    `  <span class="inline-highlight">2026年は「${block.examTiming}」を目安に、公式発表が出たら即時で確認できる状態にしておくのが安全です。</span>\n` +
    `</p>\n\n` +
    `---\n\n` +
    `## 申込期間・申込方法の目安（${pref}）\n\n` +
    `### 申込期間の目安\n\n` +
    `例年の傾向では、\n\n` +
    `* **${block.applyTiming}** に申込受付\n` +
    `* 受付期間の長さ：**${block.applyLength}**\n\n` +
    `となるケースが多く見られます（年度により前後）。\n\n` +
    `### 申込方法の特徴\n\n` +
    `* 原則：**${application.method}**\n` +
    `* ${application.photo}\n` +
    `* 期限後の申込は原則不可（要項で確認）\n` +
    `${extrasBlock}` +
    `\n` +
    `<p>\n` +
    `  <span class="inline-highlight">申込は「開始日」と同じくらい「締切」が重要です。締切条件（必着/消印有効など）は必ず要項で確認しましょう。</span>\n` +
    `</p>\n\n` +
    `---\n\n` +
    `## ${pref}ならではの注意点\n\n` +
    `${pref}で受験する場合、他県と比べて意識しておきたい点があります。\n\n` +
    `${localBullets}\n\n` +
    `「この県で受けるなら、これだけは知っておいてほしい」という観点で、会場確定後に**移動時間・交通事情・当日の動線**まで含めて準備しておくと安心です。\n\n` +
    `<p>\n` +
    `  <span class="inline-highlight">会場の最終確定は受験票や要項で行われるため、発表後は「場所→ルート→当日行動」の順に潰すのが確実です。</span>\n` +
    `</p>\n\n` +
    `---\n\n` +
    `## 2026年試験に向けて今から何をすべきか\n\n` +
    `### 情報面でやるべきこと\n\n` +
    `* ${pref}（都道府県の保健福祉/薬務系ページ等）の**公式情報を定期的に確認**する\n` +
    `* 2025年（前年）の要項や案内は、**申込〜試験までの流れ把握**に役立つ\n` +
    `* 「要項公開→申込→受験票→本試験」の順で、やることをチェックリスト化する\n\n` +
    `### 学習面での考え方\n\n` +
    `登録販売者試験は出題範囲が広く、**短期集中では負担が大きくなりやすい試験**です。\n` +
    `2026年受験であれば、今から基礎理解を進めておくことで、直前期の負担を大きく減らせます。\n\n` +
    `<p>\n` +
    `  <span class="inline-highlight">学習は全国共通の範囲です。早期着手で「申込〜本番」期間をアウトプット中心にできます。</span>\n` +
    `</p>\n\n` +
    `---\n\n` +
    `## 未発表情報との向き合い方\n\n` +
    `2026年試験については、今後、\n\n` +
    `* 正式な試験日\n` +
    `* 申込開始日・締切日\n` +
    `* 会場詳細\n\n` +
    `などが順次発表されます。\n\n` +
    `本ページでは、**未発表の内容を無理に断定せず**、\n` +
    `公式発表が出次第、最新情報へ更新される前提で整理しています。\n\n` +
    `<p>\n` +
    `  <span class="inline-highlight">「今は判断できる材料だけを使う」ことが、受験準備では最も安全な考え方です。</span>\n` +
    `</p>\n\n` +
    `---\n\n` +
    `## まとめ｜${pref}で登録販売者試験を受ける方へ\n\n` +
    `* 2026年試験の正式日程は**未発表**（※${confirmYm}時点）\n` +
    `* 例年傾向では**${block.examTiming}**が目安（${block.examWeekday}）\n` +
    `* 申込は**${block.applyTiming}**が目安で、期間は**${block.applyLength}**になりやすい\n` +
    `* ${pref}特有の事情として、**会場・移動の対策**を早めに組み込むのが重要\n\n` +
    `本ページを起点に、今後の公式発表とあわせて情報を整理しながら、落ち着いて準備を進めていきましょう。\n`
}

async function main() {
  const root = process.cwd()
  const scheduleIndexPath = join(
    root,
    'content',
    'licenses',
    'tohan',
    'exam',
    'schedule',
    'index.md'
  )
  const sourceDir = join(root, 'content', 'licenses', 'tohan', 'exam', 'schedule')
  const outDir = join(sourceDir, '2026')

  const today = ymdInTokyo()
  const confirmYm = today.slice(0, 7)

  const indexMd = await readFile(scheduleIndexPath, 'utf-8')
  const rows = Array.from(
    indexMd.matchAll(
      /\|\s*([^|]+?)\s*\|\s*\[試験日程を見る\]\(\/licenses\/tohan\/exam\/schedule\/([a-z-]+)\)\s*\|/g
    )
  )

  const prefectures = rows
    .map((m) => ({ pref: m[1].trim(), slug: m[2].trim() }))
    .filter((x) => x.slug !== 'index')

  if (prefectures.length < 40) {
    throw new Error(
      `都道府県一覧の抽出に失敗しました（抽出件数: ${prefectures.length}）。schedule/index.md の表記を確認してください。`
    )
  }

  await mkdir(outDir, { recursive: true })

  const skipped: string[] = []
  const generated: string[] = []

  const args = process.argv.slice(2)
  const force = args.includes('--force')

  for (const { pref, slug } of prefectures) {
    const outPath = join(outDir, `${slug}.md`)
    // tokyo はベースファイル（手書き）として扱い、常に上書きしない
    if (slug === 'tokyo') {
      skipped.push(slug)
      continue
    }
    if (!force && (await fileExists(outPath))) {
      skipped.push(slug)
      continue
    }

    const blockKey = REGION_BY_SLUG[slug]
    const block = blockKey ? BLOCKS[blockKey] : BLOCKS.chubu

    const sourcePath = join(sourceDir, `${slug}.md`)
    const sourceExists = await fileExists(sourcePath)
    const sourceContent = sourceExists ? await readFile(sourcePath, 'utf-8') : ''

    const application = inferApplication(sourceContent)
    const localNotes = extractLocalNotes(sourceContent)
    const scale = pickScale(slug)

    const md = renderMarkdown({
      pref,
      slug,
      block,
      today,
      confirmYm,
      scale,
      application,
      localNotes
    })

    await writeFile(outPath, md, 'utf-8')
    generated.push(slug)
  }

  console.log(`Generated: ${generated.length}`)
  console.log(`Skipped (already exists): ${skipped.length}`)
  if (generated.length) console.log(`Generated slugs: ${generated.join(', ')}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})


