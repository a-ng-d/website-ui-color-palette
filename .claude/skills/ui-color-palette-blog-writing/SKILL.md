---
name: ui-color-palette-blog-writing
description: How to write articles for the UI Color Palette blog (src/content/blog/): voice and tone, article types (guide, feature spotlight, problem→solution, news), SEO and GEO rules, Screen Studio videos and image assets, front-matter, and how to ground every claim in the product specs. Use whenever the user asks to write, outline, draft, rewrite or review a blog post or article, to turn a feature or spec into a guide, to pick a topic or keyword for the blog, or to add images or videos to a post — e.g. "write an article about the color wheel", "a guide for WCAG contrast", "blog post about X", "new article", "add the Screen Studio video".
---

# Writing for the UI Color Palette blog

The blog has two jobs: **show the product at work** (guides, feature spotlights) and
**be found by people who have the problem the product solves** (SEO) **and by AI answers
that quote it** (GEO). Both jobs fail if an article is vague, so every article is
concrete, true, and built around one question a real person asks.

The page, schema and embeds already exist (see `ui-color-palette-corpo-website` →
`references/new-page.md`, "Blog posts"). This skill is about **what goes in the file**.

## 1. Ground it in the specs (non-negotiable)

Never write a feature from memory or from marketing copy. The workspace holds the truth:

| Need | Read |
| --- | --- |
| What a feature does, its rules, limits | `../specs-ui-color-palette/02-features/<feature>.md` (**Rules**, **Acceptance criteria**, **Out of scope**) |
| Plans: /basic vs /pro, caps, what is free | `../docs-ui-color-palette/general/introduction/free-and-pro.md` (the specs carry no plan content) |
| Vocabulary (Source Color, Scale, Theme, Shade, Color System…) | `../specs-ui-color-palette/00-overview/glossary.md`, `01-domain-model/` |
| MCP tools, API, events (for AI / developer articles) | `../specs-ui-color-palette/04-contracts/mcp-tools.md`, `api-endpoints.md` |
| How a user-facing step is worded, screenshots, per-platform steps | `../docs-ui-color-palette/` (`general/`, `figma/`, `claude/`, `mcp/`…) |

Rules:

1. Only describe features whose spec **Status** is `Implemented`. `Draft`/`Proposed` = do not announce.
2. **Spec wins on behaviour, docs win on UI wording.** If they disagree, say so to the
   user instead of picking silently.
3. Check **Platforms** in the spec and the plan in `free-and-pro.md` before writing "you
   can…". A tool can be /pro or missing on a platform: say so, don't imply
   "everyone, everywhere". When unsure, write what the spec guarantees, nothing more.
4. Numbers (users, countries, scale presets, supported languages, prices) come from the
   spec, the pricing page or an existing article. **Never invent a statistic, quote,
   benchmark or testimonial.** If a figure is needed and unknown, ask.
5. Use the product's own terms (glossary) consistently: *source colors*, *scale*, *theme*,
   *shades*, *color system*. One term per concept per article.
6. Keep a short "Sources" note for the user in your reply (which specs/docs you used), not
   in the article.

## 2. Pick the topic: one question, one intent

Start from a problem, not a feature name. Good topics sit where a feature meets a search:

- *How do I make an accessible color palette for my UI?* → scale + WCAG/APCA contrast
- *How do I generate dark mode colors from my brand color?* → themes
- *How do I turn Figma colors into Tailwind / design tokens?* → export, color system
- *How do I pick colors from a photo / get harmonious colors?* → image extraction, color wheel
- *Can AI build and audit a color system?* → AI generation, MCP server, Claude plugin

Per article decide, before writing:

- **Primary question** (the search query, in the reader's words) and 2–4 related ones.
- **Reader**: designer, front-end dev, design-system lead, or someone using an AI agent.
- **Outcome**: what they can do after reading, and the single next step (try the app,
  install on their platform, read the docs).
- **Type** (below). One article = one type = one intent. Split rather than stuff.

Check the existing posts and the `seo-geo` skill for keyword/intent work; do not
duplicate an article that already answers the question — extend or link to it.

## 3. Article types

Use the matching skeleton. Headings are `##` / `###` (the title is the `h1`, from front-matter).

**Guide / how-to** (the SEO workhorse)
1. Answer-first intro, 2–3 sentences: what you will achieve and how long it takes.
2. Prerequisites in one line (platform, plan if relevant).
3. Numbered steps as `## 1 · Verb the thing` sections, each with one image or a short video.
4. Result / what to check (e.g. contrast scores pass AA).
5. Variants or pitfalls, then **next steps** with 2–3 internal links.

**Feature spotlight**
1. The problem in the reader's life (1 short paragraph).
2. What the feature does, in the spec's terms, with a video of it working.
3. Three concrete use cases (`###` each).
4. Limits and availability (platforms, plan) — honest, in one short list.
5. Try it: link to the platform page or the app.

**Problem → solution** (traffic from people who don't know the product yet)
1. Name the pain precisely (hex lists in Slack, failing contrast in dark mode…).
2. Why the usual approach fails.
3. The method (tool-agnostic, genuinely useful on its own).
4. How UI Color Palette does it, in a step-by-step with media.
5. FAQ (front-matter `faq`) answering the long-tail questions.

**News / release** — like "Goodbye 2025 plugin and welcome to 2026 app": a short frame,
dated facts, one `##` per theme, thanks and links to the changelog / ideas / community.

Length: guides 800–1,500 words, spotlights 500–900, news 400–800. Stop when the question
is answered.

## 4. Voice and tone

Read the two published posts before drafting; match them.

- **Direct, warm, second person.** "Describe your intent, and AI generates a coherent
  palette." Speak to the reader, use "we" for the team ("We walked through workflow 1…").
- **Benefit first, mechanism second.** "An afternoon of manual work becomes a few minutes."
- **Short paragraphs** (1–3 sentences). One idea each. Plain words; explain a term the
  first time (WCAG 2.1, APCA, OKLCH, DTCG).
- **Confident, never hype.** No "revolutionary", "game-changing", "seamless", "unlock".
  Say what it does and what it doesn't.
- **Concrete over abstract**: real tool names, real steps, real values (`#88EBF9`,
  "AA on dark backgrounds"), real platform names (Figma, Penpot, Sketch, Framer, Claude).
- **Bold lead-ins in lists**: `- **Start from a palette** — import the one your designer created…`
  (bold label, em dash, one sentence).
- Headings: sentence case or Title Case consistently within a post; numbered workflow
  headings use `1 · Title`. Avoid clever headings that hide the keyword.
- Emoji: only as list markers in a "get started" list (🔌 🧠 🧩 📖) or flags for languages. Never in prose or titles.
- English, American spelling. Arrows `→` only inside link text for a CTA ("Install the Claude plugin →").
- Do not write in the voice of the user as a testimonial, and do not impersonate anyone.

## 5. SEO and GEO rules for the article

The page already emits `BlogPosting`, breadcrumb, `VideoObject` per embed, `FAQPage`,
Open Graph, Twitter and `article:*` tags from the front-matter. Your job is to fill it well.

- **`pubDate`** is required and must be the real publication date, never the git commit
  date or "today" by default. Ask when unsure. `updatedDate` only when facts change.
  The sitemap `lastmod`, RSS and `BlogPosting` read them.
- **Cluster**: link the article to its pillar page and to 1–2 sibling posts as planned in
  `docs/seo/03-blog-clusters.md`; one primary query per article, no duplicates.
- **`title`** (the h1, also the `<title>`): the primary question's wording, ≤ 60 characters
  ideally; put the keyword early. Use `seo.title` if the `<title>` should differ from the h1.
- **`description`**: 120–160 characters, says what the reader gets, includes the keyword
  naturally, no truncation, not a copy of the first sentence.
- **First paragraph answers the question outright** (this is what AI answers and featured
  snippets quote). The rest elaborates.
- **Structure for extraction**: one idea per `##`, lists for steps/options, definitions in
  one sentence ("A scale is a set of lightness stops applied to a theme.").
- **Question headings** where natural ("How do I check contrast?") and a **`faq`** block of
  3–5 real questions with 1–3 sentence answers (plain text, no HTML). Answers must be
  true per the spec.
- **`tags`** (3–5, lowercase, reusable: `accessibility`, `figma`, `ai`, `design-tokens`)
  and one **`category`** (`Guides`, `Product`, `AI`, `News`).
- **Internal links**: 2–4 per article to `/capabilities`, `/pricing`, `/figma`, `/penpot`,
  `/sketch`, `/framer`, `/claude`, `/download`, and to related posts. Descriptive anchor
  text, never "click here". External links (docs, changelog, community) open in a new tab
  automatically.
- **Entities**: name the platforms, standards (WCAG 2.1, APCA), formats (W3C Design Tokens
  / DTCG, Tailwind v4) exactly; it's how search and LLMs connect the page to the topic.
- **Freshness**: set `pubDate`; when you revise facts, set `updatedDate` (don't fake it).
- **One URL per article, forever**: the file name is the slug — lowercase, hyphens,
  keyword-bearing, no date, ≤ 70 characters. Never rename after publishing.
- Don't stuff keywords, don't write a second article inside the first, don't pad.
- Every image has real `alt`; every video has a descriptive caption (link text).

## 6. Assets: images and Screen Studio videos

Media is half of the value of a guide. Plan it while outlining: **one visual per step**.

**Covers** (`cover` front-matter, required)
- `src/assets/blog/<slug>.png`, **1600 × 1080 (3:2)**, same visual family as the existing
  covers (Figma-designed: the topic on the brand background). `coverAlt` describes the
  image for someone who can't see it.
- For a social card with different crop/text, add `seo.ogImage` (1200 × 630 recommended).

**Inline images** (screenshots, diagrams)
- Put them in `src/assets/blog/<slug>/` and reference relatively from the post:
  `![Describe what is shown](../../assets/blog/<slug>/step-1-pick-source-colors.png)`.
  Astro optimises them (WebP, sizes). Give them meaningful file names.
- Screenshot the real UI in the light mode of the plugin at 2× and crop tightly to the
  relevant panel; no personal data; consistent window size across a post.
- Alt text = what the image proves ("Scale panel showing Tailwind lightness stops"), not
  "screenshot".

**Videos from Screen Studio**
- Record one task per clip, **5–30 seconds**, no audio unless narrated; zoom/cursor effects
  are Screen Studio's strength — use them to point at the control that matters.
- Export **MP4 (H.264)**, 1080p (up to 1440p for dense UIs), 30 fps, aim **< 8 MB** each
  (the page loads them with `preload="metadata"`, but keep them light). A short silent
  clip may also be exported as WebM.
- Put the file in `public/videos/<slug>-<what>.mp4` and embed it with a **line that holds
  only the link**; the link text becomes the caption and the accessible name:

  ```md
  [Generate a palette from a prompt with the AI tool](/videos/ai-generation-prompt.mp4)
  ```

- For long walkthroughs, upload to YouTube and put the URL alone on a line (same syntax;
  embedded through `youtube-nocookie`, lazy-loaded, and emitted as `VideoObject`).
  YouTube, Vimeo and Loom URLs are supported.
- Every clip needs a **text equivalent** in the surrounding paragraph or steps (the clip
  illustrates; the words carry the SEO and the accessibility). Don't put the key
  instruction only in the video.
- If an asset doesn't exist yet, write the post with a clearly marked placeholder
  (`<!-- TODO(asset): Screen Studio clip — … -->`) and list the missing assets for the
  user with the exact shot list (what to click, in which order, expected result).

## 7. Front-matter template

```md
---
title: How to build an accessible color palette for your UI
description: Generate a WCAG 2.1 and APCA-ready color scale from one brand color in minutes — step by step, in Figma, Penpot, Sketch or Framer.
cover: ../../assets/blog/accessible-color-palette-for-ui.png
coverAlt: A color scale with contrast scores next to the UI Color Palette logo
author: Aurélien Grimaud
authorUrl: https://uicp.ylb.lt/network
pubDate: 2026-11-03
tags: [accessibility, color-scale, wcag]
category: Guides
seo:
  title: Accessible color palette for UI — WCAG & APCA guide
faq:
  - question: What contrast ratio does WCAG AA require for text?
    answer: 4.5:1 for normal text and 3:1 for large text. UI Color Palette shows the score of every shade.
---
```

Only `title`, `description`, `cover`, `coverAlt` are required. Don't include `draft: false`;
use `draft: true` while an article is in progress.

## 8. Workflow

1. **Clarify** (max 2 questions, closed options, with a default): topic/question and
   article type. If the user gave a feature, derive the question yourself.
2. **Read** the matching specs/docs (§1). Note the exact behaviours, limits, plan gating.
3. **Outline** in the reply: title, description, keyword, type, `##` list, assets needed
   (shot list), internal links. Get a nod only if the angle is genuinely ambiguous.
4. **Draft** `src/content/blog/<slug>.md` in the voice of §4, with real assets or marked
   placeholders.
5. **Check** (all of it):
   - [ ] Every product claim traces to a spec/doc; nothing from a Draft spec; platforms and plans stated honestly
   - [ ] First paragraph answers the primary question
   - [ ] Title ≤ ~60 chars, description 120–160 chars, 3–5 tags, 1 category, 3–5 FAQ if relevant
   - [ ] 2–4 internal links, descriptive anchors; no bare URLs except embeds
   - [ ] Every image has alt; every video is a caption-link on its own line with a text equivalent
   - [ ] No hype words, no invented numbers or quotes
   - [ ] `npm run build` → 0 errors; open `dist/blog/<slug>.html`: one `h1`, canonical,
         JSON-LD parses (`BlogPosting`, plus `VideoObject`/`FAQPage` when used)
6. **Report** to the user: file path, what's still missing (assets, dates, URLs), and the
   specs used.

## Don'ts

- Don't edit the page template or the plugin to suit one article; if a new content
  capability is needed (callout, comparison table, code tabs), propose it separately.
- Don't publish without `pubDate`, unless the user said dates are unknown (then say so).
- Don't translate or add a second language here; the blog is English only for now.
- Don't paste long chunks from the docs: rewrite for the reader and link to the docs.
