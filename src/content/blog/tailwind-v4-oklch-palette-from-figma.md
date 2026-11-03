---
title: 'Generate a Tailwind v4 OKLCH palette from Figma'
description: 'Build a Tailwind v4 OKLCH palette in Figma: stops 50 to 950, contrast scores, oklch() values to paste into @theme, or a ready v4 file in hex.'
cover: ../../assets/blog/tailwind-v4-oklch-palette-from-figma.png
coverAlt: An 11-stop blue scale from 50 to 950 next to a Tailwind v4 @theme block where each stop is a --color-brand-* variable with its oklch() value
author: Aurélien Grimaud
authorUrl: https://uicp.ylb.lt/network
pubDate: 2026-11-27
tags: [tailwind, oklch, color-scale, design-tokens]
category: Guides
pillar: /capabilities/tailwind-color-palette
seo:
  title: 'Tailwind v4 OKLCH palette from Figma'
faq:
  - question: Do Tailwind v4 colors have to be written in oklch()?
    answer: No. A --color-* variable in @theme takes any CSS color, and Tailwind's custom palette example uses hex. Tailwind v4 defines its default palette in oklch(), so oklch() values keep your palette in the same model and let you read lightness and chroma directly.
  - question: Which browsers support an OKLCH palette in Tailwind v4?
    answer: Tailwind v4 targets Safari 16.4, Chrome 111 and Firefox 128 and does not work in older browsers. All three support oklch(), which MDN lists as available in every major browser since May 2023, so a Tailwind v4 project needs no extra fallback for it.
  - question: Why did bg-white and text-black stop working after I imported my palette?
    answer: 'The UI Color Palette Tailwind v4 file starts with --color-*: initial, which removes every default color, white and black included. Add --color-white: #fff; and --color-black: #000; to your @theme block, as Tailwind''s custom palette example does.'
  - question: How do I move a Tailwind v3 color palette to Tailwind v4?
    answer: Each theme.colors entry becomes a CSS variable in @theme, so colors.brand.500 turns into --color-brand-500 and the utilities keep their names. UI Color Palette exports both versions, so you can export the same palette as Tailwind v4 instead of converting the file by hand.
  - question: Can I export P3 colors for Tailwind?
    answer: No. The Tailwind v3 and v4 files write hex values. P3 is a color space option of the CSS export only, next to RGB, hex, HSL, LCH and OKLCH.
---

A Tailwind v4 OKLCH palette is a set of `--color-<name>-<stop>` variables declared in an `@theme` block, one per shade, with stops named 50 to 950 so utilities such as `bg-brand-600` work. In Figma, UI Color Palette computes the scale in OKLCH with its Tailwind preset and scores every shade; its free CSS export writes `oklch()` values you paste into `@theme`, and its /pro Tailwind v4 file writes the same shades in hex.

Here is what changed in Tailwind v4, how `@theme` handles custom colors, and the five steps from Figma to your CSS.

**What you need**: a Tailwind v4 project and [UI Color Palette in Figma](/figma) (it works the same in Penpot, Sketch and Framer). The preset, the contrast scores and the CSS export with `oklch()` values are free on /basic; the Tailwind v4 file needs /pro.

## What changed for colors in Tailwind v4?

