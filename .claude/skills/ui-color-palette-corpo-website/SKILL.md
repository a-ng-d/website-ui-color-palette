---
name: ui-color-palette-corpo-website
description: Design system, intentions and conventions of the UI Color Palette website (ui-color-palette.com, this Astro repo). Use whenever you create, migrate or change a page or section of this site — e.g. "build the Pricing page", "migrate /capabilities from Figma", "add a section", "add a blog post", "change the hero", "new card", "tweak the animation", "dark mode issue" — and before choosing a component, a colour, a layout or a motion for it. Covers the card-based visual language, @unoff/ui tokens and components (and when NOT to use them), layout patterns, the reveal/light motion system, SEO/GEO rules specific to the site, and the checklist to ship a new page.
---

# UI Color Palette website

The site is a static Astro build that reproduces the Figma design of ui-color-palette.com
with the **@unoff/ui** design system (Yelbolt UICP theme), for full control over SEO and GEO.
Generic how-tos live in the `astro` and `seo-geo` skills; this skill holds what is specific
to this site. Read the reference file that matches the task before writing code.

| Task                                                     | Read                                                |
| -------------------------------------------------------- | --------------------------------------------------- |
| Any visual decision (why things look and move this way)  | [design-intent.md](references/design-intent.md)     |
| Colours, type, spacing, radii, dark mode                 | [tokens.md](references/tokens.md)                   |
| Picking a component, button, link, icon, badge, card     | [components.md](references/components.md)           |
| Composing a section or a page grid, responsive behaviour | [layout-patterns.md](references/layout-patterns.md) |
| Entrance reveal, light in the grooves, spotlight, shards | [motion.md](references/motion.md)                   |
| Building or migrating a page end to end                  | [new-page.md](references/new-page.md)               |

## Non-negotiables

1. **Everything is a card.** Content sits in bordered, rounded cards separated by an 8px
   gutter. A section without a visible container looks broken, especially once motion runs.
2. **Colours only from @unoff/ui variables** (through the `--site-*` roles or the semantic
   `--color-*` variables). No hex in components. Exceptions are listed in tokens.md
   (brand gradient, platform tile colours, terminal snippet primitives).
3. **Links are real `<a href>`**, interactive bits are native (`<details>`, `<button>`).
   Never render a @unoff/ui `<Button>` where navigation or a disclosure must work without JS
   or be crawlable — see the decision table in components.md.
4. **Content is in the HTML at build time.** No client-rendered text, no collapsed content
   that only exists after a click. Motion covers content, it never removes it.
5. **Light and dark both work.** Never hardcode a colour that breaks `yelbolt-uicp-dark`.
6. **One `<h1>` per page**, a unique `title` and `description`, and the JSON-LD that
   describes the page (see new-page.md).
7. **Reduced motion and no-JS are first-class**: the page must be complete and still.

## Workflow for a page or section

1. Get the Figma source (file `edb7rYGuOugjDuxo1FqaYO`; read the Desktop 1280 frame with
   `get_design_context`, one section at a time). The live Figma Sites page is the fallback
   for copy and links.
2. Map each Figma section to an existing pattern (layout-patterns.md) and existing
   components (components.md) before writing anything new.
3. Put copy that is reused or structured (FAQ, platforms, links, nav) in `src/data/` or
   `src/config/site.ts`, not inline.
4. Build the page with `BaseLayout` and its SEO props; let motion apply automatically.
5. Verify with the checklist in new-page.md (build, screenshots light/dark, mobile,
   reduced motion, no-JS, HTML audit).

## Where things live

```
src/config/site.ts        site metadata, nav, every external link
src/data/                 faq.ts, platforms.ts, structured-data.ts (schema.org builders)
src/styles/tokens.css     @unoff/ui imports + site roles + component density overrides
src/styles/global.css     base, typography utilities (.t-*), .illustration-grid, .shards
src/styles/motion.css     reveal sequence, light, spotlight, shards
src/styles/unoff-links.css  :hover/:active for @unoff/ui classes on <a>/<summary>
src/scripts/reveal.ts     IntersectionObserver for reveal + pausing loops
src/components/ui/        Button, TertiaryLink, Tag, ShadeGrid
src/components/layout/    Header (nav, Resources cards, theme toggle), Footer
postcss.config.mjs        drops @unoff/ui rules for other themes/modes (KEEP_MODES)
astro.config.mjs          Preact compat, @unoff-dist alias, icon stylesheet stub
```
