import { defineThemeConfig } from '@utils/defineThemeConfig'
import previewImage from '@assets/img/social-preview-image.png'
import logoImage from '@assets/img/logo.svg'

export default defineThemeConfig({
  name: 'De La Practica',
  id: 'de-la-practica',
  seo: {
    title: 'De La Practica',
    description: 'Digital accessibility for travel and tourism. De La Practica helps destinations make websites, apps, booking engines, and visitor guides usable by all.',
    author: 'Jen Macias De La Parra',
    image: previewImage,
    imageAlt: 'De La Practica — digital accessibility for travel and tourism. delapractica.com',
  },
  logo: logoImage,
  colors: {
    // cobalt blue, the lead brand color
    primary: '#2b4bd4',
    // ochre, the warm counterpoint
    secondary: '#cc9034',
    // neutral seed. The grey ramp in _root.scss is defined achromatically and
    // no longer derives from this value - it was a blush pink that tinted every
    // surface and all dark-mode text. Kept grey so nothing can reintroduce it.
    neutral: '#8a8a8a',
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
