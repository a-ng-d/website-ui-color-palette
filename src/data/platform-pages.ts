import type { CapabilityGroup } from '@/data/capabilities'
import { htmlLink, type FaqItem } from '@/data/faq'
import { links } from '@/config/site'
import type { IconId, NextStep, Steps, Table } from '@/data/blocks'

export interface Surface {
  icon: IconId
  title: string
  text: string
  span?: number
}

export interface PlatformPage {
  path: string
  platform: string
  offerName?: string
  seo: { title: string; description: string }
  docs: string
  hero: {
    title: string
    tagline: string
    cta: { label: string; href: string }
  }
  surfaces: {
    title: string
    intro: string
    embed?: { src: string; title: string }
    cards: Surface[]
  }
  why: CapabilityGroup
  setup?: Steps
  tables?: Table[]
  faq?: { intro: string; items: FaqItem[] }
  nextSteps?: NextStep[]
}

export const nextSteps: NextStep[] = [
  {
    icon: 'glasses',
    title: 'Explore the features',
    label: 'See the capabilities',
    href: '/capabilities',
  },
  {
    icon: 'badge-dollar-sign',
    title: 'Compare plans',
    label: 'See the pricing',
    href: '/pricing',
  },
  {
    icon: 'download',
    title: 'Switch platform',
    label: 'See the downloads',
    href: '/download',
  },
  {
    icon: 'newspaper',
    title: 'Learn the workflows',
    label: 'Read the blog',
    href: '/blog',
  },
]

const pluginEmbed = (platform: string, editor: string) => {
  const url = new URL(links.pluginEmbed)
  url.search = new URLSearchParams({
    embed: '1',
    platform,
    mode: 'dark',
    editor,
  }).toString()
  return url.href
}

const designToolWhy: CapabilityGroup = {
  id: 'why-it-matters',
  title: 'Why it matters',
  cards: [
    {
      title: 'AI-powered generation',
      text: 'Themes like Cyberpunk, Minimalist, Corporate…',
      demo: 'ai',
    },
    {
      title: 'WCAG & APCA contrast checks',
      text: 'Accessibility built into every shade.',
      demo: 'contrast',
    },
    {
      title: 'Design tokens, Tailwind & CSS export',
      text: 'Production-ready handoff.',
      demo: 'tokens',
    },
  ],
}

