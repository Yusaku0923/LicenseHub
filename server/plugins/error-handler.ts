export default defineNitroPlugin((nitroApp) => {
  // エラーハンドリング
  nitroApp.hooks.hook('error', (error: any, { event }: any) => {
    const path = event?.path || event?.url?.pathname || 'unknown'
    const isDev = process.env.NODE_ENV === 'development'
    
    // .well-knownパスの404エラーは無視（Chrome DevToolsなどの自動リクエスト）
    if (error.statusCode === 404 && path.includes('.well-known')) {
      // ログに出力せずに無視
      return
    }
    
    if (error.statusCode === 404) {
      console.error('='.repeat(80))
      console.error('[404 ERROR] Document not found!')
      console.error(`  URL: ${path}`)
      console.error(`  Method: ${event?.method || 'unknown'}`)
      console.error(`  Message: ${error.message || error.statusMessage || 'Unknown error'}`)
      if (error.data) {
        console.error(`  Data:`, JSON.stringify(error.data, null, 2))
      }
      if (error.data?.query) {
        console.error(`  Query that caused 404:`, JSON.stringify(error.data.query, null, 2))
      }
      if (error.stack) {
        console.error(`  Stack (first 10 lines):`)
        console.error(error.stack.split('\n').slice(0, 10).join('\n'))
      }
      console.error('='.repeat(80))
    } else if (error.statusCode === 500 && isDev) {
      // 500エラーの詳細を開発環境でのみ出力
      console.error('\n' + '='.repeat(80))
      console.error('[500 ERROR] Internal Server Error')
      console.error('='.repeat(80))
      console.error(`  URL: ${path}`)
      console.error(`  Method: ${event?.method || 'unknown'}`)
      console.error(`  Message: ${error.message || error.statusMessage || 'Unknown error'}`)
      console.error(`  Name: ${error.name || 'Error'}`)
      
      // スタックトレースからファイル情報を抽出
      if (error.stack) {
        console.error('\n  Stack Trace:')
        const stackLines = error.stack.split('\n')
        const relevantLines = stackLines
          .filter((line: string) => {
            // node_modulesやinternalを除外し、プロジェクトファイルのみ表示
            return !line.includes('node_modules') && 
                   !line.includes('internal/') &&
                   (line.includes('at ') || line.includes('Error:'))
          })
          .slice(0, 20)
        
        if (relevantLines.length > 0) {
          relevantLines.forEach((line: string, index: number) => {
            // ファイルパスと行番号を強調表示
            const fileMatch = line.match(/([^\/\\]+\.(vue|ts|js|tsx|jsx)):(\d+):(\d+)/)
            if (fileMatch) {
              const [, filename, , lineNum, colNum] = fileMatch
              console.error(`    ${index + 1}. ${filename}:${lineNum}:${colNum}`)
              console.error(`       ${line.trim()}`)
            } else {
              console.error(`    ${index + 1}. ${line.trim()}`)
            }
          })
        } else {
          // 関連する行が見つからない場合は、最初の20行を表示
          stackLines.slice(0, 20).forEach((line: string, index: number) => {
            console.error(`    ${index + 1}. ${line.trim()}`)
          })
        }
      }
      
      // エラーデータ
      if (error.data) {
        console.error('\n  Error Data:')
        console.error(JSON.stringify(error.data, null, 2))
      }
      
      // 原因
      if (error.cause) {
        console.error('\n  Cause:')
        console.error(error.cause)
      }
      
      // 元のエラーオブジェクトの詳細
      if (error.originalError) {
        console.error('\n  Original Error:')
        console.error(`    Message: ${error.originalError.message}`)
        if (error.originalError.stack) {
          const originalStack = error.originalError.stack.split('\n').slice(0, 10)
          originalStack.forEach((line: string) => {
            console.error(`    ${line.trim()}`)
          })
        }
      }
      
      console.error('='.repeat(80) + '\n')
    } else {
      console.error(`[ERROR] ${error.statusCode || 'UNKNOWN'}:`, error.message)
    }
  })
  
  // リクエストログ（開発時のみ）
  nitroApp.hooks.hook('request', (event: any) => {
    if (process.env.NODE_ENV === 'development') {
      const path = event?.path || event?.url?.pathname || 'unknown'
      const method = event?.method || 'GET'
      console.log(`[Request] ${method} ${path}`)
    }
  })
})

