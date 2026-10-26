/**
 * Copy of the Capabilities page (/capabilities), grouped as in Figma
 * (node 3:20329). Also used for the `featureList` of the JSON-LD.
 *
 * `demo` names the animated illustration of a card (components/capabilities/
 * Demo.astro); cards without one show the empty illustration grid for now.
 */
export type DemoId =
  | 'ready'
  | 'ai'
  | 'image'
  | 'wheel'
  | 'explore'
  | 'contrast'
  | 'modes'
  | 'fine-tune'
  | 'sync'
  | 'tokens'
  | 'publish'
  | 'share'
  | 'presets'
  | 'simulations'
  | 'handoff'
  | 'spaces'
  | 'readability'

export interface Capability {
  title: string
  text: string
  /** Text-only card when omitted (/claude "Why it matters"). */
  demo?: DemoId
  /** Columns spanned in the mosaic (desktop). */
  span?: number
}

export interface CapabilityGroup {
  id: string
  title: string
  intro?: string
  cards: Capability[]
}

export const generate: CapabilityGroup = {
  id: 'generate',
  title: 'Generate it',
  intro: 'Spin up a full color palette in seconds — your way.',
  cards: [
    {
      title: 'Ready from the very first second',
      text: 'You never start empty. UI Color Palette opens with a palette already generated — 5 source colors across 6 steps, for 30 ready-to-edit shades. Keep them, reroll them, or reshape everything with the tools below.',
      demo: 'ready',
    },
    {
      title: 'AI generation',
      text: "Describe the mood you're after and let AI generate 5 source colors from a single prompt.",
      demo: 'ai',
    },
    {
      title: 'Image extraction',
      text: 'Drop in an image and pull its main colors straight into your palette.',
      demo: 'image',
    },
    {
      title: 'Color wheel',
      text: 'Pick and fine-tune your source colors by hand, directly on the color wheel.',
      demo: 'wheel',
    },
    {
      title: 'Explore & import',
      text: 'Browse millions and millions of community-shared palettes and import the one that clicks.',
      demo: 'explore',
    },
  ],
}

export const master: CapabilityGroup = {
  id: 'master',
  title: 'Master it',
  intro: "Shape every shade until it's accessible and just right.",
  cards: [
    {
      title: 'Contrast mastering',
      text: "Real-time WCAG 2.1 and APCA scores on every stop, so you always land the contrast ratio you're after.",
      demo: 'contrast',
    },
    {
      title: 'Light, Dark, and beyond',
      text: 'Build unlimited color modes — light, dark, and color-blind simulations — with custom foreground colors for tailored ratios.',
      demo: 'modes',
    },
    {
      title: 'Fine-tune every stop',
      text: 'Dial in lightness, chroma, and hue with precision to shape a scale that feels exactly right.',
      demo: 'fine-tune',
    },
  ],
}

export const deploy: CapabilityGroup = {
  id: 'deploy',
  title: 'Deploy it',
  intro: 'Take your palette everywhere it needs to go.',
  cards: [
    {
      title: 'Sync with your team',
      text: "Create and update local styles and variables so your palette stays in sync with your team's library.",
      demo: 'sync',
      span: 2,
    },
    {
      title: 'Grab your tokens & config',
      text: 'Retrieve W3C (DTCG) design tokens, Tokens Studio, Style Dictionary, and ready-to-ship Tailwind V3 & V4 configs.',
      demo: 'tokens',
    },
    {
      title: 'Publish & reuse anywhere',
      text: 'Publish your palettes to the cloud, then push and pull them across every environment — Figma, Penpot, Sketch, and Framer.',
      demo: 'publish',
    },
    {
      title: 'Share with the community',
      text: 'Publish palettes for other makers and get inspired in return — Adobe Spectrum, Microsoft Fluent, and more, ready to reuse.',
      demo: 'share',
    },
  ],
}

export const superpowers: CapabilityGroup = {
  id: 'superpowers',
  title: 'More superpowers under the hood',
  intro: 'The details that make UI Color Palette best-in-class.',
  cards: [
    {
      title: 'Best-in-class presets',
      text: 'Scale your colors from existing color systems — Google Material, Tailwind, Ant Design, etc.',
      demo: 'presets',
    },
    {
      title: 'Simulations that empathize',
      text: 'Translate your color scale into different forms of color-blind vision — Red-weak, blue-weak, total blindness, etc.',
      demo: 'simulations',
    },
    {
      title: 'Ultra Handoff',
      text: 'Export your palettes in several formats to bootstrap your project for web, mobile—Apple SwiftUI, Android Compose, etc…',
      demo: 'handoff',
    },
    {
      title: 'Colors in outer Spaces',
      text: 'Change the color space for perfect brightness and consistency — OKLCH, OKLAB, HSLuv, etc.',
      demo: 'spaces',
    },
    {
      title: 'Readability playground',
      text: 'Preview real text on any stop and read its live readability score, WCAG & APCA grade, and minimum font size.',
      demo: 'readability',
    },
  ],
}

export interface Audience {
  title: string
  text: string
  points: Array<{ lead: string; text: string }>
}

export const audiences = {
  title: 'Built for productmates who care about color',
  intro:
    "Whether you're crafting a design system or shipping a side project — UI Color Palette meets you where you are.",
  items: [
    {
      title: 'Designers',
      text: 'You need accessible, consistent palettes that integrate seamlessly into your design workflow.',
      points: [
        {
          lead: 'AI-powered color generation',
          text: 'from themes like Cyberpunk, Minimalist, Corporate, etc.',
        },
        {
          lead: 'WCAG & APCA contrast checks',
          text: 'accessibility built into every shade',
        },
        {
          lead: 'Native integration',
          text: 'sync styles and variables on Figma, Penpot, Sketch, and Framer',
        },
      ],
    },
    {
      title: 'Developers',
      text: 'You want production-ready tokens and configurations, not a PNG screenshot of a palette.',
      points: [
        {
          lead: 'Tailwind V3 & V4 configs',
          text: 'copy-paste CSS custom properties',
        },
        {
          lead: 'W3C Design Tokens (DTCG)',
          text: 'standardized JSON for any token pipeline',
        },
        { lead: 'CSS / SCSS export', text: 'ready for production' },
      ],
    },
  ] satisfies Audience[],
}

export const capabilityGroups = [generate, master, deploy, superpowers]
