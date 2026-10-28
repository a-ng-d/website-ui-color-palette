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
export const authorId = `${site.url}/#aurelien-grimaud`

/** The founder and blog author, referenced by `@id`. */
const founder = {
  '@type': 'Person',
  '@id': authorId,
  name: site.author.name,
  sameAs: [...site.author.sameAs],
  worksFor: { '@id': organizationId },
}

export const organization = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': organizationId,
  name: site.name,
  url: site.url,
  logo: absolute('/favicon.png'),
  email: site.email,
  sameAs: [...site.profiles],
  founder,
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

export const platformSoftwareId = (path: string) => `${absolute(path)}#software`

/**
 * A platform edition of the plugin (/figma, /penpot…), part of the main
 * application so engines tie the pages together.
 */
export const platformApplication = (page: {
  path: string
  name: string
  description: string
  operatingSystem: string
  installUrl: string
  featureList: string[]
  offerName?: string
}) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': platformSoftwareId(page.path),
  name: page.name,
  url: absolute(page.path),
  description: page.description,
  applicationCategory: 'DesignApplication',
  applicationSubCategory: 'Plugin',
  operatingSystem: page.operatingSystem,
  installUrl: page.installUrl,
  featureList: page.featureList,
  isPartOf: { '@id': softwareId },
  publisher: { '@id': organizationId },
  offers: page.offerName ? { ...freeOffer, name: page.offerName } : freeOffer,
})

/** `about`: the `@id` of the entity the page describes. */
export const webPage = (page: {
  path: string
  name: string
  description: string
  about?: string
}) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${absolute(page.path)}#webpage`,
  url: absolute(page.path),
  name: page.name,
  description: page.description,
  inLanguage: site.locale,
  isPartOf: { '@id': websiteId },
  ...(page.about ? { about: { '@id': page.about } } : {}),
})

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

export interface ArticleVideo {
  provider: string
  id?: string
  src: string
  title: string
}

/** A video embedded in an article (eligible for video rich results). */
export const videoObject = (
  video: ArticleVideo,
  post: { description: string; image: string; published?: Date }
) => ({
  '@type': 'VideoObject',
  name: video.title,
  description: post.description,
  thumbnailUrl:
    video.provider === 'YouTube'
      ? `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`
      : post.image,
  embedUrl: video.src,
  ...(post.published ? { uploadDate: post.published.toISOString() } : {}),
})

/** A blog article. `image` is the absolute URL of the optimised cover. */
export const blogPosting = (post: {
  path: string
  title: string
  description: string
  image: string
  author: string
  authorUrl?: string
  tags: string[]
  category?: string
  published?: Date
  modified?: Date
  readingMinutes?: number
  videos?: ArticleVideo[]
}) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  '@id': `${absolute(post.path)}#article`,
  mainEntityOfPage: absolute(post.path),
  headline: post.title,
  description: post.description,
  image: post.image,
  keywords: post.tags.join(', '),
  ...(post.category ? { articleSection: post.category } : {}),
  inLanguage: site.locale,
  ...(post.readingMinutes ? { timeRequired: `PT${post.readingMinutes}M` } : {}),
  ...(post.published ? { datePublished: post.published.toISOString() } : {}),
  ...(post.modified || post.published
    ? { dateModified: (post.modified ?? post.published)!.toISOString() }
    : {}),
  author: {
    '@type': 'Person',
    ...(post.author === site.author.name ? { '@id': authorId } : {}),
    name: post.author,
    ...(post.authorUrl
      ? { url: post.authorUrl, sameAs: [post.authorUrl] }
      : {}),
  },
  publisher: { '@id': organizationId },
  isPartOf: { '@id': websiteId },
  ...(post.videos?.length
    ? {
        video: post.videos.map((video) =>
          videoObject(video, {
            description: post.description,
            image: post.image,
            published: post.published,
          })
        ),
      }
    : {}),
})

export const blogCollection = (blog: {
  path: string
  title: string
  description: string
  posts: { path: string; title: string; published: Date }[]
}) => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${absolute(blog.path)}#collection`,
  url: absolute(blog.path),
  name: blog.title,
  description: blog.description,
  inLanguage: site.locale,
  isPartOf: { '@id': websiteId },
  publisher: { '@id': organizationId },
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: blog.posts.length,
    itemListElement: blog.posts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absolute(post.path),
      name: post.title,
    })),
  },
})

export const glossaryPath = '/glossary'
const termSetId = absolute(`${glossaryPath}#terms`)
export const termId = (path: string) => `${absolute(path)}#term`

export const definedTermSet = (set: {
  name: string
  description: string
  terms: { path: string; name: string; description: string }[]
}) => ({
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  '@id': termSetId,
  url: absolute(glossaryPath),
  name: set.name,
  description: set.description,
  inLanguage: site.locale,
  hasDefinedTerm: set.terms.map((term) => ({
    '@type': 'DefinedTerm',
    '@id': termId(term.path),
    url: absolute(term.path),
    name: term.name,
    description: term.description,
  })),
})

export const definedTerm = (term: {
  path: string
  name: string
  description: string
}) => ({
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  '@id': termId(term.path),
  url: absolute(term.path),
  name: term.name,
  description: term.description,
  inDefinedTermSet: { '@id': termSetId },
})

export const breadcrumbs = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absolute(item.path),
  })),
})

/** Home > page: the breadcrumb of a top-level page. */
export const pageBreadcrumbs = (name: string, path: string) =>
  breadcrumbs([
    { name: 'Home', path: '/' },
    { name, path },
  ])
