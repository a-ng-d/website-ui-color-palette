import type { Table } from '@/data/blocks'
import { htmlLink } from '@/data/faq'

export type RampSpace = 'oklch' | 'lch' | 'oklab' | 'hsluv'

export interface GlossaryTerm {
  slug: string
  term: string
  /** The h1, when "What is <term>?" does not read well. */
  question?: string
  seo: { title: string; description: string }
  definition: string
  why: string[]
  inProduct: string[]
  visual: RampSpace | 'vision' | 'contrast'
  table?: Table
  capability: { name: string; href: string }
  related: string[]
}

export const glossary = {
  title: 'Color glossary for UI design',
  tagline:
    'The color spaces and terms behind accessible palettes, explained for designers and developers.',
  seo: {
    title: 'Color Glossary for UI Design — UI Color Palette',
    description:
      'Short, precise definitions of the color spaces and terms behind accessible UI palettes, from OKLCH and HSLuv to the types of color blindness.',
  },
}

export const termPath = (term: GlossaryTerm) => `/glossary/${term.slug}`
export const termQuestion = (term: GlossaryTerm) =>
  term.question ?? `What is ${term.term}?`

const wcagApca = {
  name: 'WCAG & APCA contrast',
  href: '/capabilities/wcag-apca-contrast',
}
const colorSpaces = {
  name: 'OKLCH & LCH color spaces',
  href: '/capabilities/oklch-lch-color-spaces',
}

const code = (text: string) => `<code>${text}</code>`
const okLabPost = htmlLink(
  'https://bottosson.github.io/posts/oklab/',
  'Björn Ottosson’s article introducing OKLab'
)
const cssColor4 = htmlLink(
  'https://www.w3.org/TR/css-color-4/',
  'CSS Color Module Level 4'
)