Tailwind v4 moved its configuration from JavaScript to CSS. In the [v4.0 announcement](https://tailwindcss.com/blog/tailwindcss-v4#css-first-configuration), the team calls this shift from `tailwind.config.js` to the CSS file "one of the biggest changes" of the release. Colors are now theme variables in the `--color-*` namespace, and each one generates its utilities.

| | Tailwind v3 | Tailwind v4 |
| --- | --- | --- |
| Where colors live | `theme.colors` in `tailwind.config.js` | `--color-*` variables in an `@theme` block |
| How Tailwind loads it | Detected automatically | `@import "tailwindcss"` in your CSS; a JS config needs `@config` |
| A brand shade | `colors.brand.500` | `--color-brand-500` |
| Default palette values | rgb | oklch |
| Browsers | Older browsers too (v3.4) | Safari 16.4, Chrome 111, Firefox 128 and later |

The [default palette moved from rgb to oklch](https://tailwindcss.com/blog/tailwindcss-v4#modernized-p3-color-palette) to use the wider gamut of modern screens. Opacity modifiers [compile to `color-mix()`](https://tailwindcss.com/blog/tailwindcss-v4#designed-for-the-modern-web), so they work on any color value, including your own variables. The browser targets come from the [compatibility page](https://tailwindcss.com/docs/compatibility#browser-support).

## How do you add custom colors to a Tailwind v4 theme?

Declare them in `@theme`. Tailwind's [theme variable namespaces](https://tailwindcss.com/docs/theme#theme-variable-namespaces) map `--color-*` to every color utility: `bg-`, `text-`, `border-`, `fill-` and the rest. You then choose between extending and replacing the defaults.

- **Extend** — add your variables and keep Tailwind's colors. `bg-brand-600` and `bg-slate-200` both work.
- **Replace** — start the block with `--color-*: initial`. Tailwind [removes every default color](https://tailwindcss.com/docs/colors#using-a-custom-palette) and only yours remain.
- **Remove a few** — set one color's namespace to `initial`, as in `--color-lime-*: initial`, to [drop just that color](https://tailwindcss.com/docs/colors#disabling-default-colors).

```css
@import "tailwindcss";

@theme {
  --color-*: initial;
  --color-white: #fff;
  --color-black: #000;
  --color-brand-500: oklch(55% 0.212 262);
}
```

Replacing also removes `white` and `black`, so add them back if you use `bg-white` or `text-black`.

## Why name your stops 50 to 950?

Tailwind's default palette uses 11 stops, from 50 to 950. Naming your shades the same way keeps the class names your team already knows: `bg-brand-50` for a page tint, `text-brand-700` for a link. It also lets your brand colors sit next to Tailwind's grays with the same meaning per stop.

Use one set of stops for every color. A stop name is a promise that brand 600 and success 600 play the same role, and that only holds if every color shares the scale.

## 1 · Build the palette in OKLCH

Open UI Color Palette in Figma and create a palette. Every new palette starts in OKLCH, so the shades are computed in that space unless you change it in the palette settings. Add your source colors: pick them on the canvas, paste their hex codes or generate them.

Name each color the way you want its classes to read. A color named Brand becomes `--color-brand-500` and `bg-brand-500`.

## 2 · Apply the Tailwind preset

In the scale, pick the Tailwind preset: 11 stops from 50 to 950, the same names as Tailwind's palette. It is free on every plan, like Material 3.

A preset keeps its own stops, so you can't add or remove one. If you need a different set, a `Custom` scale takes up to 6 stops on /basic and 24 on /pro, but its names will no longer match Tailwind's.

<!-- TODO(asset): Screen Studio clip, 15–20 s, no audio, light mode. 1) A palette with one blue source color named Brand (#2563EB), color space OKLCH; 2) open the scale preset menu and pick "Tailwind, 50-950" (zoom on the menu); 3) the 11 shades appear; 4) switch to the Export tab, open the format menu and pick Tailwind → "Tailwind v4 (CSS)"; 5) the preview shows the @theme block; click Copy and show the "copied" confirmation. Expected result: preview starting with @import "tailwindcss"; and --color-*: initial;. Save as public/videos/tailwind-v4-oklch-palette-from-figma-export.mp4 (< 8 MB). Then add the caption link on its own line above this comment: [Pick the Tailwind preset and export a Tailwind v4 file with UI Color Palette in Figma](/videos/tailwind-v4-oklch-palette-from-figma-export.mp4) -->

## 3 · Check the contrast before you export

Every shade shows its WCAG 2.1 ratio and APCA score against your light and dark text colors, on every plan. Read them now: once the classes are in your code, a failing pair is harder to find.

For a Brand color of `#2563EB`, the WCAG 2 formula gives these ratios against white text:

| Stop | Hex | vs white | White body text (4.5:1) |
| --- | --- | --- | --- |
| 400 | `#4483FF` | 3.54:1 | Fail: large text and icons only |
| 500 | `#2B68EE` | 4.86:1 | Pass |
| 600 | `#134ED1` | 6.91:1 | Pass, with headroom |

To give each stop a contrast target instead of a lightness, follow [how to build an accessible color scale](/blog/how-to-build-an-accessible-color-scale).

## 4 · Export the Tailwind v4 file (/pro)

Open Export and choose Tailwind v4 (CSS). Copy the code or download `tailwind.theme.css`. Here is the full file for the Brand color above:

```css
@import "tailwindcss";

@theme {
  --color-*: initial;

  /* Brand */
  --color-brand-source: #2563eb;
  --color-brand-950: #02004b;
  --color-brand-900: #000070;
  --color-brand-800: #001a92;
  --color-brand-700: #0034b3;
  --color-brand-600: #134ed1;
  --color-brand-500: #2b68ee;
  --color-brand-400: #4483ff;
  --color-brand-300: #5e9eff;
  --color-brand-200: #7ab9ff;
  --color-brand-100: #98d5ff;
  --color-brand-50: #b8f0ff;
}
```

Use it as your CSS entry, or copy its `@theme` block into yours. Three details to know:

- **Values are hex** — the shades are computed in OKLCH, and the file writes them as hex.
- **The source color has its own variable** — `--color-brand-source` gives you `bg-brand-source`, the exact color you started from.
- **Color modes add their name** — with several modes, a shade becomes `--color-light-brand-500`, so each mode gets its own utilities.

<!-- TODO(asset): screenshot, 2× light mode, cropped to the Export panel — format menu on "Tailwind v4 (CSS)", code preview showing the @theme block above with --color-brand-* lines. Save as src/assets/blog/tailwind-v4-oklch-palette-from-figma/export-tailwind-v4.png. Alt: "Export panel with Tailwind v4 (CSS) selected and the generated @theme block in the preview". -->

## 5 · Or paste oklch() values into @theme (free)

If you want `oklch()` values in your theme, use the CSS export, free on every plan. Choose Custom Properties (CSS), set the color space to OKLCH, and copy the result:

```css
:root {
  /* Brand */
  --brand-50: oklch(92% 0.060 215);
  --brand-500: oklch(55% 0.212 262);
  --brand-600: oklch(47% 0.210 262);
  /* the other stops and the source follow */
}
```

Rename the `--brand-` prefix to `--color-brand-` and move the lines into `@theme`. Without `--color-*: initial`, this extends Tailwind's palette:

```css
@import "tailwindcss";

@theme {
  --color-brand-50: oklch(92% 0.060 215);
  --color-brand-500: oklch(55% 0.212 262);
  --color-brand-600: oklch(47% 0.210 262);
}
```

The CSS export writes lightness as a whole percentage and hue as a whole degree, so these values can differ slightly from the hex file. Pick one export as your source of truth.

## Do you need a fallback for oklch() or P3?

Not inside Tailwind v4's own support range. Tailwind v4 [does not work in browsers older](https://tailwindcss.com/docs/upgrade-guide#browser-requirements) than Safari 16.4, Chrome 111 and Firefox 128, and MDN lists [`oklch()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/oklch) in every major browser since May 2023. If you must support older browsers, Tailwind recommends staying on v3.4.

On gamut, hex is sRGB by definition, so the Tailwind file shows the same colors on every screen. Tailwind's default palette goes beyond sRGB in places; the shades in the Tailwind file stay inside it. P3 values are an option of the CSS export only, not of the Tailwind files. For why OKLCH is the better space for tokens and CSS, see [LCH vs OKLCH for design systems](/blog/lch-vs-oklch-for-design-systems).

## Still on Tailwind v3?

Choose Tailwind v3 (JS) in Export. You get a `tailwind.config.js` file whose `theme.colors` holds every shade, as in `colors.brand['500']`. It sets `theme.colors` directly, so it replaces Tailwind's default colors, like `--color-*: initial` in v4.

When you upgrade, export the same palette again as Tailwind v4 rather than converting the file. Tailwind v4 can still [load a JavaScript config](https://tailwindcss.com/docs/upgrade-guide#using-a-javascript-config-file) through `@config`, but it no longer detects one automatically.

## Next steps

- **Compare the exports and plans** — the [Tailwind color palette generator](/capabilities/tailwind-color-palette) page shows the v4 and v3 files side by side and what each plan includes.
- **Turn the palette into tokens** — [how to structure semantic color tokens](/blog/primitive-vs-semantic-color-tokens) shows how to put roles on top of the shades.
- **Read the format reference** — the docs detail every export in [Export a color palette to code](https://docs.ui-color-palette.com/guides/export-a-color-palette-to-code).
