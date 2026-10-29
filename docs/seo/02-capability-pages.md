# Phase 2 — Capability, comparison, platform and glossary pages

- **Status**: In progress — steps 1 to 4 done (branch `seo/phase-2`), Lot D, steps 5 and 6 done (branch `seo/phase-2-2`); steps 7 and 8 to do. See [Progress](#progress).
- **Package(s) concerned**: `website-ui-color-palette`
- **Related spec**: [README.md](README.md), [03-blog-clusters.md](03-blog-clusters.md), [00-measurement.md](00-measurement.md)

## Problem

The site has 11 URLs, and none of them answers a search-intent query. People search for "wcag contrast checker figma", "oklch palette generator", "tailwind color palette generator", "design tokens colors" or "color blindness simulator". The product does all of these, as documented in `../specs-ui-color-palette/02-features/`, but the only place they appear is a bullet in `/capabilities` or a FAQ answer. Search engines and AI answer engines have no page to rank or cite.

## Target architecture

```
/capabilities                      hub (existing, becomes an index of sub-pages)
/capabilities/<slug>               Lot A, one page per capability
/compare                           hub (Lot B)
/compare/ui-color-palette-vs-<x>   Lot B
/figma /penpot /sketch /framer /claude   Lot C, enriched in place (URLs unchanged)
/glossary                          hub, DefinedTermSet (Lot D)
/glossary/<term>                   Lot D
```

## Production order (from the 2026-10-28 baseline)

Phase 1b ([01-indexation-recovery.md](01-indexation-recovery.md)) ships first. Then the order below follows real demand from [baseline.md](baseline.md):

| Order | Page | Evidence |
|---|---|---|
| 1 | Lot C `/claude` (enrich), and Lot A #14 `mcp-color-palette` merged into it | claude color palette at position 8.4 with 5 clicks; claude ai color palette, claude color palette skills, claude code color palette; docs `/claude` has 2.4k impressions |
| 2 | Lot A #3 `oklch-lch-color-spaces`, plus glossary terms `oklch`, `oklab`, `lch`, `hsluv` | oklab color palette at 4.2, hsluv vs oklch at 9, lch color / lch color space around 58 |
| 3 | Lot A #4 `color-blindness-simulation`, plus glossary term `color-blindness-types` | achromatomaly at 9.5 with 1 click |
| 4 | Lot A #1 `wcag-apca-contrast` | wcag color palette at 6, accessibility color palette at 23 |
| 5 | Lot A #2 `color-palette-generator` | ui color palette generator at 61, color palette manager at 10; also supports the brand query "ui color palette" at 34 |
| 6 | Lot C `/figma`, then `/framer` | figma color palette plugin at 35, framer color palette at 10 |
| 7 | Lot A #6 `tailwind-color-palette` and #7 `swiftui-compose-colors` | tailwind ui colors at 58, xcode color palette at 42 |
| 8 | Rest of Lot A, Lot D, Lot B | No measured demand yet. Search Console will tell. |

**Site `/claude` vs docs `/claude`.** The site page targets the product query ("claude color palette", "color palette mcp"), and the docs page targets setup ("install", "skills", "agents"). They cross-link and never share a title query. See [01-indexation-recovery.md](01-indexation-recovery.md), step 7.

## Progress

Last update: 2026-10-30.

| Order | Status | Live pages |
|---|---|---|
| 1 | Done | `/claude` (setup steps, design-tool matrix, MCP tools table, FAQ) |
| 2 | Done | `/capabilities/oklch-lch-color-spaces`, `/glossary`, `/glossary/oklch`, `/glossary/lch`, `/glossary/oklab`, `/glossary/hsluv` |
| 3 | Done | `/capabilities/color-blindness-simulation`, `/glossary/color-blindness-types` |
| 4 | Done | `/capabilities/wcag-apca-contrast`, `/glossary/apca`, `/glossary/wcag-contrast-ratio` |
| 5 | Done | `/capabilities/color-palette-generator`; the `color-scale` term now links to it |
| 6 | Done | `/figma` (Figma products table, plans, setup, FAQ) and `/framer` (what syncs to Framer, plans, setup, FAQ) |
| 7 | To do | `tailwind-color-palette`, `swiftui-compose-colors` |
| 8 | In progress | Lot D done: `/glossary/cielab`, `/glossary/color-scale`, `/glossary/design-token`, `/glossary/semantic-color`, `/glossary/color-harmony`. To do — Lot A: `export-design-tokens`, `ai-color-palette-generator`, `image-to-color-palette`, `color-wheel-harmony`, `light-dark-themes`, `design-system-presets`, `semantic-color-system`. Lot C: `/penpot`, `/sketch`. Lot B: the 5 comparison pages and the `/compare` hub |

Lot A pages left: 9 of 13 (`mcp-color-palette` is merged into `/claude`). Lot C: 2 of 5 (`/penpot`, `/sketch`). Lot D: done (12 terms and the hub). Lot B: all 6.

### What is in place for the next pages

- **Capability page**: a `CapabilityPage` in `src/data/capability-pages.ts`, rendered by `CapabilityPageView` at `/capabilities/<slug>`. A new page is data only; each planned page has a matching demo in `src/components/capabilities/demos/`.
- **Glossary term**: a `GlossaryTerm` in `src/data/glossary.ts` (optional `question` h1, `visual`, `table`, `capability`). Visuals: `HueRamp`, `VisionRamp`, `ContrastRamp`, `ScaleRamp`, `TokenRamp` (primitive or semantic layer), `HarmonyRamp`.
- **Platform page**: optional `setup`, `tables`, `faq` and `nextSteps` on `PlatformPage` (used by `/claude` only so far).
- **Wiring is automatic**: `/capabilities` "Capabilities in depth" row, `/glossary` hub, `llms.txt` / `llms-full.txt`, sitemap `lastmod`, breadcrumbs and JSON-LD come from the data.
- **Reviews per step**: `seo-reviewer`, `fact-checker` and `style-guardian`, then the fixes, before merge.

### Follow-ups

- **Interim capability links (Lot D)**: `design-token` and `color-harmony` point to `/capabilities#deploy` and `#generate`, and `semantic-color` to `/claude` (`color-scale` now points to `color-palette-generator`). When `export-design-tokens`, `color-wheel-harmony` and `semantic-color-system` ship, repoint each `capability` in `src/data/glossary.ts` to its `/capabilities/<slug>`.
- **Glossary vs Lot A ownership**: a glossary term owns "what is X" and the definition; its Lot A page owns "how to do it in the tool" (formats, presets, plan detail). Keep tool detail out of the term pages.
- **Unsourced claim on live terms**: `oklch` and `oklab` say "Switching … keeps your scale and your source colors"; no spec or doc states it. Confirm with the product owner or rewrite as on `cielab`.
- **Spec conflicts found by the fact-check**: resolved on 2026-10-29 in `specs-ui-color-palette` — plan content removed from the specs (plans live only in docs `free-and-pro.md`), `scale.md` now counts 19 presets (3 custom + 16 named), and the contracts list the `system?` input of `generate_code`.
- **`/capabilities` "Capabilities in depth" row**: a compact card variant is needed past about 8 pages (around step 7).
- **Doc and spec conflicts found on step 6** (product owner to settle, pages follow the spec):
  - Framer sync: the spec pairs each shade with its mirror shade as the dark value; the docs Framer sync guide says the dark color is "generated by inverting the base color". Reword the docs.
  - Framer storage: the spec and the Framer docs store palettes in the browser; `palette-publication-lifecycle.md` says "in your Framer project", and Framer `free-and-pro.md` caps palettes "per document". How the /basic cap counts across browsers is not documented.
  - Figma docs sync guide: a lock icon on "Sync to the local variables" although sync is free; and a default variable mode named `Value` whose interplay with the Starter 1-mode cap is not documented.
  - "Simulate on selection" has docs guides (Figma, Framer, /pro) but its specs (`apply-simulate-palette.md`, `apply-to-selection.md`) are Draft, so it stays off the site.
  - The Framer embed passes `editor=penpot` on purpose until the plugin team confirms the Framer value.
- **Cluster articles** ([03-blog-clusters.md](03-blog-clusters.md)): when an article ships, link it from its pillar page (related cards, FAQ "Full comparison") and respect the ownership rules recorded there.
- **Lighthouse**: run on mobile on one capability page after deploy (SEO = 100, green Core Web Vitals) — not done yet.
- **Sitemap `lastmod`**: check that the new URLs carry a date after deploy (it comes from the git history of the data files).
- **Docs glossary**: link each docs entry to its site term page (OKLCH, LCH, OKLab, HSLuv, CIELAB, Primitive colors → design token, Semantic colors, the 8 color blindness types, APCA, WCAG 2.1), as Lot D requires.

### Acceptance criteria, where they stand

- Lot A pages: one h1 with the primary query, a 40–60 word lead, FAQPage + BreadcrumbList + WebPage JSON-LD, ≥3 links out and ≥2 in, fact-checked — met for the 4 live pages.
- `/capabilities` links to every Lot A page — met (through the "Capabilities in depth" row).
- Platform pages: capability matrix, setup guide, FAQ with FAQPage, ≥3 Lot A links — met for `/claude`, `/figma` and `/framer`; `/penpot` and `/sketch` to do.
- Glossary terms: definition of 60 words or fewer first, `DefinedTerm` linked to the `/glossary` `DefinedTermSet` — met for the 12 live terms.
- Sitemap, `llms.txt`, `llms-full.txt` — met for every new page (`lastmod` to check after deploy).
- Comparison pages and Lighthouse — not started.

## Lot A — capability pages

The table keeps the original numbering. The production order is the one above.

| # | Slug | Primary query / secondary queries | Source spec(s) | Notes |
|---|---|---|---|---|
| 1 | `wcag-apca-contrast` | accessible color palette figma / wcag contrast checker figma, apca contrast, apca vs wcag | `02-features/preview.md`, `02-features/scale.md` (contrast-ratio mode) | Covers WCAG 2.1 ratio and APCA Lc per shade, pass-range filters, minimum font size, and setting a target ratio per stop |
| 2 | `color-palette-generator` | ui color palette generator / color scale generator figma, shades generator | `02-features/scale.md`, `02-features/colors.md` | Covers source colors, steps, and per-color hue and chroma shifting (Pro) |
| 3 | `oklch-lch-color-spaces` | oklch color palette generator / lch palette, perceptually uniform colors | `02-features/settings.md`, docs `general/introduction/what-is-the-lch-model.md` | The "avoid RGB/HSL" argument. **Do not** mention P3/Rec.2020 output |
| 4 | `color-blindness-simulation` | color blindness simulator figma / protanopia, deuteranopia simulator | `02-features/themes.md` | 8 vision modes, set per theme. /basic only includes protanomaly |
| 5 | `export-design-tokens` | export colors as design tokens / DTCG, Style Dictionary colors | `02-features/export.md`, `02-features/color-system.md` | Native, DTCG and Style Dictionary |
| 6 | `tailwind-color-palette` | tailwind color palette generator / tailwind v4 oklch colors | `02-features/export.md` | Tailwind v3 and v4. A Tailwind preset also exists in `scale.md` |
| 7 | `swiftui-compose-colors` | swiftui color palette / jetpack compose colors, android colors.xml | `02-features/export.md` | SwiftUI, UIKit, Compose, XML. No wide-gamut claim |
| 8 | `ai-color-palette-generator` | ai color palette generator / color palette from prompt | `02-features/ai-generation.md` | 12 presets (6 vibes, 6 use cases) |
| 9 | `image-to-color-palette` | color palette from image / extract colors from image | `02-features/image-extraction.md` | Extracts 5 dominant colors |
| 10 | `color-wheel-harmony` | color harmony generator / complementary, triadic, analogous palette | `02-features/color-wheel.md` | |
| 11 | `light-dark-themes` | dark mode color palette / light and dark theme colors figma | `02-features/themes.md` | |
| 12 | `design-system-presets` | material 3 color palette / adobe spectrum, atlassian, tailwind scales | `02-features/scale.md` (18 presets) | |
| 13 | `semantic-color-system` | semantic color tokens / color token naming, primitives vs semantic | `02-features/color-system.md`, `01-domain-model/color-system.md` | **Engine, API and MCP only.** The in-plugin Structure UI is a draft, so do not show or describe it |
| 14 | `mcp-color-palette` | color palette mcp server / ai color tools for claude, cursor | `04-contracts/mcp-tools.md`, docs `mcp/*` | Use a different angle from the existing post "3 ways AI now builds…" to avoid cannibalization |

### Page anatomy (every Lot A page)

1. `<h1>` containing the primary query, phrased naturally (for example "Accessible color palettes with WCAG and APCA contrast, in Figma, Penpot, Sketch and Framer").
2. An **answer-first lead** of 40–60 words that directly answers "what does it do and where". It is the passage AI engines quote.
3. A visual (video or screenshot, using the blog's video and image conventions) with descriptive alt text.
4. **How it works**: 3–5 steps grounded in the docs guide for that feature.
5. **What you get**: specifics such as formats, presets, modes and counts, sourced from the spec.
6. **Availability**: platforms (from `platform-capabilities.md`) and plan (/basic vs /pro, from docs `general/introduction/free-and-pro.md`), with no price amounts.
7. **FAQ**: 4–6 real questions taken from GSC and People Also Ask.
8. **Related**: 2 cluster articles (from Phase 3), the relevant platform pages and the next capability.
9. CTA to install or download, with UTM parameters (see Phase 0).

### Metadata and structured data

- Title ≤ 60 characters, keyword first, ending in "— UI Color Palette". Description of 120–160 characters with a value proposition and a CTA.
- JSON-LD:
  - `WebPage` with `about` pointing to the SoftwareApplication `@id`
  - `BreadcrumbList` (Home > Capabilities > Page)
  - `FAQPage`
  - `VideoObject` when there is a video
  - `HowTo` **only** if the steps are a real procedure
- Add every page to the `/capabilities` hub, to `llms.txt` (one line each) and to `llms-full.txt` (full text).

## Lot B — comparison pages

| Slug | Competitor | Angle |
|---|---|---|
| `/compare/ui-color-palette-vs-coolors` | Coolors | Web generator vs native design-tool plugin with scales and tokens |
| `/compare/ui-color-palette-vs-leonardo` | Adobe Leonardo | Contrast-ratio-driven scales on the web vs inside the design tool |
| `/compare/ui-color-palette-vs-material-theme-builder` | Material Theme Builder | HCT and Material only vs multi-preset (Material 3 included) and multi-space |
| `/compare/ui-color-palette-vs-radix-colors` | Radix Colors | Fixed curated set vs generated custom scales |
| `/compare/ui-color-palette-vs-realtime-colors` | Realtime Colors | Live website preview vs design-tool palette management |
| `/compare` | hub | "Alternatives to X for designers", one section per competitor |

Rules for every comparison page:
- A feature table where **our column** is verified by `fact-checker` against specs and docs. **Their column** is verified with a dated web check, with sources linked in the page footer and a visible "Last verified: YYYY-MM-DD".
- A **"When to choose <competitor>"** section that honestly states the competitor's strengths.
- No "best", "better than" or rankings. Facts and use cases only.
- Their trademarks may be used only as text, with no logos unless their brand guidelines allow it.
- Refresh every quarter (see Phase 5).

## Lot C — enrich platform pages

The existing `/figma`, `/penpot`, `/sketch`, `/framer` and `/claude` pages are rendered by `PlatformPageView.astro` from `src/data/platform-pages.ts`. URLs stay unchanged.

**Naming rule (product owner, 2026-10-30)**: the h1 of every platform page is "UI Color Palette for <Platform>", and its title starts with it ("UI Color Palette for <Platform> — <query>"). The primary query goes in the rest of the title, the tagline and the section headings.

Add to each one:
1. A **platform-specific capability matrix** taken from `docs/general/introduction/platform-capabilities.md`. For example, Penpot syncs native tokens, and Figma syncs variables and styles.
2. A **sync and setup guide** of 3–6 steps, rewritten from `docs/<platform>/guides/*` rather than copied, with a link to the full doc.
3. A **platform FAQ** of 4–6 questions with FAQPage JSON-LD.
4. **Links to the Lot A pages** that matter most on that platform.
5. Target length: 800–1,200 words of useful content.

| Page | Primary query |
|---|---|
| /figma | figma color palette plugin |
| /penpot | penpot color palette plugin / penpot color tokens |
| /sketch | sketch color palette plugin |
| /framer | framer color palette / framer color styles |
| /claude | color palette mcp claude / claude color palette generator |

## Lot D — glossary

- **Hub** `/glossary`: `DefinedTermSet` that lists every term with its short definition.
- **Terms** `/glossary/<term>`, starting with 12:
  1. `oklch`
  2. `lch`
  3. `cielab`
  4. `oklab`
  5. `hsluv`
  6. `apca`
  7. `wcag-contrast-ratio`
  8. `color-scale`
  9. `design-token`
  10. `semantic-color`
  11. `color-harmony`
  12. `color-blindness-types`
- **Each term page**:
  - `<h1>` "What is OKLCH?" (or the equivalent)
  - a 40–60 word definition first (`DefinedTerm` JSON-LD)
  - a visual example
  - "Why it matters for UI color"
  - "How UI Color Palette uses it", linking to the Lot A page
  - 2–3 related terms
- Each page must go **beyond** `../docs-ui-color-palette/general/glossary.md`. Once a page is live, the docs glossary entry links to it.

## Rules

- No page ships without a unique angle, so there are no near-duplicates between Lot A pages and Phase 3 articles. Each article targets a how-to or comparison query, and each Lot A page targets a tool or feature query. `seo-reviewer` checks for cannibalization.
- Draft features (gamut, hue/chroma distribution, Structure UI, team spaces, Chrome extension) never appear as available.
- No price amounts appear in copy.
- No programmatic "palette for {color} × {industry}" pages. Revisit only if published palettes (`list_published_palettes`) can provide unique real content for each page, and only in a separate spec.
- Every new URL must:
  - appear in the sitemap with `lastmod`
  - have a breadcrumb
  - be in `llms.txt` and `llms-full.txt`
  - be linked from at least 2 existing pages, so there are no orphans

## Acceptance criteria

- [ ] Given a Lot A page, when built, then it has one h1 containing its primary query, a lead of 40–60 words, FAQPage + BreadcrumbList + WebPage JSON-LD, and at least 3 internal links out and 2 in.
- [ ] Given a Lot A page, when `fact-checker` runs, then every product claim has a spec or doc source and no draft feature is described as available.
- [ ] Given `/capabilities`, when built, then it links to every Lot A page.
- [ ] Given a comparison page, when built, then it shows "Last verified" and a "When to choose <competitor>" section, and has no superlative claims.
- [ ] Given a platform page, when built, then it contains a capability matrix, a setup guide, a FAQ with FAQPage JSON-LD, and links to at least 3 Lot A pages.
- [ ] Given a glossary term page, when built, then its first paragraph is a definition of 60 words or fewer and it carries `DefinedTerm` JSON-LD linked to the `/glossary` `DefinedTermSet`.
- [ ] Given any new page, when the build runs, then it appears in `sitemap-0.xml` with `lastmod`, in `llms.txt` and in `llms-full.txt`.
- [ ] Given Lighthouse on a Lot A page, when it is run on mobile, then SEO = 100 and the Core Web Vitals are green.

## Out of scope

- Localized versions (English only).
- Free stand-alone web tools (for example an in-browser contrast checker). Worth a separate spec later; they are strong link magnets but are a product decision.
- Programmatic palette pages.

## Implementation notes

- **Template**: create `src/components/CapabilityPageView.astro` modelled on `PlatformPageView.astro`. Data lives in `src/data/capability-pages.ts`, typed like `platform-pages.ts`. Route: `src/pages/capabilities/[slug].astro` with `getStaticPaths`.
- **Comparison and glossary**: same pattern (`src/data/compare-pages.ts`, `src/data/glossary.ts`, dynamic routes). Glossary could also be a content collection if long-form Markdown is preferred.
- **Structured data**: extend `src/data/structured-data.ts` with `webPage()`, `definedTerm()`, `definedTermSet()` and (if needed) `howTo()` builders. Reuse the stable `@id`s.
- **`llms.txt` / `llms-full.txt`**: the generators should iterate the data files so new pages are added automatically.
- **Styling**: `@unoff/ui` only. `style-guardian` reviews the new templates.
- **Platforms**: availability per platform always comes from `platform-capabilities.md`. Never assume Figma parity.

## See also

- [03-blog-clusters.md](03-blog-clusters.md): each Lot A page is the pillar of a cluster.
- `.claude/skills/ui-color-palette-corpo-website/references/new-page.md`

## History

| Date | Change |
| ---- | ------ |
| 2026-10-26 | Created |
| 2026-10-28 | Production order set from the Search Console baseline; `mcp-color-palette` merged into `/claude` |
| 2026-10-28 | Step 1 done: `/claude` enriched (setup guide, design-tool matrix, MCP tools table, FAQ + FAQPage, WebPage JSON-LD). Shared pieces for Lot C: optional `setup`, `tables`, `faq`, `nextSteps` on `PlatformPage`; `llms.txt` / `llms-full.txt` generated from the page data. Open: Lot A links from `/claude` once those pages exist |
| 2026-10-28 | Step 2 done: `/capabilities/oklch-lch-color-spaces` (template `CapabilityPageView`, data `capability-pages.ts`), `/glossary` hub (`DefinedTermSet`) and terms `oklch`, `lch`, `oklab`, `hsluv` (`DefinedTerm`, `HueRamp` visual). Linked from `/capabilities`, the home FAQ and the footer; listed in `llms.txt` / `llms-full.txt` from the data |
| 2026-10-28 | Step 3 done: `/capabilities/color-blindness-simulation` (demo `simulations`) and `/glossary/color-blindness-types` (8-type table, `VisionRamp` visual computed with the engine's matrices). Glossary terms gained `question`, `visual`, `table` and `capability` |
| 2026-10-28 | Step 4 done: `/capabilities/wcag-apca-contrast` (demo `contrast`), `/glossary/apca` and `/glossary/wcag-contrast-ratio` (thresholds and APCA levels tables, `ContrastRamp` visual with real WCAG/APCA scores) |
| 2026-10-28 | `/claude` closing cards now link the 3 live Lot A pages (contrast, OKLCH, color blindness): the "≥3 Lot A links" criterion is met for `/claude` |
| 2026-10-29 | Lot D done: `/glossary/cielab`, `/glossary/color-scale`, `/glossary/design-token`, `/glossary/semantic-color`, `/glossary/color-harmony` (visuals `ScaleRamp`, `TokenRamp`, `HarmonyRamp`; `HueRamp` gains CIELAB). Interim capability links to `/capabilities` anchors and `/claude`. Reviewed by `seo-reviewer`, `fact-checker` and `style-guardian`, fixes applied |
| 2026-10-30 | Step 5 done: `/capabilities/color-palette-generator` (demo `ready`, tables of ways to start and plans, FAQ for "color scale generator figma", shades and palette manager queries); linked from `/capabilities`, the contrast page and `/glossary/color-scale`. Reviewed by `seo-reviewer` and `fact-checker`, fixes applied. Specs aligned: Color Hunt on every platform, hue/chroma distribution curves Implemented |
| 2026-10-30 | Step 6 done: `/figma` and `/framer` enriched (setup guide, capability and plans tables, FAQ + FAQPage, 4 Lot A links); h1 and titles target the platform plugin queries. The generator title drops "for Figma" to leave that intent to `/figma`. Reviewed by `seo-reviewer` and `fact-checker`, fixes applied |
| 2026-10-30 | Naming rule: platform pages keep "UI Color Palette for <Platform>" as h1 and title prefix; `/figma`, `/framer` and `/claude` restored to it, the query moved to the title suffix and the tagline |
