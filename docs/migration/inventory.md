# Inventory of the Figma Sites version

Snapshot of https://ui-color-palette.com taken on 2026-10-23, before the migration to Astro. Raw data: `inventory.json`.

Every URL below must keep the same path in the new site, so no redirects are needed.

## Pages

| Path                                                               | Title                                                        | Figma node | Words | H1  |
| ------------------------------------------------------------------ | ------------------------------------------------------------ | ---------- | ----- | --- |
| `/`                                                                | UI Color Palette — WCAG Color Palettes for UI                | 0:1926     | 3104  | 0   |
| `/capabilities`                                                    | Capabilities — Generate, Master & Deploy Color               | 3:20329    | 5226  | 0   |
| `/figma`                                                           | UI Color Palette for Figma — Accessible Color Scales         | —          | 1439  | 0   |
| `/penpot`                                                          | UI Color Palette for Penpot — Open-Source Color              | —          | 1346  | 0   |
| `/sketch`                                                          | UI Color Palette for Sketch — Native Mac Color               | —          | 1240  | 0   |
| `/framer`                                                          | UI Color Palette for Framer — Ship Accessible Color          | —          | 1327  | 0   |
| `/claude`                                                          | UI Color Palette for Claude — A Color Studio in Claude       | —          | 1041  | 0   |
| `/pricing`                                                         | Pricing — UI Color Palette Plans                             | 3:3959     | 1822  | 0   |
| `/download`                                                        | Download UI Color Palette — Every Platform                   | —          | 892   | 0   |
| `/blog/3-ways-ai-now-builds-audits-and-deploys-your-color-systems` | 3 ways AI now builds, audits, and deploys your color systems | —          | 3056  | 0   |
| `/blog/goodbye-2025-plugin-and-welcome-to-2026-app`                | Goodbye 2025 plugin and welcome to 2026 app                  | —          | 2105  | 0   |

## Descriptions

- **/**: Generate, master, and deploy accessible color palettes in seconds. WCAG & APCA-ready scales for Figma, Penpot, Sketch, Framer, and any AI.
- **/capabilities**: Explore everything UI Color Palette can do: AI generation, image extraction, contrast mastering, color modes, and token & Tailwind export.
- **/figma**: Build WCAG-compliant color palettes right inside Figma. Generate scales, check contrast, and sync styles, variables, and tokens without leaving your file.
- **/penpot**: Create accessible color palettes in Penpot, tokens included. Generate scales, master contrast, and export open design tokens for your whole team.
- **/sketch**: Design accessible color palettes natively on Mac with Sketch. Generate WCAG scales, fine-tune every shade, and sync with your local libraries.
- **/framer**: Go from blank canvas to shipped site with accessible color in Framer. Generate palettes, check contrast, and export production-ready tokens.
- **/claude**: Design accessible color palettes right inside Claude, with agents, skills, and pre-connected design & code integrations for GitHub and GitLab.
- **/pricing**: Simple, honest pricing for solo makers and teams. Start free on /basic, unlock unlimited color on /pro at $3.99/week, or scale with /ultimate.
- **/download**: Get UI Color Palette for Figma, Penpot, Sketch, Framer, MCP, and Claude. Install in seconds and start building accessible color palettes today.
- **/blog/3-ways-ai-now-builds-audits-and-deploys-your-color-systems**: Generate, master, and deploy accessible color palettes in seconds. WCAG & APCA-ready scales for Figma, Penpot, Sketch, Framer, and any AI.
- **/blog/goodbye-2025-plugin-and-welcome-to-2026-app**: Generate, master, and deploy accessible color palettes in seconds. WCAG & APCA-ready scales for Figma, Penpot, Sketch, Framer, and any AI.

## Issues to fix in the migration

1. **No `<h1>` on any page.** The only H1 in the source is the `<noscript>` message “This site requires JavaScript”.
2. **Headings repeated once per breakpoint.** Figma Sites outputs the Desktop, Tablet and Mobile DOM, so each H2/H3 appears up to 4 times.
3. **No `rel="canonical"`** on any page.
4. **Same JSON-LD on every page** (`Organization` + `SoftwareApplication`). Blog posts have no `BlogPosting`, and there is no per-page `FAQPage` or `BreadcrumbList`.
5. **Blog posts reuse the home description** instead of their own.
6. **Almost no `alt` text**: over 95% of `<img>` tags have none.
7. **Heavy pages**: 270 KB to 1.5 MB of HTML each, with content rendered by JavaScript.
8. **No `robots.txt` and no `llms.txt`** (both return 404).
9. **Sitemap `lastmod` equals the publish time** for every URL, not the real modification date.
10. **Hashed asset paths** (`/_assets/v11/<sha>.png`) with no descriptive file names.

## Figma source

File `edb7rYGuOugjDuxo1FqaYO`. Each page is a section with 4 frames: Desktop 1920, Desktop 1280, Tablet 800, Mobile 357–375.

- **Home** (`0:1926`): Header, Jumbotron, Summary, Platforms, Extra, Faq, Publish, Reinsurance, Footer
- **Pricing** (`3:3959`): Header, Jumbotron, Pricing, Compare, FAQ, Reinsurance, Footer
- **Capabilities** (`3:20329`): Header, Jumbotron, Generate, Master, Deploy, Superpowers, Who, Reinsurance, Footer

Shared components: Header, Jumbotron, FAQ, Reinsurance, Footer.
