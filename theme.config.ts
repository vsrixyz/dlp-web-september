import { defineThemeConfig } from '@utils/defineThemeConfig'
import previewImage from '@assets/img/social-preview-image.png'
import logoImage from '@assets/img/logo.svg'

export default defineThemeConfig({
  name: 'De La Practica',
  id: 'de-la-practica',
  seo: {
    title: 'De La Practica',
    description: 'Digital accessibility for travel and tourism. De La Practica helps destinations make websites, apps, booking engines, and visitor guides usable for all travelers.',
    author: 'Jen Macias De La Parra',
    image: previewImage,
  },
  logo: logoImage,
  colors: {
    // cobalt blue, the lead brand color
    primary: '#2b4bd4',
    // ochre, the warm counterpoint
    secondary: '#cc9034',
    // blush, tinting the neutral greys warm
    neutral: '#f3dede',
    // salmon, reserved for focus indicators
    outline: '#ee9c86',
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
