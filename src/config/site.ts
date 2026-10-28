/**
 * Single source of truth for site-wide metadata and links.
 * Pages and components read from here instead of hardcoding URLs.
 */

export const site = {
  name: 'UI Color Palette',
  url: 'https://ui-color-palette.com',
  appUrl: 'https://app.ui-color-palette.com',
  /**
   * Reference palette maintained by the team, embedded in the home hero.
   * Set PUBLIC_DEMO_PALETTE_URL in .env.local to test a local app build.
   */
  demoPaletteUrl:
    import.meta.env.PUBLIC_DEMO_PALETTE_URL ??
    'https://app.ui-color-palette.com/palettes/f47fc3e0ad5',
  locale: 'en',
  defaultTitle: 'UI Color Palette — WCAG Color Palettes for UI',
  defaultDescription:
    'Generate, master, and deploy accessible color palettes in seconds. WCAG & APCA-ready scales for Figma, Penpot, Sketch, Framer, and any AI.',
  defaultOgImage: '/og-default.png',
  email: 'hello@ui-color-palette.com',
  author: {
    name: 'Aurélien Grimaud',
  },
  publisher: {
    name: 'Yelbolt',
    url: 'https://yelbolt.co/',
  },
  /** Google Analytics 4 measurement ID. */
  googleAnalyticsId: 'G-MEC0CFX9P1',
  /** Tawk.to live chat widget: `<propertyId>/<widgetId>`. */
  tawkWidget: '680b8b6e6b4e0c1911f5d5ad/1ipmhha73',
  googleSiteVerification: 'EwMoww_IDyC5u8G5VGAaz052GWcYOg2_xyuggxVR1i4',
} as const

export interface NavLink {
  label: string
  href: string
  badge?: string
  /** One-line summary, shown on the cards of the Resources menu. */
  description?: string
}

export const links = {
  docs: 'https://docs.ui-color-palette.com',
  support: 'https://uicp.ylb.lt/support',
  feedback: 'https://uicp.ylb.lt/feedback',
  ideas: 'https://uicp.ylb.lt/ideas',
  community: 'https://uicp.ylb.lt/community',
  repository: 'https://uicp.ylb.lt/repository',
  repositorySkills: 'https://uicp.ylb.lt/repository-skills',
  docsMcp: 'https://uicp.ylb.lt/docs-mcp',
  skills: 'https://uicp.ylb.lt/skills',
  docsApi: 'https://uicp.ylb.lt/docs-api',
  store: 'https://uicp.ylb.lt/store',
  subscription: 'https://uicp.ylb.lt/subscription',
  ultimateRequest: 'https://uicp.ylb.lt/ultimate-request',
  privacy: 'https://uicp.ylb.lt/privacy',
  terms: 'https://uicp.ylb.lt/terms',
  cookies: 'https://uicp.ylb.lt/cookies',
  sale: 'https://uicp.ylb.lt/sale',
  linkedin: 'https://uicp.ylb.lt/network',
  coffee: 'https://uicp.ylb.lt/author',
  startupFame:
    'https://startupfa.me/s/ui-color-palette?utm_source=ui-color-palette.com',
  tlGuide: 'https://tlguide.com/reviews/ui-color-palette',
  mcpEndpoint: 'https://mcp.ui-color-palette.com/mcp',
  runFigmaPlugin: 'https://uicp.ylb.lt/run-figma-plugin',
  runFigmaTeamPlugin: 'https://uicp.ylb.lt/run-figma-team-plugin',
  runPenpotPlugin: 'https://uicp.ylb.lt/run-penpot-plugin',
  runSketchPlugin: 'https://uicp.ylb.lt/run-sketch-plugin',
  runFramerPlugin: 'https://uicp.ylb.lt/run-framer-plugin',
  runClaudePlugin: 'https://uicp.ylb.lt/run-claude-plugin',
  /** The plugin UI in embed mode, shown on the platform pages. */
  pluginEmbed: 'https://plugin.ui-color-palette.com/',
} as const

export const mainNav: NavLink[] = [
  { label: 'Capabilities', href: '/capabilities' },
  { label: 'Pricing', href: '/pricing' },
]

// TODO(content): confirm entries and descriptions of the Resources menu.
export const resourcesNav: NavLink[] = [
  {
    label: 'Read the docs',
    href: links.docs,
    description: 'Guides for every feature, on every platform.',
  },
  {
    label: 'MCP server',
    href: links.docsMcp,
    badge: 'New',
    description: 'Drive UI Color Palette from the LLM of your choice.',
  },
  {
    label: 'LLM Skills',
    href: links.skills,
    badge: 'New',
    description: 'Open-source instructions that teach any AI the method.',
  },
  {
    label: 'API Reference',
    href: links.docsApi,
    badge: 'New',
    description: 'Build on UI Color Palette from your own code.',
  },
  {
    label: 'Contact support',
    href: links.support,
    description: "Stuck? Send us the steps to reproduce and we'll help.",
  },
]

export const footerNav = {
  products: [
    { label: 'UI Color Palette for Figma', href: '/figma' },
    { label: 'UI Color Palette for Penpot', href: '/penpot' },
    { label: 'UI Color Palette for Sketch', href: '/sketch' },
    { label: 'UI Color Palette for Framer', href: '/framer' },
    { label: 'UI Color Palette for Claude', href: '/claude', badge: 'New' },
  ],
  tools: [
    { label: 'MCP server', href: links.docsMcp, badge: 'New' },
    { label: 'LLM Skills', href: links.skills, badge: 'New' },
    { label: 'API Reference', href: links.docsApi, badge: 'New' },
  ],
  resources: [
    { label: 'Read the docs', href: links.docs },
    { label: 'Contact support', href: links.support },
  ],
  involved: [
    { label: 'Submit feedback', href: links.feedback },
    { label: 'Share your ideas', href: links.ideas },
    { label: 'Join our community', href: links.community },
    { label: 'Contribute', href: links.repository },
  ],
  legal: [
    { label: 'Shop', href: links.store },
    { label: 'Privacy Policy', href: links.privacy },
    { label: 'Terms and Conditions', href: links.terms },
    { label: 'Cookies Policy', href: links.cookies },
    { label: 'Terms of Sale', href: links.sale },
  ],
} satisfies Record<string, NavLink[]>

export const isExternal = (href: string) => /^(https?:|mailto:)/.test(href)
