import { readFile, readdir } from 'fs/promises'
import { join } from 'path'

type FrontMatter = Record<string, unknown>

function parseFrontMatter(md: string): { fm: FrontMatter; body: string } {
  const m = md.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/)
  if (!m) return { fm: {}, body: md }
  const raw = m[1]
  const body = m[2]

  const fm: FrontMatter = {}
  for (const line of raw.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const kv = trimmed.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/)
    if (!kv) continue
    const key = kv[1]
    let value = kv[2].trim()
    // "..." / '...' を外す（生成物の frontmatter は基本この形式）
    value = value.replace(/^"(.*)"$/s, '$1').replace(/^'(.*)'$/s, '$1')
    fm[key] = value
  }
  return { fm, body }
}

function parseTags(raw: unknown): string[] {
  if (typeof raw !== 'string') return []
  // tags: ["a","b"] 形式のみを想定（生成物の形式）
  const m = raw.match(/^\[(.*)\]$/)
  if (!m) return []
  const inside = m[1]
  return inside
    .split(',')
    .map((s) => s.trim())
    .map((s) => s.replace(/^["']|["']$/g, ''))
    .filter(Boolean)
}

function mustIncludeTags(tags: string[], pref: string): string[] {
  const must = ['登録販売者', '試験日程', '試験概要', 'よくある質問', pref]
  return must.filter((t) => !tags.includes(t))
}

function hasSection(body: string, heading: string): boolean {
  const re = new RegExp(`^##\\s+${heading}\\s*$`, 'm')
  return re.test(body)
}

function extractSection(body: string, heading: string): string {
  const re = new RegExp(`^##\\s+${heading}\\s*$`, 'm')
  const m = re.exec(body)
  if (!m) return ''
  const start = m.index + m[0].length
  const rest = body.slice(start)
  const next = rest.search(/^\s*##\s+/m)
  return next >= 0 ? rest.slice(0, next) : rest
}

function countBullets(md: string): number {
  return (md.match(/^\s*\*\s+/gm) ?? []).length
}

async function main() {
  const root = process.cwd()
  const dir = join(root, 'content', 'licenses', 'tohan', 'exam', 'schedule', '2026')
  const files = (await readdir(dir)).filter((f) => f.endsWith('.md')).sort()

  const requiredSections = [
    '都道府県の登録販売者試験とは',
    '2026年 都道府県の試験日程はいつ？',
    '申込期間・申込方法の目安（都道府県）',
    '都道府県ならではの注意点',
    '2026年試験に向けて今から何をすべきか',
    '未発表情報との向き合い方'
  ]

  const problems: Array<{ file: string; issues: string[] }> = []

  for (const file of files) {
    const full = join(dir, file)
    const md = await readFile(full, 'utf-8')
    const { fm, body } = parseFrontMatter(md)
    const issues: string[] = []

    const title = typeof fm.title === 'string' ? fm.title : ''
    const category = typeof fm.category === 'string' ? fm.category : ''
    const date = typeof fm.date === 'string' ? fm.date : ''
    const tags = parseTags(fm.tags)

    const prefMatch = title.match(/^【(.+?)】/)
    const pref = prefMatch?.[1] ?? ''

    if (!title.includes('2026')) issues.push('title に 2026 が含まれていません')
    if (!pref) issues.push('title から都道府県名（【】内）が取得できません')
    if (category !== 'exam') issues.push('category が exam ではありません')
    if (!date) issues.push('date がありません')

    if (pref) {
      const missTags = mustIncludeTags(tags, pref)
      if (missTags.length) issues.push(`tags 不足: ${missTags.join(', ')}`)
    }

    // セクション存在（県名が入る見出しは置換で確認）
    if (pref) {
      const sectionMap: Array<[string, string]> = [
        ['都道府県の登録販売者試験とは', `${pref}の登録販売者試験とは`],
        ['2026年 都道府県の試験日程はいつ？', `2026年 ${pref}の試験日程はいつ？`],
        ['申込期間・申込方法の目安（都道府県）', `申込期間・申込方法の目安（${pref}）`],
        ['都道府県ならではの注意点', `${pref}ならではの注意点`],
        ['2026年試験に向けて今から何をすべきか', '2026年試験に向けて今から何をすべきか'],
        ['未発表情報との向き合い方', '未発表情報との向き合い方']
      ]

      for (const [logical, actual] of sectionMap) {
        if (!hasSection(body, actual)) issues.push(`必須セクション不足: ${logical}（見出し: ${actual}）`)
      }

      // 実施主体（都道府県）の明示（箇条書きで「実施主体：」があること）
      if (!/^\s*\*\s*実施主体：/m.test(body)) issues.push('実施主体（都道府県）の明示がありません（「* 実施主体：」が必要）')

      // 未発表の確認年月
      if (!new RegExp(`未発表[\\s\\S]*?（※\\d{4}-\\d{2}時点）`).test(body)) {
        issues.push('未発表の確認年月（※YYYY-MM時点）が見つかりません')
      }

      // 県特有注意点の箇条書き数
      const local = extractSection(body, `${pref}ならではの注意点`)
      const localBullets = countBullets(local)
      if (localBullets < 1) issues.push('「県ならではの注意点」に箇条書きがありません（最低1つ）')
      if (/^\s*\*\s*(title|description|category|tags|date|listed|toc|draft)\s*:/m.test(local)) {
        issues.push('「県ならではの注意点」に frontmatter 由来の行（title/description等）が混入しています')
      }

      // まとめ（最低4点の箇条書き）
      const summaryHeading = `まとめ｜${pref}で登録販売者試験を受ける方へ`
      if (!hasSection(body, summaryHeading)) {
        issues.push(`まとめセクション不足（見出し: ${summaryHeading}）`)
      } else {
        const summary = extractSection(body, summaryHeading)
        const summaryBullets = countBullets(summary)
        if (summaryBullets < 4) issues.push(`まとめの箇条書きが4点未満です（現在: ${summaryBullets}）`)
      }
    } else {
      // prefが取れない場合は最低限の構造チェック
      for (const h of requiredSections) {
        if (!hasSection(body, h)) issues.push(`必須セクション不足: ${h}`)
      }
    }

    if (issues.length) problems.push({ file, issues })
  }

  if (!problems.length) {
    console.log(`OK: ${files.length} files`)
    return
  }

  console.log(`NG: ${problems.length}/${files.length} files`)
  for (const p of problems) {
    console.log(`\n- ${p.file}`)
    for (const i of p.issues) console.log(`  - ${i}`)
  }

  process.exit(2)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})


