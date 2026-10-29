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
      title: 'WCAG & APCA contrast',
      label: 'See the next capability',
      href: '/capabilities/wcag-apca-contrast',
    },
  ],
}

export const contrastPage: CapabilityPage = {
  slug: 'wcag-apca-contrast',
  name: 'WCAG & APCA contrast',
  seo: {
    title: 'Accessible Color Palette for Figma: WCAG & APCA Contrast',
    description:
      'Build an accessible color palette in Figma, Penpot, Sketch or Framer: WCAG 2.1 ratio and APCA score on every shade, target ratios per stop. Free to start.',
  },
  hero: {
    title:
      'Accessible color palette for Figma, with WCAG and APCA contrast on every shade',
    tagline:
      'Check the WCAG 2.1 ratio and APCA score of every shade against your text colors, in Figma, Penpot, Sketch and Framer.',
    cta: { label: 'Get UI Color Palette', href: '/download' },
  },
  overview: {
    title: 'How do you build an accessible color palette?',
    lead: 'An accessible color palette is one where every shade used behind text reaches at least 4.5:1 against that text, or 3:1 for large text, under WCAG 2.1. UI Color Palette scores every shade against your light and dark text colors with the WCAG 2.1 ratio and the APCA score, and lets you set the target ratio of each stop.',
    demo: 'contrast',
  },
  how: {
    title: 'How it works',
    intro:
      'Contrast is computed for every shade, against the light and dark foreground colors of each color mode. Scores and target ratios are free; the analysis tools are on /pro.',
    docs: {
      label: 'Read the guide in the docs',
      href: `${links.docs}/guides/master-a-color-palette#adjust-the-contrast-configuration`,
    },
    steps: [
      {
        title: 'Set your text colors',
        text: 'Pick the light and dark foreground colors your interface uses; white and black are the defaults. Every score is computed against them.',
      },
      {
        title: 'Read the scores',
        text: 'Each shade shows its WCAG 2.1 ratio with an A, AA or AAA grade, and its APCA score, for the light and the dark text color.',
      },
      {
        title: 'Set a target ratio',
        text: 'Switch the scale from lightness to contrast ratio and type the ratio each stop must reach, from 1 to 21. The lightness is recomputed to meet it.',
      },
      {
        title: 'Check the details',
        text: 'On /pro, filter the shades that pass or fail, read the score interval of each stop, and open a contrast report with sample text, a readability score and a minimum font size.',
      },
    ],
  },
  tables: [
    {
      id: 'standards',
      title: 'WCAG 2.1 and APCA, side by side',
      intro:
        'UI Color Palette shows both scores on every shade: the ratio to comply with today’s rules, APCA to refine readability.',
      caption: 'WCAG 2.1 contrast ratio and APCA compared',
      rowHeader: 'Method',
      columns: ['What it measures', 'Scale', 'Body text'],
      rows: [
        {
          label: 'WCAG 2.1',
          href: '/glossary/wcag-contrast-ratio',
          values: [
            'Luminance ratio between text and background',
            '1:1 to 21:1',
            '4.5:1 at level AA, 7:1 at AAA',
          ],
        },
        {
          label: 'APCA',
          href: '/glossary/apca',
          values: [
            'Perceived lightness contrast, depending on which color is in front',
            'Lightness contrast (Lc)',
            'Lc 75 minimum, Lc 90 preferred',
          ],
        },
      ],
      note: 'WCAG is the contrast rule accessibility laws and standards most often cite; APCA is a newer perceptual method proposed for WCAG 3.',
    },
    {
      id: 'plans',
      title: 'What you get on each plan',
      intro:
        'Every design-tool plugin offers the same contrast tools: Figma, Penpot, Sketch and Framer.',
      caption: 'Contrast tools per plan',
      rowHeader: 'Tool',
      columns: ['/basic', '/pro'],
      rows: [
        {
          label: 'WCAG 2.1 and APCA score on every shade',
          values: [true, true],
        },
        {
          label: 'Custom light and dark foreground colors',
          values: [true, true],
        },
        { label: 'Target contrast ratio per stop', values: [true, true] },
        { label: 'Score interval per stop', values: [false, true] },
        { label: 'Pass and fail filters', values: [false, true] },
        {
          label:
            'Contrast report (sample text, readability score, minimum font size)',
          values: [false, true],
        },
      ],
      note: 'In Claude, the audit skill checks WCAG 2.1 and APCA for every pair, lists the risky ones and suggests fixes.',
    },
  ],
  faq: {
    intro:
      'Checking contrast on a palette, WCAG 2.1 versus APCA, and the ratios to aim for.',
    items: [
      {
        question: 'Is there a WCAG contrast checker for Figma?',
        answer: `Yes. UI Color Palette shows the WCAG 2.1 ratio and the APCA score of every shade of your palette, on the free /basic plan, in Figma, Penpot, Sketch and Framer (see ${htmlLink('/figma', 'UI Color Palette for Figma')}).`,
      },
      {
        question: 'APCA vs WCAG: which contrast method should I use?',
        answer: `Both. The ${htmlLink('/glossary/wcag-contrast-ratio', 'WCAG 2.1 ratio')} is what accessibility laws and standards most often cite; ${htmlLink('/glossary/apca', 'APCA')} models perceived contrast more closely, taking text size and weight into account. UI Color Palette shows both on every shade.`,
      },
      {
        question: 'What contrast ratio does WCAG require for text?',
        answer: `At level AA, 4.5:1 for body text and 3:1 for large text (24px, or about 18.7px bold); at level AAA, 7:1 and 4.5:1. UI components, such as input borders and focus indicators, and meaningful graphics need 3:1 (see the ${htmlLink('/glossary/wcag-contrast-ratio', 'WCAG contrast ratio')}).`,
      },
      {
        question: 'Can I build a palette from target contrast ratios?',
        answer: `Yes, on every plan. Switch the scale to contrast ratio, type the ratio each stop must reach, and UI Color Palette recomputes its lightness; it works well with the ${htmlLink('/glossary/hsluv', 'HSLuv')} color space.`,
      },
      {
        question: 'Does the contrast change for color-blind users?',
        answer: `It can. Set a vision simulation on a color mode and the contrast between your foreground colors and every shade is simulated too (see ${htmlLink('/capabilities/color-blindness-simulation', 'color blindness simulation')}). Protanomaly is free; the other simulations are on /pro.`,
      },
      {
        question: 'How do I check if my color palette is accessible?',
        answer:
          'Compare every shade with the text colors it will carry and read its WCAG 2.1 ratio: 4.5:1 for body text and 3:1 for large text at level AA. In UI Color Palette, each shade shows its ratio, its A, AA or AAA grade and its APCA score, so failing shades are visible without leaving your design tool.',
      },
    ],
  },
  related: [
    {
      icon: 'book-open',
      title: 'What is APCA?',
      label: 'Read the definition',
      href: '/glossary/apca',
    },
    {
      icon: 'book-open',
      title: 'What is the WCAG contrast ratio?',
      label: 'Read the definition',
      href: '/glossary/wcag-contrast-ratio',
    },
    {
      icon: 'glasses',
      title: 'Color palette generator',
      label: 'See the next capability',
      href: '/capabilities/color-palette-generator',
    },
    {
      icon: 'ruler',
      title: 'Use it in Figma',
      label: 'See the Figma plugin',
      href: '/figma',
    },
  ],
}

