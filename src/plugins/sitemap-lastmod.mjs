/**
 * `lastmod` of each sitemap URL, for @astrojs/sitemap's `serialize`.
 *
 * - Articles: `updatedDate ?? pubDate` from the front-matter.
 * - /blog: the most recent article.
 * - Other pages: the last commit touching the files that hold their content
 *   (page, data, page components). Site-wide chrome (header, footer, styles)
 *   is left out on purpose: it would date every page at once.
 * When nothing is known (no git history in a shallow clone), lastmod is omitted
 * rather than faked.
 */
import { execFileSync } from 'node:child_process'
import { readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../../', import.meta.url))
const blogDir = 'src/content/blog'

/** Content sources per path; any other path falls back to `src/pages<path>.astro`. */
const sources = {
  '/': ['src/pages/index.astro', 'src/data/faq.ts', 'src/components/home'],
  '/capabilities': [
    'src/pages/capabilities.astro',
    'src/data/capabilities.ts',
    'src/components/capabilities',
  ],
  '/pricing': [
    'src/pages/pricing.astro',
    'src/data/pricing.ts',
    'src/data/faq.ts',
    'src/components/pricing',
  ],
  '/download': [
    'src/pages/download.astro',
    'src/data/downloads.ts',
    'src/components/download',
  ],
}
for (const platform of ['figma', 'penpot', 'sketch', 'framer', 'claude'])
  sources[`/${platform}`] = [
    `src/pages/${platform}.astro`,
    'src/data/platform-pages.ts',
    'src/components/platform',
  ]

const gitDate = (paths) => {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...paths], {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    return out ? new Date(out) : undefined
  } catch {
    return undefined
  }
}

const frontMatterDate = (source, key) => {
  const block = source.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? ''
  const value = block.match(new RegExp(`^${key}:\\s*['"]?([^'"\\n]+)`, 'm'))?.[1]
  const date = value ? new Date(value) : undefined
  return date && !Number.isNaN(date.getTime()) ? date : undefined
}

const postDates = new Map(
  readdirSync(`${root}${blogDir}`)
    .filter((file) => /\.mdx?$/.test(file))
    .map((file) => {
      const source = readFileSync(`${root}${blogDir}/${file}`, 'utf8')
      return [
        file.replace(/\.mdx?$/, ''),
        frontMatterDate(source, 'updatedDate') ??
          frontMatterDate(source, 'pubDate'),
      ]
    })
)

const latest = (dates) =>
  dates
    .filter(Boolean)
    .sort((a, b) => b.getTime() - a.getTime())[0]

/** @param {string} url absolute URL of a sitemap entry */
export const lastmodFor = (url) => {
  const path = new URL(url).pathname.replace(/(.)\/$/, '$1')
  if (path.startsWith('/blog/')) return postDates.get(path.slice(6))
  if (path === '/blog') return latest([...postDates.values()])
  return gitDate(sources[path] ?? [`src/pages${path}.astro`])
}
