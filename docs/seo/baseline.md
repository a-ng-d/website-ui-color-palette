# SEO baseline

Aggregated figures only. Raw exports stay out of the repository (see [00-measurement.md](00-measurement.md)).

## 2026-10-28 — Google Search Console, last 6 months

- **Source**: the domain property `ui-color-palette.com`. It covers the site, `docs.`, `auth.`, `app.` and `plugin.`.
- **Search type**: Web.
- **Period**: 2026-04-28 → 2026-10-26. Daily data starts on 2026-07-27.

### Totals

| Metric | Value |
|---|---|
| Clicks | 107 |
| Impressions | ~6,990 |
| CTR | ~1.5% |
| Average position | ~21 (desktop 21.6, mobile 10.7) |
| Devices | desktop 96 clicks / 6,360 impressions; mobile 11 / 622; tablet 0 / 10 |
| Top countries (clicks) | US 36, India 18, Indonesia 4, Iran 4, France 3 |

### Split by host

| Host | Clicks | Share |
|---|---|---|
| `docs.ui-color-palette.com` | ~69 | ~65% |
| `ui-color-palette.com` | 38 | ~35% |
| `auth.`, `app.`, `plugin.` | 0 | — (should not be indexed) |

### Trend

| Period | Impressions per day | Average position | Clicks per day |
|---|---|---|---|
| August 2026 | ~120 | ~25 | ~1.4 |
| Sep–Oct 2026 | ~45 | ~12 | ~1.3 |

Impressions fell while positions improved. The site lost long-tail visibility, not rankings. The fall lines up with the drop in indexed pages (see below).

### Indexing (Pages report)

| Date | Indexed | Not indexed |
|---|---|---|
| 2026-08-05 | 66 | 61 |
| 2026-09-21 | 64 | 63 |
| **2026-09-22** | **55** | **135** |
| 2026-10-23 | 79 | 258 |

The jump on 2026-09-22 matches the docs restructure (`docs-ui-color-palette` commit "refactor: documentation structure and links across Penpot and Sketch").

Reasons pages are not indexed (2026-10-28):

| Reason | Pages |
|---|---|
| Not found (404) | 177 |
| Crawled, currently not indexed | 58 |
| Page with redirect | 13 |
| Blocked by another 4xx | 5 |
| Discovered, currently not indexed | 2 |
| Duplicate without user-selected canonical | 1 |
| Alternate page with proper canonical | 1 |
| Redirect error | 1 |

Sitemaps submitted:
- `/sitemap-index.xml`: current, submitted 2026-10-28.
- `/sitemap.xml`: returns 404 since the move to Astro.
- `www./sitemap.xml`: redirects to that 404.
- The docs sitemap had not been submitted.

### Top pages

| Page | Clicks | Impressions | Position |
|---|---|---|---|
| docs `/claude` | 54 | 2,402 | 8.7 |
| site `/` | 28 | 2,026 | 27.0 |
| site `/claude` | 6 | 156 | 12.0 |
| site `/download` | 4 | 73 | 20.5 |
| docs `/guides/export-a-color-palette-to-code` | 3 | 541 | 9.2 (CTR 0.55%) |
| docs `/guides/create-a-color-palette` | 2 | 221 | 49.6 |
| docs `/framer` | 0 | 162 | 34.9 |
| docs `/introduction/what-is-the-lch-model` | 0 | 86 | 34.7 |
| site `/pricing` | 0 | 23 | 8.9 |
| site `/framer` | 0 | 20 | 10.0 |
| site `/figma` | 0 | 15 | 7.9 |

### Query groups

| Group | Representative queries (position) | Reading |
|---|---|---|
| Claude, our intent | claude color palette (8.4, 5 clicks), claude ai color palette (12), claude color palette skills (7.6), claude code color palette (6, 1 click), claude design color palette (12.4) | The strongest real demand. Docs `/claude` captures it today. |
| Claude, not our intent | claude orange hex, claude logo color, claude code color scheme or theme, claude light mode | Brand colors and terminal themes. Ignore. |
| Brand / name | uicolor (9.7), ui color palette (34.1), ui color (27.4), ui colors (31.4) | The brand name is also a generic term, so the entity is weak. |
| Color spaces | oklab color palette (4.2), hsluv vs oklch (9), hsl space (6), lch color (60), lch color space (57.8) | Demand confirmed. Long-form content is missing. |
| Accessibility | achromatomaly (9.5, 1 click), wcag color palette (6), accessibility color palette (23) | Demand confirmed. |
| Generic tool | ui color palette generator (61), figma color palette plugin (35), color palette manager (10), framer color palette (10), tailwind ui colors (58), xcode color palette (42), color primitives (41), color palette api (76) | Medium-term targets. |
| Noise | unified colors, winui/uwp color palette, ayu colors | Not our intent. |

### AI-citation panel

Not yet run. See [00-measurement.md](00-measurement.md).
