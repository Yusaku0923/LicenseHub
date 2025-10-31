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
})
