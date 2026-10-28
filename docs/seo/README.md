# SEO / GEO program — ui-color-palette.com

- **Status**: Accepted (Phase 1 in progress, Phases 0, 2–5 Draft)
- **Package(s) concerned**: `website-ui-color-palette`
- **Owner workflow**: `site-orchestrator` → `blog-writer` / `seo-reviewer` / `fact-checker` / `style-guardian`

## Goal

Grow organic presence on Google and Bing and in AI answer engines (ChatGPT Search, Perplexity, Gemini / AI Overviews, Claude, Copilot) without distorting the product or the site's voice.

Baseline (2026-10-26):
- **11 indexable URLs**: home, /capabilities, /pricing, /download, 5 platform pages and 2 blog posts.
- English only.
- No page targets a search-intent query.
- The product is far richer than what the site exposes.

Target at 3 months: **~70 useful URLs** and a measurable lift in impressions, clicks and AI citations. The baseline is defined in [00-measurement.md](00-measurement.md).

## Phases

| Phase | Spec | Status |
| --- | --- | --- |
| 0 — Measurement & baseline | [00-measurement.md](00-measurement.md) | Draft |
| 1 — Technical foundations | Implemented on branch `seo/phase-1` (see below) | In progress |
| 2 — Capability, comparison, platform and glossary pages | [02-capability-pages.md](02-capability-pages.md) | Draft |
| 3 — Blog topic clusters | [03-blog-clusters.md](03-blog-clusters.md) | Draft |
| 4 — Off-site authority & AI-source presence | [04-off-site-authority.md](04-off-site-authority.md) | Draft |
| 5 — Monthly optimization loop | [05-optimization-loop.md](05-optimization-loop.md) | Draft |

## Non-negotiable rules ("do not distort")

1. **Every product claim comes from the specs or the docs.** Sources are `../specs-ui-color-palette/` and `../docs-ui-color-palette/`, and `fact-checker` verifies every page and article.
2. **Draft or concept features are never presented as shipped.** These are:
   - wide gamut output (Display P3 / Rec. 2020)
   - non-linear hue/chroma distribution
   - the in-plugin Structure UI for color systems
   - team spaces
   - the Chrome extension

   They may be mentioned only as "planned", and only if the product owner agrees.
3. **Credits are never mentioned** (the system is inactive in production).
4. **Prices are never hard-coded in copy or meta.** Prices come live from `prices.mjs`.
5. **No thin programmatic pages.** A page exists only if it carries unique, useful content.
6. **No unsourced superiority claims about competitors.** Comparison pages are factual, dated and fair.
7. **Slugs are never renamed once published.** If a move is unavoidable, it gets a 301 in `netlify.toml` or `public/_redirects`.
8. Site rules from `CLAUDE.md` apply:
   - one `<h1>` per page
   - a unique title (≤ ~60 characters) and a unique description (120–160 characters)
   - JSON-LD on every page
   - content rendered as HTML at build time
   - `@unoff/ui` tokens and components only
9. **English only** for now. Adding a locale requires a separate spec covering hreflang, self-canonicals and sitemap alternates.

## Governance

| Change | Flow |
| --- | --- |
| New or changed page or copy | `site-orchestrator` builds it, then `seo-reviewer` + `fact-checker` + `style-guardian` |
| Blog article | `blog-writer` drafts it, then `seo-reviewer` + `fact-checker`, then a revision |
| Structured data, `llms.txt`, sitemap | `site-orchestrator`, then `seo-reviewer` |
| Off-site listings | Manual (product owner), tracked in [04-off-site-authority.md](04-off-site-authority.md) |

## KPIs

| KPI | Source | Cadence |
| --- | --- | --- |
| Organic clicks and impressions (site total and per section) | Google Search Console + Bing Webmaster Tools | Monthly |
| Indexed pages vs. sitemap URLs | GSC Pages report | Monthly |
| Queries ranking in positions 1–10 / 11–30 | GSC | Monthly |
| AI citations (brand mentioned, URL cited) on the tracked prompt set | Manual panel, see [00-measurement.md](00-measurement.md) | Monthly |
| Installs and sign-ups attributed to the site | Mixpanel + UTM on install links | Monthly |

## Timeline

| Weeks | Deliverables |
| --- | --- |
| 1 | Phase 0 and Phase 1 |
| 2 | `CapabilityPageView` template and the first 3 Lot A pages |
| 3–6 | Rest of Lot A (~3 pages/week), Lot C (platform pages), blog starts at 2 posts/week |
| 6–8 | Lot D (glossary) and Lot B (comparisons) |
| Ongoing | Blog at 2/week, Phase 4, monthly loop (Phase 5) |

## Phase 1 — scope (reference)

1. `/blog` index and a Blog link in the nav and footer.
2. 404 page.
3. RSS feed.
4. Required `pubDate`; both posts dated, with `category`, `faq` and internal links.
5. Sitemap `lastmod`.
6. BreadcrumbList on every non-home page.
7. Organization `sameAs`, and the author as a `Person` entity.
8. Twitter tags, touch icon and manifest.
9. Keyword-bearing h1 on /pricing and /download.
10. Footer heading cleanup.
11. No hard-coded price in meta.
12. `llms-full.txt`.
13. Related posts.

See the branch diff for the exact files.

## History

| Date | Change |
| ---- | ------ |
| 2026-10-26 | Created. Phase 1 started, Phases 0 and 2–5 specified. |
