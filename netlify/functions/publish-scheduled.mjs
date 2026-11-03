/**
 * Rebuilds production every morning, so blog articles with a future pubDate
 * go live on their date (production builds leave them out until then, see
 * `isLive` in src/data/blog.ts).
 *
 * Needs a build hook: Netlify → Project configuration → Build & deploy →
 * Build hooks, on the production branch. Save its URL as the BUILD_HOOK_URL
 * environment variable (Functions scope). Scheduled functions run only on the
 * published production deploy.
 */
export default async () => {
  const hook = process.env.BUILD_HOOK_URL
  if (!hook) {
    console.warn('BUILD_HOOK_URL is not set: no scheduled rebuild.')
    return
  }
  const response = await fetch(hook, { method: 'POST' })
  console.log(`Scheduled rebuild requested: ${response.status}`)
}

/** Every day at 06:00 UTC (pubDate is a UTC date, so the article is due by then). */
export const config = { schedule: '0 6 * * *' }