export const glossaryTerms: GlossaryTerm[] = [
  {
    slug: 'oklch',
    term: 'OKLCH',
    seo: {
      title: 'What Is OKLCH? The Color Space Explained — UI Color Palette',
      description:
        'OKLCH describes a color by lightness, chroma and hue on the OKLab model, so equal lightness steps look equal. What it is and why UI palettes use it.',
    },
    definition:
      'OKLCH is a color space that describes a color by lightness (L, 0 to 1), chroma (C, how colorful it is) and hue (h, an angle in degrees). It is the polar form of OKLab, a model fitted to human vision, so equal steps in L look equally light across hues.',
    why: [
      'In HSL, lightness is computed from the RGB channels: a yellow and a blue at 50% lightness look nothing alike. A scale built in OKLCH keeps its steps even from one hue to the next, so the contrast of a given stop stays close across your colors.',
      `Browsers support OKLCH in CSS through the ${code('oklch()')} function, defined in ${cssColor4}. Chroma is absolute rather than a percentage, so some combinations of lightness and chroma fall outside what a screen can show and are brought back into range.`,
    ],
    inProduct: [
      `OKLCH is the default color space of every new palette in UI Color Palette, on every plan, in Figma, Penpot, Sketch and Framer, and through the MCP server. Switching to another space keeps your scale and your source colors.`,
      `CSS, SCSS and Less exports can write ${code('oklch()')} values; with Claude or the MCP server, ${code('generate_code')} takes OKLCH too.`,
    ],
    visual: 'oklch',
    capability: colorSpaces,
    related: ['oklab', 'lch', 'hsluv'],
  },
  {
    slug: 'lch',
    term: 'LCH',
    seo: {
      title: 'What Is LCH? The CIE LCh Color Space — UI Color Palette',
      description:
        'LCH, or CIE LCh, describes a color by lightness, chroma and hue on CIELAB. What it is, how it differs from OKLCH, and how UI color palettes use it.',
    },
    definition:
      'LCH (CIE LCh) is a color space that describes a color by lightness (L, 0 to 100), chroma (C) and hue (h, in degrees). It is the polar form of CIELAB, designed so that distances match perceived color differences, which makes lightness far more even across hues than in HSL.',
    why: [
      `Because its lightness is perceptual, LCH gives scales whose steps look regular from one hue to the next, and contrast you can anticipate. CSS supports it through the lch() function, defined in ${cssColor4}.`,
      `Its known weak spot is hue: blues drift toward purple as chroma changes. ${htmlLink('/glossary/oklch', 'OKLCH')}, built on a newer model, corrects most of that drift.`,
    ],
    inProduct: [
      'A palette in UI Color Palette can be computed in LCH on every plan, in Figma, Penpot, Sketch and Framer, and through the MCP server. You can switch it back to OKLCH, the default, at any time.',
      `CSS, SCSS and Less exports can write lch() values.`,
    ],
    visual: 'lch',
    capability: colorSpaces,
    related: ['oklch', 'oklab', 'hsluv'],
  },
  {
    slug: 'oklab',
    term: 'OKLab',
    seo: {
      title: 'What Is OKLab? The Perceptual Color Space — UI Color Palette',
      description:
        'OKLab is a perceptual color space published in 2020: lightness plus two opponent axes. What it is, how it relates to OKLCH and CIELAB, and how palettes use it.',
    },
    definition:
      'OKLab is a perceptual color space published by Björn Ottosson in 2020. Like CIELAB, it describes a color with a lightness (L) and two opponent axes, a (green to red) and b (blue to yellow), but it predicts lightness, chroma and hue more evenly, especially for blues. OKLCH is the same space in polar form.',
    why: [
      `Its straight a and b axes make it a good space for mixing and interpolating colors: CSS can blend colors in it with color-mix(in oklab, …), which avoids the dull midpoints of RGB blends. The model is described in ${okLabPost}.`,
      `For designing a scale, its polar form ${htmlLink('/glossary/oklch', 'OKLCH')} is easier to read: hue and chroma become an angle and a distance.`,
    ],
    inProduct: [
      'A palette in UI Color Palette can be computed in OKLab on the /pro plan in every design-tool plugin, and through the MCP server.',
      `Switching between them keeps your scale and your source colors.`,
    ],
    visual: 'oklab',
    capability: colorSpaces,
    related: ['oklch', 'lch', 'hsluv'],
  },
  {
    slug: 'hsluv',
    term: 'HSLuv',
    seo: {
      title: 'What Is HSLuv? A Perceptual HSL — UI Color Palette',
      description:
        'HSLuv keeps the hue, saturation and lightness controls of HSL with a perceptual lightness. What it is, its trade-offs against OKLCH, and how palettes use it.',
    },
    definition:
      'HSLuv is a human-friendly alternative to HSL, built on CIELUV. It keeps the hue, saturation and lightness controls of HSL, but its lightness is perceptual and its saturation is a percentage of the most colorful value a screen can show for that hue and lightness, so every value can be displayed.',
    why: [
      `You keep the controls designers already know, with a lightness that looks even across hues — which HSL cannot offer. The reference implementation is published at ${htmlLink('https://www.hsluv.org/', 'hsluv.org')}.`,
      `The trade-off: 100% saturation is not equally vivid for every hue, because the available chroma changes with hue and lightness. ${htmlLink('/glossary/oklch', 'OKLCH')} keeps chroma absolute instead.`,
    ],
    inProduct: [
      'A palette in UI Color Palette can be computed in HSLuv on the /pro plan in every design-tool plugin, and through the MCP server. It works well with the contrast-ratio scale, which sets each stop from a target contrast.',
    ],
    visual: 'hsluv',
    capability: colorSpaces,
    related: ['oklch', 'lch', 'oklab'],
  },
  {
    slug: 'color-blindness-types',
    term: 'Color blindness types',
    question: 'What are the types of color blindness?',
    seo: {
      title: 'Types of Color Blindness: Protanopia to Achromatomaly',
      description:
        'Protanopia, deuteranopia, tritanopia, achromatomaly, achromatopsia: what each of the 8 types of color blindness is, which cones it affects and how colors look.',
    },
    definition:
      'Color blindness, or color vision deficiency, comes in 8 main types, grouped by the cone cells affected: red (protan), green (deutan), blue (tritan), or all of them (achromat). Each group has a partial form, ending in -anomaly, and a complete form, ending in -opia or -opsia.',
    why: [
      `Red-green deficiencies (protan and deutan) are the most common, and men are much more at risk than women; complete color blindness is rare (${htmlLink('https://www.nei.nih.gov/learn-about-eye-health/eye-conditions-and-diseases/color-blindness', 'US National Eye Institute')}).`,
      'Achromatomaly is a partial form of total color blindness: colors look washed out, close to grey, without disappearing entirely as in achromatopsia.',
      `A red error and a green success can look alike to many of these users. Color alone should not carry meaning — WCAG makes it a rule (${htmlLink('https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html', 'Use of Color, 1.4.1')}) — so pair it with text, icons or a clear difference in lightness.`,
    ],
    inProduct: [
      'UI Color Palette simulates the 8 types on any color mode of a palette, in Figma, Penpot, Sketch and Framer, and through the MCP server. Protanomaly is part of the free /basic plan; the other 7 types need /pro.',
      'The contrast between your foreground colors and every shade is simulated too, so the WCAG 2.1 and APCA scores reflect each type of vision.',
    ],
    visual: 'vision',
    table: {
      id: 'types',
      title: 'The 8 types, one by one',
      intro:
        'Grouped by the cones they affect: red, green, blue, then all of them. Each group has a partial and a complete form.',
      caption: 'The 8 types of color vision deficiency',
      rowHeader: 'Type',
      columns: ['Cones affected', 'How colors look'],
      rows: [
        {
          label: 'Protanomaly',
          values: [
            'Red, weak',
            'Reds look duller; red and green are harder to tell apart.',
          ],
        },
        {
          label: 'Protanopia',
          values: [
            'Red, missing',
            'Red and green are confused, and so are some browns.',
          ],
        },
        {
          label: 'Deuteranomaly',
          values: ['Green, weak', 'Reds and greens drift toward each other.'],
        },
        {
          label: 'Deuteranopia',
          values: ['Green, missing', 'Red and green are confused.'],
        },
        {
          label: 'Tritanomaly',
          values: [
            'Blue, weak',
            'Blue and green get harder to tell apart, and purples are hard to recognize.',
          ],
        },
        {
          label: 'Tritanopia',
          values: [
            'Blue, missing',
            'Blue, yellow and green are confused. A rare type.',
          ],
        },
        {
          label: 'Achromatomaly',
          values: ['All, weak', 'Colors look washed out, close to greys.'],
        },
        {
          label: 'Achromatopsia',
          values: [
            'All, missing',
            'No color at all, only lightness, often with sensitivity to bright light.',
          ],
        },
      ],
    },
    capability: {
      name: 'Color blindness simulation',
      href: '/capabilities/color-blindness-simulation',
    },
    related: ['oklch'],
  },
  {
    slug: 'wcag-contrast-ratio',
    term: 'WCAG contrast ratio',
    question: 'What is the WCAG contrast ratio?',
    seo: {
      title: 'WCAG Contrast Ratio: 4.5:1, 3:1 and 7:1 Explained',
      description:
        'The WCAG 2.1 contrast ratio compares the luminance of two colors, from 1:1 to 21:1. What 4.5:1, 3:1 and 7:1 mean for text and UI, and how to meet them.',
    },
    definition:
      'The WCAG contrast ratio compares the relative luminance of two colors, from 1:1 (no contrast) to 21:1 (black on white). WCAG 2.1 asks for at least 4.5:1 for body text and 3:1 for large text at level AA, and 7:1 and 4.5:1 at level AAA.',
    why: [
      `The 4.5:1 and 3:1 thresholds come from WCAG, the contrast rule accessibility laws and standards most often cite, so they are the ones to meet for compliance (${htmlLink('https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html', 'Understanding Contrast (Minimum), 1.4.3')}). UI components, such as input borders and focus indicators, and meaningful graphics need 3:1 as well, under 1.4.11.`,
      `The ratio comes from luminance, which does not always match perceived contrast, and it ignores font weight. ${htmlLink('/glossary/apca', 'APCA')} was designed to address that.`,
    ],
    inProduct: [
      'Every shade of a palette shows its WCAG 2.1 ratio and its A, AA or AAA grade against your light and dark foreground colors, on every plan and in every design-tool plugin.',
      'You can also set the target ratio of each stop, from 1 to 21, and UI Color Palette recomputes the lightness that meets it.',
    ],
    visual: 'contrast',
    table: {
      id: 'thresholds',
      title: 'The thresholds to meet',
      intro:
        'Large text means at least 24px, or about 18.7px in bold (18pt and 14pt). Level AA is the usual target; AAA is stricter.',
      caption: 'WCAG 2.1 contrast thresholds',
      rowHeader: 'Content',
      columns: ['Level AA', 'Level AAA'],
      rows: [
        { label: 'Body text', values: ['4.5:1', '7:1'] },
        { label: 'Large text', values: ['3:1', '4.5:1'] },
        {
          label: 'UI components and meaningful graphics',
          values: ['3:1', 'No extra level'],
        },
      ],
    },
    capability: wcagApca,
    related: ['apca', 'color-blindness-types'],
  },
  {
    slug: 'apca',
    term: 'APCA',
    seo: {
      title: 'What Is APCA? Perceptual Text Contrast — UI Color Palette',
      description:
        'APCA rates text contrast as a lightness contrast (Lc) that depends on font size, weight and polarity. How it differs from WCAG 2.1, and its levels.',
    },
    definition:
      'APCA (Accessible Perceptual Contrast Algorithm) rates the contrast between text and its background as a lightness contrast value, Lc. Unlike the WCAG 2.1 ratio, it accounts for which color is in front, and its guidance depends on font size and weight. It has been proposed for WCAG 3.',
    why: [
      `WCAG 2.1 ratios treat thin and bold text alike and do not always match perceived contrast. APCA models perception more closely, taking text size, weight and polarity into account (${htmlLink('https://git.apcacontrast.com/documentation/APCA_in_a_Nutshell.html', 'APCA in a Nutshell')}).`,
      `APCA is not a legal requirement yet: for compliance, the ${htmlLink('/glossary/wcag-contrast-ratio', 'WCAG 2.1 ratio')} remains the reference. Use both — the ratio to comply, APCA to refine.`,
    ],
    inProduct: [
      'Every shade of a palette shows its APCA score next to its WCAG 2.1 ratio, against your light and dark foreground colors, on every plan and in every design-tool plugin.',
      'On /pro, the contrast report adds a readability score based on APCA and the minimum font size for the weight you pick. In Claude, the audit skill checks WCAG 2.1 and APCA too.',
    ],
    visual: 'contrast',
    table: {
      id: 'levels',
      title: 'APCA levels for text and UI',
      intro:
        'Minimum Lc values from APCA in a Nutshell, for a reference font such as Helvetica. For a stricter level, comparable to AAA, add Lc 15.',
      caption: 'APCA minimum lightness contrast levels',
      rowHeader: 'Lc',
      columns: ['Use'],
      rows: [
        { label: 'Lc 90', values: ['Preferred for body text'] },
        {
          label: 'Lc 75',
          values: ['Minimum for body text (from 18px regular or 14px bold)'],
        },
        { label: 'Lc 60', values: ['Minimum for other text meant to be read'] },
        {
          label: 'Lc 45',
          values: ['Minimum for headlines and large text (36px, or 24px bold)'],
        },
        {
          label: 'Lc 30',
          values: ['Absolute minimum for any text, such as placeholders'],
        },
        {
          label: 'Lc 15',
          values: ['Minimum for non-text elements such as dividers'],
        },
      ],
    },
    capability: wcagApca,
    related: ['wcag-contrast-ratio', 'color-blindness-types'],
  },
]
