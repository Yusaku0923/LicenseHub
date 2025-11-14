import { readdir, readFile, stat } from 'fs/promises'
import { join, relative } from 'path'

interface FileInfo {
  path: string
  title: string
  isDirectory: boolean
  children?: FileInfo[]
}

/**
 * Markdownファイルのフロントマターからタイトルを抽出
 */
function extractTitle(content: string): string {
  // フロントマターのパターンにマッチ
  const frontMatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/)
  
  if (frontMatterMatch) {
    const frontMatter = frontMatterMatch[1]
    // title: の行を探す（クォート有無に対応）
    const titleMatch = frontMatter.match(/^title:\s*(.+)$/m)
    if (titleMatch) {
      // クォートを除去
      return titleMatch[1].replace(/^["']|["']$/g, '').trim()
    }
  }
  
  // フロントマターがない場合、最初の見出しを探す
  const headingMatch = content.match(/^#+\s+(.+)$/m)
  if (headingMatch) {
    return headingMatch[1].trim()
  }
  
  // タイトルが見つからない場合、ファイル名から推測
  return ''
}

/**
 * ディレクトリを再帰的に走査してファイル情報を収集
 */
async function scanDirectory(dirPath: string, basePath: string): Promise<FileInfo[]> {
  const items: FileInfo[] = []
  
  try {
    const entries = await readdir(dirPath)
    
    for (const entry of entries) {
      const fullPath = join(dirPath, entry)
      const relativePath = relative(basePath, fullPath)
      const stats = await stat(fullPath)
      
      if (stats.isDirectory()) {
        const children = await scanDirectory(fullPath, basePath)
        if (children.length > 0) {
          items.push({
            path: relativePath,
            title: entry,
            isDirectory: true,
            children
          })
        }
      } else if (entry.endsWith('.md')) {
        const content = await readFile(fullPath, 'utf-8')
        const title = extractTitle(content)
        
        if (title) {
          items.push({
            path: relativePath,
            title,
            isDirectory: false
          })
        }
      }
    }
  } catch (error) {
    console.error(`Error scanning ${dirPath}:`, error)
  }
  
  return items.sort((a, b) => {
    // ディレクトリを先に、その後ファイル名でソート
    if (a.isDirectory !== b.isDirectory) {
      return a.isDirectory ? -1 : 1
    }
    return a.path.localeCompare(b.path)
  })
}

/**
 * ツリー構造を文字列として出力
 */
function formatTree(items: FileInfo[], prefix = '', isLast = true): string {
  let output = ''
  
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const isLastItem = i === items.length - 1
    const currentPrefix = prefix + (isLastItem ? '└─ ' : '├─ ')
    const nextPrefix = prefix + (isLastItem ? '   ' : '│  ')
    
    output += currentPrefix + item.title + '\n'
    
    if (item.isDirectory && item.children && item.children.length > 0) {
      output += formatTree(item.children, nextPrefix, isLastItem)
    }
  }
  
  return output
}

/**
 * メイン処理
 */
async function main() {
  const contentDir = join(process.cwd(), 'content')
  
  try {
    const items = await scanDirectory(contentDir, contentDir)
    const tree = formatTree(items)
    
    console.log('content/')
    console.log(tree)
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

main()
