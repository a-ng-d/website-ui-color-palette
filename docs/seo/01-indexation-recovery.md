# Phase 1b — Indexation recovery (site, docs, app subdomains)

- **Status**: Draft (priority 1, ahead of Phase 2)
- **Package(s) concerned**: `docs-ui-color-palette` (GitBook), `website-ui-color-palette`, and the repos serving `auth.`, `app.` and `plugin.ui-color-palette.com`
- **Related spec**: [baseline.md](baseline.md), [00-measurement.md](00-measurement.md), [02-capability-pages.md](02-capability-pages.md)

## Problem

The docs restructure of 2026-09-22 left the old docs URLs returning 404 with no redirect. Google already knew those pages. Since that day:
- not-indexed pages went from 63 to 258;
- indexed pages dropped from 64 to 55;
- daily impressions fell by about 60%.

On top of that:
- Search Console still holds 2 dead sitemaps, and the docs sitemap was never submitted.
- Some redirects are temporary (307).
- 58 pages are "crawled, currently not indexed", most likely near-duplicate docs pages across platforms and old release notes.
- The application subdomains (`auth.`, `app.`, `plugin.`, including `?embed=1…` URLs) collect impressions they should not.

The docs drive about 65% of organic clicks (see [baseline.md](baseline.md)). New pages would land on a weakened domain until this is fixed.

## Steps

1. **Collect the URL lists.** From the Search Console Pages report, export:
   - "Not found (404)", 177 URLs;
   - "Crawled, currently not indexed", 58 URLs;
   - "Page with redirect", 13 URLs;
   - "Blocked by another 4xx", 5 URLs.

   Keep them out of the repository, or in a private folder.
2. **Build the docs redirect map.** For each 404 URL, decide between:
   - **301 to the closest live page**: same topic, in the platform space if it still exists, otherwise the General space;
   - **410 / leave as 404**: only when no equivalent content exists anywhere.

   The map lives as a table in this spec, or as a CSV next to it. Known examples:

   | Old URL | Status | Target |
   |---|---|---|
   | `/framer/guides/create-a-color-palette` | 404 | `/guides/create-a-color-palette` (or the Framer equivalent if it exists) |
   | `/penpot/guides/create-a-color-palette-1` | 404 | `/guides/create-a-color-palette` |
   | `/others/release-notes/ui-color-palette-21` (and the other release notes) | 404 | their new location, or the release-notes index |
   | `/introduction/fees-from-the-credit-system` | 404 | `/user-management/plans`. Credits are inactive; do not recreate the page. |
   | `/general/user-management/manage-your-license` | **307** | must become a **301** to `/user-management/manage-your-license` |

   **Done (2026-10-28).** GitBook site redirects are a paid feature and are not used. Instead:
   - **In-space redirects** in `general/`, `legal/` and `claude/` `.gitbook.yaml` cover 81 old URLs. Check after the first sync that they apply.
   - **106 cross-space URLs stay 404.** Google drops them, and the new pages are indexed through the sitemap and manual inspection (step 4).
   - **Internal links fixed**: 88 links across 26 platform pages pointed to `/general/...`, which answers a 307. They now use the final URLs.
   - The complete map stays in `docs-ui-color-palette/redirects/site-redirects.csv`, in case site redirects become available.

3. **Apply the redirects in GitBook.**
   - Use site-level redirects in the GitBook site settings, or a `redirects:` block in the space's `.gitbook.yaml`.
   - Check in the GitBook docs which mechanism applies to a Git-synced multi-space site before implementing.
   - Redirects must be permanent (301 or 308).
4. **Clean up the sitemaps.**
   - In Search Console, remove `https://ui-color-palette.com/sitemap.xml` and `https://www.ui-color-palette.com/sitemap.xml`.
   - In Search Console, submit `https://docs.ui-color-palette.com/sitemap.xml`.
   - In the website repo, add a 301 from `/sitemap.xml` to `/sitemap-index.xml` (`netlify.toml` or `public/_redirects`).
   - Reference the docs sitemap from `docs.` `robots.txt` if GitBook does not already do it.
5. **Noindex the application subdomains.**
   - `auth.`, `app.` and `plugin.ui-color-palette.com` send `X-Robots-Tag: noindex, nofollow`, or the equivalent `<meta name="robots">`, on every response.
   - Do **not** block them in `robots.txt`: Google has to crawl a page to see the noindex.
   - The embed iframe on the site's platform pages keeps working, because noindex does not affect embedding.
