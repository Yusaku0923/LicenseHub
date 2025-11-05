export default defineNitroPlugin((nitroApp) => {
  // エラーハンドリング
  nitroApp.hooks.hook('error', (error: any, { event }: any) => {
    const path = event?.path || event?.url?.pathname || 'unknown'
    
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

