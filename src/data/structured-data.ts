/**
 * schema.org builders. Each page picks the ones that describe it,
 * instead of every page carrying the same blocks.
 */
import { site } from '@/config/site'
import type { FaqItem } from '@/data/faq'
import {
  billingPeriods,
  plans,
  type Plan,
  type PlanVariant,
} from '@/data/pricing'

const absolute = (path: string) => new URL(path, site.url).href
const stripHtml = (html: string) => html.replace(/<[^>]+>/g, '')

export const organizationId = `${site.url}/#organization`
export const websiteId = `${site.url}/#website`
export const softwareId = `${site.url}/#software`

export const organization = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': organizationId,
  name: site.name,
  url: site.url,
  logo: absolute('/favicon.png'),
  email: site.email,
  founder: { '@type': 'Person', name: site.author.name },
  parentOrganization: {
    '@type': 'Organization',
    name: site.publisher.name,
    url: site.publisher.url,
  },
})

export const website = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': websiteId,
  name: site.name,
  url: site.url,
  inLanguage: site.locale,
  publisher: { '@id': organizationId },
})

const freeOffer = {
  '@type': 'Offer',
  name: '/basic',
  price: '0',
  priceCurrency: 'USD',
}

export const softwareApplication = (offers: object | object[] = freeOffer) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': softwareId,
  name: site.name,
  url: site.url,
  description: site.defaultDescription,
  applicationCategory: 'DesignApplication',
  operatingSystem: 'Figma, Penpot, Sketch, Framer, Claude (MCP)',
  downloadUrl: absolute('/download'),
  publisher: { '@id': organizationId },
  offers,
})

/** The plans of the Pricing page, as offers of the application. */
export const pricingOffers = () => {
  const offer = (plan: Plan, period: string, variant: PlanVariant) => ({
    '@type': 'Offer',
    name: `${plan.tag} (${period})`,
    ...(variant.price ? { price: variant.price } : {}),
    priceCurrency: 'USD',
    url: variant.cta?.href.startsWith('http')
      ? variant.cta.href
      : absolute('/pricing'),
    description: [variant.title, variant.subtitle].filter(Boolean).join(' — '),
  })

  return softwareApplication(
    plans.flatMap((plan) =>
      plan.variants
        ? billingPeriods
            .filter(({ id }) => plan.variants![id].price)
            .map(({ id, label }) => offer(plan, label, plan.variants![id]))
        : [offer(plan, 'Free', plan.fixed!)]
    )
  )
}

export const faqPage = (items: FaqItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: stripHtml(item.answer) },
  })),
})
