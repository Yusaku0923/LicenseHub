export default defineAppConfig({
  theme: 'mistral',
  name: 'MedLicenseNavi',
  description: 'MedLicenseNavi is a platform for medical license navigation',
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
  authors: [
    {
        username: 'hugo',
        default: true,
        name: 'Hugo Lassiège',
        description:
            'Main maintainer of Bloggrify',
        avatar: '/images/avatar.jpeg',
        socials: {
            twitter: 'https://twitter.com/hugolassiege',
            twitter_username: 'hugolassiege',
            mastodon: 'https://piaille.fr/@hugolassiege',
            youtube: 'https://youtube.com/@eventuallycoding',
            linkedin: 'https://www.linkedin.com/in/hugolassiege/',
            // facebook: 'https://facebook.com',
            // instagram: 'https://instagram.com',
            github: 'https://github.com/hlassiege',
        },
    },
  ],

  robots: [
    {
      UserAgent: '*',
      Allow: ['/'],
    },
  ],
})
