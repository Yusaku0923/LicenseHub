const adsenseId = process.env.NUXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-5447172429378250'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://licencehub.jp',
      adsenseClient: adsenseId,
    },
  },
  app: {
    head: {
      meta: [
        {
          name: 'google-adsense-account',
          content: adsenseId,
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      ],
      __dangerouslyDisableSanitizersByTagID: {
        'gtag2': ['innerHTML'],
        'website-jsonld': ['innerHTML'],
      },
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
      {
        path: '~/components',
        pathPrefix: false,
      },
    ],
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@nuxtjs/sitemap',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxtjs/robots',
    '@nuxt/content',
    '@nuxtjs/mdc',
    ['@nuxtjs/google-adsense', {
      id: adsenseId,
      pageLevelAds: false,
      analyticsUacct: process.env.NUXT_PUBLIC_ANALYTICS_UACCT,
      analyticsDomainName: process.env.NUXT_PUBLIC_ANALYTICS_DOMAIN,
    }],
  ],
  sitemap: {
    // サイトマップ設定が必要な場合はここに追加
  },
  image: {
    format: ['webp'],
    provider: 'none',
  },
  nitro: {
    routeRules: {
      '/**': { headers: { 'Cache-Control': 'public, max-age=0, must-revalidate' } },
    },
  },
  robots: {
    rules: [{ UserAgent: '*', Disallow: '' }],
    sitemap: 'https://licencehub.jp/sitemap.xml',
  }
})
 // Force restart for component scan
