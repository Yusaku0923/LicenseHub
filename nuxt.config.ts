const prerenderErrors: Array<{ route: string; error: unknown }> = []

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://licencehub.jp',
    },
  },
  app: {
    head: {
      __dangerouslyDisableSanitizersByTagID: {
        'gtag2': ['innerHTML']
      }
    },
  },
  extends: [
    '@bloggrify/core',
  ],
  css: ['@/assets/css/main.css'],
  content: {
    markdown: {
      mdc: true,
    },
  },
  components: {
    global: true,
    dirs: [
      '~/components',
    ],
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@nuxtjs/sitemap',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxtjs/robots',
  ],
  nitro: {
    routeRules: {
      '/_nuxt/**': { headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } },
      '/**': { headers: { 'Cache-Control': 'public, max-age=0, must-revalidate' } },
    },
    logLevel: 4, // より詳細なログ
    hooks: {
      'prerender:generate'() {
        prerenderErrors.length = 0
      },
      'prerender:fail'(ctx) {
        prerenderErrors.push({ route: ctx.route, error: ctx.error })
      },
      async close() {
        if (prerenderErrors.length === 0) {
          console.log('\n✅ Prerender summary: エラーは発生しませんでした。')
          return
        }

        console.error('\n❌ Prerender summary (エラー件数: ' + prerenderErrors.length + ')')
        prerenderErrors.forEach((entry, index) => {
          const message = entry.error instanceof Error ? entry.error.message : String(entry.error)
          console.error(`  [${index + 1}] ルート: ${entry.route}`)
          console.error(`       メッセージ: ${message}`)
          if (entry.error instanceof Error && entry.error.stack) {
            console.error('       詳細:')
            console.error(entry.error.stack.split('\n').slice(0, 5).join('\n'))
          }
        })
        console.error('========================================\n')
      },
    },
  },
  // 詳細なログを有効化
  image: {
    format: ['webp'],
  },
  robots: {
    rules: [{ UserAgent: '*', Disallow: '' }],
    sitemap: 'https://licencehub.jp/sitemap.xml',
  }
})
