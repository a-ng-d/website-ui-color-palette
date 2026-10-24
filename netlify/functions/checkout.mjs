/**
 * Creates a Polar checkout for one of the /pro products (anonymous purchase:
 * the customer's account is created afterwards).
 *
 *   GET /api/checkout?product=<polar product id>
 *     → 302 to the hosted Polar checkout (works without JavaScript)
 *   GET /api/checkout?product=<id>&format=json
 *     → { "url": "…" } for the embedded checkout on the Pricing page
 *
 * Environment (Netlify → Site configuration → Environment variables):
 *   POLAR_ACCESS_TOKEN  Polar organization access token (never commit it)
 *   POLAR_SERVER        "production" (default) or "sandbox"
 *   POLAR_SUCCESS_URL   optional, where to send the customer after payment
 */

import { PRODUCTS, polarApi } from '../lib/products.mjs'

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  })

export default async (request) => {
  const url = new URL(request.url)
  const product = url.searchParams.get('product') ?? ''
  const wantsJson = url.searchParams.get('format') === 'json'

  if (!PRODUCTS.has(product)) return json({ error: 'Unknown product' }, 400)

  const token = process.env.POLAR_ACCESS_TOKEN
  if (!token) return json({ error: 'Checkout is not configured' }, 503)

  const response = await fetch(`${polarApi()}/v1/checkouts/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      products: [product],
      success_url:
        process.env.POLAR_SUCCESS_URL || 'https://app.ui-color-palette.com',
      embed_origin: url.origin,
    }),
  }).catch(() => null)

  if (!response?.ok)
    return json({ error: 'Could not create the checkout' }, 502)

  const checkout = await response.json()
  if (wantsJson) return json({ url: checkout.url })

  return new Response(null, {
    status: 302,
    headers: { Location: checkout.url, 'Cache-Control': 'no-store' },
  })
}

export const config = { path: '/api/checkout' }
