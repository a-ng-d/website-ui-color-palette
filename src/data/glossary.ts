import { htmlLink } from '@/data/faq'

export type RampSpace = 'oklch' | 'lch' | 'oklab' | 'hsluv'

export interface GlossaryTerm {
  slug: string
  term: string
  seo: { title: string; description: string }
  definition: string
  why: string[]
  inProduct: string[]
  ramp: RampSpace
  related: string[]
}

export const glossary = {
  title: 'Color glossary for UI design',
  tagline:
    'The color spaces and terms behind accessible palettes, explained for designers and developers.',
  seo: {
    title: 'Color Glossary: OKLCH, LCH, OKLab, HSLuv — UI Color Palette',
    description:
      'Short, precise definitions of the color spaces and terms behind accessible UI palettes: OKLCH, LCH, OKLab and HSLuv, with visual examples.',
  },
}

export const termPath = (term: GlossaryTerm) => `/glossary/${term.slug}`

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
    ramp: 'oklch',
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
    ramp: 'lch',
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
    ramp: 'oklab',
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
    ramp: 'hsluv',
    related: ['oklch', 'lch', 'oklab'],
  },
]
