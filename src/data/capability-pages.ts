import { links } from '@/config/site'
import type { NextStep, Steps, Table } from '@/data/blocks'
import type { DemoId } from '@/data/capabilities'
import { htmlLink, type FaqItem } from '@/data/faq'

export interface CapabilityPage {
  slug: string
  /** Breadcrumb, hub card and llms.txt label. */
  name: string
  seo: { title: string; description: string }
  hero: {
    title: string
    tagline: string
    cta: { label: string; href: string }
  }
  overview: { title: string; lead: string; demo: DemoId }
  how: Steps
  tables: Table[]
  faq: { intro: string; items: FaqItem[] }
  related: NextStep[]
}

export const capabilityPath = (page: CapabilityPage) =>
  `/capabilities/${page.slug}`

const code = (text: string) => `<code>${text}</code>`

export const colorSpacesPage: CapabilityPage = {
  slug: 'oklch-lch-color-spaces',
  name: 'OKLCH & LCH color spaces',
  seo: {
    title: 'OKLCH & OKLab Color Palette Generator — UI Color Palette',
    description:
      'Build palettes in OKLCH, LCH, OKLab or HSLuv so lightness steps look even, with WCAG and APCA scores. Figma, Penpot, Sketch, Framer, Claude. Free to start.',
  },
  hero: {
    title: 'OKLCH color palette generator, with LCH, OKLab and HSLuv',
    tagline:
      'Build color palettes in OKLCH, LCH, OKLab or HSLuv so lightness steps look even across hues, then export lch() or oklch() values with your code.',
    cta: { label: 'Get UI Color Palette', href: '/download' },
  },
  overview: {
    title: 'Why build palettes in OKLCH instead of HSL?',
    lead: 'UI Color Palette computes color scales in perceptual color spaces — OKLCH, LCH, OKLab, CIELAB and HSLuv — instead of HSL, so lightness steps look even across hues. OKLCH is the default for every new palette; switch it in Figma, Penpot, Sketch or Framer, or through the MCP server, and export lch() or oklch() values with your code.',
    demo: 'spaces',
  },
  how: {
    title: 'How it works',
    intro:
      'The color space is a setting of the palette. Change it whenever you like: the whole palette is recomputed, and your scale and source colors stay as they are.',
    docs: {
      label: 'Read the guide in the docs',
      href: `${links.docs}/guides/master-a-color-palette#select-a-color-space`,
    },
    steps: [
      {
        title: 'Add your source colors',
        text: 'Pick them, paste their hex codes, extract them from an image or generate them. Each source color becomes a full scale of shades.',
      },
      {
        title: 'Pick a color space',
        text: 'In the palette settings, or in the preview panel while editing, choose OKLCH (the default), LCH, CIELAB, OKLab or HSLuv. You can browse them freely before you settle.',
      },
      {
        title: 'Compare the shades',
        text: 'Check that equal steps look equal across your colors, with the WCAG 2.1 and APCA contrast of every shade beside it.',
      },
      {
        title: 'Export oklch() or lch() values',
        text: 'CSS, SCSS and Less exports let you pick lch() or oklch() values. With Claude or the MCP server, ask for it directly:',
        code: '/ui-color-palette:generate-code css oklch',
      },
    ],
  },
  tables: [
    {
      id: 'color-spaces',
      title: 'The color spaces a palette can use',
      intro:
        'The color space sets how the shades between the lightest and the darkest stop are interpolated. The perceptual ones keep lightness even from one hue to the next; HSL does not.',
      caption: 'Color spaces available for a palette in UI Color Palette',
      rowHeader: 'Color space',
      columns: [
        'Built on',
        'Even lightness across hues',
        'In UI Color Palette',
      ],
      rows: [
        {
          label: 'LCH',
          href: '/glossary/lch',
          values: [
            'Lightness, chroma and hue on CIELAB',
            true,
            'Exported as lch() in CSS, SCSS and Less',
          ],
        },
        {
          label: 'OKLCH',
          href: '/glossary/oklch',
          values: [
            'Lightness, chroma and hue on OKLab',
            true,
            'The default; exported as oklch() in CSS, SCSS and Less',
          ],
        },
        {
          label: 'CIELAB',
          values: [
            'Lightness plus two opponent axes: a (green–red) and b (blue–yellow)',
            true,
            'The Lab form of LCH',
          ],
        },
        {
          label: 'OKLab',
          href: '/glossary/oklab',
          values: [
            'The same axes, refitted to perception (Björn Ottosson, 2020)',
            true,
            'The Lab form of OKLCH',
          ],
        },
        {
          label: 'HSLuv',
          href: '/glossary/hsluv',
          values: [
            'HSL-style controls on CIELUV',
            true,
            'Works well with the contrast-ratio scale',
          ],
        },
        {
          label: 'HSL',
          values: [
            'Hue, saturation and lightness computed from RGB',
            false,
            'Not recommended: a warning shows when you pick it',
          ],
        },
      ],
      note: 'HSV and CMYK are also available. In the design-tool plugins, CIELAB, OKLab, HSLuv, HSV and CMYK need /pro.',
    },
    {
      id: 'availability',
      title: 'Where you can use it',
      intro:
        'Every design-tool plugin builds palettes in these color spaces, and the MCP server takes the same setting.',
      caption: 'Color spaces and color-space exports per platform',
      rowHeader: 'Platform',
      columns: ['Color spaces for a palette', 'LCH and OKLCH in code exports'],
      rows: [
        {
          label: 'Figma',
          href: '/figma',
          values: [
            'LCH, OKLCH, CIELAB, OKLab, HSL, HSLuv, HSV, CMYK',
            'CSS, SCSS, Less',
          ],
        },
        {
          label: 'Penpot',
          href: '/penpot',
          values: [
            'LCH, OKLCH, CIELAB, OKLab, HSL, HSLuv, HSV, CMYK',
            'CSS, SCSS, Less',
          ],
        },
        {
          label: 'Sketch',
          href: '/sketch',
          values: [
            'LCH, OKLCH, CIELAB, OKLab, HSL, HSLuv, HSV, CMYK',
            'CSS, SCSS, Less',
          ],
        },
        {
          label: 'Framer',
          href: '/framer',
          values: [
            'LCH, OKLCH, CIELAB, OKLab, HSL, HSLuv, HSV, CMYK',
            'CSS, SCSS, Less',
          ],
        },
        {
          label: 'Claude & MCP',
          href: '/claude',
          values: [
            'LCH, OKLCH, CIELAB (LAB), OKLab, HSL, HSLuv, HSV, CMYK',
            'The colorSpace option of generate_code',
          ],
        },
      ],
      note: 'In the design-tool plugins, OKLCH, LCH and HSL work on the free /basic plan, CSS export included; CIELAB, OKLab, HSLuv, HSV and CMYK, and the SCSS and Less exports, need /pro.',
    },
  ],
  faq: {
    intro:
      'OKLCH, LCH, OKLab and HSLuv compared, and how UI Color Palette uses them.',
    items: [
      {
        question: 'OKLCH vs HSL: which is better for a color palette?',
        answer: `OKLCH. HSL computes lightness from the RGB channels, so a yellow and a blue at 50% lightness look nothing alike; ${htmlLink('/glossary/oklch', 'OKLCH')} lightness follows how light a color looks, so steps stay even across hues. UI Color Palette shows a warning when you pick HSL.`,
      },
      {
        question: 'LCH vs OKLCH: what is the difference?',
        answer: `Both describe a color by lightness, chroma and hue. ${htmlLink('/glossary/lch', 'LCH')} is built on CIELAB (1976) and OKLCH on ${htmlLink('/glossary/oklab', 'OKLab')} (2020), which predicts hue and lightness more evenly: blues no longer drift toward purple as chroma changes. OKLCH is the default in UI Color Palette.`,
      },
      {
        question: 'HSLuv vs OKLCH: which one should you pick?',
        answer: `${htmlLink('/glossary/hsluv', 'HSLuv')} (on /pro) keeps HSL's familiar controls with a perceptual lightness, and works well with the contrast-ratio scale of UI Color Palette. OKLCH gives more even hues, maps directly to the CSS ${code('oklch()')} function, and is the default on every plan.`,
      },
      {
        question: 'Can I export OKLCH colors to CSS?',
        answer: `Yes. CSS, SCSS and Less exports let you choose ${code('lch()')} or ${code('oklch()')} values. In the design-tool plugins, CSS export is part of the free /basic plan and SCSS and Less need /pro (see ${htmlLink('/pricing', 'Pricing')}); through Claude or the MCP server, ${code('generate_code')} takes OKLCH in its ${code('colorSpace')} option.`,
      },
      {
        question: 'Which color space does UI Color Palette use by default?',
        answer:
          'OKLCH, for every new palette. Each palette has its own color space: changing it recomputes every shade but keeps your scale and your source colors, so you can compare them freely.',
      },
    ],
  },
  related: [
    {
      icon: 'book-open',
      title: 'What is OKLCH?',
      label: 'Read the definition',
      href: '/glossary/oklch',
    },
    {
      icon: 'book-open',
      title: 'What is HSLuv?',
      label: 'Read the definition',
      href: '/glossary/hsluv',
    },
    {
      icon: 'ruler',
      title: 'Use it in Figma',
      label: 'See the Figma plugin',
      href: '/figma',
    },
    {
      icon: 'glasses',
      title: 'Color blindness simulation',
      label: 'See the next capability',
      href: '/capabilities/color-blindness-simulation',
    },
  ],
}

