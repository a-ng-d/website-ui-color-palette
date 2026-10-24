import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Used for the meta description and the card preview. Aim for 120–160 characters. */
      description: z.string(),
      cover: image(),
      coverAlt: z.string(),
      author: z.string().default('Aurélien Grimaud'),
      // TODO(content): make pubDate required once the real dates are known.
      pubDate: z.coerce.date().optional(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
    }),
})

export const collections = { blog }
