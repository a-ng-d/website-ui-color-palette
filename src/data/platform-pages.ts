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
  docs: `${links.docs}/penpot`,
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
  docs: `${links.docs}/sketch`,
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
  docs: `${links.docs}/framer`,
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

const code = (text: string) => `<code>${text}</code>`

export const claudePage: PlatformPage = {
  path: '/claude',
  docs: `${links.docs}/claude`,
  platform: 'Claude',
  offerName: 'Free',
  seo: {
    title: 'Claude Color Palette Plugin & MCP Server — UI Color Palette',
    description:
      'Generate accessible color palettes in Claude Code: WCAG and APCA audits, 14 code and token formats, and MCP sync to Figma, Penpot, Sketch and Framer.',
  },
  hero: {
    title: 'Claude color palette plugin & MCP server',
    tagline:
      'Generate, audit and ship accessible color palettes with Claude AI, in Claude Code or any MCP client.',
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