export const figmaPage: PlatformPage = {
  path: '/figma',
  docs: `${links.docs}/figma`,
  platform: 'Figma',
  seo: {
    title: 'UI Color Palette for Figma — Color Palette Plugin',
    description:
      'Figma color palette plugin: build accessible scales and sync them to local variables and styles, with WCAG and APCA scores on every shade. Free to start.',
  },
  hero: {
    title: 'UI Color Palette for Figma',
    tagline:
      'The Figma color palette plugin for accessible scales, synced to your variables and styles.',
    cta: { label: 'Add to Figma', href: links.runFigmaPlugin },
  },
  surfaces: {
    title: 'A color palette plugin for each Figma product',
    intro:
      "UI Color Palette lives across Figma's product line and adapts to what each surface can do — from full design systems to pure creation, and even your IDE. Wherever you work in Figma, you're covered.",
    embed: {
      src: pluginEmbed('figma', 'figma'),
      title: 'UI Color Palette running as a Figma plugin',
    },
    cards: [
      {
        icon: 'ruler',
        title: 'Figma Design',
        text: 'The full experience — generate, master, and deploy to variables & styles with color modes and export. Developers can then browse it in Dev Mode and export it to code.',
      },
      {
        icon: 'paintbrush',
        title: 'Figma Buzz & FigJam',
        text: 'Creation-focused — FigJam creates palettes and exports them to code; Buzz creates palettes, without color modes or export. Neither syncs with styles or variables.',
      },
      {
        icon: 'code-xml',
        title: 'VS Code (Figma plugin)',
        text: 'Brings your palettes right into the IDE, closer to a development context.',
      },
    ],
  },
  why: designToolWhy,
  setup: {
    title: 'How to set up the color palette plugin in Figma',
    docs: {
      label: 'Read the Figma guides in the docs',
      href: `${links.docs}/figma`,
    },
    intro:
      'Add the plugin from the Figma Community, build the palette in your file, then sync it with your local styles and variables.',
    steps: [
      {
        title: 'Add the plugin to Figma',
        text: 'Open UI Color Palette on the Figma Community and run it in a Figma Design file. Palettes are saved on the page you are on, for everyone who opens the file.',
      },
      {
        title: 'Create a palette',
        text: 'Click + in the Palettes manager. Select filled layers first to start from their colors, or start from AI, an image, a color harmony or Color Hunt.',
      },
      {
        title: 'Tune the scale and the contrast',
        text: 'Pick a scale preset (Material 3 and Tailwind are free), set each stop by lightness or target contrast ratio, and read the WCAG 2.1 and APCA score of every shade.',
      },
      {
        title: 'Sync with local styles or variables',
        text: 'Sync with the local variables to get one collection named after the palette, with one mode per color mode; or with the local styles. Run it again after each change: existing styles and variables are updated, never duplicated.',
      },
      {
        title: 'Hand it off',
        text: 'Publish the styles and variables as a team library, and developers can open the palette in Dev Mode to read its scores and export it to code.',
      },
    ],
  },
  tables: [
    {
      id: 'figma-products',
      title: 'What the plugin does in each Figma product',
      intro:
        'UI Color Palette runs across the Figma product line, with a set of features tailored to each one.',
      caption: 'UI Color Palette features per Figma product',
      rowHeader: 'Figma product',
      columns: [
        'Create and edit palettes',
        'Sync to styles',
        'Sync to variables',
        'Export to code',
      ],
      rows: [
        { label: 'Figma Design', values: [true, true, true, true] },
        { label: 'Dev Mode', values: [false, false, false, true] },
        {
          label: 'VS Code (Figma plugin)',
          values: [false, false, false, true],
        },
        { label: 'FigJam', values: [true, false, false, true] },
        { label: 'Figma Buzz', values: [true, false, false, false] },
      ],
      note: 'In Dev Mode and in VS Code, you browse the palettes of the selected page, read their properties and contrast scores, and export them; a designer creates them in Figma Design. Buzz has no color modes.',
    },
    {
      id: 'plans',
      title: 'What you get on each plan in Figma',
      intro:
        'Syncing with your Figma library is free. Volume, documentation and most code formats are on /pro.',
      caption: 'UI Color Palette for Figma, per plan',
      rowHeader: 'Feature',
      columns: ['/basic', '/pro'],
      rows: [
        { label: 'Palettes per page', values: ['1', 'Unlimited'] },
        { label: 'Source colors per palette', values: ['5', 'Unlimited'] },
        { label: 'Color modes per palette', values: ['2', 'Unlimited'] },
        { label: 'Sync with local styles and variables', values: [true, true] },
        {
          label: 'WCAG 2.1 and APCA score on every shade',
          values: [true, true],
        },
        { label: 'Palette documentation as frames', values: [false, true] },
        {
          label: 'Export to code',
          values: [
            'CSS',
            'Every format: tokens, Tailwind, SCSS, Less, Apple, Android…',
          ],
        },
      ],
      note: 'Figma itself caps variable modes per collection: 1 on the Starter plan, 10 on Professional and Organization.',
    },
  ],
  faq: {
    intro:
      'Installing the plugin, syncing variables and styles, and using it beyond Figma Design.',
    items: [
      {
        question: 'Is there a free color palette plugin for Figma?',
        answer: `Yes. On the free /basic plan, UI Color Palette builds one palette per page with up to 5 source colors and 2 color modes, shows the WCAG 2.1 and APCA score of every shade, syncs with your local styles and variables, and exports to CSS. /pro lifts the caps (see ${htmlLink('/pricing', 'pricing')}).`,
      },
      {
        question: 'How do I turn a color palette into Figma variables?',
        answer:
          'Click Sync with the local variables. UI Color Palette creates a collection named after the palette, with the shades grouped by source color and one mode per color mode. Each generated shade’s description gives its lightness and its WCAG and APCA scores, so anyone inspecting it sees them without the plugin.',
      },
      {
        question: 'Can I use UI Color Palette in Dev Mode?',
        answer:
          'Yes. In Dev Mode, and in the VS Code Figma plugin, you browse the palettes of the selected page, read the properties and contrast scores of each shade, and export the palette to code. The palettes themselves are created in Figma Design.',
      },
      {
        question: 'Is there a color palette plugin for FigJam?',
        answer:
          'Yes. In FigJam you can create palettes and export them to code, but not sync them with styles or variables, which FigJam does not support.',
      },
      {
        question: 'How many color modes can a palette sync as variable modes?',
        answer:
          'Up to the lower of two caps: your UI Color Palette plan (2 color modes on /basic, unlimited on /pro) and your Figma plan (1 mode per collection on Starter, 10 on Professional and Organization). A color mode that cannot get its own variable mode is skipped with a warning, and the rest of the sync goes through.',
      },
      {
        question:
          'What is the difference between the UI Color Palette /one and /team Figma plugins?',
        answer:
          'They are two Figma plugins. /one works with a subscription; /team works with license keys, one seat per user. New /team license sales are suspended, and existing keys remain supported.',
      },
    ],
  },
  nextSteps: [
    {
      icon: 'glasses',
      title: 'Generate a UI color palette',
      label: 'See the capability',
      href: '/capabilities/color-palette-generator',
    },
    {
      icon: 'glasses',
      title: 'Check WCAG & APCA contrast',
      label: 'See the capability',
      href: '/capabilities/wcag-apca-contrast',
    },
    {
      icon: 'glasses',
      title: 'Build palettes in OKLCH',
      label: 'See the capability',
      href: '/capabilities/oklch-lch-color-spaces',
    },
    {
      icon: 'glasses',
      title: 'Simulate color blindness',
      label: 'See the capability',
      href: '/capabilities/color-blindness-simulation',
    },
  ],
}

