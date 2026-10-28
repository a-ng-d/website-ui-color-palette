# Phase 5 — Monthly optimization loop

- **Status**: Draft
- **Package(s) concerned**: `website-ui-color-palette`
- **Related spec**: [00-measurement.md](00-measurement.md), [02-capability-pages.md](02-capability-pages.md), [03-blog-clusters.md](03-blog-clusters.md)

## Problem

Publishing without measuring leads to pages that never rank, cannibalization between pages and articles, and stale comparison facts. A fixed routine turns Search Console and AI-panel data into a short, prioritized list of edits each month.

## Monthly routine (first working week)

1. **Export GSC and Bing data** for the last 28 days and append the aggregates to `docs/seo/baseline.md`.
2. **Triage**, producing at most 10 actions:

   | Signal | Action |
   |---|---|
   | Page in positions 1–10 with CTR < 2% | Rewrite the title and description to match the dominant query |
   | Query in positions 5–15 with ≥ 100 impressions | Enrich the ranking page: add a section answering the query, a FAQ entry and 1–2 internal links from related pages |
   | Two URLs alternating on the same query | Cannibalization: differentiate the angles, or merge and 301 |
   | Query with impressions and no matching page | Add it to the Phase 2 or Phase 3 backlog |
   | Page indexed but with no impressions after 60 days | Review intent fit and internal links; improve or consolidate |
   | Sitemap URL "Discovered/Crawled – not indexed" | Check quality, add internal links, request indexing |

3. **AI-citation panel.** Re-run the prompt set from [00-measurement.md](00-measurement.md) and log the results in `geo-panel.md`. For each prompt where a competitor is cited and we are not:
   - find the cited source;
   - decide whether we need a better page (Phase 2), an article (Phase 3) or presence on that source (Phase 4).
4. **`llms.txt` / `llms-full.txt`**: check that every new page is included and that the descriptions are current.
5. **Report**: a 5-line summary in `docs/seo/reports/YYYY-MM.md` covering the KPIs vs. the previous month, the actions taken and the actions planned.

## Quarterly routine

- Re-verify every competitor fact on `/compare/*` pages and update "Last verified".
- Fact-check all capability pages against the latest specs and release notes. Draft features may have shipped and limits may have changed. Bump `updatedDate` where facts change.
- Run Lighthouse (mobile) on the home page, one capability page, one platform page and one article.
- Review the prompt set and add prompts for new features. Never edit existing ones.

## Rules

- Changes driven by the loop go through the normal governance (`site-orchestrator` plus reviewers).
- Never rename a slug to chase a keyword. Change the title and h1 instead.
- One change per page per cycle where possible, so its effect can be attributed.

## Acceptance criteria

- [ ] Given a month, when the routine runs, then `reports/YYYY-MM.md` exists with KPIs, actions taken and actions planned.
- [ ] Given a comparison page, when a quarter passes, then its "Last verified" date is less than 100 days old.
- [ ] Given a cannibalization signal, when it is detected, then it is resolved within the next cycle.

## Out of scope

- Automated dashboards. Possible later with the GSC API and Mixpanel; that needs a separate spec.

## History

| Date | Change |
| ---- | ------ |
| 2026-10-26 | Created |
