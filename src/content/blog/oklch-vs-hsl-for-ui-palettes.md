---
title: 'OKLCH vs HSL: why OKLCH builds better UI palettes'
description: 'OKLCH vs HSL for UI color palettes: why HSL lightness breaks contrast from one hue to the next, how OKLCH keeps scale steps even, and how to switch.'
cover: ../../assets/blog/oklch-vs-hsl-for-ui-palettes.png
coverAlt: Two color scales side by side, an HSL scale with uneven steps and an OKLCH scale with even steps, on the UI Color Palette brand background
pubDate: 2026-11-03
tags: [color-spaces, oklch, color-scale, accessibility]
category: Guides
pillar: /capabilities/oklch-lch-color-spaces
seo:
  title: 'OKLCH vs HSL for UI color palettes'
faq:
  - question: Is OKLCH better than HSL for a color palette?
    answer: For a UI palette, yes. OKLCH lightness follows how light a color looks, so the same step has close contrast on every hue. HSL lightness is computed from the RGB channels, so a yellow and a blue at 50% lightness look nothing alike.
  - question: Can I use oklch() in CSS today?
    answer: Yes. The oklch() function is defined in CSS Color Module Level 4 and has worked in all major browsers since May 2023, according to MDN. When a value falls outside what the screen can show, the browser brings it back into range, usually by reducing chroma or clipping.
  - question: Does an OKLCH palette pass WCAG contrast automatically?
    answer: No. OKLCH lightness is close to the luminance that WCAG 2.1 measures, not identical to it, so a stop can still land just under a threshold. UI Color Palette shows the WCAG 2.1 and APCA score of every shade so you can check.
  - question: What is the difference between OKLCH and HSLuv?
    answer: Both use a perceptual lightness. HSLuv is built on CIELUV and keeps the saturation percentage of HSL, while OKLCH is built on OKLab and uses an absolute chroma. In UI Color Palette, OKLCH is the default on every plan and HSLuv is on /pro.
  - question: Does switching a palette from HSL to OKLCH change my source colors?
    answer: 'No. The color space is a palette setting: changing it recomputes the shades, while your source colors and your scale stay as they are. You can switch back at any time.'
---

OKLCH beats HSL for UI palettes because its lightness matches how light a color looks, while HSL lightness is plain arithmetic on the red, green and blue channels. Build a scale in OKLCH and a given stop keeps close contrast on every hue; build it in HSL and two colors at "50% lightness" can sit at 1.07:1 and 8.59:1 against white text.

Here is where HSL breaks, why OKLCH holds, the cases where HSL is still fine, and how to move a palette from one to the other.

## What goes wrong when you build a UI palette in HSL?

You pick your brand blue, yellow and green, and generate a scale for each by stepping the HSL lightness: 90%, 80%, 70%, and so on. The numbers line up perfectly. The result does not.

- **Same stop, different contrast** — your blue 500 takes white text, your yellow 500 does not, and your design tokens promise they are interchangeable.
- **Uneven steps** — some neighboring shades look almost identical while others jump, so a hue ends up with jarring jumps.
- **Oversaturated shades and tints** — some stops come out far more vivid than their neighbors.

Each fix becomes a manual tweak per color, and the scale stops being a system.

## Why is HSL lightness not perceptual?

