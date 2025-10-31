// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: [
    '@bloggrify/core',
    '@bloggrify/mistral',
  ],
  css: [
    '~/assets/css/theme.css'
  ],
  content: {
    markdown: {
      mdc: true, // MarkdownでVueコンポーネントを使えるようにする
    },
  },
  components: {
    global: true,
    dirs: [
      '~/components',            // ここに AffiliateBox.vue を置く
      // 必要なら '~/components/themes/mistral'
    ],
  },
})
