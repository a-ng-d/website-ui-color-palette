# Phase 0 — Measurement & baseline

- **Status**: Draft
- **Package(s) concerned**: `website-ui-color-palette` (plus Search Console, Bing Webmaster Tools and Mixpanel)
- **Related spec**: [README.md](README.md), [05-optimization-loop.md](05-optimization-loop.md)

## Problem

There is no recorded baseline, so the SEO/GEO program cannot prove impact or prioritize. The page backlog in Phase 2 and the article backlog in Phase 3 are ordered by estimated search intent. They should be re-ordered from real Search Console data before production starts. Nothing measures whether AI answer engines cite the product either.

## Steps

1. **Export Google Search Console data**, covering the last 16 months, at query × page level. Save it as `docs/seo/data/gsc-baseline-YYYY-MM.csv`; it is private, so do not commit raw data if the repo is public. Then extract:
   - **Striking distance**: queries in average positions 8–30 with ≥ 50 impressions. Map each one to an existing page, or to a Phase 2 or 3 item.
   - **Unserved queries**: queries with impressions but no dedicated page (for example the home page ranking for "oklch palette"). Each becomes a page or article candidate.
   - **Low CTR**: pages with CTR below 2% in positions 1–10. These are title and description rewrite candidates.
2. **Set up Bing Webmaster Tools.** Import the site from GSC and submit `sitemap-index.xml`. Enable **IndexNow**, either through a Netlify build hook or a post-deploy script that pings changed URLs. Bing feeds ChatGPT Search and Copilot.
3. **Record the baseline** in `docs/seo/baseline.md`:
   - organic clicks, impressions, CTR and average position over 28 days (GSC and Bing)
   - indexed pages vs. sitemap URLs
   - top 20 queries and top 10 pages
   - installs and sign-ups whose referrer is ui-color-palette.com, from Mixpanel. This needs UTM parameters on every install CTA (`utm_source=website&utm_medium=<page-type>&utm_campaign=<slug>`).
4. **Run the AI-citation panel.** Ask the prompts below in ChatGPT (search on), Perplexity, Gemini and Claude (web search on). For each answer, record:
   - whether the brand is mentioned (yes/no)
   - which URL is cited (site, docs, Figma Community, other)
   - which competitors are named
   - the date

   Store the results in `docs/seo/geo-panel.md`.

### Tracked prompt set (v1)

1. best Figma plugin to create an accessible color palette
2. how to generate an OKLCH color scale for a design system
3. Penpot plugin for color tokens
4. tool to check WCAG and APCA contrast of a color palette in Figma
5. generate a Tailwind v4 color palette from my brand color
6. how to export Figma colors to SwiftUI and Jetpack Compose
7. color blindness simulator for UI design
8. AI color palette generator for a landing page
9. extract a color palette from an image for UI
10. MCP server for generating color palettes
11. Coolors alternative for designers working in Figma
12. Leonardo color alternative inside Figma
13. how to build semantic color tokens (primitives vs semantic)
14. Material 3 color scale generator Figma
15. Sketch plugin for color palettes
16. Framer color styles generator
17. what is the best color space for UI palettes
18. how to create light and dark themes from one palette
19. UI Color Palette review / what is UI Color Palette
20. generate a color palette with Claude

## Rules

- Raw GSC and Mixpanel exports never go to a public repository. Only aggregated numbers go into `baseline.md`.
- The prompt set is versioned. Prompts may be added but never edited, so trends stay comparable.
- The baseline is taken **before** Phase 1 ships to production, or immediately after, with the date noted.

## Acceptance criteria

- [ ] Given GSC access, when the export is run, then `baseline.md` lists 28-day clicks, impressions, CTR, position, indexed pages, top queries and top pages, with the date.
- [ ] Given the export, when it is analysed, then every striking-distance query is mapped to an existing URL or to a Phase 2/3 backlog item.
- [ ] Given Bing Webmaster Tools, when the sitemap is submitted, then it shows as processed with no errors.
- [ ] Given a deploy, when URLs change, then IndexNow is pinged for those URLs.
- [ ] Given the 20 prompts, when the panel is run, then `geo-panel.md` contains one row per prompt × engine.
- [ ] Given an install CTA on the site, when it is clicked, then the destination URL carries UTM parameters.

## Out of scope

- Paid tools (Ahrefs, Semrush). Add them later if budget allows.
- Automated rank tracking.

## Implementation notes

- **UTM on CTAs**: install and download URLs live in `src/config/site.ts` and `src/data/platform-pages.ts`. Add a helper that appends UTM parameters by page type rather than hard-coding them per link.
- **IndexNow**:
  - put the key file at `public/<key>.txt`
  - add a post-build or Netlify `onSuccess` plugin that POSTs changed URLs (diff of `sitemap-0.xml` against the previous deploy) to `https://api.indexnow.org/indexnow`
- **Analytics**: check with Mixpanel `Get-Business-Context` that a "website referrer" property exists before creating new events.

## See also

- [05-optimization-loop.md](05-optimization-loop.md), which reuses this baseline monthly.

## History

| Date | Change |
| ---- | ------ |
| 2026-10-26 | Created |
