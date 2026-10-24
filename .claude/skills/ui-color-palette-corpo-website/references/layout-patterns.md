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
| **Sticky intro + content card** | `Faq` | `0.5fr 1fr`, intro on the left |
| **Title card + list of cards** | `LatestPosts` | 2 cols, rotated title card left, posts right (400px cards, cover + body) |
| **Gallery + pitch in a shade grid** | `Reinsurance` | 2 cols: auto-scrolling palette reels / `ShadeGrid` 8 × 6 with pitch and a 2-col button grid |
| **Footer mosaic** | `Footer` | 4 cols × 2 rows, wide cards span 2 |

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