export const penpotPage: PlatformPage = {
  path: '/penpot',
  docs: `${links.docs}/penpot`,
  platform: 'Penpot',
  seo: {
    title: 'UI Color Palette for Penpot — Plugin & Color Tokens',
    description:
      'Penpot color palette plugin: build accessible scales and sync them to native Penpot design tokens and library colors, with WCAG and APCA scores. Free to start.',
  },
  hero: {
    title: 'UI Color Palette for Penpot',
    tagline:
      'The Penpot color palette plugin: accessible scales synced to native color tokens, the open-source way.',
    cta: { label: 'Add to Penpot', href: links.runPenpotPlugin },
  },
  surfaces: {
    title: 'Open-source Penpot color tokens, built from your palette',
    intro:
      'Generate, master, and deploy accessible color scales end to end — with every shade delivered as tokens, right where Penpot expects them.',
    embed: {
      src: pluginEmbed('penpot', 'penpot'),
      title: 'UI Color Palette running as a Penpot plugin',
    },
    cards: [
      {
        icon: 'coins',
        title: 'Everything, with tokens',
        text: 'The full generate → master → deploy flow — styles, modes, export — with your palette synced as native Penpot design tokens, and exportable as W3C DTCG, Style Dictionary or Tokens Studio JSON on /pro.',
      },
      {
        icon: 'package-open',
        title: 'Open source, open standards',
        text: 'UI Color Palette reaches an open-source design tool built on open standards like design tokens.',
        span: 2,
      },
    ],
  },
  why: designToolWhy,
  setup: {
    title: 'How to set up the color palette plugin in Penpot',
    docs: {
      label: 'Read the Penpot guides in the docs',
      href: `${links.docs}/penpot`,
    },
    intro:
      'Add the plugin to Penpot, build the palette in your file, then sync it with Penpot’s native design tokens or its library colors.',
    steps: [
      {
        title: 'Add the plugin to Penpot',
        text: 'Paste the UI Color Palette manifest link in Penpot’s plugin manager, then open the plugin in a file. Palettes are saved on the page you are on, for everyone who opens the file.',
      },
      {
        title: 'Create a palette',
        text: 'Click + in the Palettes manager. Select filled layers first to start from their colors, or start from AI, an image, a color harmony or Color Hunt.',
      },
      {
        title: 'Tune the scale and the contrast',
        text: 'Pick a scale preset (Material 3 and Tailwind are free), set each stop by lightness or target contrast ratio, and read the WCAG 2.1 and APCA score of every shade.',
      },
      {
        title: 'Sync with tokens',
        text: 'Click Synchronize, then Synchronize with tokens. Every shade becomes a Penpot design token, with one token set and one Penpot theme per color mode. Run it again after each change: existing sets, themes and tokens are updated, never duplicated.',
      },
      {
        title: 'Or sync with library colors',
        text: 'Sync with the local styles to add every shade to the file’s library colors instead, grouped by source color, and publish them as a library.',
      },
    ],
  },
  tables: [
    {
      id: 'penpot-sync',
      title: 'What a sync creates in Penpot: color tokens or library colors',
      intro:
        'Penpot has native design tokens, so the palette can land as tokens with themes, or as plain library colors.',
      caption: 'What UI Color Palette creates in Penpot',
      rowHeader: 'Sync',
      columns: [
        'What it creates',
        'Color modes',
        'Lightness and contrast in the description',
      ],
      rows: [
        {
          label: 'Tokens',
          values: [
            'One design token per shade, grouped by source color',
            'One token set and one Penpot theme per mode',
            true,
          ],
        },
        {
          label: 'Library colors',
          values: [
            'One library color per shade, grouped by source color',
            'Groups named after each mode',
            false,
          ],
        },
      ],
    },
    {
      id: 'plans',
      title: 'What you get on each plan in Penpot',
      intro:
        'Syncing with Penpot tokens and library colors is free. Volume, documentation and most code formats are on /pro.',
      caption: 'UI Color Palette for Penpot, per plan',
      rowHeader: 'Feature',
      columns: ['/basic', '/pro'],
      rows: [
        { label: 'Palettes per page', values: ['1', 'Unlimited'] },
        { label: 'Source colors per palette', values: ['5', 'Unlimited'] },
        { label: 'Color modes per palette', values: ['2', 'Unlimited'] },
        { label: 'Sync with tokens and library colors', values: [true, true] },
        {
          label: 'WCAG 2.1 and APCA score on every shade',
          values: [true, true],
        },
        { label: 'Palette documentation as boards', values: [false, true] },
        {
          label: 'Export to code',
          values: [
            'CSS',
            'Every format: tokens, Tailwind, SCSS, Less, Apple, Android…',
          ],
        },
      ],
    },
  ],
  faq: {
    intro:
      'Penpot design tokens, color modes and themes, and what the free plan covers.',
    items: [
      {
        question: 'Is there a color palette plugin for Penpot?',
        answer: `Yes. UI Color Palette runs in Penpot as a plugin: it builds accessible color scales, shows the WCAG 2.1 and APCA score of every shade, and syncs them with Penpot’s native design tokens or library colors. It also runs in ${htmlLink('/figma', 'Figma')}, Sketch and Framer.`,
      },
      {
        question: 'How do I create Penpot color tokens from a palette?',
        answer: `Click Synchronize, then Synchronize with tokens: each shade becomes a Penpot color design token. UI Color Palette creates them through Penpot’s plugin API, with no file to export or import, and documents each shade with its lightness and its WCAG and APCA scores (see ${htmlLink('/glossary/design-token', 'design tokens')}).`,
      },
      {
        question: 'How do color modes map to Penpot themes?',
        answer:
          'Each color mode of the palette gets its own token set, paired with a Penpot theme, so switching the theme switches every shade. A palette with no color mode goes into a single set.',
      },
      {
        question: 'Does Penpot support design tokens natively?',
        answer:
          'Yes. Penpot has native design tokens, with token sets and themes. UI Color Palette creates them through the plugin API, so a palette lands as one token per shade, with no file to import. Sync again after each change: existing sets, themes and tokens are reused, never duplicated.',
      },
      {
        question: 'Can I export Penpot colors as DTCG tokens or Tailwind?',
        answer: `Yes, on /pro: native and ${htmlLink('/glossary/design-token', 'DTCG tokens')}, Style Dictionary, Tailwind v3 and v4, SCSS, Less, Apple and Android code. CSS export is free (see ${htmlLink('/capabilities/tailwind-color-palette', 'Tailwind color palette')}).`,
      },
      {
        question: 'Is UI Color Palette for Penpot free?',
        answer: `Yes, on the /basic plan: one palette per page, up to 5 source colors and 2 color modes, contrast scores on every shade, sync with tokens and library colors, and the CSS export. /pro lifts the caps (see ${htmlLink('/pricing', 'pricing')}).`,
      },
    ],
  },
  nextSteps: [
    {
      icon: 'glasses',
      title: 'Generate a UI color palette',
      label: 'See the capability',
      href: '/capabilities/color-palette-generator',
    },
    {
      icon: 'glasses',
      title: 'Check WCAG & APCA contrast',
      label: 'See the capability',
      href: '/capabilities/wcag-apca-contrast',
    },
    {
      icon: 'glasses',
      title: 'Build palettes in OKLCH',
      label: 'See the capability',
      href: '/capabilities/oklch-lch-color-spaces',
    },
    {
      icon: 'glasses',
      title: 'Export to Tailwind',
      label: 'See the capability',
      href: '/capabilities/tailwind-color-palette',
    },
  ],
}

