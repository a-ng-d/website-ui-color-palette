---
title: 'APCA vs WCAG 2: what changes for UI colors'
description: 'APCA vs WCAG 2 for UI colors: how each measures contrast, where they disagree on dark themes and brand colors, and why you meet WCAG 2 first.'
cover: ../../assets/blog/apca-vs-wcag-2-what-changes-for-ui-colors.png
coverAlt: Two contrast scores side by side, a WCAG 2 ratio of 4.5:1 and an APCA Lc value, over the same text and background swatch
author: Aurélien Grimaud
authorUrl: https://uicp.ylb.lt/network
pubDate: 2026-11-03
tags: [accessibility, contrast, wcag, apca]
category: Guides
pillar: /capabilities/wcag-apca-contrast
seo:
  title: 'APCA vs WCAG 2 for UI colors'
faq:
  - question: Is APCA part of WCAG?
    answer: No. APCA is not a W3C standard. It is a candidate contrast method for WCAG 3, whose September 2026 Working Draft still leaves the contrast measure to be determined, so the WCAG 2 ratio remains the rule audits check.
  - question: What APCA score equals a 4.5:1 contrast ratio?
    answer: There is no exact equivalent, because APCA depends on which color is the text, on font size and on weight. Pairs close to 4.5:1 can score anywhere from about Lc 30 to Lc 77. For body text, APCA recommends Lc 75 as a minimum and Lc 90 as the preferred level.
  - question: Why is my APCA score negative?
    answer: The sign shows polarity. A positive Lc means dark text on a light background, a negative Lc means light text on a dark background. Compare the absolute value with the APCA levels.
  - question: Can I use APCA instead of WCAG 2 for accessibility compliance?
    answer: Not today. Accessibility laws and standards cite WCAG 2, so your colors must meet its ratios to conform. Use APCA as an extra readability check on top of WCAG 2.
  - question: Will WCAG 3 replace WCAG 2 contrast?
    answer: Not yet. WCAG 3 is a W3C Working Draft and its contrast method is still to be determined. The W3C says WCAG 3 is not expected to be complete for a few more years, and that WCAG 2 will not be deprecated for several years after it is finalized, so keep conforming to WCAG 2.
---

WCAG 2 measures contrast as a luminance ratio between two colors, from 1:1 to 21:1, with fixed minimums such as 4.5:1 for body text. APCA measures perceived lightness contrast (Lc), changes with which color is the text, and sets its minimums by font size and weight.

WCAG 2 is the W3C standard that audits and accessibility laws rely on today; APCA is a candidate method, not a W3C standard. So meet WCAG 2 to comply, and use APCA to refine readability, especially in dark themes and on mid-tone brand colors.

This guide compares the two methods on real color pairs, shows where they disagree, and explains how to read both scores on every shade of your palette.

## What is the difference between APCA and WCAG 2?

The **WCAG 2 contrast ratio** compares the relative luminance of two colors with one formula, `(L1 + 0.05) / (L2 + 0.05)`, where L1 is the lighter color ([Understanding SC 1.4.3, W3C](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)).

