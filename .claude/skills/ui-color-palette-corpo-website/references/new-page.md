# Building or migrating a page

## 1. Source and inventory

- Figma file `edb7rYGuOugjDuxo1FqaYO`, one section per page with 4 frames (1920, 1280,
  800, 357/375). Known nodes: Home `0:1926`, Pricing `3:3959`, Capabilities `3:20329`, Figma `14:32192`.
  Work from the **Desktop 1280** frame; check Tablet/Mobile frames for responsive intent.
- Call `create_session` once, then `get_design_context` per section (not per page: pages
  exceed the response limit). Use `get_variable_defs` for type styles.
- `docs/migration/inventory.md` lists the live URLs, titles and descriptions to preserve.
  Paths must stay identical (no trailing slash).

## 2. Map before you build

For each Figma section, pick a pattern from layout-patterns.md and components from
components.md. Only create a new component when no pattern fits; put it in
`src/components/<page>/` (or `ui/` if generic) with scoped styles that use tokens only.

## 3. Page file

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro'
import { organization, softwareApplication, faqPage } from '@/data/structured-data'
---

<BaseLayout
  title="Pricing — UI Color Palette Plans"
  description="120–160 chars, unique, says what the page offers."
  jsonLd={[organization(), softwareApplication(), /* page-specific: faqPage(...), Offer… */]}
>
  <!-- sections -->
</BaseLayout>
```

- Exactly one `<h1>` (the page's main title), then `h2` per section, `h3` for cards.
- `Seo.astro` builds the canonical (`/pricing`, `/` for home), Open Graph and Twitter tags.
- Add a JSON-LD builder to `structured-data.ts` when the page needs a new type
  (e.g. `Offer`/`Product` for pricing, `BlogPosting` for articles, `BreadcrumbList`).
- Blog posts: one Markdown file in `src/content/blog/` (file name = URL, never rename).
  Front-matter (schema in `src/content.config.ts`): `title`, `description`, `cover`,
  `coverAlt`, `author`, `authorUrl`, `pubDate`, `updatedDate`, `tags`, `category`,
  `draft`, `seo: { title, description, ogImage, canonical, noindex }`, `faq: [{question, answer}]`.
  Body: plain Markdown; a line holding only a YouTube / Vimeo / Loom / .mp4 link becomes a
  lazy responsive embed (link text = caption/title) — see `src/plugins/blog-markdown.mjs`.
  The page emits BlogPosting + BreadcrumbList (+ VideoObject per embed, FAQPage if `faq`),
  article:* / keywords metas, reading time. Astro 7 uses Sätteri: plugins are `mdastPlugins`
  on `satteri()`, not remark.
  Writing the article itself (voice, SEO/GEO, specs, Screen Studio assets): see the
  `ui-color-palette-blog-writing` skill.

## 4. Site-wide files to update

- `src/config/site.ts` if the page adds nav or links.
- `src/pages/llms.txt.ts` if the page should be listed for LLMs.
- `src/pages/llms-full.txt.ts` if the page has indexable content: it carries the full text
  for LLMs, `llms.txt` only the one-line entry.
- The sitemap is automatic and `lastmod` comes from `src/plugins/sitemap-lastmod.mjs`
  (git date of the page's content files, `updatedDate ?? pubDate` for posts). A new page
  that reads its content from a new file must be added to that plugin's mapping.
  Robots allow all crawlers (GEO is a goal).
- Every non-home page emits a `BreadcrumbList` (`pageBreadcrumbs` in
  `src/data/structured-data.ts`). Nested pages (`/capabilities/<slug>`, `/compare/<x>`,
  `/glossary/<term>`) include their parent in the trail.
- A new page is linked from at least 2 existing pages (no orphans).
- Product, author and organization profile URLs live in `site.profiles` and
  `site.author.sameAs` (`src/config/site.ts`). Add only verified, live URLs; never invent
  a profile. `site.twitterHandle` stays `null` until an X account exists.
- The wider SEO/GEO program (phases, backlog, rules) is specified in `docs/seo/`; read
  `docs/seo/README.md` before creating capability, comparison or glossary pages.

## 5. Verify (all of it, every page)

1. `npm run build` → `astro check` 0 errors, build complete.
2. HTML audit of `dist/<page>.html`: one h1, title, description, canonical, JSON-LD parses,
   internal links are `<a href>`, no `<div>` inside `<p>`.
3. Screenshots with headless Chromium at 1280 and 390 wide, **light and dark**
   (`colorScheme: 'dark'`), compared with the Figma frames.
4. Motion: captures during the reveal and after; `reducedMotion: 'reduce'` shows everything;
   `javaScriptEnabled: false` shows everything.
5. Keyboard: tab through header, menus, FAQ; focus visible; Escape closes menus.
6. CSS weight (`gzip -9c dist/_astro/*.css | wc -c`): the home page is ~30 KB gzip.

Preview server: `npx astro preview --port <n>`; if Astro says a preview is "already
running" on a dead pid, run `npx astro preview stop` first. The user may have
`npm run dev` on 4321 — use another port and never kill it.

## Gotchas met so far

- @unoff/ui component stylesheets load after `tokens.css`: overrides need the
  `[data-mode]` selector (see tokens.md).
- @unoff/ui text styles set `--text-font-family: "Lexend"`; the site remaps it to the
  self-hosted font.
- `.text-button` sets `display: flex`, which beats the `hidden` attribute — a global
  `[hidden] { display: none !important }` exists for that.
- @unoff/ui states use `:enabled`, which never matches `<a>`/`<summary>`: add hover/active
  in `unoff-links.css` for any new element type.
- `.card` defaults to `width: 200px` (plugin): the site sets `--card-width: auto`.
- Figma SVG exports carry inline colours and `preserveAspectRatio="none"`; clean them.
- `.env.local` can point the hero embed to a local app (`PUBLIC_DEMO_PALETTE_URL`);
  remove it before a production build.
- Open questions to keep in mind: blog `pubDate` values are unknown; Resources menu copy
  needs validation; the app embed shows its cookie banner and beta modal.
