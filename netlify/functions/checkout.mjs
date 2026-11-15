/**
 * Creates a Polar checkout for one of the /pro products (anonymous purchase:
 * the customer's account is created afterwards).
 *
 *   GET /api/checkout?product=<polar product id>
 *     → 302 to the hosted Polar checkout (works without JavaScript)
 *   GET /api/checkout?product=<id>&format=json
 *     → { "url": "…" } for the embedded checkout on the Pricing page
 *
 * When a special offer runs for the product (a dated Polar discount, see
 * lib/offers.mjs), it is applied to the checkout. The offer is
 * resolved here, never taken from the browser. If reading the offers or the
 * discounted checkout fails, the checkout is created at the nominal price.
 *
 * Environment (Netlify → Site configuration → Environment variables):
 *   POLAR_ACCESS_TOKEN  Polar organization access token (never commit it)
 *   POLAR_SERVER        "production" (default) or "sandbox"
 *   POLAR_SUCCESS_URL   optional, where to send the customer after payment
 *   (the token needs `discounts:read` for the special offers)
 */

import { PRODUCTS, polarApi } from '../lib/products.mjs'
import { getOffers, offerFor } from '../lib/offers.mjs'

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

  const discountId = offerFor(await getOffers(), product)?.discountId ?? null

  const createCheckout = (discount) =>
    fetch(`${polarApi()}/v1/checkouts/`, {
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
        ...(discount ? { discount_id: discount } : {}),
      }),
    }).catch(() => null)

  let response = await createCheckout(discountId)
  if (!response?.ok && discountId) response = await createCheckout(null)

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
