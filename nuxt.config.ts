// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: [
    '@bloggrify/core',
  ],
  css: [
    '~/assets/css/theme.css'
  ],
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
  nitro: {
    logLevel: 4, // より詳細なログ
  },
  // 詳細なログを有効化
  vite: {
    logLevel: 'info',
  },
})
