import type { NextStep, Table } from '@/data/blocks'
import { htmlLink, type FaqItem } from '@/data/faq'

export interface ComparePage {
  slug: string
  competitor: string
  seo: { title: string; description: string }
  hero: {
    title: string
    tagline: string
    cta: { label: string; href: string }
  }
  /** The answer-first passage, 40 to 60 words. */
  summary: string
  /** Its columns are UI Color Palette, then the competitor. */
  table: Table
  chooseUs: string[]
  chooseThem: string[]
  faq: { intro: string; items: FaqItem[] }
  sources: { label: string; href: string }[]
  /** YYYY-MM-DD, shown as "Last verified". */
  verified: string
  related: NextStep[]
}

export const compare = {
  title:
    'Alternatives to Coolors, Leonardo and other color tools, for designers',
  tagline:
    'Five color tools compared with UI Color Palette, a design-tool plugin that builds accessible scales: what each does, and when each one fits.',
  seo: {
    title: 'Color Palette Tool Alternatives — UI Color Palette',
    description:
      'UI Color Palette compared with Coolors, Adobe Leonardo, Material Theme Builder, Radix Colors and Realtime Colors: features and when to choose each.',
  },
}

export const comparePath = (page: ComparePage) => `/compare/${page.slug}`

const coolors: ComparePage = {
  slug: 'ui-color-palette-vs-coolors',
  competitor: 'Coolors',
  seo: {
    title: 'UI Color Palette vs Coolors: A Coolors Alternative',
    description:
      'UI Color Palette vs Coolors: a palette generator for exploring colors, and a design-tool plugin that builds accessible scales, tokens and code. Compared.',
  },
  hero: {
    title: 'UI Color Palette vs Coolors',
    tagline:
      'Coolors helps you find colors fast; UI Color Palette turns your colors into accessible scales inside your design tool.',
    cta: { label: 'Get UI Color Palette', href: '/download' },
  },
  summary:
    'Coolors finds and explores palettes; UI Color Palette scales the colors you already have. Coolors is a palette generator on the web, on iOS and in plugins. UI Color Palette turns each color into an accessible scale, with WCAG and APCA scores, synced to your design tool and exported as tokens and code.',
  table: {
    id: 'features',
    title: 'UI Color Palette and Coolors, side by side',
    intro: 'What each tool does, from its own site and documentation.',
    caption: 'UI Color Palette and Coolors compared',
    rowHeader: 'Feature',
    columns: ['UI Color Palette', 'Coolors'],
    rows: [
      {
        label: 'Where it runs',
        values: [
          'Plugin for Figma, Penpot, Sketch and Framer; Claude plugin and MCP server',
          'Web app, iOS app, Figma plugin, Chrome extension and Adobe extension',
        ],
      },
      {
        label: 'Builds scales from your colors',
        values: [
          '19 scale presets (Material 3 and Tailwind free, the rest on /pro) or your own stops',
          'Random and explore palettes, plus variation views of a color, such as shades',
        ],
      },
      {
        label: 'Color spaces',
        values: [
          'OKLCH (default), LCH, CIELAB, OKLab, HSL, HSLuv, HSV, CMYK; OKLCH, LCH and HSL are free',
          'Generation model not documented on its site; color space settings in some exports',
        ],
      },
      {
        label: 'Contrast',
        values: [
          'WCAG 2.1 ratio and APCA score on every shade; target contrast ratio per stop',
          'WCAG contrast checker; APCA not mentioned; no scales built from target ratios',
        ],
      },
      {
        label: 'Color blindness simulation',
        values: [
          '8 types, set per color mode; protanomaly is free',
          'A color blindness view in the generator',
        ],
      },
      {
        label: 'Light and dark modes',
        values: [
          'Color modes, each with its own scale, text colors and background',
          'No palette themes documented',
        ],
      },
      {
        label: 'Sync into the design tool',
        values: [
          'Figma variables and styles, Penpot tokens, Sketch variables and styles, Framer color styles',
          'A Figma plugin and an Adobe extension; what they create is not documented on its site',
        ],
      },
      {
        label: 'Code and token export',
        values: [
          'CSS for free; DTCG, Style Dictionary, Tailwind, SCSS, Less, SwiftUI, UIKit, Compose and Android XML on /pro (Framer: CSS, SCSS, Less, Tailwind and JSON tokens)',
          'PDF, image, CSS, ASE, SVG, code, Tailwind and embed',
        ],
      },
      {
        label: 'AI and image',
        values: [
          'A palette from a prompt, from an image or from a color harmony',
          'An AI chat assistant on Pro; a palette from an image',
        ],
      },
      {
        label: 'Pricing',
        values: [
          'Free /basic plan; /pro subscription',
          'Free plan; Pro subscription',
        ],
      },
    ],
  },
  chooseUs: [
    'You already have brand colors and need a full scale for each one, with contrast you can trust on every shade, inside Figma, Penpot, Sketch or Framer.',
    'You want the palette to land as variables, styles or tokens in your file, and as code for your product: CSS, Tailwind or DTCG tokens, and SwiftUI or Compose from Figma, Penpot or Sketch.',
  ],
  chooseThem: [
    'You are looking for colors rather than scaling them: Coolors generates palettes in a keystroke and lets you browse a library of palettes made by others.',
    'You want a broad set of quick tools in one place — a contrast checker, gradients, a visualizer, an image picker — on the web, on iOS and in Adobe apps.',
  ],
  faq: {
    intro: 'How UI Color Palette and Coolors differ, and when to use each.',
    items: [
      {
        question: 'Is UI Color Palette an alternative to Coolors?',
        answer: `Yes, for a different job. Coolors is built to find and explore palettes; UI Color Palette is built to turn chosen colors into accessible scales, sync them to your design tool and export them. You can explore in one and build the system in the other.`,
      },
      {
        question: 'Does Coolors have a Figma plugin?',
        answer: `Yes, Coolors lists a Figma plugin on its apps page, along with an iOS app, a Chrome extension and an Adobe extension. UI Color Palette runs as a plugin in Figma, Penpot, Sketch and Framer.`,
      },
      {
        question: 'Does Coolors check APCA contrast?',
        answer: `Its contrast checker uses WCAG ratios, and its site does not mention APCA. UI Color Palette shows both the WCAG 2.1 ratio and the APCA score of every shade (see ${htmlLink('/capabilities/wcag-apca-contrast', 'WCAG & APCA contrast')}).`,
      },
      {
        question: 'Can I bring a Coolors palette into UI Color Palette?',
        answer: `Yes: paste the hex codes of its colors as source colors, and each one becomes a scale. UI Color Palette can also import color combinations from Coolors (see ${htmlLink('/capabilities/color-palette-generator', 'Color palette generator')}).`,
      },
      {
        question: 'Is Coolors free?',
        answer: `Coolors has a free plan and a paid Pro plan. UI Color Palette also has a free /basic plan and a /pro plan (see ${htmlLink('/pricing', 'pricing')}).`,
      },
    ],
  },
  sources: [
    { label: 'Coolors', href: 'https://coolors.co' },
    { label: 'Coolors apps', href: 'https://coolors.co/apps' },
    {
      label: 'Coolors contrast checker',
      href: 'https://coolors.co/contrast-checker',
    },
    { label: 'Coolors pricing', href: 'https://coolors.co/pricing' },
    { label: 'Coolors generator', href: 'https://coolors.co/generate' },
    { label: 'Coolors Color Bot', href: 'https://coolors.co/color-bot' },
    { label: 'Coolors image picker', href: 'https://coolors.co/image-picker' },
    {
      label: 'UI Color Palette docs',
      href: 'https://docs.ui-color-palette.com',
    },
  ],
  verified: '2026-11-03',
  related: [
    {
      icon: 'glasses',
      title: 'Color palette generator',
      label: 'See the capability',
      href: '/capabilities/color-palette-generator',
    },
    {
      icon: 'glasses',
      title: 'WCAG & APCA contrast',
      label: 'See the capability',
      href: '/capabilities/wcag-apca-contrast',
    },
    {
      icon: 'glasses',
      title: 'Export design tokens',
      label: 'See the capability',
      href: '/capabilities/export-design-tokens',
    },
    {
      icon: 'book-open',
      title: 'Every comparison',
      label: 'See the comparisons',
      href: '/compare',
    },
  ],
}

