# Phase 3 bis — Blog media (clips and last captures)

- **Status**: Draft (deferred by the product owner on 2026-11-04; phase 3 content is done and scheduled without these items)
- **Package(s) concerned**: `website-ui-color-palette` (`src/content/blog/`, `public/videos/`, `.claude/agents/`, `scripts/capture/`)
- **Related spec**: [03-blog-clusters.md](03-blog-clusters.md), skills `ui-color-palette-blog-writing` and `screenstudio-macos-automation`

## Problem

The 15 articles of wave 1 are written, reviewed and scheduled until 2026-12-22, with their covers, diagrams and most screenshots. What is still open are **Screen Studio clips** and two captures that cannot be taken in the web app. Every open item is a `<!-- TODO(asset): … -->` comment in the article, which is stripped from the page and from `llms-full.txt`, so nothing is broken: the articles stand without them.

One clip is done and a model for the others: `lch-vs-oklch-for-design-systems` (hosted in `public/videos/`).

## Remaining items

| Article | Item | Web app? | Notes |
| --- | --- | --- | --- |
| `how-to-build-an-accessible-color-scale` (#2) | Clip, 15–20 s: type a target ratio in the Contrast ratio section | Yes | The app has no Lightness / Contrast ratio switch: both sections are shown, a typed value is rounded to 0.1. Rewrite the TODO from the app |
| `designing-for-color-blindness-ui-checklist` (#4) | Clip, 15–25 s: add a color mode, set a deuteranopia simulation | Yes (/pro license) | The simulation is set in Settings (active mode) or in the mode's parameters, never in Preview |
| `perceptual-lightness-explained` (#7) | Clip, 10–15 s: set stop 50, switch OKLCH to LCH, hover the ratio | Yes | |
| `tailwind-v4-oklch-palette-from-figma` (#11) | Clip, 15–20 s: Tailwind preset, Export, `@theme` block, copy | Yes | Simplest one. The file is hex today; see the OKLCH option in the engine changelog |
| `ai-color-palette-generator-from-a-prompt` (#14) | Clip, 20–25 s: pick a preset, edit the prompt, generate, create the palette | Yes | The preset hover preview is not wired in the code: the TODO must not show it |
| `color-palette-from-image` (#15) | Clip, 20–25 s: drop the beach PNG, read the 5 colors, create the palette | Yes | Test PNG to recreate (sky, sea, sand, dark rock, a coral block, no people) |
| `sync-a-color-palette-to-penpot-design-tokens` (#13) | Clip, 10–15 s in Penpot | No | Needs Penpot and its plugin: by hand |
| `primitive-vs-semantic-color-tokens` (#8) | Still, Claude desktop, `/ui-color-palette:build-color-system` | No | By hand |

Not planned unless the product owner asks: clips for #1, #3 and #5, which have no `TODO(asset)` left in their files.

## Method

- **Screenshots** (when a new one is needed): agent `blog-screenshots`.
- **Clips**: agent `blog-videos`, on top of the `screenstudio-macos-automation` skill. A real Chromium window and the real cursor, driven by `scripts/capture/`. The agent takes over the screen and the mouse for about a minute per clip.
- **Rules of a recording**: UICP preset applied; start the recording, wait 5 s, play, wait 5 s, stop; project named `uicp-blog-<article-slug>-<n>`.
- **From the Screen Studio project to the article**: the user applies the preset, trims, clicks *Share link* and gives the link. `scripts/capture/fetch-share.mjs` downloads the video into `public/videos/<slug>-<what>.mp4` (a share page cannot be framed and its mp4 link expires after 2 hours); the caption-link line replaces the `TODO(asset)` comment.

## Prerequisites

- Reload Claude Code so that `blog-screenshots` and `blog-videos` are available (agents are read at startup).
- Accessibility permission granted to the host app, a freshly relaunched Screen Studio, the machine left alone during each clip.
- Decide how the UICP preset is applied: default preset of Screen Studio, or by hand in the editor after each clip.
- Decide whether the /pro test session may be kept in `~/.config/uicp-capture/session.json` (outside the repo), or whether the test license is asked at each run.
- Rewrite each clip's `TODO(asset)` from the app (labels, no preset hover, no view switch), once the app's own gating gaps are settled.

## Suggested order

#11, #7, #2, #15, #14, #4 (web app), then #13 and #8 by hand.

## Acceptance criteria

- [ ] Given a clip, when it is embedded, then the article holds a caption-link line to a file of `public/videos/` under 8 MB, and the page emits a `VideoObject`.
- [ ] Given a clip, when it is recorded, then it shows only what the article's text says the product does.
- [ ] Given an article, when the build runs, then no `TODO(asset)` comment is left in it, or the item is listed in the table above.

## Out of scope

- Editing, exporting or publishing Screen Studio projects automatically (not validated).
- Penpot and Claude desktop captures by an agent.
- New articles.

## See also

- [03-blog-clusters.md](03-blog-clusters.md)
- `scripts/capture/README.md`
- `.claude/agents/blog-screenshots.md`, `.claude/agents/blog-videos.md`

## History

| Date | Change |
| ---- | ------ |
| 2026-11-04 | Created: capture agents and toolkit written, one clip done (`lch-vs-oklch-for-design-systems`), the rest deferred |