export const sketchPage: PlatformPage = {
  path: '/sketch',
  docs: `${links.docs}/sketch`,
  platform: 'Sketch',
  seo: {
    title: 'UI Color Palette for Sketch — Color Palette Plugin',
    description:
      'Sketch color palette plugin: build accessible scales on Mac and sync them to color variables and layer styles, with WCAG and APCA scores. Free to start.',
  },
  hero: {
    title: 'UI Color Palette for Sketch',
    tagline:
      'The Sketch color palette plugin: accessible color scales synced to color variables and layer styles, native to Mac.',
    cta: { label: 'Add to Sketch', href: links.runSketchPlugin },
  },
  surfaces: {
    title: 'The full experience, natively on Mac',
    intro:
      'The full generate, master, and deploy flow — in a truly native Mac experience.',
    embed: {
      src: pluginEmbed('sketch', 'sketch'),
      title: 'UI Color Palette running as a Sketch plugin',
    },
    cards: [
      {
        icon: 'thumbs-up',
        title: 'The whole flow, on Sketch',
        text: 'The generate, master and deploy flow — scales, contrast scores, styles and export. Sketch has no color modes, so each mode becomes its own flat set.',
      },
      {
        icon: 'apple',
        title: 'Native Mac, rooted community',
        text: "Bring a modern palette-creation tool to Sketch's deeply-rooted community, fully compatible with the native Mac app.",
        span: 2,
      },
    ],
  },
  why: designToolWhy,
  setup: {
    title: 'How to set up the color palette plugin in Sketch',
    docs: {
      label: 'Read the Sketch guides in the docs',
      href: `${links.docs}/sketch`,
    },
    intro:
      'Install the plugin in Sketch on your Mac, build the palette in your document, then sync it with color variables or layer styles.',
    steps: [
      {
        title: 'Install the plugin',
        text: 'Download UI Color Palette for Sketch and install the plugin on your Mac, then run it from Sketch. Palettes are saved in the document, for everyone who opens it.',
      },
      {
        title: 'Create a palette',
        text: 'Click + in the Palettes manager. Select filled layers first to start from their colors, or start from AI, an image, a color harmony or Color Hunt.',
      },
      {
        title: 'Tune the scale and the contrast',
        text: 'Pick a scale preset (Material 3 and Tailwind are free), set each stop by lightness or target contrast ratio, and read the WCAG 2.1 and APCA score of every shade.',
      },
      {
        title: 'Sync with variables or styles',
        text: 'Sync with the local variables to get a color variable per shade, or with the local styles to get a layer style per shade, grouped by source color, and under the palette name when it has a custom name.',
      },
      {
        title: 'Share it',
        text: 'Publish the variables and styles in a library. Sketch matches variables by name, so renaming a source color makes the next sync create new variables, unlinked from the published ones. Settle the names before you publish.',
      },
    ],
  },
  tables: [
    {
      id: 'sketch-sync',
      title: 'What a sync creates in Sketch',
      intro:
        'Sketch has no color modes: a palette with several modes gets one flat set of variables or styles per mode, named after it.',
      caption: 'What UI Color Palette creates in Sketch',
      rowHeader: 'Sync',
      columns: ['What it creates', 'Color modes', 'Updated on re-sync'],
      rows: [
        {
          label: 'Variables',
          values: [
            'One color variable per shade, grouped by source color',
            'One flat set per mode',
            'Updated, matched by name',
          ],
        },
        {
          label: 'Layer styles',
          values: [
            'One layer style per shade, grouped by source color',
            'One flat set per mode',
            'Updated, matched by name',
          ],
        },
      ],
    },
    {
      id: 'plans',
      title: 'What you get on each plan in Sketch',
      intro:
        'Syncing with Sketch variables and styles is free. Volume, documentation and most code formats are on /pro.',
      caption: 'UI Color Palette for Sketch, per plan',
      rowHeader: 'Feature',
      columns: ['/basic', '/pro'],
      rows: [
        { label: 'Palettes per document', values: ['1', 'Unlimited'] },
        { label: 'Source colors per palette', values: ['5', 'Unlimited'] },
        { label: 'Color modes per palette', values: ['2', 'Unlimited'] },
        { label: 'Sync with variables and layer styles', values: [true, true] },
        {
          label: 'WCAG 2.1 and APCA score on every shade',
          values: [true, true],
        },
        { label: 'Palette documentation as artboards', values: [false, true] },
        {
          label: 'Export to code',
          values: [
            'CSS',
            'Every format: tokens, Tailwind, SCSS, Less, Apple, Android…',
          ],
        },
      ],
    },
  ],
  faq: {
    intro:
      'Color variables and styles in Sketch, color modes, and exporting to Apple code.',
    items: [
      {
        question: 'Is there a color palette plugin for Sketch?',
        answer: `Yes. UI Color Palette is a Sketch plugin for Mac: it builds accessible color scales, shows the ${htmlLink('/glossary/wcag-contrast-ratio', 'WCAG 2.1')} and ${htmlLink('/glossary/apca', 'APCA')} score of every shade, and syncs them with your color variables and layer styles. It also runs in ${htmlLink('/figma', 'Figma')}, Penpot and Framer.`,
      },
      {
        question: 'How do I create color variables in Sketch from a palette?',
        answer:
          'Click Sync with the local variables. UI Color Palette adds a color variable for every shade to the document, grouped by source color, and under the palette name when it has a custom name.',
      },
      {
        question: 'Does Sketch support light and dark color modes?',
        answer:
          'Not natively: a Sketch color variable holds one value. UI Color Palette creates one flat set of variables or styles per color mode, named after it.',
      },
      {
        question:
          'Why do my Sketch color variables lose their library link after a sync?',
        answer:
          'Sketch matches variables by their name, not by an identifier. If you rename a source color, the next sync cannot find the variables created under the old name, so it creates new ones, unlinked from the published ones. Settle the color names before you publish.',
      },
      {
        question: 'Can I export a Sketch palette to SwiftUI or Xcode?',
        answer: `Yes, on /pro: export the palette as a SwiftUI or UIKit Swift file and add it to your Xcode project (see ${htmlLink('/capabilities/swiftui-compose-colors', 'SwiftUI & Compose colors')}).`,
      },
      {
        question: 'Is UI Color Palette for Sketch free?',
        answer: `Yes, on the /basic plan: one palette per document, up to 5 source colors and 2 color modes, contrast scores on every shade, sync with variables and layer styles, and the CSS export. /pro lifts the caps (see ${htmlLink('/pricing', 'pricing')}).`,
      },
    ],
  },
  nextSteps: [
    {
      icon: 'glasses',
      title: 'Generate a UI color palette',
      label: 'See the capability',
      href: '/capabilities/color-palette-generator',
    },
    {
      icon: 'glasses',
      title: 'Check WCAG & APCA contrast',
      label: 'See the capability',
      href: '/capabilities/wcag-apca-contrast',
    },
    {
      icon: 'glasses',
      title: 'Build palettes in OKLCH',
      label: 'See the capability',
      href: '/capabilities/oklch-lch-color-spaces',
    },
    {
      icon: 'glasses',
      title: 'Export to SwiftUI & Compose',
      label: 'See the capability',
      href: '/capabilities/swiftui-compose-colors',
    },
  ],
}