The HSL color space is a reshaping of RGB. Its lightness is the average of the largest and smallest of the three channels, so it knows nothing about the eye, which is far more sensitive to green than to blue. The W3C says it plainly in [CSS Color Module Level 4](https://www.w3.org/TR/css-color-4/#the-hsl-notation): HSL lightness "does not correspond to the visual perception of lightness across hues."

The six pure hues at `hsl(… 100% 50%)` show the gap. We measured each one twice: its OKLCH lightness, and its contrast with white text using the [WCAG 2.1 relative luminance formula](https://www.w3.org/TR/WCAG21/#dfn-relative-luminance).

| Hue at HSL 50% lightness | Hex | OKLCH lightness | Contrast with white |
| --- | --- | --- | --- |
| Yellow | `#FFFF00` | 0.968 | 1.07:1 |
| Cyan | `#00FFFF` | 0.905 | 1.25:1 |
| Green | `#00FF00` | 0.866 | 1.37:1 |
| Magenta | `#FF00FF` | 0.702 | 3.14:1 |
| Red | `#FF0000` | 0.628 | 4.00:1 |
| Blue | `#0000FF` | 0.452 | 8.59:1 |

One HSL value, a spread from 1.07:1 to 8.59:1. That is the whole problem: in HSL space, "lightness" is a label, not a measurement.

## How does OKLCH fix it?

[OKLCH](/glossary/oklch) describes a color by lightness, chroma and hue, on top of [OKLab](/glossary/oklab), a model Björn Ottosson fitted to human vision and [published in 2020](https://bottosson.github.io/posts/oklab/). Its lightness is designed so that equal steps look equal, whatever the hue.

Run the same check the other way. Fix the OKLCH lightness at 0.6 and the chroma at 0.1, and only turn the hue:

| Hue angle in OKLCH | Hex | Contrast with white |
| --- | --- | --- |
| 29° (red) | `#B4685D` | 4.13:1 |
| 110° (yellow) | `#848538` | 3.88:1 |
| 142° (green) | `#5C8F57` | 3.79:1 |
| 195° (cyan) | `#0F9293` | 3.77:1 |
| 264° (blue) | `#617FBC` | 3.98:1 |
| 328° (magenta) | `#A06A9E` | 4.15:1 |

Six hues, a spread from 3.77:1 to 4.15:1. A stop now means roughly the same thing on every color, so a scale built once works for your whole palette.

OKLab, its Lab form, shares that lightness, so an OKLab color palette gets the same even steps. OKLCH also separates the two things HSL tangles together. Chroma is how colorful the shade is, as an absolute amount, and hue is an angle you can hold steady while lightness changes.

And you can ship it as is: the `oklch()` function is part of CSS Color 4, and [MDN lists it as available in all major browsers since May 2023](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/oklch).

## OKLCH vs HSL vs HSLuv at a glance

[HSLuv](/glossary/hsluv) often comes up in the same search: it keeps the HSL controls on a perceptual base. Here is how the three compare for a UI palette.

| | HSL | HSLuv | OKLCH |
| --- | --- | --- | --- |
| Built on | RGB channels | CIELUV | OKLab |
| Lightness | Computed from RGB, not perceptual | Perceptual | Perceptual |
| Same stop, same contrast across hues | No | Close | Close |
| Saturation or chroma | Percentage, relative to RGB | Percentage of the most colorful value the screen can show | Absolute chroma |
| Every value displayable on screen | Yes | Yes | No: some values are out of gamut |
| Native CSS function | `hsl()` | None | `oklch()` |
| In UI Color Palette | On every plan, with a warning | /pro | The default, on every plan |

## When is HSL still the right choice?

HSL is not wrong everywhere. It is fine for picking a single color by eye, when nothing else depends on its lightness.

In UI Color Palette, without /pro, HSL is the color space that may keep your source color among the shades; on /pro, locking the source colors does the same in any color space. Either way, you trade some contrast consistency for an exact brand color in the scale.

OKLCH has a trade-off too. Because chroma is absolute, some lightness and chroma pairs fall outside what an sRGB screen can display. The browser brings those values back into range, usually by reducing chroma or clipping, so check very vivid shades on a real screen.

Weighing OKLCH against LCH instead? Start with [what LCH is](/glossary/lch).

## How do you build an OKLCH palette in UI Color Palette?

The color space is a setting of each palette. It works the same way in Figma, Penpot, Sketch and Framer.

### 1 · Add your source colors

Pick them, paste their hex codes or extract them from an image. Each source color becomes a full scale of shades.

### 2 · Keep OKLCH, or switch from HSL

Every new palette starts in OKLCH. To change it, open the palette settings, or the settings of the preview panel while you edit, and pick a color space: OKLCH, LCH, CIELAB, OKLab, HSL, HSLuv, HSV or CMYK. OKLCH, LCH and HSL work on every plan; the others need /pro.

The change applies at once and recomputes every shade. Your source colors and your scale stay as they are, so you can browse the color spaces freely before you settle. When you pick HSL, a warning reminds you that it will not keep lightness and contrast consistent.

### 3 · Compare the shades and their scores

Look along a stop: the same step should read as the same lightness across your colors. Each shade shows its WCAG 2.1 and APCA score (see [how APCA and WCAG 2 differ](/blog/apca-vs-wcag-2-what-changes-for-ui-colors)), so you can confirm that a stop meant for text clears the threshold on every hue, not only on the blue.

### 4 · Export oklch() values

The CSS, SCSS and Less exports let you choose the color model of the values they write, including `oklch()` and `lch()`. CSS export works on every plan; SCSS and Less need /pro.

## The short version

- **HSL lightness is arithmetic** — one value can hide a 1.07:1 to 8.59:1 spread in contrast.
- **OKLCH lightness is perceptual** — the same value lands within a few tenths of a ratio across hues.
- **OKLCH is the default** in UI Color Palette, and switching keeps your source colors and scale.
- **Always read the score** — OKLCH gets you close; WCAG 2.1 and APCA confirm it.

[Compare every color space UI Color Palette supports →](/capabilities/oklch-lch-color-spaces)
