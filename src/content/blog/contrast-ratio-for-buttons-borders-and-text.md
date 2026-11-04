---
title: 'Contrast ratio for buttons, borders and text'
description: 'The WCAG 2 contrast ratio for buttons, input borders, focus rings and links: which colors to compare, and what hover, pressed and disabled states need.'
cover: ../../assets/blog/contrast-ratio-for-buttons-borders-and-text.png
coverAlt: A primary button, an outlined input and a focus ring, each labeled with the contrast ratio it must reach, on the UI Color Palette brand background
author: Aurélien Grimaud
authorUrl: https://uicp.ylb.lt/network
pubDate: 2026-11-10
tags: [accessibility, contrast, wcag, buttons]
category: Guides
pillar: /capabilities/wcag-apca-contrast
seo:
  title: 'Contrast ratio for buttons: WCAG 2 guide'
faq:
  - question: What contrast ratio does a button need?
    answer: Under WCAG 2, the button label needs 4.5:1 against the button fill, or 3:1 if the label is large text. The fill needs 3:1 against the page only when it is the only visual cue that a control is there, which is rarely the case for a button with a text label.
  - question: Do disabled buttons need to meet contrast requirements?
    answer: No. WCAG 2 exempts inactive components. Success criterion 1.4.3 says text in an inactive user interface component has no contrast requirement, and 1.4.11 excludes inactive components from the 3:1 rule.
  - question: What contrast ratio do input borders need?
    answer: 3:1 against the adjacent background, under WCAG 2.1 success criterion 1.4.11, when the border is what shows that the input is there. A light gray such as #D1D5DB on white reaches only 1.47:1 and fails.
  - question: Does a focus indicator need 3:1 contrast?
    answer: Yes. At level AA, 1.4.11 asks for 3:1 between the focus indicator and the colors next to it. At level AAA, 2.4.13 Focus Appearance also asks for 3:1 between the focused and unfocused states, over an area at least as large as a 2 CSS pixel perimeter.
  - question: Do hover states need to meet a contrast ratio?
    answer: The hover change itself does not. The W3C treats extra hover styling as supplemental, so it needs no 3:1 against the background. The label still needs 4.5:1 against the hover fill, and hover must not reduce the contrast of the focus indicator.
---

Under WCAG 2, a button's label needs a contrast ratio of at least 4.5:1 against the button fill, or 3:1 for large text, while the fill needs 3:1 against the page only when nothing else shows that the button is there. Input borders, focus indicators, icons and state indicators need 3:1 against the colors next to them, and disabled buttons are exempt.

The hard part is the pairs: which two colors you compare, and in which state. Every example below is computed with the WCAG 2 formula.

## Why is button contrast so confusing?

Most teams know one number, 4.5:1, and apply it to text only. Light gray input borders ship unchecked, and brand colors get rejected for primary buttons because the fill was measured against the page instead of against its label.

WCAG 2 actually splits the job in two. Text, including button labels, falls under [success criterion 1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html). Everything that is not text and identifies a control or its state, such as borders, focus rings and icons, falls under [1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html), which asks for 3:1 "against adjacent color(s)".

The thresholds per level, AA and AAA, are in our [WCAG contrast ratio](/glossary/wcag-contrast-ratio) glossary entry. Here we focus on what to compare.

## Which contrast ratio applies to each part of a button?

| Element | What you compare | WCAG 2 criterion | Minimum at level AA |
| --- | --- | --- | --- |
| Button label | Label text vs button fill | 1.4.3 | 4.5:1, or 3:1 for large text |
| Button fill | Fill vs page background | 1.4.11 | None when the label identifies the button; 3:1 when the fill is the only cue |
| Ghost or outline button | Label text vs page background | 1.4.3 | 4.5:1; the border is optional |
| Icon-only button | Icon vs the color behind it | 1.4.11 | 3:1 |
| Input border | Border vs adjacent background | 1.4.11 | 3:1 |
| Focus indicator | Indicator vs adjacent colors | 1.4.11 (2.4.13 at AAA) | 3:1 |
| Hover state | Label text vs hover fill | 1.4.3 | 4.5:1 for the label; the hover change itself has none |
| Selected or pressed state | State indicator vs adjacent colors | 1.4.11 | 3:1 |
| Disabled button | Nothing | Exempt under 1.4.3 and 1.4.11 | None |
| Link in body text | Link vs body text, and each vs background | 1.4.1 (technique G183), 1.4.3 | 3:1 against the text and 4.5:1 against the background, or an underline |

Two rules apply to every row. The W3C says contrast values should not be rounded, so 2.99:1 fails 3:1. And every pair has to pass in every color mode you ship.

## Does the button fill need 3:1 against the page?

Usually not. The Understanding document for 1.4.11 is explicit: "This success criterion does not require that controls have a visual boundary indicating the hit area." A text label is enough to show that a button is there.

Take a secondary button with a `#E5E7EB` fill and a `#111827` label on a white page. The fill reaches only 1.24:1 against the page, but the label reaches 14.33:1 against the fill. The button passes.

The fill becomes a requirement when it is the only thing that reveals the control. The W3C gives the case of a field: "Text inputs that have no border and are differentiated only by a background color must have a 3:1 contrast ratio" against the background.

A fill at 3:1 or more is still a good default for primary buttons. A `#2563EB` fill reaches 5.17:1 against white, so it marks the hit area and carries a white label at the same 5.17:1.

## What about ghost, outline and icon-only buttons?

A ghost button has no fill, so its label is measured against the page. A `#2563EB` label on white passes at 5.17:1. On a dark `#111827` page, the same blue drops to 3.43:1 and fails 4.5:1 for normal text. A lighter `#60A5FA` reaches 6.98:1 there.

