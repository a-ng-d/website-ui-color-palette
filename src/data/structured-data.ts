/**
 * schema.org builders. Each page picks the ones that describe it,
 * instead of every page carrying the same blocks.
 */
import { site } from '@/config/site'
import type { FaqItem } from '@/data/faq'

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

export const softwareApplication = () => ({
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
  // TODO(content): add the paid plans when the Pricing page is migrated.
  offers: {
    '@type': 'Offer',
    name: '/basic',
    price: '0',
    priceCurrency: 'USD',
  },
})

export const faqPage = (items: FaqItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: stripHtml(item.answer) },
  })),
})
