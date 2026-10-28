/**
 * Copy of the platform landing pages (/figma, /penpot, /sketch, /framer,
 * /claude). Every page shares the same frame:
 * a hero with the install link, the editors or strengths of the plugin next to
 * a live preview, a "Why it matters" mosaic, and the next steps.
 */
import type { CapabilityGroup } from '@/data/capabilities'
import { links } from '@/config/site'

/** Lucide icon shown in the dark tile of a card. */
export type IconId =
  | 'apple'
  | 'badge-dollar-sign'
  | 'code-xml'
  | 'coins'
  | 'download'
  | 'glasses'
  | 'newspaper'
  | 'package-open'
  | 'paintbrush'
  | 'refresh-ccw-dot'
  | 'ruler'
  | 'thumbs-up'
  | 'wrench'

export interface Surface {
  icon: IconId
  title: string
  text: string
  /** Columns spanned on desktop (a page with two cards widens the second). */
  span?: number
}

export interface PlatformPage {
  path: string
  /** Short platform name, for the JSON-LD. */
  platform: string
  seo: { title: string; description: string }
  hero: {
    title: string
    tagline: string
    cta: { label: string; href: string }
  }
  surfaces: {
    title: string
    intro: string
    /** Live plugin UI beside the title card; pages without one fill the slot. */
    embed?: { src: string; title: string }
    cards: Surface[]
  }
  why: CapabilityGroup
}

export interface NextStep {
  icon: IconId
  title: string
  label: string
  href: string
}

/** The link cards that close every platform page. */
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

/** The plugin UI in embed mode, as each platform shows it. */
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

/** "Why it matters" of the design-tool plugins: three live demos. */
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
  platform: 'Figma',
  seo: {
    title: 'UI Color Palette for Figma — Accessible Color Scales',
    description:
      'Build WCAG-compliant color palettes right inside Figma. Generate scales, check contrast, and sync styles, variables, and tokens without leaving your file.',
  },
  hero: {
    title: 'UI Color Palette for Figma',
    tagline: 'Accessible color scales, native to the whole Figma family.',
    cta: { label: 'Add to Figma', href: links.runFigmaPlugin },
  },
  surfaces: {
    title: 'One plugin, targeted for each Figma product',
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
        text: 'The full experience — generate, master, and deploy to variables & styles with color modes and export. Hand off straight into Dev Mode.',
      },
      {
        icon: 'paintbrush',
        title: 'Figma Buzz & FigJam',
        text: "Creation-focused — modes, variables and styles aren't available here, so UI Color Palette shines at generating and exporting palettes.",
      },
      {
        icon: 'code-xml',
        title: 'VS Code (Figma plugin)',
        text: 'Brings your palettes right into the IDE, closer to a development context.',
      },
    ],
  },
  why: designToolWhy,
}

export const penpotPage: PlatformPage = {
  path: '/penpot',
  platform: 'Penpot',
  seo: {
    title: 'UI Color Palette for Penpot — Open-Source Color',
    description:
      'Create accessible color palettes in Penpot, tokens included. Generate scales, master contrast, and export open design tokens for your whole team.',
  },
  hero: {
    title: 'UI Color Palette for Penpot',
    tagline: 'Accessible color scales, the open-source way.',
    cta: { label: 'Add to Penpot', href: links.runPenpotPlugin },
  },
  surfaces: {
    title: 'Open-source color, tokens included',
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
        text: 'The full generate → master → deploy flow — styles, modes, export — with your palette delivered as tokens (W3C DTCG, Tokens Studio, Style Dictionary).',
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
}

export const sketchPage: PlatformPage = {
  path: '/sketch',
  platform: 'Sketch',
  seo: {
    title: 'UI Color Palette for Sketch — Native Mac Color',
    description:
      'Design accessible color palettes natively on Mac with Sketch. Generate WCAG scales, fine-tune every shade, and sync with your local libraries.',
  },
  hero: {
    title: 'UI Color Palette for Sketch',
    tagline: 'Accessible color scales, native to Mac.',
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
        title: 'Fully compatible',
        text: 'The complete UI Color Palette experience — styles, modes, and export — with nothing left out.',
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
}

export const framerPage: PlatformPage = {
  path: '/framer',
  platform: 'Framer',
  seo: {
    title: 'UI Color Palette for Framer — Ship Accessible Color',
    description:
      'Go from blank canvas to shipped site with accessible color in Framer. Generate palettes, check contrast, and export production-ready tokens.',
  },
  hero: {
    title: 'UI Color Palette for Framer',
    tagline: 'Generate a palette, ship the whole site.',
    cta: { label: 'Add to Framer', href: links.runFramerPlugin },
  },
  surfaces: {
    title: 'From blank canvas to shipped site',
    // TODO(content): draft intro, to validate.
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
        text: 'AI, images, color wheel, canvas, or 1M+ imported combinations — an accessible scale in minutes.',
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
}

export const claudePage: PlatformPage = {
  path: '/claude',
  platform: 'Claude',
  seo: {
    title: 'UI Color Palette for Claude — A Color Studio in Claude',
    description:
      'Design accessible color palettes right inside Claude, with agents, skills, and pre-connected design & code integrations for GitHub and GitLab.',
  },
  hero: {
    title: 'UI Color Palette for Claude',
    tagline: 'The dedicated, optimized way to design color with AI.',
    cta: { label: 'Add to Claude', href: links.runClaudePlugin },
  },
  surfaces: {
    title: 'A color studio, tuned for Claude',
    intro:
      'More than a generic MCP setup: the Claude plugin is a specific, tuned experience — cheaper to run, easier to steer, and ready to install in a click.',
    cards: [
      {
        icon: 'ruler',
        title: 'Integrated agents',
        text: 'Purpose-built agents designed for lower-token transactions — more done, for less.',
      },
      {
        icon: 'paintbrush',
        title: 'Skills',
        text: 'Built-in skills that keep the conversation relevant and on track.',
      },
      {
        icon: 'code-xml',
        title: 'Pre-connected integrations',
        text: 'Its MCP servers come wired up ahead of time — to your design tools, and to GitHub & GitLab for code.',
      },
    ],
  },
  why: {
    id: 'why-it-matters',
    title: 'Why it matters',
    cards: [
      {
        title: 'One-click marketplace install',
        text: 'Up and running in seconds, no setup headaches.',
      },
      {
        title: 'Guided creation & semantic structuring',
        text: 'Turn a prompt into a well-organized, accessible color system.',
      },
      {
        title: 'Tokens, Tailwind & CSS export',
        text: 'Production-ready handoff your team can ship directly.',
      },
    ],
  },
}