An outline button's border is optional under 1.4.11 when the label identifies the button, so it doesn't have to reach 3:1.

An icon-only button has no text to identify it, so the icon becomes the graphic that must be understood. The W3C counts "stand-alone icons such as a print icon (with no text)" as graphical objects, which need 3:1. A `#9CA3AF` icon on white reaches 2.54:1 and fails; `#6B7280` reaches 4.83:1 and passes.

## What contrast do input borders and focus indicators need?

### Input borders

When the border is what shows that a field exists, it needs 3:1 against the background next to it. The W3C example is a full `#767676` border, which reaches 4.54:1 on white.

The usual light gray fails by a wide margin: `#D1D5DB` on white is 1.47:1. Darken it to `#8A8A8A` and it reaches 3.45:1. If you prefer a lighter border, give the field a fill that reaches 3:1 against the page instead.

### Focus indicators

[2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) (level AA) asks that keyboard focus be visible. 1.4.11 adds that the focus indicator needs 3:1 against the colors next to it.

A `#2563EB` focus ring passes on white at 5.17:1 and on `#111827` at 3.43:1. Drawn directly against a `#2563EB` fill, it is 1:1 and disappears. Leave a gap of page background between the ring and the button, or use a ring color that contrasts with both.

At level AAA, [2.4.13 Focus Appearance](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html) goes further: the indicator must be at least as large as a 2 CSS pixel thick perimeter of the component, and have "a contrast ratio of at least 3:1 between the same pixels in the focused and unfocused states".

## Do hover, pressed and disabled states need to pass?

### Hover

The hover change itself has no minimum. The W3C writes that hover treatments "can be considered supplemental and do not themselves need to contrast 3:1 against the background". A `#1D4ED8` hover fill next to the `#2563EB` default is only 1.30:1, and that's fine.

The label is still text: white on `#1D4ED8` reaches 6.70:1. And hover must not make the focus ring or a selected state lose contrast.

### Selected and pressed

A toggle that is pressed, a selected tab or a checked box is a state, and 1.4.11 covers "visual information required to identify user interface components and states". The indicator that shows the state needs 3:1 against the colors next to it.

Under 1.4.11, two states of the same component don't need 3:1 against each other when they never appear side by side. But [1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html) says color must not be "the only visual means of conveying information". If the only change is the fill color, add a second cue: a check mark, a bolder label or a thicker border.

### Disabled

WCAG exempts inactive components. In 1.4.3, text that is "part of an inactive user interface component" has "no contrast requirement". In 1.4.11, the 3:1 rule applies "except for inactive components".

So a `#9CA3AF` label on a `#F3F4F6` disabled fill, at 2.31:1, does not fail. Exempt is a floor, not a goal: if people need to know what the button would do, keep the label readable and tell them why it is disabled.

## How much contrast do links in text need?

A link is text, so it needs 4.5:1 against the background. If it is identified by color alone, with no underline, [technique G183](https://www.w3.org/WAI/WCAG22/Techniques/general/G183) adds that "the contrast ratio between the link text and the static text must be at least 3:1".

A `#2563EB` link in `#111827` body text on white passes both: 3.43:1 against the text and 5.17:1 against the background. Put the same link in `#374151` body text, and the two are only 1.99:1 apart. There, underline the link.

## How do you check contrast across a whole component set?

1. **List the pairs** — default, hover, focus, selected and disabled, in each color mode.
2. **Tag each pair** — text (1.4.3) for labels and links, non-text (1.4.11) for borders, rings, icons and state indicators.
3. **Measure without rounding** — a pair at 4.49:1 fails 4.5:1.
4. **Fix the color, not the rule** — move the failing color one stop lighter or darker in its scale.
5. **Check labels with APCA too** — WCAG 2 is what audits check, but [APCA](/glossary/apca) is closer to perceived contrast, especially on dark themes.

## How does UI Color Palette help you hit these targets?

UI Color Palette scores every shade of your palette with the WCAG 2.1 ratio and the APCA score, in its Figma, Penpot, Sketch and Framer plugins. The WCAG 2.1 ratio uses the same formula and text thresholds as WCAG 2.2.

- **Score shades against your real label colors** — set the light and dark foreground colors of each color mode to your label colors instead of the default white `#FFF` and black `#000`. Each shade shows its WCAG 2.1 ratio and APCA score against both, on the free /basic plan; hover a ratio to see its A, AA or AAA grade.
- **Read borders and icons with the same number** — the WCAG ratio ignores which color is in front, so when a foreground color matches your page background, a shade's ratio is its contrast as a border or icon on that page. Look for 3:1.
- **Build stops from targets** — switch the scale from `Lightness` to `Contrast ratio` and type the ratio a stop must reach against the light or dark foreground color, from 1 to 21, such as 4.5 for fills behind labels and 3 for borders. The lightness is recomputed to meet it, on every plan.
- **Check the edge cases on /pro** — filter the shades that pass or fail WCAG or APCA, separately for the light and dark foreground color, and open a shade's contrast report to try a sample label at your font weight: WCAG grade (A, AA or AAA), APCA score, readability score and minimum font size.

## Next steps

- **See every contrast tool, plan by plan** — the [accessible color palette with WCAG and APCA contrast](/capabilities/wcag-apca-contrast) page lists what you get on /basic and /pro.
- **Compare the two contrast methods** — [APCA vs WCAG 2: what changes for UI colors](/blog/apca-vs-wcag-2-what-changes-for-ui-colors) shows where they disagree on dark themes and mid-tone brand colors.
- **Try it on your own palette** — [download UI Color Palette](/download) for Figma, Penpot, Sketch or Framer.