export const colorBlindnessPage: CapabilityPage = {
  slug: 'color-blindness-simulation',
  name: 'Color blindness simulation',
  seo: {
    title: 'Color Blindness Simulator for Figma — UI Color Palette',
    description:
      'Color blindness simulator for Figma, Penpot, Sketch and Framer: preview your palette and contrast in 8 types, from protanopia to achromatopsia. Free to start.',
  },
  hero: {
    title: 'Color blindness simulator for UI palettes',
    tagline:
      'Run a color blind simulator in Figma, Penpot, Sketch and Framer: see your palette and its contrast through 8 types of color vision deficiency, from protanopia to achromatopsia.',
    cta: { label: 'Get UI Color Palette', href: '/download' },
  },
  overview: {
    title: 'How do people with color blindness see your palette?',
    lead: 'UI Color Palette simulates 8 types of color vision deficiency on every shade of a palette: protanomaly, protanopia, deuteranomaly, deuteranopia, tritanomaly, tritanopia, achromatomaly and achromatopsia. You set the simulation per color mode, and the contrast with your foreground colors is simulated too, so you can check readability for each type.',
    demo: 'simulations',
  },
  how: {
    title: 'How it works',
    intro:
      'A vision simulation is a parameter of a color mode, like its lightness scale and its foreground colors. Add a mode for each type you want to check (2 color modes on /basic, unlimited on /pro), then switch between them.',
    docs: {
      label: 'Read the guide in the docs',
      href: `${links.docs}/guides/master-a-color-palette#select-a-vision-simulation`,
    },
    steps: [
      {
        title: 'Add a color mode',
        text: 'Add a color mode to your palette for the simulation. The /basic plan includes 2 color modes; /pro has no limit.',
      },
      {
        title: 'Pick a vision simulation',
        text: 'In the parameters of that mode, choose one of the 8 types. Protanomaly is part of the free /basic plan; the other 7 need /pro.',
      },
      {
        title: 'Read the contrast',
        text: 'The contrast between your light and dark foreground colors and every shade is simulated as well, with its WCAG 2.1 and APCA scores. The detailed contrast report needs /pro.',
      },
      {
        title: 'Switch modes to compare',
        text: 'Select another mode to see the palette as another group of people sees it, then adjust the shades that no longer read.',
      },
    ],
  },
  tables: [
    {
      id: 'vision-types',
      title: 'The 8 types it simulates',
      intro:
        'Each type affects one kind of cone in the eye, or all of them. The -anomaly types are partial; the -opia and -opsia types are complete.',
      caption: 'Types of color vision deficiency simulated by UI Color Palette',
      rowHeader: 'Type',
      columns: ['Cones affected', 'Perception', 'Plan'],
      rows: [
        { label: 'Protanomaly', values: ['Red (L)', 'Weak', '/basic'] },
        { label: 'Protanopia', values: ['Red (L)', 'Missing', '/pro'] },
        { label: 'Deuteranomaly', values: ['Green (M)', 'Weak', '/pro'] },
        { label: 'Deuteranopia', values: ['Green (M)', 'Missing', '/pro'] },
        { label: 'Tritanomaly', values: ['Blue (S)', 'Weak', '/pro'] },
        { label: 'Tritanopia', values: ['Blue (S)', 'Missing', '/pro'] },
        { label: 'Achromatomaly', values: ['All', 'Weak', '/pro'] },
        { label: 'Achromatopsia', values: ['All', 'Missing', '/pro'] },
      ],
      note: 'Plans apply to the design-tool plugins.',
    },
    {
      id: 'availability',
      title: 'Where you can use it',
      intro:
        'Every design-tool plugin simulates the 8 types, and the MCP server takes the same setting on each theme of a palette.',
      caption: 'Color blindness simulation per platform',
      rowHeader: 'Platform',
      columns: ['Vision types', 'Where you set it'],
      rows: [
        {
          label: 'Figma',
          href: '/figma',
          values: ['All 8', 'On each color mode'],
        },
        {
          label: 'Penpot',
          href: '/penpot',
          values: ['All 8', 'On each color mode'],
        },
        {
          label: 'Sketch',
          href: '/sketch',
          values: ['All 8', 'On each color mode'],
        },
        {
          label: 'Framer',
          href: '/framer',
          values: ['All 8', 'On each color mode'],
        },
        {
          label: 'Claude & MCP',
          href: '/claude',
          values: ['All 8', 'visionSimulationMode on each theme'],
        },
      ],
    },
  ],
  faq: {
    intro:
      'Simulating color blindness on a palette, the 8 types, and what they change for contrast.',
    items: [
      {
        question: 'Can I simulate color blindness in Figma?',
        answer: `Yes. In the UI Color Palette plugin, add a color mode to your palette and set its vision simulation to one of 8 types; the shades and their contrast update. It works the same in Penpot, Sketch and Framer (see ${htmlLink('/figma', 'UI Color Palette for Figma')}).`,
      },
      {
        question: 'Protanopia vs deuteranopia: how do they differ?',
        answer: `Both are red-green deficiencies: in protanopia the red-sensitive cones are missing, in deuteranopia the green-sensitive ones. Both confuse reds, greens and browns; simulate each on its own color mode to see which of your reds and greens still separate (see the ${htmlLink('/glossary/color-blindness-types', 'types of color blindness')}).`,
      },
      {
        question: 'What is achromatomaly?',
        answer: `A partial form of total color blindness: colors look washed out, close to greys, without disappearing entirely as in ${htmlLink('/glossary/color-blindness-types', 'achromatopsia')}. UI Color Palette simulates both, on /pro.`,
      },
      {
        question: 'Does the simulation change the contrast scores?',
        answer:
          'Yes. The contrast between your light and dark foreground colors and every shade is simulated too, so the WCAG 2.1 and APCA scores reflect how each type of vision perceives them.',
      },
      {
        question: 'Is there a free color blind simulator for Figma?',
        answer: `Partly: the free /basic plan of UI Color Palette includes protanomaly, and the 7 other types need /pro. It works on any palette in Figma, Penpot, Sketch and Framer (see ${htmlLink('/pricing', 'Pricing')}).`,
      },
    ],
  },
  related: [
    {
      icon: 'book-open',
      title: 'What are the types of color blindness?',
      label: 'Read the definitions',
      href: '/glossary/color-blindness-types',
    },
    {
      icon: 'glasses',
      title: 'OKLCH & LCH color spaces',
      label: 'See the capability',
      href: '/capabilities/oklch-lch-color-spaces',
    },
    {
      icon: 'ruler',
      title: 'Use it in Figma',
      label: 'See the Figma plugin',
      href: '/figma',
    },
    {
      icon: 'glasses',
      title: 'Explore every capability',
      label: 'See the capabilities',
      href: '/capabilities',
    },
  ],
}

export const capabilityPages = [colorSpacesPage, colorBlindnessPage]
