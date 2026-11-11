# De La Practica

Marketing site for De La Practica — digital accessibility for travel and tourism.
Live at <https://delapractica.com>.

It is a static site built with [Astro](https://astro.build/), started from the
[Accessible Astro Starter](https://accessible-astro.incluud.dev/). There is no
CMS and no database: every word on the site lives in the `.astro` files under
`src/pages/`, so editing copy means editing those files.

## Getting started

You need Node 22.12 or newer (`.nvmrc` pins `v22.12.0`; run `nvm use` if you use nvm).

```bash
npm install
npm run dev        # http://localhost:4321
```

| Command | What it does |
| :------ | :----------- |
| `npm run dev` | Start the local dev server with live reload (`npm start` is the same) |
| `npm run build` | Build the production site into `dist/` |
| `npm run preview` | Serve the built `dist/` locally to check it before deploying |
| `npm run deploy` | Build, then publish `dist/` to Cloudflare with Wrangler |
| `npx eslint .` | Lint (config in `eslint.config.js`, includes strict accessibility rules for `.astro` files) |
| `npx prettier --write src` | Format (config in `.prettierrc`) |

## Pages

Each file in `src/pages/` is one URL. All of them wrap their content in
`DefaultLayout` and most start with a `PageHeader` (title and subtitle band).

| URL | File | What's on it |
| :-- | :--- | :----------- |
| `/` | `index.astro` | Home. Hero, the Travel Oregon trust bar, the case for accessibility (audience size, federal deadline), the "How we work" tabs, the capabilities accordion, design-team and coaching cards, and a closing call to action. The tab and accordion content are the `approach` and `capabilities` arrays at the top of the file. |
| `/about` | `about.astro` | Founder bio (Jen Macias De La Parra), the Travel Oregon "Ask An Expert" callout, and the hero photo (`src/assets/img/hero.jpeg`). |
| `/contact` | `contact.astro` | "Book a call" card. The button goes to an external Fantastical booking page set by `bookingUrl` at the top of the file. There is no contact form. |
| `/accessibility` | `accessibility.astro` | The public accessibility statement, linked from the footer. It deliberately claims no WCAG conformance level. Keep it true when the site changes. Its "last updated" date comes from the file's last git commit (see [Gotchas](#gotchas)). The contact address is `accessibilityEmail` at the top of the file. |
| `/thank-you` | `thank-you.astro` | Confirmation page left over from an earlier contact form. Nothing links to it now. It is marked `noindex` and kept out of the sitemap (`astro.config.mjs`). Delete it or reuse it. |
| (any missing URL) | `404.astro` | Not-found page. Cloudflare serves it for unknown paths (`not_found_handling` in `wrangler.jsonc`). |

To add a page, create `src/pages/your-page.astro` (copy `about.astro` as a
starting point), then add it to the navigation in `theme.config.ts` if it should
appear in the menu.

## Where things live

```
theme.config.ts            Site name, SEO defaults, brand colors, navigation menu
astro.config.mjs           Astro setup: site URL, integrations, sitemap, import aliases
wrangler.jsonc             Cloudflare deployment config
src/
  pages/                   One file per URL (see above)
  layouts/
    DefaultLayout.astro    The <html> shell used by every page: <head>, SEO/social tags,
                           font preloads, header, <main>, footer
  components/
    Header.astro           Skip link, navigation, and the preferences launcher
    Navigation.astro       Desktop and mobile menus (+ ResponsiveToggle for the mobile button)
    NavigationItems.astro  Menu links plus the dark mode and high contrast toggle buttons
    LauncherConfig.astro   The launcher panel: dark mode, high contrast, reduced motion toggles
    Logo.astro             Logo in the header
    PageHeader.astro       Title/subtitle band at the top of inner pages
    Footer.astro           Footer text, page links, copyright, accessibility statement link
  assets/
    img/                   Images processed by Astro (logo, hero photo, social preview image)
    scss/                  Global styles (see below)
  styles/tailwind.css      Tailwind entry point
  utils/defineThemeConfig.ts  Types and defaults for theme.config.ts
public/                    Copied as-is: favicon, fonts, robots.txt, social preview image
```

Most UI pieces (`Heading`, `Link`, `Tabs`, `Accordion`, `Notification`, and so
on) are imported from the
[`accessible-astro-components`](https://accessible-astro.incluud.dev/) package,
not from this repo. Their docs are the reference for what props they take.
Icons come from [Lucide](https://lucide.dev/icons/) via `astro-icon`, written as
`<Icon name="lucide:calendar" />`.

### Common edits

- **Change copy.** Edit the page file in `src/pages/`. The footer blurb is in
  `src/components/Footer.astro`.
- **Change the menu.** Edit `navigation.items` in `theme.config.ts`. The header,
  the mobile menu, the launcher, and the footer's page list all read from it.
- **Change the site title, description, or social preview.** Edit `seo` in
  `theme.config.ts`. Individual pages override the title and description
  through the `title` and `description` props they pass to `DefaultLayout`.
- **Change the booking link.** Edit `bookingUrl` in `src/pages/contact.astro`.
- **Change email addresses.** `hola@delapractica.com` is written directly into
  `404.astro` and `thank-you.astro`. `a11y@delapractica.com` is in
  `accessibility.astro`.

## Styles

There are three layers of styling. Knowing which one to reach for saves time.

1. **Global SCSS: `src/assets/scss/`.** `index.scss` pulls in the partials in
   `base/`:
   - `_root.scss` holds all the **design tokens**: CSS custom properties for
     colors, light/dark theme, font families, the fluid type scale
     (`--font-size-*`), spacing (`--space-*`), radii, shadows, and the
     **high-contrast overrides**. Start here for any site-wide look change.
   - `_font.scss` has the `@font-face` rules and heading sizes. The typefaces are
     **Fraunces** (h1/h2 only) and **Atkinson Hyperlegible Next** (everything
     else). Both are self-hosted in `public/fonts/` under the SIL Open Font
     License.
   - `_general.scss` has body, link, and button styles. `_utility.scss` has helper
     classes such as `.container`, `.narrow`, and `.space-content`.
     `_breakpoint.scss` has the breakpoint map and `breakpoint()` mixin.
     `_mixins.scss`, `_reset.scss`, `_list.scss`, and `_kbd.scss` hold small
     supporting rules.
2. **Tailwind utility classes** (Tailwind v4, entry point
   `src/styles/tailwind.css`) are used inline in the markup for layout and
   spacing, e.g. `class="my-24 grid gap-6 md:grid-cols-2"`. The `dark:` variant
   is wired to the `.darkmode` class, not the OS setting.
3. **Component-scoped `<style>` blocks** at the bottom of individual pages and
   components (`index.astro`, `contact.astro`, `about.astro`, `Footer.astro`,
   `Navigation.astro`, and others) hold one-off styles that only apply to that
   file.

Both the SCSS and the scoped styles should use the tokens (e.g.
`var(--link-color)`, `var(--space-m)`) rather than hard-coded values, so dark
mode and high contrast keep working.

### Colors

The four brand seeds are set in `theme.config.ts` (`colors`) and injected as
`--brand-*` variables by `DefaultLayout.astro`:

| Seed | Value | Used for |
| :--- | :---- | :------- |
| primary | `#2b4bd4` cobalt | Links, buttons, footer background |
| secondary | `#cc9034` ochre | Dark-mode links, footer links |
| outline | `#ee9c86` salmon | Focus indicators only |
| neutral | `#8a8a8a` | Not used for colors any more. The grey ramp in `_root.scss` is plain grey on purpose |

`_root.scss` derives ramps from the seeds with `oklch(from …)`
(`--color-primary-100` … `-600`, and so on). Changing a seed changes every step
derived from it, so **re-check color contrast after changing any brand color**,
in light mode, dark mode, and high contrast, including the footer, which paints
its own dark background and restates its colors in `Footer.astro`.

### Dark mode and high contrast

Visitors switch these with the toggle buttons in the menu (`NavigationItems.astro`)
or from the launcher. The toggles add `.darkmode` and `.high-contrast` classes to
`<html>`. The site starts in light mode (`initialMode="light"`). Theme
colors are written with `light-dark()` in `_root.scss`, and the `.darkmode` and
`.high-contrast` blocks at the bottom of that file hold the overrides. If you
add a new color token, give it both a light and a dark value, and decide whether
high contrast needs to override it.

## Deployment

The site deploys to **Cloudflare** as static assets (`wrangler.jsonc` points
Wrangler at `dist/`). `npm run deploy` builds and publishes. Wrangler needs to
be logged in to the Cloudflare account that owns the `de-la-practica` project
(`npx wrangler login`). The repo contains no CI workflow, so a deploy only
happens when someone runs it (unless Cloudflare is set up to build from the
repo on its side, which this repo doesn't show).

The production URL is set in two places. Update both if the domain changes:
`site` in `astro.config.mjs` (used for canonical URLs, social cards, and the
sitemap) and the `Sitemap:` line in `public/robots.txt`.

## Gotchas

- **The accessibility statement's date needs git history.** At build time,
  `accessibility.astro` runs `git log` to find when that file last changed.
  Without git it falls back to a hard-coded date in the same file. With a
  shallow clone (common in CI) the date may come out as the latest commit's
  date instead. Build from a full clone, or update the fallback date by hand.
- **Leftovers from the starter.** `astro.config.mjs` defines aliases
  (`@content`, `@post-images`, `@project-images`) for folders that don't exist,
  and `LauncherConfig.astro` has empty blog and project lists. They do nothing
  and can be removed.
- **Lint and format aren't clean yet.** `npx eslint .` reports one unused import
  in `astro.config.mjs`, and `npx prettier --check src` flags 8 files. Neither
  blocks the build.
