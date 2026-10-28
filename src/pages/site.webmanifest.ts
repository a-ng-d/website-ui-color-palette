import type { APIRoute } from 'astro'

import { site } from '@/config/site'

/** Web app manifest. */
export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      name: site.name,
      short_name: site.name,
      description: site.defaultDescription,
      start_url: '/',
      display: 'browser',
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
    }),
    { headers: { 'Content-Type': 'application/manifest+json' } }
  )
