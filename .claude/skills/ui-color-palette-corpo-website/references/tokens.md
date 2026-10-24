# Tokens

All values come from **@unoff/ui** (Yelbolt theme, UICP modes). `<html>` carries
`data-theme="yelbolt"` and `data-mode="yelbolt-uicp-light|dark"` (set before paint from the
saved choice or the system setting). Source: `src/styles/tokens.css`.

## Colour roles (use these first)

| Role | Variable | Maps to |
| --- | --- | --- |
| Page background | `--site-surface` | `--global-background-color-default` |
| Muted surface (grid groove bg, thumbnails) | `--site-surface-muted` | `--color-background-secondary-default` |
| Text | `--site-ink` | `--color-text-primary-default` |
| Strong border (content cards) | `--site-border-strong` | `--color-border-tertiary-strong` |
| Soft border (title cards, intros) | `--site-border-soft` | `--color-border-secondary-default` |

When a role is missing, use the semantic @unoff/ui variable directly
(`--color-{background|border|text|icon}-{primary|secondary|tertiary|brand|inverse|…}-{default|hover|…}`),
never a primitive `--uicp-*` (exception below) and never a hex value.

Already used for specific needs:
- Icons: `--color-icon-brand-default` (shards, spinner glow), `--color-icon-primary-default`
  (spinner), `--color-icon-inverse-default` (light glyph of two-tone platform icons).
- Illustration grid lines: `--color-border-tertiary-default`.
- Scan band: `--color-border-brand-strong` + `--color-icon-brand-default`.
- Buttons, chips, cards, thumbnails: their own @unoff/ui variables (`--button-*`,
  `--chip-*`, `--card-*`, `--thumbnail-*`).

### Allowed exceptions

- `--brand-gradient` / `--brand-gradient-loop`: the Figma "UICP GRD" colours
  (#ff0000, #ffb800, #24ff00, #00d1ff, #4200ff). Only under shade grids and in the
  spotlight. Also the light points in `.shade-grid__light`.
- Platform logo tiles: brand colours of each platform (`tile` in `src/data/platforms.ts`).
- Terminal snippets: `--snippet-*`, defined from UICP primitives (`--uicp-2/4/5/7/8`).

## Typography

Fonts are self-hosted (`@fontsource-variable`): `--font-display` = Martian Mono,
`--font-text` = Lexend. Use the utility classes, not ad-hoc sizes:

| Class | Figma style | Size | Font |
| --- | --- | --- | --- |
| `.t-main-title` | Main Title | 56px (fluid ≥36) | Martian Mono 700, 3px tracking |
| `.t-section-title` | Section Title | 40px (fluid ≥28) | Martian Mono 700, 2px |
| `.t-paragraph-primary-title` | Paragraph Primary Title | 32px (fluid ≥24) | Martian Mono 700, 2px |
| `.t-paragraph-secondary-title` | Paragraph Secondary Title | 24px | Martian Mono 700, 1px |
| `.t-accent` | Accent Text | 24px (fluid ≥18) | Lexend 500, 1px |
| `.t-tagline` | Tagline | 24px (fluid ≥18) | Lexend 500, 0.5px |
| (body) | Body Text | 16px / 24px | Lexend 500, 0.5px |

Heading level follows the document outline, not the visual size: a card title can be
`<h3 class="t-paragraph-primary-title">`.

## Spacing, radii, layout

- Gutter between cards: `--layout-gutter` (8px). Section spacing: `--layout-section-gap`
  (80px). Card padding: `--space-inset-800` (32px). Inner gaps: `--space-gap-400` (16px).
- Radii: `--site-radius-card` (16px), `--site-radius-inner` (8px, tiles/thumbnails),
  `--site-radius-pill` (buttons, tags).
- Readable text column: `--layout-content-max` (960px). Header height:
  `--layout-header-height` (sticky offset).
- Control sizes come from @unoff/ui: `--control-size-1200` (48px buttons),
  `--control-icon-600` (24px icons).

## Density overrides for @unoff/ui components

@unoff/ui is sized for plugin panels. `tokens.css` adapts it **only through its variables**,
in a block with selector `:root[data-theme='yelbolt'][data-mode]` — one attribute more than
the library's, because component stylesheets imported from JS load after `tokens.css`.
Add any new override there (button 48px/16px, card without padding, chip 24px, Lexend via
`--text-font-family`, etc.). Never edit or copy the component CSS.

## Dark mode

Everything flips through the semantic variables. Checks for new work:
- no hex or primitive in components (except the allowed list);
- SVG icons use `currentColor` (strip `fill`/`stroke`/`style` colours from Figma exports;
  two-tone icons use `--color-icon-inverse-default` for the light part);
- screenshot the page in both modes.

## CSS weight guardrails

- `postcss.config.mjs` removes @unoff/ui rules for other themes and modes. Before using a
  new mode, add it to `KEEP_MODES`.
- `astro.config.mjs` stubs the @unoff/ui icon stylesheet (~69 KB gzip). Using `<Icon>` or a
  Button `icon` prop requires removing that alias.
