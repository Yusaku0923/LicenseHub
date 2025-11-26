export default defineAppConfig({
  site: {
    name: 'LicenceHub｜登録販売者の資格ガイド',
    email: 'contact@licencehub.jp',
    domain: 'https://licencehub.jp',
    author: 'LicenceHub編集部',
    publisher: 'LicenceHub',
    title: 'LicenceHub｜登録販売者の試験情報・勉強法・通信講座ガイド',
    description: 'LicenceHubは、登録販売者の試験情報・勉強法・通信講座比較・教材レビューをわかりやすく解説する専門メディアです。',
    ogTitle: 'LicenceHub｜登録販売者の資格ガイド',
    ogDescription: '登録販売者の試験対策・勉強法・教材比較を網羅。初学者でも理解しやすい情報を提供します。',
    ogUrl: 'https://licencehub.jp',
    ogType: 'website',
    ogLocale: 'ja_JP',
    ogSiteName: 'LicenceHub｜登録販売者の資格ガイド',
    ogImage: '/images/ogp/ogp_default.webp',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageType: 'image/webp',
    ogImageAlt: 'LicenceHub',
  },
  theme: 'custom',
  name: 'LicenceHub｜登録販売者の資格ガイド',
  language: 'ja',
  description: 'LicenceHub is a platform for medical license navigation',
  menu: [
    { name: '受験対策', path: '/licenses/tohan/exam' },
    { name: '教材比較', path: '/licenses/tohan/materials' },
    { name: '仕事・転職', path: '/licenses/tohan/work' },
    { name: '記事一覧', path: '/licenses/tohan/articles' },
  ],
  socials: {
    github: '',
    twitter: '',
    linkedin: '',
    instagram: '',
    youtube: '',
    mastodon: '',
    bluesky: '',
    facebook: ''
  },
  // theme: 'neo-minimalist',
  logo: '/images/logo.svg',
  favicon: '/favicon.ico',

  robots: [
    {
      UserAgent: '*',
      Allow: ['/'],
    },
  ],

  analytics: {
    providers: [
      {
        provider: 'google',     // GA4連携
        code: 'G-L4M0DCYZYK'      // ← ご自身の測定ID
      }
    ]
  }
})
