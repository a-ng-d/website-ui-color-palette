# Phase 4 — Off-site authority & AI-source presence

- **Status**: Draft
- **Package(s) concerned**: none in code (except `sameAs` in `src/data/structured-data.ts`). The work is manual, done by the product owner.
- **Related spec**: [README.md](README.md), [00-measurement.md](00-measurement.md)

## Problem

Search engines rank on links, and AI answer engines mostly cite third-party sources: directories, community threads, registries and reviews. UI Color Palette is distributed in several marketplaces but has no consistent off-site description and no presence tracking. Its MCP server and Claude plugin are probably absent from the registries that AI agents and their users browse.

## Actions

### 1. Owned listings: consistent entity

Use the same one-line and short descriptions everywhere, aligned with `site.defaultDescription` in `src/config/site.ts`. Each listing links to ui-color-palette.com, with UTM parameters where the platform allows.

| Listing | Action |
|---|---|
| Figma Community plugin page | Align the description, add a site link, refresh screenshots |
| Penpot plugin hub | Same |
| Sketch extension listing | Same |
| Framer marketplace | Same |
| GitHub repository README | Add a site link and badges, link to /capabilities |
| Docs (`docs-ui-color-palette`) | Link back to the matching site page on every docs page (for example docs glossary → `/glossary/<term>` once Lot D ships) |
| LinkedIn, X, Product Hunt profiles | Align the bio and link |

Then add every verified profile URL to Organization `sameAs`.

### 2. AI and MCP registries

| Target | Item |
|---|---|
| Official MCP registry | UI Color Palette MCP server |
| Smithery, mcp.so, Glama, PulseMCP | MCP server |
| `awesome-mcp-servers` (GitHub) | PR adding the server under design or color |
| Claude plugin marketplaces / skills directories | Claude plugin and skills |

Each entry includes a description, the tool list (from `04-contracts/mcp-tools.md`), the auth method (OAuth 2.1) and links to the site's `/claude` page and the docs.

### 3. Directories and curated lists

- GitHub awesome lists: `awesome-design-systems`, `awesome-figma` / Figma plugin lists, `awesome-penpot`, color and accessibility tool lists.
- AlternativeTo, listed as an alternative to Coolors, Adobe Color and Paletton, among others.
- SaaSHub, Product Hunt (relaunch for the 2026 multi-platform app), and design-tool directories.

### 4. Earned content and communities

- **Guest and technical articles**: OKLCH for UI palettes, APCA vs WCAG in practice, semantic color tokens. Targets: dev.to, Medium UX Collective, CSS-Tricks or Smashing Magazine (pitch). Each article is useful on its own and links to one relevant site page.
- **Communities**: answer real questions where the product is a fit and disclose authorship. Places: r/FigmaDesign, r/UXDesign, r/web_design, Penpot community forum, Figma forum, Stack Overflow (color and tokens tags).
- **Newsletters**: design-system and front-end newsletters, for launches and notable releases.
- **Podcasts and talks**: design-system meetups (Penpot Fest and similar).

### 5. Freshness signals

Turn each release note from `../docs-ui-color-palette/figma/others/release-notes/` into a short "News" blog post that links to the relevant capability page.

## Rules

- No paid links, link schemes or spammy directory submissions.
- Always disclose affiliation in community answers. Never astroturf.
- Descriptions follow the README's "do not distort" rules: no draft features, no credits, no prices.

## Acceptance criteria

- [ ] Given every owned listing, when reviewed, then the description matches the reference copy and links to the site.
- [ ] Given Organization JSON-LD, when built, then `sameAs` lists every verified profile URL.
- [ ] Given the MCP server, when the official registry and at least 3 third-party registries are checked, then it is listed with a link to the site.
- [ ] Given the tracking table below, when updated monthly, then each target has a status and a date.

## Tracking

| Target | Type | Status | Date | URL |
|---|---|---|---|---|
| | | Todo / Submitted / Live / Rejected | | |

## Out of scope

- Paid advertising.
- Influencer sponsorships.

## History

| Date | Change |
| ---- | ------ |
| 2026-10-26 | Created |
