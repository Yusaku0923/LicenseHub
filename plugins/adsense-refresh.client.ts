export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:finish', () => {
    // Wait briefly for DOM updates before refreshing ads
    setTimeout(() => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (error) {
        console.warn('ads refresh error', error)
      }
    }, 50)
  })
})
