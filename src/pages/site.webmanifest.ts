import type { APIRoute } from 'astro'

import { site } from '@/config/site'

/** Web app manifest: name and icon when the site is pinned or installed. */
export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      name: site.name,
      short_name: site.name,
      description: site.defaultDescription,
      start_url: '/',
      display: 'browser',
      icons: [{ src: '/favicon.png', sizes: '128x128', type: 'image/png' }],
    }),
    { headers: { 'Content-Type': 'application/manifest+json' } }
  )