const leonardo: ComparePage = {
  slug: 'ui-color-palette-vs-leonardo',
  competitor: 'Adobe Leonardo',
  seo: {
    title: 'UI Color Palette vs Adobe Leonardo: An Alternative',
    description:
      'UI Color Palette vs Adobe Leonardo: two tools that build color scales from contrast, one on the web and in code, one inside your design tool. Compared.',
  },
  hero: {
    title: 'UI Color Palette vs Adobe Leonardo',
    tagline:
      'Both build color scales with contrast in mind. Leonardo works on the web and in code; UI Color Palette works inside your design tool.',
    cta: { label: 'Get UI Color Palette', href: '/download' },
  },
  summary:
    'Leonardo, an Adobe open source project, generates color scales from target contrast ratios, with WCAG 2 or APCA, as a web app, a JavaScript library and an MCP server. UI Color Palette scores and targets contrast too, but inside Figma, Penpot, Sketch and Framer, where it syncs the palette as variables, styles or tokens.',
  table: {
    id: 'features',
    title: 'UI Color Palette and Adobe Leonardo, side by side',
    intro: 'What each tool does, from its own site and documentation.',
    caption: 'UI Color Palette and Adobe Leonardo compared',
    rowHeader: 'Feature',
    columns: ['UI Color Palette', 'Adobe Leonardo'],
    rows: [
      {
        label: 'Where it runs',
        values: [
          'Plugin for Figma, Penpot, Sketch and Framer; Claude plugin and MCP server',
          'Web app, npm library and MCP server',
        ],
      },
      {
        label: 'Builds scales from your colors',
        values: [
          '19 scale presets (Material 3 and Tailwind free, the rest on /pro) or your own stops',
          'From your key colors and target contrast ratios, plus data-visualization scales',
        ],
      },
      {
        label: 'Color spaces',
        values: [
          'OKLCH (default), LCH, CIELAB, OKLab, HSL, HSLuv, HSV, CMYK; OKLCH, LCH and HSL are free',
          'CAM02, LCH, LAB, OKLCH, OKLab, HSLuv, HSL, HSV and RGB',
        ],
      },
      {
        label: 'Contrast',
        values: [
          'WCAG 2.1 ratio and APCA score on every shade; target contrast ratio per stop',
          'Colors generated from target ratios, with WCAG 2 or APCA',
        ],
      },
      {
        label: 'Color blindness simulation',
        values: [
          '8 types, set per color mode; protanomaly is free',
          'Color vision deficiency simulation, with a color difference per type',
        ],
      },
      {
        label: 'Light and dark modes',
        values: [
          'Color modes, each with its own scale, text colors and background',
          'Adaptive themes, regenerated from the background lightness',
        ],
      },
      {
        label: 'Sync into the design tool',
        values: [
          'Figma variables and styles, Penpot tokens, Sketch variables and styles, Framer color styles',
          'No official design-tool plugin found',
        ],
      },
      {
        label: 'Code and token export',
        values: [
          'CSS for free; DTCG, Style Dictionary, Tailwind, SCSS, Less, SwiftUI, UIKit, Compose and Android XML on /pro (Framer: CSS, SCSS, Less, Tailwind and JSON tokens)',
          'CSS custom properties, design tokens (W3C format) and SVG',
        ],
      },
      {
        label: 'AI and image',
        values: [
          'A palette from a prompt, from an image or from a color harmony',
          'An MCP server for AI assistants; key colors from an image',
        ],
      },
      {
        label: 'Pricing',
        values: [
          'Free /basic plan; /pro subscription',
          'Free and open source (Apache-2.0)',
        ],
      },
    ],
  },
  chooseUs: [
    'Your palette lives in a design file: UI Color Palette builds it in Figma, Penpot, Sketch or Framer and syncs it as variables, styles or tokens, so designers work with the same shades the code uses.',
    'You want scales named like your design system — Material 3, Tailwind, Carbon and 13 more presets, with Material 3 and Tailwind free — and exports for Tailwind, SwiftUI, Compose and Android as well as tokens.',
  ],
  chooseThem: [
    'Contrast is your starting point and your team works in code: Leonardo generates every color from a target ratio, with WCAG 2 or APCA, and its JavaScript library generates adaptive themes in code.',
    'You want open source you can embed, adaptive themes driven by background lightness, or data-visualization scales; Leonardo also offers an MCP server for AI assistants.',
  ],
  faq: {
    intro:
      'How UI Color Palette and Adobe Leonardo differ, and when to use each.',
    items: [
      {
        question: 'What is Adobe Leonardo?',
        answer: `An Adobe open source project for authoring adaptive color palettes from desired contrast ratios, available as a web app, the @adobe/leonardo-contrast-colors library and an MCP server. It is unrelated to Leonardo.Ai.`,
      },
      {
        question: 'Is UI Color Palette an alternative to Leonardo?',
        answer: `For designers working in a design tool, yes. Both target contrast; UI Color Palette sets a target WCAG ratio per stop and shows APCA scores, then syncs the palette to Figma, Penpot, Sketch or Framer (see ${htmlLink('/capabilities/wcag-apca-contrast', 'WCAG & APCA contrast')}).`,
      },
      {
        question: 'Does Leonardo have a Figma plugin?',
        answer: `No official one was found: Leonardo runs as a web app, a JavaScript library and an MCP server. UI Color Palette runs as a plugin in Figma, Penpot, Sketch and Framer.`,
      },
      {
        question: 'Is Adobe Leonardo free?',
        answer: `Yes. Leonardo is free and open source under Apache-2.0. UI Color Palette has a free /basic plan and a /pro plan (see ${htmlLink('/pricing', 'pricing')}).`,
      },
      {
        question: 'Which color spaces do they use?',
        answer: `Leonardo offers CAM02, LCH, LAB, OKLCH, OKLab, HSLuv and more. UI Color Palette offers OKLCH, its default, LCH, CIELAB, OKLab, HSL, HSLuv, HSV and CMYK (see ${htmlLink('/capabilities/oklch-lch-color-spaces', 'OKLCH & LCH color spaces')}).`,
      },
    ],
  },
  sources: [
    { label: 'Leonardo', href: 'https://leonardocolor.io' },
    { label: 'Leonardo on GitHub', href: 'https://github.com/adobe/leonardo' },
    {
      label: 'Leonardo contrast-colors README',
      href: 'https://github.com/adobe/leonardo/blob/main/packages/contrast-colors/README.md',
    },
    {
      label: 'Leonardo AI tools',
      href: 'https://leonardocolor.io/ai-tools.html',
    },
    {
      label: 'Leonardo license',
      href: 'https://github.com/adobe/leonardo/blob/main/LICENSE',
    },
    {
      label: 'Leonardo color spaces',
      href: 'https://github.com/adobe/leonardo/blob/main/packages/contrast-colors/lib/utils.js',
    },
    {
      label: 'UI Color Palette docs',
      href: 'https://docs.ui-color-palette.com',
    },
  ],
  verified: '2026-11-03',
  related: [
    {
      icon: 'glasses',
      title: 'WCAG & APCA contrast',
      label: 'See the capability',
      href: '/capabilities/wcag-apca-contrast',
    },
    {
      icon: 'glasses',
      title: 'OKLCH & LCH color spaces',
      label: 'See the capability',
      href: '/capabilities/oklch-lch-color-spaces',
    },
    {
      icon: 'glasses',
      title: 'Light & dark modes',
      label: 'See the capability',
      href: '/capabilities/light-dark-themes',
    },
    {
      icon: 'book-open',
      title: 'Every comparison',
      label: 'See the comparisons',
      href: '/compare',
    },
  ],
}

