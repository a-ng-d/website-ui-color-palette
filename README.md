# UI Color Palette — website

Source of [ui-color-palette.com](https://ui-color-palette.com): a static site built with [Astro](https://astro.build) and deployed on Netlify. It replaces the Figma Sites version.

## Design guidelines

The design intent, tokens, component choices, layout patterns, motion system and the
checklist for new pages are documented as a Claude Code skill in
[`.claude/skills/ui-color-palette-corpo-website`](.claude/skills/ui-color-palette-corpo-website/SKILL.md). Read it before
adding or migrating a page.

## Getting started

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # type-check (astro check) + static build in dist/
npm run preview  # serve dist/ locally
npm run format   # Prettier
```

Node 24 (see `.nvmrc`).

## Structure

```
src/
├── assets/          # images and SVGs, optimised at build time
├── components/
│   ├── home/        # sections of the home page
│   ├── layout/      # Header, Footer
│   ├── seo/         # <Seo>: title, description, canonical, Open Graph, JSON-LD
│   └── ui/          # Button, Tag, ShadeGrid
├── config/site.ts   # site metadata, navigation and every external link
├── content/blog/    # blog posts (Markdown / MDX)
├── data/            # FAQ, platforms, schema.org builders
├── layouts/         # BaseLayout
├── pages/           # routes, plus robots.txt and llms.txt endpoints
└── styles/          # tokens.css (design tokens), global.css
docs/migration/      # inventory of the Figma Sites version
```

## Design tokens

Colours, spacing, radii and motion come from [`@unoff/ui`](https://www.npmjs.com/package/@unoff/ui), using the Yelbolt UICP modes, enabled by `data-theme="yelbolt"` and `data-mode="yelbolt-uicp-light"` on `<html>`.

`src/styles/tokens.css` imports the @unoff/ui stylesheets, adds the large marketing typography (Martian Mono and Lexend, self-hosted), and maps each Figma role to an @unoff/ui variable (`--site-surface`, `--site-ink`, `--button-primary-background`…). Components use these variables only, never raw colours.

@unoff/ui ships every platform theme (Figma, Penpot, Sketch, Framer) and every Yelbolt brand mode. `postcss.config.mjs` drops the rules that target another theme or mode at build time, keeping `yelbolt` and `yelbolt-uicp-light` / `yelbolt-uicp-dark` (home page CSS: ~42 → ~22 KB gzip). Add a mode to `KEEP_MODES` before using it.

### @unoff/ui components

@unoff/ui is rendered at build time through Preact (`compat`), so it ships no JavaScript. Import one component at a time from `@unoff-dist/…` (the package barrel would pull the CSS of the whole library):

```ts
import Chip from '@unoff-dist/components/tags/chip/Chip.js'
```

| Need                  | Use                                                                                               | Why                                                                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Badge (“New”)         | `<Chip>` component                                                                                | Renders static HTML                                                                                                                |
| Text link (tertiary)  | `<TertiaryLink>`: `<Button type="tertiary">` inside an `<a>`                                      | Team choice. Known trade-off: two tab stops per link (`<a>` then `<button>`); click, Enter and Space navigate (tested in Chromium) |
| Action button or link | `src/components/ui/Button.astro` (`.text-button` classes)                                         | `<Button>` renders a `<button>` that navigates in JS; `isLink` nests an `<a target="_blank">` in a `<button>`                      |
| Clickable card        | `.card` class on an `<a>`                                                                         | The `<Card>` component is a `div` with a click handler                                                                             |
| Illustration frame    | `.thumbnail` class                                                                                | The `<Thumbnail>` component shows a spinner until JS runs                                                                          |
| FAQ                   | native `<details>`                                                                                | The `<Accordion>` component does not render collapsed content: invisible to crawlers                                               |
| Icons                 | `@lucide/astro` (`import X from '@lucide/astro/icons/x'`); brand logos stay in `src/assets/icons` | The @unoff/ui icon stylesheet weighs ~69 KB gzip; Lucide has no brand logos (LinkedIn, platforms)                                  |

`<Button>` imports `<Icon>`, whose stylesheet embeds every icon (~69 KB gzip). The site uses no @unoff/ui icon, so `astro.config.mjs` swaps that stylesheet for an empty file; remove the alias before using `<Icon>` or the `icon` prop.

Sizes are adapted to the website by overriding the component variables in `tokens.css` (`--button-large-height`, `--card-width`, `--chip-height`…), never the component CSS.

## SEO and GEO

- Each page passes its own `title`, `description` and `jsonLd` to `BaseLayout`; `<Seo>` renders the canonical URL, Open Graph and Twitter tags.
- URLs keep the paths of the Figma Sites version, without a trailing slash (`trailingSlash: 'never'`, `build.format: 'file'`).
- `sitemap-index.xml` is generated by `@astrojs/sitemap`.
- `robots.txt` and `llms.txt` are generated at build time from the site data, so they never drift from the pages.
- FAQ answers are plain HTML in the page (native `<details>`) and are reused in the `FAQPage` JSON-LD.

## Writing a blog post

Add a Markdown file in `src/content/blog/`. The file name becomes the URL (`/blog/<file-name>`).

```md
---
title: My article
description: 120–160 characters, used for the meta description and the card.
cover: ../../assets/blog/my-article.png
coverAlt: What the cover shows
pubDate: 2026-10-23
tags: [guide]
---
```

## Deployment

Netlify builds every push to `main` with the settings in `netlify.toml`, and creates a preview for every pull request.
