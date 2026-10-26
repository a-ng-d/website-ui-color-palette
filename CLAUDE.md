# ui-color-palette.com

Static Astro site of UI Color Palette, built with the **@unoff/ui** design system
(Yelbolt UICP theme) for full control over SEO and GEO. The design source is the Figma
file `edb7rYGuOugjDuxo1FqaYO`.

## Load before working

| Task | Skill |
| --- | --- |
| Any page, section, component, style, motion change | `ui-color-palette-corpo-website` (then the reference file it points to) |
| Any blog article | `ui-color-palette-blog-writing` + `seo-geo` |
| Any SEO/GEO, metadata, structured data, content change | `seo-geo` |
| Astro how-tos | `astro` |

Don't plan from memory of the site: the skills hold the conventions.

## Routing (agents in `.claude/agents/`)

Entry point for site evolutions: `claude --agent site-orchestrator`. In any session, apply
the same rules:

- **Blog = SEO**: article work → `blog-writer`, then `seo-reviewer` + `fact-checker`.
- **Content = SEO**: copy, titles, descriptions, FAQ, headings, links, new page →
  `seo-reviewer` (+ `fact-checker` when product facts are stated).
- **Style**: markup, CSS, components, layout, motion, dark mode → `style-guardian`.
- Pure code or a verified one-line fix → no reviewer.

## Non-negotiables

- Everything is a card; static content uses `.surface-card`, clickable cards `<a class="card">`.
- Colours, type, spacing, radii only from @unoff/ui variables / `--site-*` roles. No hex.
- Real `<a href>` for navigation, native `<details>` for disclosures; content in the HTML
  at build time; complete with no JS and with reduced motion.
- Light and dark both work. One `<h1>`, unique title and description, JSON-LD per page.
- Product claims come from `../specs-ui-color-palette/` and `../docs-ui-color-palette/`,
  never from memory.

## Code comments

Comments are rare. Code, names and tokens carry the "what"; a comment exists only for a
**why** the reader cannot recover from the code. Reading noise is a defect.

Keep (short, one to three lines):

- a non-obvious constraint, browser quirk or workaround, with the reason;
- an invariant or **keep-in-sync** link between two files (e.g. the REVEAL selector list
  in `motion.css` and `reveal.ts`);
- a module header that states a file's role when it is not evident from its name;
- a documented exception to a rule (a hex value, a `!important`, an a11y trade-off);
- JSDoc on shared helpers and public props, when the signature does not say enough.

Do not write:

- comments that restate the next line or the selector (`/* Header */`, `// loop over items`);
- narration of a change or its history ("now centred", "fixed", "added for the Menu toggle");
- section banners and decorative separators, except one per long CSS file where it aids
  navigation;
- commented-out code (git has it);
- a comment on every block "for consistency".

When editing code, leave the existing comments that still hold true, update those your
change made false, and add none by default.

## Where things live

- Pages `src/pages/`, components `src/components/`, copy and links `src/data/`,
  `src/config/site.ts`, styles `src/styles/`.
- Blog: Markdown in `src/content/blog/` (schema `src/content.config.ts`, embeds and
  external links `src/plugins/blog-markdown.mjs`, page `src/pages/blog/[id].astro`).
  The file name is the URL: never rename a published post.

## Commands

- `npm run build` — tokens, `astro check` (must be 0 errors), build to `dist/`.
- `npm run dev` — the user often runs it on port 4321: use another port for your own
  server and never stop theirs. Preview: `npx astro preview --port <n>`.
- Don't commit unless asked.
