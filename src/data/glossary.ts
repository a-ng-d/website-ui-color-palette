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
  visual: RampSpace | 'vision'
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
      title: 'Types of Color Blindness: The 8 Explained — UI Color Palette',
      description:
        'Protanopia, deuteranopia, tritanopia, achromatomaly and more: the 8 types of color blindness, how each one sees color, and how to design palettes for them.',
    },
    definition:
      'Color blindness, or color vision deficiency, comes in 8 main types, grouped by the cone cells affected: red (protan), green (deutan), blue (tritan), or all of them (achromat). Each group has a partial form, ending in -anomaly, and a complete form, ending in -opia or -opsia.',
    why: [
      'Red-green deficiencies (protan and deutan) are by far the most common: they affect about 1 man in 12 and 1 woman in 200 of Northern European descent. Tritan types and total color blindness are rare.',
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
            'Reds look duller and darker; red and green are harder to tell apart.',
          ],
        },
        {
          label: 'Protanopia',
          values: [
            'Red, missing',
            'Reds look dark, close to brown; red and green are confused.',
          ],
        },
        {
          label: 'Deuteranomaly',
          values: [
            'Green, weak',
            'The most common type: reds and greens drift toward each other.',
          ],
        },
        {
          label: 'Deuteranopia',
          values: [
            'Green, missing',
            'Red and green are confused, but reds keep their lightness.',
          ],
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
          values: [
            'All, weak',
            'Colors look washed out, close to greys. A rare type.',
          ],
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
]
