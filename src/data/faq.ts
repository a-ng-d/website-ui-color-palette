import { links, site } from '@/config/site'

export interface FaqItem {
  question: string
  /** Trusted, authored HTML. Rendered on the page and reused in FAQPage JSON-LD. */
  answer: string
}

const a = (href: string, label: string) =>
  `<a href="${href}"${/^https?:/.test(href) ? ' target="_blank" rel="noopener"' : ''}>${label}</a>`

export const homeFaq: FaqItem[] = [
  {
    question: 'OKLCH or HSL — why does it matter?',
    answer:
      "HSL is familiar, but it's perceptually uneven: the same lightness looks brighter for yellow than for blue, so scales drift. OKLCH is perceptually uniform — equal steps look equal to the eye, so your shades stay consistent and your contrast holds up. You can still work in HEX, RGB, or HSL and switch color spaces (OKLCH, OKLAB, HSLuv…) whenever you like.",
  },
  {
    question: 'WCAG 2.1 or WCAG 3 (APCA)?',
    answer:
      "WCAG 2.1 gives the contrast ratios (AA/AAA) you need for compliance today. APCA — from the emerging WCAG 3 — models how we actually perceive contrast, and is far more accurate for dark mode and thin text. UI Color Palette shows both on every stop, so you meet today's standard while designing for tomorrow's.",
  },
  {
    question: 'Can I reuse one palette across platforms?',
    answer:
      'Yes! Publish once to the cloud, then pull the same palette into Figma, Penpot, Sketch, and Framer. Update it in one place and sync everywhere — your color stays consistent wherever your team works.',
  },
  {
    question: 'What are primitive colors?',
    answer:
      "Creating a palette goes well beyond picking a few source colors. Each source color is scaled into a full range of stops — and those stops are your primitives (like blue-100 → blue-1000): raw, literal colors named by hue and step, with no meaning attached yet. They're the foundation you then map into semantics, giving each color a role.",
  },
  {
    question: 'And what about semantic colors?',
    answer:
      'Semantics map primitives to intent — color-action, color-danger, color-surface. Instead of hardcoding blue-500, you reference the role. Swap the primitive underneath and every semantic token updates, which makes theming and light/dark modes effortless.',
  },
  {
    question: 'Is there a free plan?',
    answer: `Yes! The /basic plan is free forever — 3 palettes per document, 5 source colors, 6 stops, 2 color modes, and CSS export. Upgrade to /pro for unlimited everything and full code export whenever you're ready. See ${a('/pricing', 'Pricing')}.`,
  },
  {
    question: "What should I do if I'm stuck and need help?",
    answer: `Send an email to ${a(`mailto:${site.email}`, site.email)} with clear steps to reproduce and any relevant screenshots, and we'll help you out.`,
  },
  {
    question: 'How can I give feedback or suggest a new feature?',
    answer: `We'd love to hear from you! Use our ${a(links.feedback, 'feedback form')} or submit ideas on our ${a(links.ideas, 'feature request platform')}.`,
  },
  {
    question: "It's open-source — can I contribute?",
    answer: `Absolutely. UI Color Palette is open-source, so you're welcome to explore the code, open issues, and submit pull requests on ${a(links.repository, 'GitHub')}. Community fixes and feature ideas are what keep it getting better.`,
  },
]
