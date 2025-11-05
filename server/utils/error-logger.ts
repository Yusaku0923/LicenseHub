export function logContentError(error: any, context: string) {
  if (error.statusCode === 404) {
    console.error(`[${context}] 404 Error Details:`)
    console.error(`  Message: ${error.message || error.statusMessage}`)
    if (error.data?.query) {
      console.error(`  Query:`, JSON.stringify(error.data.query, null, 2))
    }
    if (error.data?.description) {
      console.error(`  Description: ${error.data.description}`)
    }
    console.error(`  Stack:`, error.stack)
  } else {
    console.error(`[${context}] Error:`, error)
    if (error.data) {
      console.error(`  Data:`, JSON.stringify(error.data, null, 2))
    }
  }
}