export const framerPage: PlatformPage = {
  path: '/framer',
  docs: `${links.docs}/framer`,
  platform: 'Framer',
  seo: {
    title: 'UI Color Palette for Framer — Color Palette Plugin',
    description:
      'Generate an accessible color palette in Framer and sync it to color styles with light and dark values, WCAG and APCA scores on every shade. Free to start.',
  },
  hero: {
    title: 'UI Color Palette for Framer',
    tagline:
      'The Framer color palette plugin: an accessible palette synced to your color styles, ready to ship the whole site.',
    cta: { label: 'Add to Framer', href: links.runFramerPlugin },
  },
  surfaces: {
    title: 'Color palette plugin for Framer: from blank canvas to shipped site',
    intro:
      'Generate an accessible palette, push it to Framer styles, and build your website from scratch — with colors that pass contrast from the first section to the last.',
    embed: {
      // editor=penpot on purpose, until the plugin team confirms the value for Framer.
      src: pluginEmbed('framer', 'penpot'),
      title: 'UI Color Palette running as a Framer plugin',
    },
    cards: [
      {
        icon: 'wrench',
        title: 'Generate with powerful tools',
        text: 'AI, images, color wheel, canvas or Color Hunt palettes — an accessible scale in minutes.',
      },
      {
        icon: 'refresh-ccw-dot',
        title: 'Deploy to styles',
        text: 'Push your palette to Framer styles and build your website from scratch, colors ready to go.',
        span: 2,
      },
    ],
  },
  why: designToolWhy,
  setup: {
    title: 'How to set up the color palette plugin in Framer',
    docs: {
      label: 'Read the Framer guides in the docs',
      href: `${links.docs}/framer`,
    },
    intro:
      'Add the plugin from the Framer Marketplace, build the palette, then sync it with your project’s color styles.',
    steps: [
      {
        title: 'Add the plugin to Framer',
        text: 'Open UI Color Palette on the Framer Marketplace and run it in your project.',
      },
      {
        title: 'Create a palette',
        text: 'Click + in the Palettes manager, or start from AI, an image, a color harmony or Color Hunt.',
      },
      {
        title: 'Tune the scale and the contrast',
        text: 'Pick a scale preset (Material 3 and Tailwind are free), set each stop by lightness or target contrast ratio, and read the WCAG 2.1 and APCA score of every shade.',
      },
      {
        title: 'Sync with the color styles',
        text: 'Every shade becomes a Framer color style: its own color is the light value and its mirror in the scale is the dark value, so Framer’s light and dark mode flips the palette. Framer asks for its color-style permission first.',
      },
      {
        title: 'Publish it to keep it',
        text: 'In Framer, palettes are stored in your browser, not in the project. Sign in and publish the palette to the cloud, then add it from the Library in another browser or share it with teammates.',
      },
    ],
  },
  tables: [
    {
      id: 'framer-sync',
      title: 'What UI Color Palette does in Framer',
      intro:
        'Framer works with color styles: no variables, no tokens. UI Color Palette writes styles and exports the rest as code.',
      caption: 'UI Color Palette features in Framer',
      rowHeader: 'Feature',
      columns: ['In Framer'],
      rows: [
        {
          label: 'Color styles, with a light and a dark value',
          values: [true],
        },
        { label: 'Variables or design tokens in the project', values: [false] },
        {
          label: 'Palette documentation in the document',
          values: ['/pro, with Framer’s canvas permissions'],
        },
        {
          label: 'Export to code',
          values: [
            'CSS, SCSS, Less, Tailwind v3 and v4, JSON tokens (native and DTCG)',
          ],
        },
        {
          label: 'Where palettes are stored',
          values: ['In your browser, or in the cloud once published'],
        },
      ],
    },
    {
      id: 'plans',
      title: 'What you get on each plan in Framer',
      intro:
        'Syncing with Framer color styles is free. Volume, documentation and most code formats are on /pro.',
      caption: 'UI Color Palette for Framer, per plan',
      rowHeader: 'Feature',
      columns: ['/basic', '/pro'],
      rows: [
        {
          label: 'Palettes per document (Framer project)',
          values: ['1', 'Unlimited'],
        },
        { label: 'Source colors per palette', values: ['5', 'Unlimited'] },
        { label: 'Color modes per palette', values: ['2', 'Unlimited'] },
        { label: 'Sync with color styles', values: [true, true] },
        {
          label: 'WCAG 2.1 and APCA score on every shade',
          values: [true, true],
        },
        {
          label: 'Palette documentation in the document',
          values: [false, true],
        },
        {
          label: 'Export to code',
          values: ['CSS', 'CSS, SCSS, Less, Tailwind, JSON tokens'],
        },
      ],
    },
  ],
  faq: {
    intro:
      'Adding a palette to Framer, dark mode with color styles, and exporting it.',
    items: [
      {
        question: 'How do I add a color palette to Framer?',
        answer:
          'Run UI Color Palette in your project, create the palette, then click Sync with the local styles: every shade becomes a Framer color style, grouped by source color and named after the palette.',
      },
      {
        question: 'How does dark mode work with Framer color styles?',
        answer:
          'A Framer color style holds a light and a dark value. UI Color Palette fills the light value with the shade and the dark value with its mirror in the same scale — the darkest shade for the lightest — so switching Framer’s mode flips the palette.',
      },
      {
        question: 'Does Framer support color variables or design tokens?',
        answer:
          'Not as such: Framer works with color styles. UI Color Palette syncs the palette to color styles, and on /pro exports it as JSON tokens, native or DTCG, for your codebase.',
      },
      {
        question:
          'Where does the Framer color palette plugin store my palettes?',
        answer:
          'In your browser, because Framer has no room in the project for a full palette. Clearing your browser data or switching device can lose it, so sign in and publish the palette to the cloud to keep it and share it.',
      },
      {
        question: 'Can I export a Framer color palette to Tailwind or CSS?',
        answer:
          'Yes. CSS export is free; on /pro, you also get SCSS, Less, Tailwind v3 and v4, and JSON tokens. Apple, Android and spreadsheet formats are not available in Framer.',
      },
      {
        question: 'Is the Framer color palette plugin free?',
        answer: `Yes, on the /basic plan: one palette per document, up to 5 source colors and 2 color modes, contrast scores on every shade, sync with color styles and the CSS export. /pro lifts the caps (see ${htmlLink('/pricing', 'pricing')}).`,
      },
    ],
  },
  nextSteps: [
    {
      icon: 'glasses',
      title: 'Generate a UI color palette',
      label: 'See the capability',
      href: '/capabilities/color-palette-generator',
    },
    {
      icon: 'glasses',
      title: 'Check WCAG & APCA contrast',
      label: 'See the capability',
      href: '/capabilities/wcag-apca-contrast',
    },
    {
      icon: 'glasses',
      title: 'Build palettes in OKLCH',
      label: 'See the capability',
      href: '/capabilities/oklch-lch-color-spaces',
    },
    {
      icon: 'glasses',
      title: 'Simulate color blindness',
      label: 'See the capability',
      href: '/capabilities/color-blindness-simulation',
    },
  ],
}

