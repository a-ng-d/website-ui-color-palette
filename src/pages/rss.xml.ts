import rss from '@astrojs/rss'
import type { APIRoute } from 'astro'

import { site } from '@/config/site'
import { blogPage, getPosts, postPath } from '@/data/blog'

export const GET: APIRoute = async (context) => {
  const posts = await getPosts()

  return rss({
    title: `${site.name} blog`,
    description: blogPage.seo.description,
    site: context.site ?? site.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.seo.description ?? post.data.description,
      link: postPath(post),
      pubDate: post.data.pubDate,
      author: `${site.email} (${post.data.author})`,
      categories: [
        ...(post.data.category ? [post.data.category] : []),
        ...post.data.tags,
      ],
    })),
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    customData: [
      '<language>en-us</language>',
      `<atom:link href="${new URL('/rss.xml', site.url).href}" rel="self" type="application/rss+xml"/>`,
      ...(posts[0]
        ? [`<lastBuildDate>${posts[0].data.pubDate.toUTCString()}</lastBuildDate>`]
        : []),
    ].join(''),
    trailingSlash: false,
  })
}
