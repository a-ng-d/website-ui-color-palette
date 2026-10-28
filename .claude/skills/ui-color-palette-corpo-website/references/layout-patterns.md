# Layout patterns

Every section is `<section class="section …" aria-labelledby="…">` (80px top padding,
8px side gutter) containing one CSS grid with an 8px gap. Breakpoints used across the site:
`1023.98px` (desktop → tablet), `799.98px` (header/menu, shade grid), `639.98px` (single
column), `479.98px` (small phones). Mobile first is not required; keep desktop rules and add
`max-width` overrides, as the existing components do.

## Patterns already built (reuse them)

| Pattern | Example | Grid |
| --- | --- | --- |
| **Hero in a shade grid** | `Jumbotron` | `ShadeGrid` 12 × 9, hero area cols 2–11 rows 2–4, demo area rows 5–8 |
| **Three feature cards + centred CTA** | `Summary` | 3 cols, cards min 520px, icon tile + title + accent text at the bottom; 1 col < 1024 |
| **Mosaic with a title card** | `Platforms` | 3 × 2, title card fixed at col 2 row 1 (rotated), link cards auto-placed; 2 cols < 1024 (title spans), 1 col < 640 |
| **Stacked sticky cards + sticky intro** | `ExtraTools` | `1fr 0.5fr`, intro on the right; cards sticky, stacking; 1 col < 1024 |
| **Sticky intro + content card** | `ui/IntroCardSection` (used by `Faq`, `platform/PlatformTable`) | `0.5fr 1fr`, intro on the left; `wide`: intro card on top, content card full width (tables) |
| **Title card + list of cards** | `LatestPosts` | 2 cols, rotated title card left, posts right (400px cards, cover + body) |
| **Gallery + pitch in a shade grid** | `Reinsurance` | 2 cols: auto-scrolling palette reels / `ShadeGrid` 8 × 6 with pitch and a 2-col button grid |
| **Footer mosaic** | `Footer` | 4 cols × 2 rows, wide cards span 2 |
| **Sticky intro left + stacked cards** | `ui/StackSection` (used by `capabilities/GenerateSection`, `platform/PlatformSetup`) | `600fr 656fr`, intro left, cards sticky and stacking, **all as tall as the tallest** (`grid-auto-rows: 1fr`) so a card always covers the one beneath; `ordered` renders an `<ol>` (one step = one card), `cardMinHeight` sets the floor (540px default); 1 col < 1024 |
| **Capability mosaic** | `capabilities/MosaicSection` | `columns` 2/3 (`tabletColumns` 1/2), rotated title card first, `FeatureCard`s (`span` from data, `mediaFirst` for demo-on-top), rows ≥ 504px |
| **Tall title card + persona cards** | `capabilities/AudienceSection` | 3 cols, straight tall title card, check-list cards |
| **Platform hero** | `platform/PlatformHero` | `ShadeGrid` 16 × 2 (as Pricing/Capabilities) + install `Button` |
| **Title card + live embed + editor cards** | `platform/PlatformSurfaces` | 3 cols: rotated title (col 1, rows 1–2), plugin iframe (cols 2–3, rows 1–2), `IconTile` cards on row 3; 2 cols < 1024 with the embed last on a full row; 1 col < 640 |
| **Static text cards** | `ui/TextCardsSection` (glossary terms) | one column per card (`cards`: title + HTML paragraphs), `--space-inset-800`; 1 col < 1024 |
| **Terms grid** | `/glossary` | 2 cols of whole-card `<a class="card">` (term, definition, "Read more"), link named by the term (`aria-labelledby`); 1 col < 640 |
| **Next steps link cards** | `platform/NextSteps` | one column per whole-card `<a class="card">`, 4 at most per row (`steps` prop; default: capabilities, pricing, downloads, blog); 1 col < 1024. Also on the 404 |

Capability pages (`/capabilities/<slug>`) are data-driven too: a `CapabilityPage` in
`src/data/capability-pages.ts`, rendered by `capabilities/CapabilityPageView` (hero, overview
`IntroCardSection` with a capability demo, `ui/StepsSection`, `ui/TableSection`s, FAQ,
related `NextSteps`). Glossary terms (`/glossary/<term>`) come from `src/data/glossary.ts`
through `glossary/GlossaryTermView` (hero without tagline so the definition is the first
paragraph, `glossary/HueRamp` visual, two text cards, related terms); `/glossary` lists them.
Shared types (steps, tables, next steps, icons) live in `src/data/blocks.ts`.

Platform pages (`/figma`, `/penpot`, `/sketch`, `/framer`, `/claude`) are data-driven:
a `PlatformPage` in `src/data/platform-pages.ts`, rendered by
`platform/PlatformPageView` (hero, surfaces, “Why it matters” mosaic, next steps,
reinsurance). Variants: two surface cards → the second gets `span: 2`; no plugin
embed → fill the `media` slot (`/claude` uses `platform/ClaudeTerminal`); “Why it
matters” cards without `demo` → a 4-column row of text cards.

## Sticky intro container

Used when a title sits beside a long column of cards:

```astro
<div class="x__intro">            <!-- full height, soft border, surface bg -->
  <div class="x__intro-content">  <!-- position: sticky; top: var(--layout-header-height) -->
    <h2 class="t-section-title">…</h2>
    <p class="t-accent">…</p>
  </div>
</div>
```

`align-self: stretch` on the container; on mobile the content becomes `position: static`.
Never put the sticky element directly in the grid without a container: the reveal motion
then plays "in the void".

## Rules of thumb

- Card padding 32px; body text of a card at the bottom when the card has empty space above
  (Figma pattern: illustration or air on top, info below).
- Two buttons side by side in a hero: `block` buttons that share the row; column on mobile.
- Groups of buttons: prefer a small grid where each button fills its cell (e.g. 2 × 3 with
  the highlighted item spanning the first row) over full-width stacked buttons.
- Accordions and lists take the full width of their card (no inner max-width).
- Anchors: give sections an `id` when a CTA scrolls to them (`#platforms`); the header
  height is handled by `scroll-padding-top`.
- Embeds (app iframe): fill the slot (`flex: 1`), surface-coloured background while loading,
  `loading="lazy"`, a keyboard-visible fallback link.
