# Design intent

What the site should feel like, and why each visual choice exists. Use it to decide when a
new page or section has no direct Figma equivalent.

## Personality

- **A precise colour tool, shown as a colour tool.** The UI borrows the language of the
  product: palettes, shades, grids, swatches, tokens. Decoration is always made of the
  product's own material (shade tiles, gradient, grid lines), never stock illustration.
- **Technological, calm, crafted.** Motion evokes a screen or an instrument (loading
  spinner, scan line, light running under a grid), slow and fine rather than bouncy.
- **Monospace for statements, humanist sans for reading.** Martian Mono (bold, wide
  tracking) gives every title a "code / spec sheet" voice; Lexend (500) keeps body text
  friendly and legible.

## The card system

- The page is a mosaic of **cards on an 8px gutter**: hero, features, FAQ, footer columns,
  menu entries, blog posts. Cards have a 16px radius and a 1px border.
- **Two border strengths**: strong (`--site-border-strong`) for content cards, soft
  (`--site-border-soft`) for "title cards" and quiet containers.
- **Title cards** introduce a section inside the mosaic (e.g. "Choose your platform",
  "Here are some exciting updates…"): soft border, title anchored at the bottom, often
  rotated by 1deg to break the grid on purpose. Tall title cards stay straight.
- **Sticky intros** (Extra tools, FAQ) are full-height soft-bordered containers whose text
  sticks while the cards beside them scroll.
- Interactive cards are links (the whole card is the target) and use the @unoff/ui `.card`
  hover.

## The shade grid ("Slots") and the light

- The hero and the "Trusted by" block are framed by a ring of **shade tiles**: the grid of a
  palette, with content tiles inside.
- The **brand gradient** (red → yellow → green → blue → indigo → red, Figma "UICP GRD") lives
  only *under* the grid and shows through the 2px grooves, like light under a keyboard.
- The light has a **shape** (the Figma wave): grooves inside it are lit, the others are dark.
  The shape circles slowly; coloured light points run inside it; under the cursor a beam
  concentrates the light. Never paint the gradient on top of content.

## Illustrations

- Platform and AI illustrations: a logo tile (brand colour, slight tilt, 16px radius) on a
  token-coloured grid (`.illustration-grid`, 92 × 124 cells), surrounded by **shards** (rays)
  that sparkle.
- Snippets (MCP URL, `/skills` command) are dark "terminal" blocks with floating tool logos.

## Motion story

1. A card **scales in** with the @unoff/ui **spinner**: something is loading.
2. A **scan band** (soft, CRT-like, with scanlines) sweeps from top to bottom and reveals the
   content.
3. Cards in the same view reveal **out of phase** to create rhythm.
4. Ambient: light in the grooves, sparkling shards. Everything pauses off screen.

Keep new motion inside this story; do not add bounces, parallax or scroll-jacking.

## Tone of copy

- Short, confident, slightly playful puns on platform cards ("Figure it out →",
  "On Claude nine →"). Arrows "→" end action phrases.
- Product names and standards are exact: WCAG 2.1, APCA, OKLCH, W3C Design Tokens, MCP.
