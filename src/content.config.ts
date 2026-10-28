import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

/**
 * One Markdown file per article in src/content/blog/. The file name is the URL
 * (/blog/<file-name>) and never changes once published.
 *
 * In the body, plain Markdown plus: a line with only a YouTube / Vimeo / Loom /
 * .mp4 URL becomes an embedded video (see src/plugins/blog-markdown.mjs).
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      /** The article's h1. Also the default <title> and og:title. */
      title: z.string(),
      /** Meta description and card preview. Aim for 120–160 characters. */
      description: z.string(),
      cover: image(),
      coverAlt: z.string(),
      author: z.string().default('Aurélien Grimaud'),
      /** Author profile (LinkedIn, site…): feeds `sameAs` in the structured data. */
      authorUrl: z.url().optional(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      /** Used for meta keywords, article:tag and the JSON-LD `keywords`. */
      tags: z.array(z.string()).default([]),
      /** Guides, Product, AI or News. */
      category: z.string().optional(),
      draft: z.boolean().default(false),
      /** Overrides for search engines and social cards; each falls back to the field above. */
      seo: z
        .object({
          /** <title>, without the site name (added automatically). */
          title: z.string().optional(),
          description: z.string().optional(),
          /** Social image (1200×630 recommended). Defaults to the cover. */
          ogImage: image().optional(),
          /** Set when the article first appeared elsewhere. */
          canonical: z.url().optional(),
          noindex: z.boolean().default(false),
        })
        .default({ noindex: false }),
      /** Questions answered in the article: emitted as FAQPage JSON-LD (rich results, AI answers). */
      faq: z
        .array(z.object({ question: z.string(), answer: z.string() }))
        .default([]),
    }),
})

export const collections = { blog }