const materialThemeBuilder: ComparePage = {
  slug: 'ui-color-palette-vs-material-theme-builder',
  competitor: 'Material Theme Builder',
  seo: {
    title: 'UI Color Palette vs Material Theme Builder Compared',
    description:
      'UI Color Palette vs Material Theme Builder: Material 3 schemes in HCT, or accessible scales for any design system, in Figma, Penpot, Sketch and Framer.',
  },
  hero: {
    title: 'UI Color Palette vs Material Theme Builder',
    tagline:
      'Material Theme Builder builds Material 3 themes; UI Color Palette builds scales for any design system, Material 3 included.',
    cta: { label: 'Get UI Color Palette', href: '/download' },
  },
  summary:
    'Material Theme Builder, by Google, turns your key colors or an image into Material 3 color schemes computed in HCT, with light and dark themes at three contrast levels, and exports them for Android, Flutter and the web. UI Color Palette builds scales for any design system, from 19 presets including Material 3, in four design tools.',
  table: {
    id: 'features',
    title: 'UI Color Palette and Material Theme Builder, side by side',
    intro: 'What each tool does, from its own site and documentation.',
    caption: 'UI Color Palette and Material Theme Builder compared',
    rowHeader: 'Feature',
    columns: ['UI Color Palette', 'Material Theme Builder'],
    rows: [
      {
        label: 'Where it runs',
        values: [
          'Plugin for Figma, Penpot, Sketch and Framer; Claude plugin and MCP server',
          'Web app and Figma plugin',
        ],
      },
      {
        label: 'Builds scales from your colors',
        values: [
          '19 scale presets (Material 3 and Tailwind free, the rest on /pro) or your own stops',
          'Material 3 tonal palettes and schemes from your key colors or an image',
        ],
      },
      {
        label: 'Color spaces',
        values: [
          'OKLCH (default), LCH, CIELAB, OKLab, HSL, HSLuv, HSV, CMYK; OKLCH, LCH and HSL are free',
          'HCT',
        ],
      },
      {
        label: 'Contrast',
        values: [
          'WCAG 2.1 ratio and APCA score on every shade; target contrast ratio per stop',
          'WCAG minimum ratios built into the schemes, at standard, medium and high contrast; APCA not mentioned',
        ],
      },
      {
        label: 'Color blindness simulation',
        values: [
          '8 types, set per color mode; protanomaly is free',
          'Not documented on its site',
        ],
      },
      {
        label: 'Light and dark modes',
        values: [
          'Color modes, each with its own scale, text colors and background',
          'Light and dark schemes, each at three contrast levels',
        ],
      },
      {
        label: 'Sync into the design tool',
        values: [
          'Figma variables and styles, Penpot tokens, Sketch variables and styles, Framer color styles',
          'Figma styles; variables are documented on a Google DesignCompose page',
        ],
      },
      {
        label: 'Code and token export',
        values: [
          'CSS for free; DTCG, Style Dictionary, Tailwind, SCSS, Less, SwiftUI, UIKit, Compose and Android XML on /pro (Framer: CSS, SCSS, Less, Tailwind and JSON tokens)',
          'Jetpack Compose, Android XML, Flutter, CSS and JSON',
        ],
      },
      {
        label: 'AI and image',
        values: [
          'A palette from a prompt, from an image or from a color harmony',
          'A scheme from an image; no AI documented',
        ],
      },
      {
        label: 'Pricing',
        values: ['Free /basic plan; /pro subscription', 'Free'],
      },
    ],
  },
  chooseUs: [
    'Your design system is not, or not only, Material 3: UI Color Palette gives your colors the stops of Tailwind, Radix, Spectrum, Carbon, Polaris, Fluent and more on /pro, or your own, and scores every shade with WCAG 2.1 and APCA.',
    'You work in Penpot, Sketch or Framer as well as Figma, or you need Tailwind or DTCG tokens, or SwiftUI next to Compose and Android code from Figma, Penpot or Sketch.',
  ],
  chooseThem: [
    'You build on Material 3: Material Theme Builder produces the full role-based scheme — from primary, secondary, tertiary and neutral key colors — in HCT, for Material dynamic color.',
    'You ship Android or Flutter apps: it exports Jetpack Compose, Android XML and Flutter themes directly, with light and dark schemes at three contrast levels, for free.',
  ],
  faq: {
    intro:
      'How UI Color Palette and Material Theme Builder differ, and when to use each.',
    items: [
      {
        question:
          'Is UI Color Palette an alternative to Material Theme Builder?',
        answer: `Yes, when you need more than Material 3. UI Color Palette includes a Material 3 preset with its 13 stops, plus 15 other design system scales, and runs in Figma, Penpot, Sketch and Framer (see ${htmlLink('/capabilities/design-system-presets', 'Design system presets')}).`,
      },
      {
        question: 'Does UI Color Palette use HCT like Material Theme Builder?',
        answer: `No. Material Theme Builder computes in HCT; UI Color Palette computes scales in OKLCH by default, or in LCH, CIELAB, OKLab, HSLuv and other spaces (see ${htmlLink('/capabilities/oklch-lch-color-spaces', 'OKLCH & LCH color spaces')}).`,
      },
      {
        question: 'Does Material Theme Builder have a Figma plugin?',
        answer: `Yes. Its Figma plugin creates the theme as styles, and a Google DesignCompose page documents variables in a collection with light, dark and contrast modes. UI Color Palette runs in Figma, Penpot, Sketch and Framer, and creates Figma variables with one mode per color mode.`,
      },
      {
        question: 'Which one exports to Jetpack Compose?',
        answer: `Both. Material Theme Builder exports Compose, Android XML, Flutter, CSS and JSON; UI Color Palette exports Compose and Android XML on /pro, along with SwiftUI, Tailwind and DTCG tokens (see ${htmlLink('/capabilities/swiftui-compose-colors', 'SwiftUI & Compose colors')}).`,
      },
      {
        question: 'Is Material Theme Builder free?',
        answer: `Yes. UI Color Palette has a free /basic plan, which includes the Material 3 preset, and a /pro plan (see ${htmlLink('/pricing', 'pricing')}).`,
      },
    ],
  },
  sources: [
    {
      label: 'Material Theme Builder',
      href: 'https://material-foundation.github.io/material-theme-builder/',
    },
    {
      label: 'Material Theme Builder README',
      href: 'https://github.com/material-foundation/material-theme-builder',
    },
    {
      label: 'Material Color Utilities',
      href: 'https://github.com/material-foundation/material-color-utilities',
    },
    {
      label: 'Google DesignCompose: variables',
      href: 'https://google.github.io/automotive-design-compose/docs/variables',
    },
    {
      label: 'UI Color Palette docs',
      href: 'https://docs.ui-color-palette.com',
    },
  ],
  verified: '2026-11-03',
  related: [
    {
      icon: 'glasses',
      title: 'Design system presets',
      label: 'See the capability',
      href: '/capabilities/design-system-presets',
    },
    {
      icon: 'glasses',
      title: 'SwiftUI & Compose colors',
      label: 'See the capability',
      href: '/capabilities/swiftui-compose-colors',
    },
    {
      icon: 'glasses',
      title: 'Light & dark modes',
      label: 'See the capability',
      href: '/capabilities/light-dark-themes',
    },
    {
      icon: 'book-open',
      title: 'Every comparison',
      label: 'See the comparisons',
      href: '/compare',
    },
  ],
}

