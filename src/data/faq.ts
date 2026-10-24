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

export interface FaqCategory {
  id: string
  label: string
  items: FaqItem[]
}

const mail = a(`mailto:${site.email}`, site.email)
const polar = '<strong>Polar</strong>'

/**
 * FAQ of the Pricing page, in three categories (tabs in the Figma design):
 * Subscription, License and Figma (Figma nodes 8:29274, 8:29275, 8:29276).
 * A category without items is not shown.
 */
export const pricingFaq: FaqCategory[] = [
  {
    id: 'subscription',
    label: 'Subscription',
    items: [
      {
        question: 'How is my subscription linked to my account?',
        answer: `Your subscription is tied to your account, so use the <strong>same email address everywhere</strong>. Subscribe through the <strong>in-app purchase</strong>, powered by Polar — that's what links your payment to our database and unlocks your plan on the right account. From there, access is <strong>activated across every platform automatically</strong> — Figma, Penpot, Sketch, and Framer — with no manual step on your side. You can manage everything anytime on ${polar}.`,
      },
      {
        question: 'Where do I manage my subscription?',
        answer: `All subscriptions are managed on ${polar}. From there you can update your payment method, switch billing period, or cancel — changes apply to your account automatically.`,
      },
      {
        question:
          "Would I be refunded if my subscription isn't what I expected?",
        answer: `Refunds are handled case by case, in line with our ${a(links.sale, 'Terms of Sale')}. You can cancel anytime on ${polar} to stop future renewals; for a refund, contact us at ${mail} with your order details and we'll review your request.`,
      },
    ],
  },
  {
    id: 'license',
    label: 'License',
    items: [
      {
        question: 'How does licensing work?',
        answer:
          "Both subscription and license give you access to <strong>every platform</strong> — Figma, Penpot, Sketch, and Framer — not one at a time. Under the hood it's an <strong>activation / deactivation</strong> system: each seat you activate unlocks full cross-platform access automatically, with no manual setup on your side. A license is volume-based and can be <strong>activated up to 4 times</strong>, and is available on <strong>monthly and yearly</strong> plans only.",
      },
      {
        question: 'What is my license tied to?',
        answer:
          "Here's the real advantage of a license: it isn't bound to your email or account — it lives in the <strong>license key</strong> itself. Activate the key and it unlocks /pro, so your access travels with the key rather than a specific account. Purchase via <strong>Lemon Squeezy</strong> and you'll receive your license key by email.",
      },
      {
        question: 'Where do I manage my license?',
        answer:
          'All licenses are managed on <strong>Lemon Squeezy</strong>. Because licenses are subscriptions too, you can update your payment method, pause, or cancel anytime from your customer portal to stop future payments — changes apply to your account automatically.',
      },
      {
        question: "Would I be refunded if my license isn't what I expected?",
        answer: `Refunds are handled case by case, in line with our ${a(links.sale, 'Terms of Sale')}. You can pause or cancel anytime on Lemon Squeezy to stop future payments; for a refund, contact us at ${mail} with your order details and we'll review your request.`,
      },
    ],
  },
  {
    id: 'figma',
    label: 'Figma',
    items: [
      {
        question: 'How does the subscription work on Figma?',
        answer:
          'On Figma, /pro is an <strong>in-app subscription managed by Figma</strong>, billed <strong>monthly or yearly</strong>. Subscribe from the plugin, then manage it in Figma under <strong>Settings</strong> → <strong>Community</strong> → <strong>Community purchases</strong> → <strong>Manage subscription</strong>. Use the same email as your account so your subscription links correctly.',
      },
      {
        question: 'Which Figma editors are supported?',
        answer: `UI Color Palette runs in <strong>Figma Design</strong>, <strong>Dev Mode</strong>, <strong>Buzz</strong>, and <strong>FigJam</strong> — with modes, variables, and styles available in <strong>Figma Design</strong>. See the ${a('/figma', 'UI Color Palette for Figma')} page for the details.`,
      },
    ],
  },
]