const code = (text: string) => `<code>${text}</code>`

export const claudePage: PlatformPage = {
  path: '/claude',
  docs: `${links.docs}/claude`,
  platform: 'Claude',
  offerName: 'Free',
  seo: {
    title: 'UI Color Palette for Claude — Color Palette Plugin & MCP',
    description:
      'Generate accessible color palettes in Claude Code: WCAG and APCA audits, 14 code and token formats, and MCP sync to Figma, Penpot, Sketch and Framer.',
  },
  hero: {
    title: 'UI Color Palette for Claude',
    tagline:
      'The Claude color palette plugin and MCP server: generate, audit and ship accessible color palettes with Claude AI, in Claude Code or any MCP client.',
    cta: { label: 'Add to Claude', href: links.runClaudePlugin },
  },
  surfaces: {
    title: 'What the Claude color palette plugin does',
    intro:
      'UI Color Palette for Claude is a Claude Code plugin built on the UI Color Palette MCP server. Describe a palette, share an image or give a base color: it builds the scale, checks every shade against WCAG 2.1 and APCA, exports it in 14 code and token formats, and pushes it to Figma, Penpot, Sketch or Framer.',
    cards: [
      {
        icon: 'ruler',
        title: 'Integrated agents',
        text: 'A default orchestrator plus five specialist agents for color systems, audits, code export, publishing and design-tool transitions.',
      },
      {
        icon: 'paintbrush',
        title: 'Skills',
        text: 'One skill per step — source colors, scale, color system, audit, code export, publishing — callable as /ui-color-palette:skill-name.',
      },
      {
        icon: 'code-xml',
        title: 'Pre-connected integrations',
        text: 'Its MCP servers are registered when you enable it — Figma, Penpot, Sketch, Framer, GitHub and GitLab — with credentials only where the tool needs them.',
      },
    ],
  },
  why: {
    id: 'why-it-matters',
    title: 'Why use it in Claude Code',
    cards: [
      {
        title: 'Marketplace install',
        text: 'Two commands from the Yelbolt marketplace, no config file to edit.',
      },
      {
        title: 'Guided creation & semantic structuring',
        text: 'Turn a prompt into a well-organized, accessible color system.',
      },
      {
        title: 'Tokens, Tailwind & CSS export',
        text: 'Export to CSS, Tailwind, DTCG tokens, Style Dictionary, SwiftUI, Compose and more.',
      },
    ],
  },
  setup: {
    title: 'Set it up in Claude Code',
    docs: {
      label: 'Read the full setup guide in the docs',
      href: `${links.docs}/claude`,
    },
    intro:
      'Install the plugin from the Yelbolt marketplace, then describe the palette you want. The default agent runs the whole Source → Palette → Deploy → Manage workflow.',
    steps: [
      {
        title: 'Add the Yelbolt marketplace',
        text: 'Once per machine.',
        code: '/plugin marketplace add yelbolt/claude-marketplace',
      },
      {
        title: 'Install the plugin',
        text: 'On first enable, it asks for optional credentials (Penpot token, Framer MCP URL, GitLab URL). Skip them and set them later with /plugin config.',
        code: '/plugin install ui-color-palette@yelbolt',
      },
      {
        title: 'Pick the uicper agent',
        text: 'The default orchestrator asks only the blocking questions and hands the heavy work to five specialist agents: auditor, codegen, color systemer, publisher and transitioner.',
        code: '/agents',
      },
      {
        title: 'Ask in plain language',
        text: 'Or call one skill directly, such as /ui-color-palette:audit-palette.',
        code: 'Generate a warm, earthy brand palette and push it to Figma as variables',
      },
    ],
  },
  tables: [
    {
      id: 'design-tools',
      title: 'What Claude pushes to each design tool',
      intro:
        'One skill per design tool takes the palette already built in the conversation and writes it into your file, without rebuilding it.',
      caption: 'What the Claude plugin creates or exports in each design tool',
      rowHeader: 'Design tool',
      columns: [
        'Variables',
        'Styles',
        'Tokens',
        'Swatch board',
        'Colors from selection',
        'Needs',
      ],
      rows: [
        {
          label: 'Figma',
          href: '/figma',
          values: [
            'With one mode per theme',
            'Paint styles',
            false,
            true,
            true,
            'Figma desktop with MCP enabled',
          ],
        },
        {
          label: 'Penpot',
          href: '/penpot',
          values: [
            false,
            'Color styles',
            'With per-theme overrides',
            true,
            true,
            'Your Penpot URL and user token',
          ],
        },
        {
          label: 'Sketch',
          href: '/sketch',
          values: [
            'Swatches',
            'Shared layer styles',
            'Exported for token plugins',
            true,
            true,
            'MCP enabled in Sketch preferences',
          ],
        },
        {
          label: 'Framer',
          href: '/framer',
          values: [
            false,
            'Color styles',
            false,
            true,
            true,
            'The Framer MCP plugin URL',
          ],
        },
      ],
      note: 'Figma variables and Penpot tokens can also carry a semantic layer that references the primitive shades.',
    },
    {
      id: 'mcp-server',
      title: 'Color palette MCP server for Claude Desktop, Cursor and VS Code',
      intro:
        'An MCP server lets an AI assistant call tools such as get_palette directly. The plugin runs on the UI Color Palette MCP server, and so can any MCP client: Claude Desktop, VS Code, Cursor, Windsurf, OpenAI Codex or Gemini CLI.',
      code: 'claude mcp add --transport http ui-color-palette https://mcp.ui-color-palette.com/mcp',
      caption: 'Tools of the UI Color Palette MCP server',
      rowHeader: 'Tool',
      columns: ['What it does', 'Sign-in'],
      rows: [
        {
          label: 'get_palette',
          values: ['Builds a full palette from source colors and themes', 'No'],
        },
        {
          label: 'get_color_system',
          values: ['Maps the palette to semantic tokens', 'No'],
        },
        {
          label: 'create_color_harmony',
          values: ['Derives harmonies from a base color', 'No'],
        },
        {
          label: 'extract_dominant_colors',
          values: ['Extracts the dominant colors of an image URL', 'No'],
        },
        {
          label: 'generate_colors_from_prompt',
          values: ['Turns a description into source colors', 'No'],
        },
        {
          label: 'generate_code',
          values: [
            'Exports CSS, Tailwind, SwiftUI, DTCG tokens and more',
            'No',
          ],
        },
        {
          label: 'preview_palette',
          values: ['Renders the palette as an inline image', 'No'],
        },
        {
          label: 'list_published_palettes',
          values: ['Browses the palettes shared by the community', 'No'],
        },
        {
          label: 'get_published_palette',
          values: ['Fetches a published palette by ID', 'No'],
        },
        {
          label: 'list_my_published_palettes',
          values: ['Lists your own published palettes', 'Required'],
        },
        {
          label: 'publish_palette',
          values: ['Saves a palette to your account', 'Required'],
        },
        {
          label: 'update_published_palette',
          values: ['Updates a published palette', 'Required'],
        },
        {
          label: 'share_published_palette / unshare_published_palette',
          values: ['Makes a palette public or private', 'Required'],
        },
        {
          label: 'unpublish_palette',
          values: ['Deletes a published palette', 'Required'],
        },
      ],
      note: 'Sign-in uses OAuth 2.0: your MCP client opens it the first time you call a tool that needs it.',
    },
  ],
  faq: {
    intro:
      'Installing the plugin, using it outside Claude Code, and what it can do for your design files and your code.',
    items: [
      {
        question: 'How do I install the color palette plugin in Claude Code?',
        answer: `Run ${code('/plugin marketplace add yelbolt/claude-marketplace')}, then ${code('/plugin install ui-color-palette@yelbolt')}. On first enable, the plugin asks for optional credentials (Penpot token, Framer MCP URL, GitLab URL): skip them and set them later with ${code('/plugin config')}. The ${htmlLink(`${links.docs}/claude`, 'Claude plugin docs')} cover every option.`,
      },
      {
        question: 'Can Claude AI generate an accessible color palette?',
        answer:
          'Yes. With the UI Color Palette plugin, Claude builds the scale from a prompt, an image or a base color, and its audit skill checks every shade against WCAG 2.1 and APCA. The contrast scores come from the palette engine, not from an estimate by the model.',
      },
      {
        question: 'Can I use it in Claude Desktop, Cursor or VS Code?',
        answer: `Yes, through the MCP server. The plugin, with its agents and skills, is built for Claude Code; any MCP client can add the server (${code(links.mcpEndpoint)}) and generate, preview and export palettes with the same engine, and read the contrast of every shade. The ${htmlLink(links.docsMcp, 'MCP docs')} give the setup for Claude Desktop, VS Code, Cursor, Windsurf, OpenAI Codex and Gemini CLI, and the open-source ${htmlLink(links.skills, 'LLM Skills')} teach the same color method to any assistant.`,
      },
      {
        question: 'What skills come with the Claude plugin?',
        answer: `The plugin has one skill per step of the Source → Palette → Deploy → Manage workflow: ${code('generate-source-colors')} (from an image, a prompt, a harmony or a design tool selection), ${code('scale-palette')}, ${code('build-color-system')}, ${code('audit-palette')}, ${code('generate-code')}, ${code('generate-semantic-code')} and ${code('manage-palettes')}. One more skill per design tool (Figma, Penpot, Sketch, Framer) pushes the palette into your file. Call them as ${code('/ui-color-palette:skill-name')}, or let the uicper agent pick them.`,
      },
      {
        question: 'Do I need a UI Color Palette account?',
        answer:
          'Not to generate palettes, harmonies, color systems, previews or code, and not to browse published palettes. You sign in, through OAuth, only to publish, update, share, unshare, delete or list your own palettes.',
      },
      {
        question: 'Can Claude commit the generated tokens to my repository?',
        answer: `Yes, when you ask for it. The plugin connects to GitHub and GitLab through their MCP servers (OAuth), and its codegen agent can commit the generated file to your repository. GitLab needs your instance URL in ${code('/plugin config')}.`,
      },
    ],
  },
  nextSteps: [
    {
      icon: 'glasses',
      title: 'Audit WCAG & APCA contrast',
      label: 'See the capability',
      href: '/capabilities/wcag-apca-contrast',
    },
    {
      icon: 'glasses',
      title: 'Export OKLCH palettes',
      label: 'See the capability',
      href: '/capabilities/oklch-lch-color-spaces',
    },
    {
      icon: 'glasses',
      title: 'Simulate color blindness',
      label: 'See the capability',
      href: '/capabilities/color-blindness-simulation',
    },
    {
      icon: 'newspaper',
      title: 'Try three AI workflows',
      label: 'Read the guide',
      href: '/blog/3-ways-ai-now-builds-audits-and-deploys-your-color-systems',
    },
  ],
}

export const platformPages = [
  figmaPage,
  penpotPage,
  sketchPage,
  framerPage,
  claudePage,
]