const radixColors: ComparePage = {
  slug: 'ui-color-palette-vs-radix-colors',
  competitor: 'Radix Colors',
  seo: {
    title: 'UI Color Palette vs Radix Colors: Custom vs Curated Scales',
    description:
      'UI Color Palette vs Radix Colors: hand-tuned 12-step scales to install, or scales generated from your own colors in your design tool. Features compared.',
  },
  hero: {
    title: 'UI Color Palette vs Radix Colors',
    tagline:
      'Radix Colors gives you curated 12-step scales to install; UI Color Palette generates scales from your own colors as a Figma, Penpot, Sketch and Framer plugin.',
    cta: { label: 'Get UI Color Palette', href: '/download' },
  },
  summary:
    'Radix Colors is an open source set of 31 hand-tuned scales of 12 steps, with dark, alpha and P3 versions, installed as an npm package, plus a generator for custom accent and gray scales. UI Color Palette generates scales from your own colors, on 19 presets including a 12-step Radix one, inside your design tool.',
  table: {
    id: 'features',
    title: 'UI Color Palette and Radix Colors, side by side',
    intro: 'What each tool does, from its own site and documentation.',
    caption: 'UI Color Palette and Radix Colors compared',
    rowHeader: 'Feature',
    columns: ['UI Color Palette', 'Radix Colors'],
    rows: [
      {
        label: 'Where it runs',
        values: [
          'Plugin for Figma, Penpot, Sketch and Framer; Claude plugin and MCP server',
          'npm package and a web palette generator',
        ],
      },
      {
        label: 'Builds scales from your colors',
        values: [
          '19 scale presets (Material 3 and Tailwind free, the rest on /pro) or your own stops',
          '31 hand-tuned 12-step scales; a generator for custom accent and gray scales',
        ],
      },
      {
        label: 'Color spaces',
        values: [
          'OKLCH (default), LCH, CIELAB, OKLab, HSL, HSLuv, HSV, CMYK; OKLCH, LCH and HSL are free',
          'Not documented on its docs (the generator’s source converts to OKLCH); P3 versions of every scale',
        ],
      },
      {
        label: 'Contrast',
        values: [
          'WCAG 2.1 ratio and APCA score on every shade; target contrast ratio per stop',
          'APCA: steps 11 and 12 reach Lc 60 and Lc 90 on step 2; WCAG ratios not mentioned',
        ],
      },
      {
        label: 'Color blindness simulation',
        values: [
          '8 types, set per color mode; protanomaly is free',
          'Not documented on its site',
        ],
      },
      {
        label: 'Light and dark modes',
        values: [
          'Color modes, each with its own scale, text colors and background',
          'A dark counterpart for every scale',
        ],
      },
      {
        label: 'Sync into the design tool',
        values: [
          'Figma variables and styles, Penpot tokens, Sketch variables and styles, Framer color styles',
          'No official design-tool plugin found; the generator copies swatches as SVG',
        ],
      },
      {
        label: 'Code and token export',
        values: [
          'CSS for free; DTCG, Style Dictionary, Tailwind, SCSS, Less, SwiftUI, UIKit, Compose and Android XML on /pro (Framer: CSS, SCSS, Less, Tailwind and JSON tokens)',
          'CSS variables and JavaScript objects; the generator copies CSS',
        ],
      },
      {
        label: 'AI and image',
        values: [
          'A palette from a prompt, from an image or from a color harmony',
          'None documented',
        ],
      },
      {
        label: 'Pricing',
        values: [
          'Free /basic plan; /pro subscription',
          'Free and open source (MIT)',
        ],
      },
    ],
  },
  chooseUs: [
    'Your brand colors are not in a curated set: UI Color Palette scales your own colors, on the 12 steps of its Radix preset or any of 18 other presets (Material 3 and Tailwind free, the rest on /pro), and shows the WCAG 2.1 ratio and APCA score of every shade.',
    'Your palette must live in a design file and in several codebases: it syncs to Figma, Penpot, Sketch and Framer and exports Tailwind or DTCG tokens, and SwiftUI or Compose from Figma, Penpot or Sketch.',
  ],
  chooseThem: [
    'You want ready-made palettes without designing them: each of the 12 steps has a defined job — backgrounds, component states, borders, solid colors, text — with dark mode, alpha and P3 versions included.',
    'You build a React or web product and want to install the colors as a package, open source under MIT, with CSS variables or JavaScript objects ready to use.',
  ],
  faq: {
    intro:
      'How UI Color Palette and Radix Colors differ, and when to use each.',
    items: [
      {
        question: 'Is UI Color Palette an alternative to Radix Colors?',
        answer: `Yes, when you need scales from your own colors. Radix Colors ships curated scales; UI Color Palette generates them from your colors, and includes a Radix preset with the same 12 steps (see ${htmlLink('/capabilities/design-system-presets', 'Design system presets')}).`,
      },
      {
        question: 'Does UI Color Palette copy Radix Colors?',
        answer: `No. Its Radix preset uses the 12 stop names of Radix Colors; every shade is computed from your own source colors, not taken from the Radix Colors scales.`,
      },
      {
        question: 'How does Radix Colors handle contrast?',
        answer: `Radix Colors states that steps 11 and 12 reach APCA Lc 60 and Lc 90 on step 2 of the same scale. UI Color Palette shows the WCAG 2.1 ratio and the APCA score of every shade against your text colors (see ${htmlLink('/glossary/apca', 'What is APCA?')}).`,
      },
      {
        question: 'Is there a Radix Colors plugin for Figma?',
        answer: `No official Radix Colors plugin for Figma was found; its generator copies swatches as SVG. UI Color Palette syncs palettes to Figma variables and styles, and to Penpot, Sketch and Framer.`,
      },
      {
        question: 'Is Radix Colors free?',
        answer: `Yes. Radix Colors is free and open source under MIT. UI Color Palette has a free /basic plan; its Radix preset is on /pro (see ${htmlLink('/pricing', 'pricing')}).`,
      },
    ],
  },
  sources: [
    { label: 'Radix Colors', href: 'https://www.radix-ui.com/colors' },
    {
      label: 'Understanding the scale',
      href: 'https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale',
    },
    {
      label: 'Radix Colors usage',
      href: 'https://www.radix-ui.com/colors/docs/overview/usage',
    },
    {
      label: 'Radix Colors on GitHub',
      href: 'https://github.com/radix-ui/colors',
    },
    {
      label: 'Radix Colors installation',
      href: 'https://www.radix-ui.com/colors/docs/overview/installation',
    },
    {
      label: 'Radix Colors custom palette',
      href: 'https://www.radix-ui.com/colors/custom',
    },
    {
      label: 'Radix Colors generator source',
      href: 'https://github.com/radix-ui/website/blob/main/components/generate-radix-colors.tsx',
    },
    {
      label: 'UI Color Palette docs',
      href: 'https://docs.ui-color-palette.com',
    },
  ],
  verified: '2026-11-03',
  related: [
    {
      icon: 'glasses',
      title: 'Design system presets',
      label: 'See the capability',
      href: '/capabilities/design-system-presets',
    },
    {
      icon: 'glasses',
      title: 'Color palette generator',
      label: 'See the capability',
      href: '/capabilities/color-palette-generator',
    },
    {
      icon: 'glasses',
      title: 'WCAG & APCA contrast',
      label: 'See the capability',
      href: '/capabilities/wcag-apca-contrast',
    },
    {
      icon: 'book-open',
      title: 'Every comparison',
      label: 'See the comparisons',
      href: '/compare',
    },
  ],
}

