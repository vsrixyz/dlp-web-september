# De La Practica

Marketing site for De La Practica — digital accessibility for travel and tourism.

Built with [Astro](https://astro.build/) on the
[Accessible Astro Starter](https://accessible-astro.incluud.dev/).

## Getting started

```bash
npm install
npm run dev
```

## Available commands

| Command | Action |
| :------ | :----- |
| `npm run dev` | Start the local dev server |
| `npm run build` | Build the production site |
| `npm run preview` | Preview the production build locally |

## Project notes

- Site metadata, brand colors, and navigation live in `theme.config.ts`.
- Brand colors seed the whole palette through `oklch(from …)` in
  `src/assets/scss/base/_root.scss`. Changing a seed changes every derived step,
  so re-check contrast after any change.
- `src/pages/accessibility.astro` is the public accessibility statement. It
  deliberately claims no conformance level. Update it when the site changes.

## Before launch

- The contact form posts to a static page and will not deliver until
  `formAction` in `src/pages/contact.astro` points at a real form handler.
