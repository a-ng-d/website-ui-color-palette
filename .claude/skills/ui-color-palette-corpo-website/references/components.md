# Components

Rule of thumb: **reuse @unoff/ui for visuals, keep native HTML for behaviour.** A @unoff/ui
component is used as-is only when it renders correct static HTML; otherwise its classes and
variables are applied to native elements.

## Decision table

| Need | Use | Not |
| --- | --- | --- |
| Action button or button-styled link | `ui/Button.astro` (`variant` primary/secondary/tertiary/alternative, `size`, `block`, `iconOnly`, slot `icon` for a left icon) | @unoff/ui `<Button>`: renders a `<button>` that navigates in JS |
| Text link (header nav, footer lists, menu) | `ui/TertiaryLink.astro` (@unoff/ui `<Button type="tertiary">` inside an `<a>`) — team choice | — |
| Badge "New" | @unoff/ui `<Chip>` from `@unoff-dist/components/tags/chip/Chip.js` | — |
| Outlined pill label ("News", "Try for free", hero news) | `ui/Tag.astro` (`size` small/large) | Chip (too small) |
| Clickable card | `<a class="… card">` (@unoff/ui `.card` class) | @unoff/ui `<Card>`: a `div` with a click handler |
| Static content card | `.surface-card` | — |
| Illustration frame | `.thumbnail` + `.illustration-grid` classes | @unoff/ui `<Thumbnail>`: spinner until JS runs |
| FAQ / disclosure | native `<details name="…">` + `<summary>`; toggle styled with `.icon-button` classes on a `<span>` | @unoff/ui `<Accordion>`: no collapsed content in HTML, pulls the whole library CSS; a `<button>` inside `<summary>` blocks opening |
| Dropdown menu | `<details>` + `<summary class="text-button text-button--tertiary …">` + `text-button__caret` | @unoff/ui `<Menu>` (JS-only) |
| Icon | `@lucide/astro/icons/<name>` (currentColor, auto aria-hidden) | @unoff/ui `<Icon>` (icon CSS is stubbed) |
| Brand logo (LinkedIn, platforms) | SVG in `src/assets/icons` or `src/assets/platforms` | — |
| Framed shade grid with content tiles | `ui/ShadeGrid.astro` | — |

Import @unoff/ui components one by one from `@unoff-dist/…` (the package barrel pulls every
component's CSS). They render at build time through Preact compat and ship no JS unless a
`client:*` directive is added — avoid hydration on this site.

## Site components

### `Button.astro`
Single `<a>` (with `href`) or `<button>`, classes `text-button text-button--{variant}
text-button--{size}`. External links get `target="_blank" rel="noopener"`. No right icon
(the referential does not support it). Link hover/active states come from
`styles/unoff-links.css`.

### `TertiaryLink.astro`
`<a><Button type="tertiary" label /></a>`. Known trade-off: two tab stops per link
(`<a>` then `<button>`); click, Enter and Space navigate. Contains a `<div>`: **never place it
inside a `<p>`** (the parser closes the paragraph and breaks the layout) — use a `<div>`.

### `Tag.astro`
Outlined pill, `size="small|large"`, optional `as="p"`, slot `start` for an icon.

### `ShadeGrid.astro`
Props: `wave` (`{ src, inset }` — Figma wave SVG used as the light mask + its bleed),
`cols`, `rows`, `areas` (`{ name, colStart, colSpan, rowStart, rowSpan }`), `class`.
Each area is a named slot. Draws only the outer ring of tiles; on mobile keeps the top and
bottom rows. Includes the light (`.shade-grid__glow` / `__light`) and the cursor spotlight.
Tune row height per instance with `--shade-row-min` on the class passed in.

### Cards in practice
- Content card: `<li class="… surface-card">` or `<article class="… card">`.
- Whole-card link with an inner title link: put `::after` on the title link to cover the
  card (`LatestPosts.astro`), keep the visual "Read more" as a non-interactive span with
  button classes (`aria-hidden`).
- Title card: soft border, `--site-surface` background, content at the bottom
  (`justify-content: flex-end`), optional `transform: rotate(1deg)`.
- Sticky intro container: see layout-patterns.md.

## Header and footer

- Header: logo, `mainNav` as TertiaryLinks, Resources `<details>` opening a full-width
  panel of square link cards (`resourcesNav` with `description` and `badge`), theme toggle
  (`.icon-button` with Lucide sun/moon), "Go to app" primary Button. Mobile: Menu button
  (JS) collapses the links; without JS links stay visible.
- Footer: 4 columns (`footerNav`) of TertiaryLinks with Chip badges, "Support us" card,
  brand card with the logotype (left-aligned, ratio kept via
  `preserveAspectRatio="xMinYMid meet"`) and the legal row (a `<div>`, not a `<p>`).

## Data, not hardcoded copy

- Links and nav: `src/config/site.ts` (`links`, `mainNav`, `resourcesNav`, `footerNav`).
- Platforms: `src/data/platforms.ts` (name, href, pun, logo, tile colour, tilt, shards).
- FAQ: `src/data/faq.ts` (answers are trusted HTML, reused in FAQPage JSON-LD and llms.txt).
- Blog: `src/content/blog/*.md` (content collection, schema in `src/content.config.ts`).

## Assets from Figma

Download with the URLs returned by `get_design_context`, give readable names, then:
- run SVGO (`npx svgo -p 1`) — Figma shards were 600 KB each;
- replace hardcoded `fill`/`stroke`/`style="fill:…"` with `currentColor` (two-tone: inverse
  token for the light part), remove `preserveAspectRatio="none"` and `style="display:block"`;
- prefer `<Image>` from `astro:assets` for PNGs (WebP, sizes);
- decorative SVG used as a mask (shards, wave): keep as files, reference with `mask-image`.
