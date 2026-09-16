import { defineThemeConfig } from '@utils/defineThemeConfig'
import previewImage from '@assets/img/social-preview-image.png'
import logoImage from '@assets/img/logo.svg'

export default defineThemeConfig({
  name: 'De La Practica',
  id: 'de-la-practica',
  seo: {
    title: 'De La Practica',
    description: 'De La Practica is a lightweight accessible content site with room to grow.',
    image: previewImage,
  },
  logo: logoImage,
  colors: {
    primary: '#d648ff',
    secondary: '#00d1b7',
    neutral: '#b9bec4',
    outline: '#ff4500',
  },
  navigation: {
    darkmode: true,
    items: [
      {
              type: 'link',
              label: 'Home',
              href: '/',
            },
      {
              type: 'link',
              label: 'About',
              href: '/about',
            },
      {
              type: 'link',
              label: 'Contact',
              href: '/contact',
            }
    ],
  },
  socials: [],
})
