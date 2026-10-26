import { getCollection, type CollectionEntry } from 'astro:content'

export type Post = CollectionEntry<'blog'>

export const blogPage = {
  path: '/blog',
  seo: {
    title: 'UI Color Palette Blog — Accessible Color Workflows',
    description:
      'Product news and AI workflows from the UI Color Palette team: build, audit and ship accessible color palettes in Figma, Penpot, Sketch, Framer and Claude.',
  },
  hero: {
    title: 'The UI Color Palette blog',
    tagline:
      'Product news and workflows for building accessible color systems, in your design tool or with AI.',
  },
}

export const postPath = (post: Post) => `/blog/${post.id}`

/** Published articles, newest first (ties keep a stable order). */
export const getPosts = async () =>
  (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) =>
      b.data.pubDate.getTime() - a.data.pubDate.getTime() ||
      a.id.localeCompare(b.id)
  )

/**
 * Articles to read next: same category first, then shared tags, then the most
 * recent ones, so the block is never empty while another article exists.
 */
export const relatedPosts = (post: Post, posts: Post[], limit = 2) => {
  const score = (other: Post) =>
    (other.data.category && other.data.category === post.data.category
      ? 10
      : 0) +
    other.data.tags.filter((tag) => post.data.tags.includes(tag)).length

  return posts
    .filter((other) => other.id !== post.id)
    .map((other, index) => ({ other, index, score: score(other) }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, limit)
    .map(({ other }) => other)
}
