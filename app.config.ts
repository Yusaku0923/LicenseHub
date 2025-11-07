export default defineAppConfig({
  theme: 'mistral',
  name: 'LicenseHub',
  description: 'LicenseHub is a platform for medical license navigation',
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
