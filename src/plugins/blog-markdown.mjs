/**
 * Markdown (Sätteri mdast) plugin for the blog. Authors write plain Markdown:
 *
 * - A line holding only a video URL becomes a responsive, lazy embed
 *   (YouTube, Vimeo, Loom, or an .mp4/.webm file: absolute URL or /videos/x.mp4 from public/):
 *
 *       https://www.youtube.com/watch?v=XXXXXXXXXXX
 *
 *   Put a caption in the link text to describe it for SEO and screen readers:
 *
 *       [Workflow 1 step by step](https://youtu.be/XXXXXXXXXXX)
 *
 * - Every video found is exposed to the page (remarkPluginFrontmatter.videos)
 *   so it can emit VideoObject structured data.
 * - The reading time is exposed as remarkPluginFrontmatter.readingMinutes.
 */

import { defineHastPlugin, defineMdastPlugin } from 'satteri'

const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')

/** @returns {{ kind: 'iframe' | 'file', src: string, provider: string, id?: string } | null} */
const parseVideo = (href) => {
  // A site-relative file (public/videos/demo.mp4 → /videos/demo.mp4) is a video too.
  if (/^\/(?!\/)[^?#]+\.(mp4|webm)$/i.test(href))
    return { kind: 'file', provider: 'File', src: href }
  let url
  try {
    url = new URL(href)
  } catch {
    return null
  }
  const host = url.hostname.replace(/^www\./, '')

  if (host === 'youtu.be' || host === 'youtube.com' || host === 'm.youtube.com') {
    const id =
      host === 'youtu.be'
        ? url.pathname.slice(1)
        : url.searchParams.get('v') ?? url.pathname.split('/').pop()
    if (!id) return null
    return {
      kind: 'iframe',
      provider: 'YouTube',
      id,
      src: `https://www.youtube-nocookie.com/embed/${id}`,
    }
  }
  if (host === 'vimeo.com') {
    const id = url.pathname.split('/').filter(Boolean).pop()
    return id
      ? { kind: 'iframe', provider: 'Vimeo', id, src: `https://player.vimeo.com/video/${id}` }
      : null
  }
  if (host === 'loom.com') {
    const id = url.pathname.split('/').filter(Boolean).pop()
    return id
      ? { kind: 'iframe', provider: 'Loom', id, src: `https://www.loom.com/embed/${id}` }
      : null
  }
  if (/\.(mp4|webm)$/i.test(url.pathname))
    return { kind: 'file', provider: 'File', src: url.href }
  return null
}

const text = (node) =>
  node.value ?? (node.children ? node.children.map(text).join(' ') : '')

const frontmatterOf = (ctx) => {
  const astro = (ctx.data.astro ??= {})
  return (astro.frontmatter ??= {})
}

export default defineMdastPlugin({
  name: 'blog-embeds',
  paragraph(node, ctx) {
    if (node.children.length !== 1) return
    const child = node.children[0]
    const href = child.type === 'link' ? child.url : null
    const video = href && parseVideo(href)
    if (!video) return

    const label = text(child).trim()
    const hasLabel = label && label !== href
    const title = hasLabel ? label : `${video.provider} video`
    const frontmatter = frontmatterOf(ctx)
    ;(frontmatter.videos ??= []).push({ ...video, title })

    const media =
      video.kind === 'file'
        ? `<video controls preload="metadata" src="${escapeHtml(video.src)}" aria-label="${escapeHtml(title)}"></video>`
        : `<iframe src="${escapeHtml(video.src)}" title="${escapeHtml(title)}" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`
    return {
      type: 'html',
      value: `<figure class="embed">${media}${hasLabel ? `<figcaption>${escapeHtml(label)}</figcaption>` : ''}</figure>`,
    }
  },
  after(root, ctx) {
    const frontmatter = frontmatterOf(ctx)
    frontmatter.videos ??= []
    const words = text(root).split(/\s+/).filter(Boolean).length
    frontmatter.readingMinutes = Math.max(1, Math.round(words / 220))
  },
})

/**
 * External links (any other host than the site) open in a new tab. `noopener`
 * protects the page; no `nofollow`, so editorial links keep their SEO value.
 */
export const externalLinks = defineHastPlugin({
  name: 'blog-external-links',
  element: {
    filter: ['a'],
    visit(node, ctx) {
      const href = node.properties?.href
      if (typeof href !== 'string' || !/^https?:\/\//i.test(href)) return
      let host
      try {
        host = new URL(href).hostname.replace(/^www\./, '')
      } catch {
        return
      }
      if (host === 'ui-color-palette.com') return
      ctx.setProperty(node, 'target', '_blank')
      ctx.setProperty(node, 'rel', 'noopener')
    },
  },
})
