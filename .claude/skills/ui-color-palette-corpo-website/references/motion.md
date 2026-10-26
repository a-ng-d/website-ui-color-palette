# Motion

Source: `src/styles/motion.css`, `src/scripts/reveal.ts`, spotlight script in
`ShadeGrid.astro`. Motion is opt-out by default: new cards animate without extra code.

## How it switches on

- `BaseLayout` adds `html.motion` before paint **only** when JS runs and
  `prefers-reduced-motion` is not set. Every hidden state is scoped to `.motion`.
- Safety net: if `reveal.ts` has not run after 3s, `.motion` is removed.
- Without `.motion` the page is complete and still (verified for reduced motion and no-JS).

## Reveal sequence (every card)

Matched by class — keep the list identical in `motion.css` (REVEAL comment and selectors)
and `reveal.ts` (`REVEAL`): `.card, .surface-card, .shade-grid__area, .platforms__intro,
.posts__intro, .extra__intro, .faq__intro, .stack__intro, .mosaic__intro,
.audience__intro`.

1. **Scale in** (0.94 → 1, opacity) — `card-in`, `--reveal-scale-duration`.
2. **Spinner**: `::before`, @unoff/ui `var(--icon-spinner)` mask (the glyph alone, from
   `generated/unoff-spinner.css`), coloured with
   `--color-icon-primary-default`, lives for `--reveal-wipe-delay`.
3. **Unveil**: `::after` cover in the card's own background (`background-color: inherit`)
   with faint scanlines slides down (`translate 0 → 100%`, ease-in-out); a soft CRT-like
   band (three box-shadows) lights up as it moves. Inset 1px so the @unoff/ui outline stays
   visible; straight top edge.
4. **Rhythm**: `reveal.ts` sets per-element `--reveal-delay` and `--reveal-wipe-delay` from
   the `JITTER` and `SPINNER` arrays, by order of entry in the same batch.

The content is never moved, blurred or removed: it is painted from the start and only
covered (crawlers, screen readers and LCP are unaffected by the reveal).

### Adding a new revealable element

- If it has one of the classes above, nothing to do.
- Otherwise add its class to both lists. It needs a background (the cover inherits it), a
  positioning context (add it to the `position: relative` list unless it is already
  positioned) and must accept `overflow: clip` (fine for sticky children: clip does not
  create a scroll container).
- Do not use `transform` for the reveal: cards use `scale`/`translate` so they don't fight
  the @unoff/ui `.card` hover or rotated title cards.

## Shade grids

- Tiles scale in as a diagonal wave (`--i` = row + col).
- **Light**: `.shade-grid__glow` = Figma wave SVG as mask, faint brand gradient inside,
  dimmed by a surface veil (`::before` opacity 0.3). It **circles** (`wave-travel`, 16s
  ellipse: bottom → right → top → left). Inside, `.shade-grid__light` (200% strip of
  radial light points, repeating) runs in a straight line (`light-flow`, 14s).
- Entrance: the glow fades in after the tiles (`glow-in`, 0.9s delay).
- **Spotlight** (fine pointer only): `--spot-x/--spot-y` registered with `@property`,
  set on pointermove (rAF), transitioned 420ms so the beam trails; `.shade-grid__spot`
  reveals the brand gradient in a 240px radial mask; the wave dims to 0.35 while active.

## Shards

`.shards` = SVG mask coloured with `--color-icon-brand-default`; `sparkle` loop with a
per-item `--sparkle-delay`; faster on card hover.

## Capability demos (`src/scripts/demos/engine.ts`)

- Loops are JS (rAF), so the numbers they show stay coherent with the colours. Each demo
  exposes `frame(t, dt)`: `t` is the loop time while autoplaying, `null` while the visitor
  drives. Values follow targets through `approach()` (exponential smoothing), so returning
  from a drag to the loop glides instead of jumping.
- Timelines are `keyframes([[ms, value], …], t)` with an ease-in-out; hold a value
  ~1–1.5s on each meaningful state (e.g. AAA, AA, Fail) so it can be read.
- Discrete flows (click → menu → result) use `stepAt(t, marks)` (index of the current
  step in a looping list of step starts), `latch(apply)` (apply a state only when it
  changes, so CSS transitions run once) and `typed(text, elapsed)` (typewriter).
- Whatever the cursor targets gets `data-press-target` (scale transition) and, while
  pressed, `data-pressed` (sinks to 0.94): the fake click is visible on the control.
- The fake cursor glides between targets (CSS transition on `left/top`, `data-follow`
  disables it while dragging) and presses (`data-press`: scale + ring). Positions are %
  of the panel from `getBoundingClientRect` ratios, immune to `zoom` and reveal `scale`.
- Plays only when on screen and the tab is visible; **never autoplays under reduced
  motion**. On a fine pointer, hovering the stage pauses the loop and hands the controls
  to the visitor (the engine removes `inert`, sets `tabindex=-1` inside; the stage stays
  `aria-hidden`). Touch devices only see the loop.
- Without JS / reduced motion the server-rendered first frame is the picture: choose a
  start state that tells the story on its own.

## Performance and pausing

- `reveal.ts` toggles `data-inview` on `.shade-grid` and `.card`; loops are paused off
  screen (`animation-play-state`).
- Animate compositor-friendly properties (`translate`, `scale`, `opacity`). Paint-heavy
  properties are only animated briefly (box-shadow during the unveil, custom properties
  during the spotlight).

## Tuning knobs

| What | Where |
| --- | --- |
| Scale duration, spinner time, wipe duration, stagger | `:root` vars at the top of `motion.css` |
| Phase-shift pattern | `JITTER` / `SPINNER` in `reveal.ts` |
| Wave path and speed | `@keyframes wave-travel` |
| Light points speed / look | `light-flow` / `.shade-grid__light` in `ShadeGrid.astro` |
| Wave brightness | `.shade-grid__glow::before` opacity |
| Spotlight radius / trailing | `.shade-grid__spot` mask / `--spot-*` transition |

Verify motion with Playwright screenshots at fixed times, or pause an animation with
`element.getAnimations()` and set `currentTime` to capture a given point of a loop.
