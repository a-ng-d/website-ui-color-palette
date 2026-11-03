import { getCollection, type CollectionEntry } from 'astro:content'
import type { NextStep } from '@/data/blocks'
import { capabilityPages, capabilityPath } from '@/data/capability-pages'
import { platformPages } from '@/data/platform-pages'

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

const pillarPaths = new Set([
  ...capabilityPages.map(capabilityPath),
  ...platformPages.map((page) => page.path),
])

/** Published articles, newest first. */
export const getPosts = async () => {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) =>
      b.data.pubDate.getTime() - a.data.pubDate.getTime() ||
      a.id.localeCompare(b.id)
  )
  const orphan = posts.find(
    ({ data }) => data.pillar && !pillarPaths.has(data.pillar)
  )
  if (orphan)
    throw new Error(
      `Blog post "${orphan.id}": unknown pillar "${orphan.data.pillar}".`
    )
  return posts
}

/** The articles of a pillar's cluster, newest first, as related cards. */
export const pillarArticles = async (path: string): Promise<NextStep[]> =>
  (await getPosts())
    .filter(({ data }) => data.pillar === path)
    .map((post) => ({
      icon: 'newspaper',
      title: post.data.title,
      label: 'Read the article',
      href: postPath(post),
    }))

/** Related articles: same category, then shared tags, then newest. */
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