6. **Investigate "Crawled, currently not indexed".**
   - For each of the 58 URLs, classify it as:
     - a near-duplicate of another platform's page (same guide in figma/, framer/, penpot/, sketch/);
     - a thin page (release note, short legal page);
     - a valid page that needs links.
   - For near-duplicates, prefer one canonical guide (General space) with platform-specific sections.
     - The alternative is a `rel=canonical` from each platform copy to the General version, when the content is truly identical.
     - Never canonicalize pages whose content actually differs.
   - Thin release notes: group them into one page per year, with 301s from the individual notes, or keep them and link them from a dated index.
7. **Unify the docs and the site for Claude.** Docs `/claude` ranks 8.7 on 2.4k impressions. Site `/claude` ranks 12 on 156 impressions. Split the intent so they stop competing:
   - **Site `/claude`** is the product page for "claude color palette", "claude ai color palette" and "color palette mcp" (what it is, what you get, install CTA). Details are in [02-capability-pages.md](02-capability-pages.md), Lot C.
   - **Docs `/claude`** is the setup reference ("install", "skills", "agents", "4-phase workflow").
   - Each links to the other with a descriptive anchor. Titles must not share the same primary query.
   - **Done (2026-10-28):**
     - The site `/claude` title is now "Claude Color Palette Plugin — UI Color Palette".
     - Every platform page links to its docs space, through a "Set it up" card that replaces the `/download` card.
     - Docs `/claude` links back to the site.
     - The docs `/claude` title is deliberately unchanged: it brings 54 clicks and ranks 8.7. Revisit only if Search Console shows the two pages alternating on the same query.
8. **Quick CTR win on the docs.** Rewrite the title and description of `/guides/export-a-color-palette-to-code` (541 impressions, position 9.2, CTR 0.55%) to name the formats people search for: CSS, Tailwind, design tokens, SwiftUI, Compose.
9. **Re-check after 2–4 weeks.**
   - In Search Console, click "Validate fix" on each reason.
   - Follow the Pages report until the not-indexed count trends down and indexed pages exceed the 64 of early September.

## Rules

- Never redirect everything to the home page, or to a docs root. Google treats that as a soft 404. One topic goes to the closest topic.
- No redirect chains. Every redirect points straight to a final 200 URL.
- Do not delete docs pages without a redirect from now on. Every future restructure ships with its redirect table, and the docs repo documents that rule.
- Do not mention credits when rewriting docs pages (inactive system).
- Canonicals only between truly equivalent pages. Never cross-canonical between platforms whose features differ (see `platform-capabilities.md`).

## Acceptance criteria

- [ ] Given an old URL listed in a space's `.gitbook.yaml`, when requested, then it redirects to a live 200 page. The cross-space URLs listed in `redirects/README.md` are allowed to stay 404.
- [ ] Given any docs page, when its links are listed, then none points to `/general/...`.
- [ ] Given `/general/user-management/manage-your-license`, when requested, then it returns a permanent redirect.
- [ ] Given Search Console Sitemaps, when listed, then only `ui-color-palette.com/sitemap-index.xml` and `docs.ui-color-palette.com/sitemap.xml` remain, both processed without errors.
- [ ] Given `https://ui-color-palette.com/sitemap.xml`, when requested, then it returns a 301 to `/sitemap-index.xml`.
- [ ] Given any URL on `auth.`, `app.` or `plugin.`, when requested, then the response carries `noindex`.
- [ ] Given site `/claude` and docs `/claude`, when built, then each links to the other and their titles target different primary queries.
- [ ] Given 4 weeks after deploy, when the Pages report is read, then "Not found (404)" is trending down and indexed pages are above 64.

## Out of scope

- Moving the docs off GitBook.
- Rewriting docs content beyond titles, descriptions and duplicate consolidation.

## Implementation notes

- **Docs**: GitBook with Git sync. Configuration is in `docs-ui-color-palette/gitbook-docs.yaml`, with one space per folder: general, figma, penpot, sketch, framer, claude, mcp, api, legal. Hosting is served through Vercel and Cloudflare.
- **Website**: Netlify. The `/sitemap.xml` redirect goes in `netlify.toml` or `public/_redirects`.
- **Subdomains**: the `robots.txt` on `auth.`, `app.` and `plugin.` is Cloudflare's managed content-signals file. Add the noindex header in each app, or with a Cloudflare Transform Rule on the zone.
- **Measurement**: add URL-prefix Search Console properties for `https://ui-color-palette.com/` and `https://docs.ui-color-palette.com/` next to the domain property, so each host is reported separately (see [00-measurement.md](00-measurement.md)).

## See also

- [baseline.md](baseline.md): the figures behind this spec.
- [02-capability-pages.md](02-capability-pages.md): the new order of pages.

## History

| Date | Change |
| ---- | ------ |
| 2026-10-28 | Created from the first Search Console export |
