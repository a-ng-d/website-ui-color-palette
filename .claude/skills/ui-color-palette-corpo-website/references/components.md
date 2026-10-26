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

## Capability demos (`/capabilities`)

Illustrations of capability cards are **live mini use cases that copy the web app**:
one interactive element, one visible response, magnified. The UI is **not** rendered
with @unoff/ui components: it is a **copycat built from the library's own tokens and
icons** (the demo kit), so it matches the app exactly, ships no React or component CSS,
is never focusable, and can show any state on demand.

### The demo kit (`src/styles/demo-kit.css`, `components/capabilities/kit/`)

- **Tokens**: `scripts/unoff-tokens.mjs` extracts the Yelbolt component tokens of the
  @unoff/ui stylesheets (`--button-*`, `--chip-*`, `--knob-*`, `--semantic-message-*`,
  `--message-*`, `--text-*`…) into `src/styles/generated/unoff-tokens.css`, scoped to
  `.demo-kit` (the demo panel). It keeps **only the tokens mentioned** in the kit, the
  demo components and scripts, plus what they refer to (~300, ~3 KB gzip). Runs on
  `predev`/`prebuild`; run `npm run tokens` after using a new token or updating
  @unoff/ui. Never edit the generated files.
- **Platform themes** (platform pages): the same generator writes
  `generated/unoff-tokens-<figma|penpot|sketch|framer>.css`: the platform's
  component tokens under `[data-platform=<p>] .demo-kit`, plus the colours of
  its light mode (dark mode under `[data-mode=yelbolt-uicp-dark]`), `--global-*`
  included, and its font (Inter / Work Sans, self-hosted). The page imports its
  file and `MosaicSection platform="<p>"` sets `data-platform`; nothing else
  changes. So a demo stays theme-agnostic: read component tokens, `--text-*`,
  `--global-background-color-default` for surfaces and the kit alias
  `--k-panel-border` for borders — never a Yelbolt `--color-*` semantic
  variable (it would not follow the platform). Platform densities differ
  (Figma's small text is 12px): check the 3 platform demos on each page.
- **Icons: Lucide only** (the site's set), as `<XIcon class="k-icon" />` (16px, colour
  from the component). The app's icon set is not shipped: the generator only writes
  the spinner glyph (`generated/unoff-spinner.css`, `--icon-spinner`) for the reveal
  motion. Spinners inside demos are Lucide `loader-circle`.
- **No icon inside a chip.** Chips carry a short label only.
- **Components** (classes in demo-kit.css, markup helpers in `kit/`): `k-chip`,
  `k-color-chip`, `k-button` (primary/secondary/tertiary, `icon` = a Lucide component,
  `caret`), `k-icon-button`, `k-input` (static text, `data-placeholder`, `multiline`
  for a two-line textarea, caret when focused), `k-dropdown`, `k-slider` + `k-knob`,
  `k-bar` + `k-section-title` (panel header), `k-message` (SemanticMessage wrapping a
  Message: the semantic padding outside, the Message's side padding and gap inside
  `.k-message__body`; one icon per type, CSS shows the current one), and text styles
  `k-text--small|large|label|medium|bold|secondary|tertiary|truncated`.
- **Pattern** (as in @unoff/ui): each component resolves its state tokens into base
  variables (`--k-bg`, `--k-bd`, `--k-bw`, `--k-bo`, `--k-tx`, `--k-ic`); the structure
  only reads those. States: `data-state="hover|pressed|focus|selected|inactive|checked|
  disabled"`, the cursor's `[data-pressed]`, and the real `:hover` when the visitor drives.
- **Exactness**: values come from tokens only. A demo may override a *token* on a wrapper
  for readability (the choice chips use outlined inactive tokens, otherwise they look
  disabled), never a raw value. Typography in demos: kit text styles, no px sizes.
- **Don't copy the app's Lego layout tokens** (ColorItem, SimpleItem, Section paddings):
  they belong to how the app assembles panels; demo rows use simple flex/grid with
  `--space-gap-*`.
- **Gotcha**: never `calc()` with spacing tokens: `--space-none` is a unitless `0`, and
  `calc(0 + 16px)` is invalid, so the whole declaration drops. Nest elements instead
  (as `k-message` does), or use longhands.
- Labels next to colour cells (row names) are `k-text--truncated` with a gap before
  the cells, in a column wide enough for the usual names (ellipsis is a safeguard).
- New component to copy: read its stylesheet in `node_modules/@unoff/ui/dist/assets`
  (token names and structure), add the class to demo-kit.css with its tokens, add its
  stylesheet to `SOURCES` in the generator if new, then `npm run tokens`.

### Demo structure

- `capabilities/Demo.astro` maps a `DemoId` (`src/data/capabilities.ts`) to a demo
  component in `capabilities/demos/`.
- `capabilities/DemoStage.astro`: `figure.thumbnail.illustration-grid` with
  `data-demo`, `aria-hidden`, `inert`; the panel `[data-demo-panel].demo-kit` (app
  surface, `zoom` 1 → 1.25 → 1.5 by container query, own stacking context so the reveal
  cover passes over it) and the fake cursor `[data-demo-cursor]`. `width` prop: panel px
  before zoom (default 280; > 300 uses later zoom thresholds). Wide panels reflow on
  narrow stages with `@container (max-width: …)` rules in the demo (Sync, Wheel).
- Panels copy the app's screens: `kit/Bar.astro` header (section title, count,
  actions) then the body (`Section` padding), like `src/ui/contexts/*` in the app repo.
- A demo = a component + `src/scripts/demos/<name>.ts` exporting the **model** (pure
  functions, also imported by the component to render the first frame) and a
  `DemoFactory` registered in `scripts/demos/index.ts`. Scripts hook on `data-*`
  attributes only (`[data-knob]`, `[data-choice]`, `[data-option]`…).
- **Choice demos** (“pick an option, see the result”): `demos/ChoiceChips.astro` (kit
  chips with `data-choice`, `data-on`); put the result under a `[data-active]` element
  and switch it in CSS; the loop is `choiceLoop({ step })` from `scripts/demos/choices.ts`.
  Richer flows use `choiceChips(root)` for the chips only (ai, wheel, tokens). Chip rows
  stay **on one row**: keep labels short, check the fit at 1280 and 390.
- Shared models: `scripts/demos/palette.ts` (`shadesOf`, `steps`, `taper`, `gradientOf`);
  colour science in `color.ts` (OKLCH, HSL, CIE LCH, WCAG, APCA, OKLab perceived
  lightness, deuteranopia, protanomaly, tritanomaly, achromatopsia) — real numbers.

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
