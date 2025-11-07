export default defineAppConfig({
  theme: 'mistral',
  name: 'LicenseHub',
  description: 'LicenseHub is a platform for medical license navigation',
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
  logo: '/images/logo.webp',
  favicon: '/favicon.ico',

  robots: [
    {
      UserAgent: '*',
      Allow: ['/'],
    },
  ],
})