**APCA** (Accessible Perceptual Contrast Algorithm) rates the lightness contrast between a text color and its background, and its guidance depends on the size and weight of the text ([APCA in a Nutshell](https://git.apcacontrast.com/documentation/APCA_in_a_Nutshell.html)).

| | WCAG 2 contrast ratio | APCA |
| --- | --- | --- |
| What it measures | Luminance ratio between two colors | Perceived lightness contrast between text and background |
| Output | 1:1 to 21:1 | About Lc 106 (black on white) to Lc −108 (white on black) |
| Color order | Doesn't matter: swap text and background, same ratio | Matters: text first, background second, and the sign shows polarity |
| Text size and weight | Two groups: normal text, and large text (18 pt, or 14 pt bold) | The minimum Lc changes with size and weight |
| Body text minimum | 4.5:1 at level AA, 7:1 at AAA | Lc 75 minimum, Lc 90 preferred |
| Near-black colors | Overstates contrast | Scores dark pairs much lower |
| Status | W3C Recommendation (WCAG 2.2) | Not a W3C standard; candidate for WCAG 3, in public beta |
| Needed for compliance | Yes | No |

The output range and polarity come from the [APCA-W3 reference code](https://github.com/Myndex/apca-w3); the levels from APCA in a Nutshell.

## How does the WCAG 2 contrast ratio work?

The ratio goes from 1:1 (no contrast) to 21:1 (black on white). It is symmetric: gray text on white and white text on gray get the same score.

The thresholds for text, large text and UI components, at levels AA and AAA, are in our glossary entry on the [WCAG contrast ratio](/glossary/wcag-contrast-ratio).

Two details matter when you check a palette:

- **Thresholds are strict** — the W3C says computed values should not be rounded, so 4.499:1 fails 4.5:1.
- **Weight is ignored below the large-text size** — a light 300 weight and a semibold 600 at 16px are held to the same 4.5:1.

The ratio also has a known blind spot. APCA in a Nutshell notes that WCAG 2 "overstates contrast for dark colors", to the point that 4.5:1 can be unreadable when one color is near black.

## How does APCA measure contrast?

APCA returns a lightness contrast value, Lc. The text color goes first and the background second: a positive Lc means dark text on a light background, a negative Lc means light text on a dark background. You compare the absolute value with the levels.

The levels scale with the text, from body text to headlines and non-text elements. The full list, with font sizes, is in our glossary entry on [APCA](/glossary/apca).

These levels assume a reference font such as Helvetica or Arial. A typeface with a smaller x-height needs a larger size to reach the same readability.

## Where do APCA and WCAG 2 disagree?

Here are five pairs, computed with the WCAG 2 formula and APCA-W3. Each pair reads as text on background.

| Pair | WCAG 2 ratio | APCA Lc | What it tells you |
| --- | --- | --- | --- |
| `#767676` on `#FFFFFF` | 4.54:1 | 71.6 | Passes AA, just under APCA's Lc 75 for body text |
| `#FFFFFF` on `#767676` | 4.54:1 | −77.0 | Same ratio, but APCA rates white text higher |
| `#767676` on `#000000` | 4.62:1 | −30.1 | Passes AA, yet sits at APCA's Lc 30 floor for any text |
| `#FFFFFF` on `#1E90FF` | 3.24:1 | −64.4 | Fails AA for body text, above Lc 60 in APCA |
| `#000000` on `#1E90FF` | 6.49:1 | 45.1 | Passes AA, only Lc 45 in APCA, a level for large text |

### Dark themes: WCAG 2 passes text that APCA calls barely readable

Mid-gray text on black passes WCAG 2 AA at 4.62:1. APCA scores it Lc −30, the absolute minimum for any text, such as placeholders. If your dark theme uses gray body text, check it with APCA: a WCAG 2 pass is not enough there.

### Polarity: the same pair gets two APCA scores

Swap `#767676` and white, and the WCAG 2 ratio stays at 4.54:1. APCA gives Lc 71.6 for gray text on white and Lc −77.0 for white text on gray. Light text on a dark background and dark text on a light one are perceived differently, and only APCA reflects it.

### Mid-tone brand colors: the two methods pick different text colors

On a saturated blue such as `#1E90FF`, WCAG 2 prefers black text (6.49:1 against 3.24:1 for white). APCA prefers white (Lc −64.4 against Lc 45.1 for black). The fix is not to pick a method, but a color that passes both: darken the blue to `#0070F3` and white text reaches 4.55:1 and Lc −76.2.

## Which one should you use for UI colors?

Use both, for different jobs:

- **Comply with WCAG 2** — aim for level AA (thresholds in the [WCAG contrast ratio entry](/glossary/wcag-contrast-ratio)). It is what audits check, and what [accessibility laws and policies](https://www.w3.org/WAI/policies/) reference.
- **Refine with APCA** — check that body text reaches Lc 75, and Lc 90 for long reading. Look closely at thin weights and dark-theme pairs.
- **When they disagree, change the color** — move the shade one stop lighter or darker until it passes both, instead of choosing the friendlier score.
- **Claim WCAG 2, not APCA** — state conformance as WCAG 2.2 AA, and treat APCA as an internal readability target.

### What about WCAG 3?

WCAG 3 is a W3C Working Draft. In the [September 2026 draft](https://www.w3.org/TR/wcag-3.0/), the text contrast requirement still reads "contrast measure to be determined", and the editors note that the contrast algorithm "is yet to be determined".

The W3C says WCAG 3 is [not expected to be a completed standard for a few more years](https://www.w3.org/WAI/standards-guidelines/wcag/wcag3-intro/), and that WCAG 2 will not be deprecated for several years after that. APCA is a candidate for WCAG 3, not its adopted method.

## How do you build a WCAG 2 and APCA color palette in UI Color Palette?

To build a WCAG color palette that also reads well under APCA, UI Color Palette scores every shade with both methods, in its Figma, Penpot, Sketch and Framer plugins. The ratio it shows is the WCAG 2.1 ratio, which uses the same formula and text thresholds as WCAG 2.2.

1. **Set your foreground colors** — pick the light and dark foreground colors your interface uses. Black `#000` and white `#FFF` are the defaults, and every score is computed against both.
2. **Read both scores on every shade** — each shade shows its WCAG 2.1 ratio and its APCA score for the light and the dark foreground color, on the free /basic plan. Hover a ratio to see its A, AA or AAA grade.
3. **Set target ratios** — switch the scale from `Lightness` to `Contrast ratio` and type the ratio each stop must reach against the light or dark foreground color, from 1 to 21. The lightness is recomputed until the ratio is met. Targets use the WCAG ratio, so check the APCA score afterwards.
4. **Check the details on /pro** — filter the shades that pass or fail WCAG or APCA, read the score interval of each stop, and open the contrast report: sample text and font weight, the WCAG grade (A, AA or AAA), the APCA score, a readability score based on APCA and a minimum font size.

The docs walk through each setting in [Adjust the contrast configuration](https://docs.ui-color-palette.com/guides/master-a-color-palette#adjust-the-contrast-configuration).

## Next steps

- **See every contrast tool, plan by plan** — the [accessible color palette with WCAG and APCA contrast](/capabilities/wcag-apca-contrast) page lists what you get on /basic and /pro.
- **Pick the color space behind your scale** — [OKLCH vs HSL for UI palettes](/blog/oklch-vs-hsl-for-ui-palettes) shows why lightness steps behave differently across color spaces.