export const generatorPage: CapabilityPage = {
  slug: 'color-palette-generator',
  name: 'Color palette generator',
  seo: {
    title: 'UI Color Palette Generator — Shades & Scales',
    description:
      'Generate a UI color palette in Figma, Penpot, Sketch or Framer: every source color scaled into shades, set by lightness or contrast per stop. Free to start.',
  },
  hero: {
    title:
      'UI color palette generator, with a full scale of shades for every color',
    tagline:
      'Turn a few source colors into scales of shades and tints, tune each stop by lightness or contrast, and keep the palette inside your design tool.',
    cta: { label: 'Get UI Color Palette', href: '/download' },
  },
  overview: {
    title: 'What does a UI color palette generator do?',
    lead: 'A UI color palette generator turns a few source colors into full scales of shades and tints. UI Color Palette does it in Figma, Penpot, Sketch and Framer: pick a preset such as Material 3 or Tailwind, or your own stops, and set each stop by lightness or target contrast.',
    demo: 'ready',
  },
  how: {
    title: 'How it works',
    intro:
      'A palette is a set of source colors, a lightness scale and color modes. Every change recomputes the shades live in the preview.',
    docs: {
      label: 'Read the guide in the docs',
      href: `${links.docs}/guides/create-a-color-palette`,
    },
    steps: [
      {
        title: 'Start a palette',
        text: 'Click + in the Palettes manager: the palette opens with default colors, or with the colors of the filled layers selected on your canvas. You can also start from AI, an image, a color harmony or Color Hunt.',
      },
      {
        title: 'Set your source colors',
        text: 'Add, rename and reorder colors, and type or pick their hex code. Each source color becomes a scale of shades and tints.',
      },
      {
        title: 'Choose a scale preset',
        text: 'Pick a lightness scale preset, such as Material 3 or Tailwind, or a Custom set of stops named 1–10, 10–100 or 100–1000.',
      },
      {
        title: 'Tune the stops',
        text: 'Slide the lightness of each stop, or switch to contrast ratio and type the ratio each stop must reach, from 1 to 21. A distribution easing spreads the stops across the range.',
      },
      {
        title: 'Use the palette',
        text: 'Sync it with the styles, variables or tokens of your design tool, or export it to code.',
      },
    ],
  },
  tables: [
    {
      id: 'starts',
      title: 'Five ways to start a palette',
      intro:
        'Whichever you choose, you get a complete palette — source colors, lightness scale and color modes — opened and ready to refine.',
      caption: 'Ways to start a palette in UI Color Palette',
      rowHeader: 'Start from',
      columns: ['What you get'],
      rows: [
        {
          label: 'A blank palette',
          values: [
            'Default source colors, or the colors of the layers selected on your canvas',
          ],
        },
        {
          label: 'AI colors',
          values: [
            'Five colors from a prompt or a preset theme, each with a role: Primary, Text, Success, Warning or Alert',
          ],
        },
        {
          label: 'An image',
          values: ['Up to 5 dominant colors from a PNG image'],
        },
        {
          label: 'A color harmony',
          href: '/glossary/color-harmony',
          values: [
            'Analogous, complementary, compound, triadic or tetradic colors from a base color',
          ],
        },
        {
          label: 'Color Hunt',
          values: ['A palette from the Color Hunt community feed'],
        },
      ],
    },
    {
      id: 'plans',
      title: 'What you get on each plan',
      intro: 'The same plans apply on Figma, Penpot, Sketch and Framer.',
      caption: 'Palette generator features per plan',
      rowHeader: 'Feature',
      columns: ['/basic', '/pro'],
      rows: [
        {
          label:
            'Palettes per page (Figma, Penpot) or per document (Sketch, Framer)',
          values: ['1', 'Unlimited'],
        },
        { label: 'Source colors per palette', values: ['5', 'Unlimited'] },
        { label: 'Color modes per palette', values: ['2', 'Unlimited'] },
        { label: 'Material 3 and Tailwind presets', values: [true, true] },
        {
          label: 'The other named presets (Radix, Spectrum, Carbon, Polaris…)',
          values: [false, true],
        },
        { label: 'Stops in a Custom set', values: ['Up to 6', 'Up to 24'] },
        {
          label: 'Lightness and target contrast ratio per stop',
          values: [true, true],
        },
        {
          label: 'Hue and chroma shifts, per color and for the whole palette',
          values: [false, true],
        },
        { label: 'Source colors lock', values: [false, true] },
      ],
      note: 'Syncing the palette with your styles, variables and tokens is free, and so is the CSS export; the other code formats are on /pro.',
    },
  ],
  faq: {
    intro:
      'Generating shades from your colors, choosing a scale, and what the free plan covers.',
    items: [
      {
        question: 'Is there a color palette generator plugin for Figma?',
        answer: `Yes. UI Color Palette is a color scale generator plugin for Figma: each source color becomes a scale of shades you can sync with your styles and variables. It also runs in Penpot, Sketch and Framer (see ${htmlLink('/figma', 'UI Color Palette for Figma')}).`,
      },
      {
        question: 'How do I generate shades and tints from a hex color?',
        answer:
          'Yes. Type or paste the hex code of a source color and UI Color Palette computes its shades and tints along the scale, live, with the hex code of each one in the preview.',
      },
      {
        question: 'How many shades should a UI color scale have?',
        answer: `It depends on your system. Tailwind uses 11 stops, from 50 to 950, and Material 3 uses 13, from 0 to 100; Atlassian’s ADS Foundations uses 7. Pick the preset your codebase already follows, or a Custom set (see ${htmlLink('/glossary/color-scale', 'What is a color scale?')}).`,
      },
      {
        question: 'Can I generate a palette from contrast ratios?',
        answer: `Yes, on every plan. Switch the scale from lightness to contrast ratio and type the ratio each stop must reach, from 1 to 21; the lightness is recomputed to meet it (see ${htmlLink('/capabilities/wcag-apca-contrast', 'WCAG & APCA contrast')}).`,
      },
      {
        question: 'How do I manage several color palettes in Figma?',
        answer: `A color palette manager keeps all your palettes in one place. In UI Color Palette, the Palettes manager lists the palettes of your page or document, so you can create, duplicate, open and delete them without leaving your design tool (see ${htmlLink('/', 'the WCAG color palette manager')}).`,
      },
      {
        question: 'Is the color palette generator free?',
        answer:
          'Yes, on the /basic plan: one palette per page or document, up to 5 source colors and 2 color modes, the Material 3 and Tailwind presets, Custom sets of up to 6 stops, sync with your design tool and the CSS export. /pro lifts the caps and adds the other presets, hue and chroma shifts, and the other code formats (Framer exports a narrower set).',
      },
    ],
  },
  related: [
    {
      icon: 'book-open',
      title: 'What is a color scale?',
      label: 'Read the definition',
      href: '/glossary/color-scale',
    },
    {
      icon: 'glasses',
      title: 'OKLCH & LCH color spaces',
      label: 'See the capability',
      href: '/capabilities/oklch-lch-color-spaces',
    },
    {
      icon: 'glasses',
      title: 'WCAG & APCA contrast',
      label: 'See the capability',
      href: '/capabilities/wcag-apca-contrast',
    },
    {
      icon: 'ruler',
      title: 'Use it in Figma',
      label: 'See the Figma plugin',
      href: '/figma',
    },
  ],
}

export const capabilityPages = [
  colorSpacesPage,
  colorBlindnessPage,
  contrastPage,
  generatorPage,
]
