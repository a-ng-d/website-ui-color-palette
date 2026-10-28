# Phase 3 — Blog topic clusters

- **Status**: Draft
- **Package(s) concerned**: `website-ui-color-palette` (`src/content/blog/`)
- **Related spec**: [02-capability-pages.md](02-capability-pages.md), skill `ui-color-palette-blog-writing`

## Problem

The blog has 2 posts: one about AI/MCP and one news recap. Neither targets a how-to or comparison query. Designers and developers search for guidance on accessible palettes, color spaces, tokens and handoff, and those are exactly the topics the product's expertise covers. Without articles, the capability pages have no supporting content and no topical authority.

## Model

There are 5 topic clusters. Each cluster has a **pillar**, which is a Lot A capability page, and 3–4 articles. Articles link to their pillar and to each other. The pillar links back to every article in its cluster.

Cadence: **2 articles per week for 12 weeks** (~24 articles), with a first wave of 15 listed below. Phase 0 GSC data re-orders the backlog and adds the rest.

## Backlog (wave 1)

| # | Working title | Type | Primary query | Pillar | Sources |
|---|---|---|---|---|---|
| **Accessibility** | | | | `wcag-apca-contrast` | |
| 1 | APCA vs WCAG 2: what changes for UI colors | Guide | apca vs wcag | wcag-apca-contrast | `preview.md`, public WCAG/APCA references |
| 2 | How to build an accessible color scale, step by step | Guide | accessible color scale | wcag-apca-contrast | `scale.md`, docs `create-a-color-palette.md` |
| 3 | Contrast targets for text, buttons and borders | Problem → solution | contrast ratio for buttons | wcag-apca-contrast | `preview.md` |
| 4 | Designing for color blindness: the 8 vision types | Guide | designing for color blindness | color-blindness-simulation | `themes.md` |
| **Color spaces** | | | | `oklch-lch-color-spaces` | |
| 5 | Why OKLCH beats HSL for UI palettes | Problem → solution | oklch vs hsl | oklch-lch-color-spaces | docs `what-is-the-lch-model.md` |
| 6 | LCH vs OKLCH: which one for your design system? | Guide | lch vs oklch | oklch-lch-color-spaces | `settings.md`, docs glossary |
| 7 | Perceptual lightness explained for designers | Guide | perceptual lightness | oklch-lch-color-spaces | docs `what-is-the-lch-model.md` |
| **Design tokens** | | | | `export-design-tokens` / `semantic-color-system` | |
| 8 | Primitive vs semantic color tokens: how to structure them | Guide | semantic color tokens | semantic-color-system | `color-system.md` (no Structure UI) |
| 9 | Export colors to DTCG and Style Dictionary | Guide | dtcg color tokens | export-design-tokens | `export.md` |
| 10 | Material 3, Tailwind and Spectrum color scales compared | Guide | material 3 vs tailwind colors | design-system-presets | `scale.md` presets |
| **Dev handoff** | | | | `tailwind-color-palette` / `swiftui-compose-colors` | |
| 11 | Generate a Tailwind v4 OKLCH palette from Figma | Guide | tailwind v4 oklch palette | tailwind-color-palette | `export.md` |
| 12 | From design palette to SwiftUI and Jetpack Compose colors | Guide | swiftui color palette | swiftui-compose-colors | `export.md` |
| 13 | Sync a color palette to Penpot native tokens | Feature spotlight | penpot design tokens | /penpot | docs `penpot/guides/*` |
| **AI** | | | | `ai-color-palette-generator` / `mcp-color-palette` | |
| 14 | Generate a UI palette from a prompt (12 presets explained) | Feature spotlight | ai color palette generator | ai-color-palette-generator | `ai-generation.md` |
| 15 | Turn an image or moodboard into a UI palette | Guide | color palette from image | image-to-color-palette | `image-extraction.md` |

Candidates for wave 2:
- color harmony rules for UI
- light and dark themes from one palette
- auditing a palette's contrast with Claude via MCP, from an angle different from the existing AI post
- documenting a palette for developers
- publishing and syncing palettes across tools
- release-note "News" posts from `../docs-ui-color-palette/figma/others/release-notes/`

## Existing posts — refresh

- `3-ways-ai-now-builds-audits-and-deploys-your-color-systems`: link it to the `mcp-color-palette` pillar once that page exists. It already has a FAQ and internal links from Phase 1.
- `goodbye-2025-plugin-and-welcome-to-2026-app`: keep the slug and link it to the platform pages and `/download`.

## Rules (in addition to skill §5)

- **Answer first.** The first 2 sentences answer the title query directly.
- Write **H2s as real questions** where natural, taken from GSC queries and People Also Ask.
- **Cite numbers precisely and with a source**: WCAG ratios (4.5:1, 3:1), APCA Lc thresholds (with a source link), product counts (formats, presets, vision modes) from the specs.
- At least **one table or comparison** per Guide article, because AI engines extract tables well.
- **FAQ of 3–5 questions**, `pubDate`, `category`, 3–5 lowercase tags, **2–4 internal links** (pillar plus 1–2 siblings), and an outbound link to an authoritative source when external facts are cited (W3C, APCA, Tailwind docs).
- **Each article has a distinct primary query.** If two drafts would target the same query, merge them.
- Never present a draft feature as shipped. Never mention credits or prices.
- Media follows the skill conventions (Screen Studio videos, descriptive alt text).
- Bump `updatedDate` only when facts change.

## Acceptance criteria

- [ ] Given a new article, when `seo-reviewer` runs, then it reports no blocking issue on intent, metadata lengths, answer-first lead, FAQ or internal links.
- [ ] Given a new article, when `fact-checker` runs, then every product claim has a spec or doc source.
- [ ] Given a published article, when built, then it links to its pillar and its pillar links back to it.
- [ ] Given a published article, when built, then it appears in `/blog`, `rss.xml`, the sitemap (with `lastmod`), `llms.txt` and `llms-full.txt`.
- [ ] Given two articles, when their primary queries are compared, then none are identical.

## Out of scope

- Guest posts on other sites (see [04-off-site-authority.md](04-off-site-authority.md)).
- Translations.

## Implementation notes

- Every article goes through `blog-writer`, then `seo-reviewer` and `fact-checker`, then a revision.
- Track progress by adding a `cluster` field to the front-matter. This is optional and would require a schema change in `src/content.config.ts`. The alternative is a table in this file.
- Pillar → article links: Lot A pages can list their cluster articles automatically by matching a tag or `cluster` value.

## See also

- [02-capability-pages.md](02-capability-pages.md)
- `.claude/skills/ui-color-palette-blog-writing/SKILL.md`

## History

| Date | Change |
| ---- | ------ |
| 2026-10-26 | Created |