const realtimeColors: ComparePage = {
  slug: 'ui-color-palette-vs-realtime-colors',
  competitor: 'Realtime Colors',
  seo: {
    title: 'UI Color Palette vs Realtime Colors: Features Compared',
    description:
      'UI Color Palette vs Realtime Colors: preview five colors on a website layout, or build accessible scales and tokens in your design tool. Compared.',
  },
  hero: {
    title: 'UI Color Palette vs Realtime Colors',
    tagline:
      'Realtime Colors shows your colors on a real website layout; UI Color Palette turns them into accessible scales inside your design tool.',
    cta: { label: 'Get UI Color Palette', href: '/download' },
  },
  summary:
    'Realtime Colors previews five role colors — text, background, primary, secondary and accent — on a realistic website layout as you pick them, and exports them to CSS, Tailwind and framework presets. UI Color Palette turns your colors into full scales with WCAG and APCA scores, synced to your design tool and exported as tokens and code.',
  table: {
    id: 'features',
    title: 'UI Color Palette and Realtime Colors, side by side',
    intro: 'What each tool does, from its own site and documentation.',
    caption: 'UI Color Palette and Realtime Colors compared',
    rowHeader: 'Feature',
    columns: ['UI Color Palette', 'Realtime Colors'],
    rows: [
      {
        label: 'Where it runs',
        values: [
          'Plugin for Figma, Penpot, Sketch and Framer; Claude plugin and MCP server',
          'Web app, Figma plugin and VS Code extension',
        ],
      },
      {
        label: 'Builds scales from your colors',
        values: [
          '19 scale presets (Material 3 and Tailwind free, the rest on /pro) or your own stops',
          'Five role colors, chosen or randomized, previewed on a website layout; shades can be exported',
        ],
      },
      {
        label: 'Color spaces',
        values: [
          'OKLCH (default), LCH, CIELAB, OKLab, HSL, HSLuv, HSV, CMYK; OKLCH, LCH and HSL are free',
          'Randomizes in HSL; exports HEX, RGB, HSL, OKLab or OKLCH',
        ],
      },
      {
        label: 'Contrast',
        values: [
          'WCAG 2.1 ratio and APCA score on every shade; target contrast ratio per stop',
          'A WCAG-style indicator, with 4.5 and 7 thresholds',
        ],
      },
      {
        label: 'Color blindness simulation',
        values: [
          '8 types, set per color mode; protanomaly is free',
          'Not documented on its site',
        ],
      },
      {
        label: 'Light and dark modes',
        values: [
          'Color modes, each with its own scale, text colors and background',
          'A light and dark toggle; both themes export',
        ],
      },
      {
        label: 'Sync into the design tool',
        values: [
          'Figma variables and styles, Penpot tokens, Sketch variables and styles, Framer color styles',
          'Figma color styles',
        ],
      },
      {
        label: 'Code and token export',
        values: [
          'CSS for free; DTCG, Style Dictionary, Tailwind, SCSS, Less, SwiftUI, UIKit, Compose and Android XML on /pro (Framer: CSS, SCSS, Less, Tailwind and JSON tokens)',
          'CSS, Tailwind, SCSS, CSV and framework presets such as shadcn, DaisyUI and Material UI',
        ],
      },
      {
        label: 'AI and image',
        values: [
          'A palette from a prompt, from an image or from a color harmony',
          'None documented',
        ],
      },
      {
        label: 'Pricing',
        values: ['Free /basic plan; /pro subscription', 'Free'],
      },
    ],
  },
  chooseUs: [
    'You need a full scale for each color — not five colors — with the WCAG 2.1 ratio and APCA score of every shade, and color modes with their own scales.',
    'You want the palette inside Figma, Penpot, Sketch or Framer as variables, styles or tokens, and as CSS, Tailwind or DTCG tokens, and SwiftUI or Compose code from Figma, Penpot or Sketch.',
  ],
  chooseThem: [
    'You want to see a palette on a real page before deciding: Realtime Colors applies your colors and fonts to a website layout as you change them, which helps when deciding with a client.',
    'You need five colors for a website quickly, with exports for shadcn, DaisyUI, Material UI and other frameworks, for free.',
  ],
  faq: {
    intro:
      'How UI Color Palette and Realtime Colors differ, and when to use each.',
    items: [
      {
        question: 'Is UI Color Palette an alternative to Realtime Colors?',
        answer: `For building a color system, yes. Realtime Colors helps you choose five colors by previewing them on a website; UI Color Palette turns colors into accessible scales and syncs them to your design tool. You can choose in one and build in the other.`,
      },
      {
        question: 'Can I import a Realtime Colors palette?',
        answer: `Yes. UI Color Palette can import color combinations from Realtime Colors, and each color becomes a scale (see ${htmlLink('/capabilities/color-palette-generator', 'Color palette generator')}).`,
      },
      {
        question: 'Does Realtime Colors have a Figma plugin?',
        answer: `Yes: it takes a Realtime Colors URL and creates local color styles. UI Color Palette syncs to Figma variables and styles, and to Penpot tokens, Sketch and Framer.`,
      },
      {
        question: 'How do they check contrast?',
        answer: `Realtime Colors shows an indicator per color with 4.5 and 7 thresholds. UI Color Palette shows the WCAG 2.1 ratio and the APCA score of every shade, and can set the ratio each stop must reach (see ${htmlLink('/capabilities/wcag-apca-contrast', 'WCAG & APCA contrast')}).`,
      },
      {
        question: 'Is Realtime Colors free?',
        answer: `Yes. Realtime Colors is free. UI Color Palette has a free /basic plan and a /pro plan (see ${htmlLink('/pricing', 'pricing')}).`,
      },
    ],
  },
  sources: [
    {
      label: 'About Realtime Colors',
      href: 'https://www.realtimecolors.com/docs/about-realtime-colors/',
    },
    {
      label: 'Realtime Colors exporting',
      href: 'https://www.realtimecolors.com/docs/exporting',
    },
    {
      label: 'Realtime Colors contrast checker',
      href: 'https://www.realtimecolors.com/docs/contrast-checker',
    },
    {
      label: 'Realtime Colors Figma plugin',
      href: 'https://www.realtimecolors.com/docs/figma-plugin',
    },
    {
      label: 'Realtime Colors randomization',
      href: 'https://www.realtimecolors.com/docs/randomization',
    },
    {
      label: 'Realtime Colors VS Code extension',
      href: 'https://www.realtimecolors.com/docs/vscode',
    },
    { label: 'Realtime Colors', href: 'https://www.realtimecolors.com' },
    {
      label: 'UI Color Palette docs',
      href: 'https://docs.ui-color-palette.com',
    },
  ],
  verified: '2026-11-03',
  related: [
    {
      icon: 'glasses',
      title: 'Color palette generator',
      label: 'See the capability',
      href: '/capabilities/color-palette-generator',
    },
    {
      icon: 'glasses',
      title: 'Tailwind color palette',
      label: 'See the capability',
      href: '/capabilities/tailwind-color-palette',
    },
    {
      icon: 'glasses',
      title: 'Light & dark modes',
      label: 'See the capability',
      href: '/capabilities/light-dark-themes',
    },
    {
      icon: 'book-open',
      title: 'Every comparison',
      label: 'See the comparisons',
      href: '/compare',
    },
  ],
}

export const comparePages: ComparePage[] = [
  coolors,
  leonardo,
  materialThemeBuilder,
  radixColors,
  realtimeColors,
]
