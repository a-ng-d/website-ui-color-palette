/**
 * Prices of the /pro products, in every currency Polar knows for them.
 *
 *   GET /api/prices → { "prices": { "<product id>": { "usd": 299, "eur": 279 } } }
 *
 * Amounts are in cents. The Pricing page picks the visitor's currency from
 * their locale and keeps the USD prices written in the HTML if this fails.
 */
import { PRODUCTS, polarApi } from '../lib/products.mjs'

const json = (body, status = 200, cache = 'no-store') =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': cache },
  })

export default async () => {
  const token = process.env.POLAR_ACCESS_TOKEN
  if (!token) return json({ error: 'Prices are not configured' }, 503)

  const entries = await Promise.all(
    [...PRODUCTS].map(async (id) => {
      const response = await fetch(`${polarApi()}/v1/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => null)
      if (!response?.ok) return null

      const product = await response.json()
      const prices = {}
      for (const price of product.prices ?? []) {
        if (price.amount_type === 'fixed' && !price.is_archived)
          prices[price.price_currency] = price.price_amount
      }
      return Object.keys(prices).length ? [id, prices] : null
    })
  )

  const prices = Object.fromEntries(entries.filter(Boolean))
  if (!Object.keys(prices).length)
    return json({ error: 'Could not read the prices' }, 502)

  return json({ prices }, 200, 'public, max-age=300, s-maxage=300')
}

export const config = { path: '/api/prices' }
