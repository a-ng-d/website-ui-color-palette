/**
 * Special offers running now, for the header and the Pricing tabs.
 *
 *   GET /api/offers → {
 *     "offers": [{ productId, eventName, discountId, discountCode, percentOff,
 *                  startsAt, endsAt }]
 *   }
 *
 * One offer per product (see lib/offers.mjs). Any failure (no token, missing
 * `discounts:read` scope, Polar down) gives an empty list: no offer shown.
 * The short cache keeps the site in step with the start and end of an offer.
 */
import { getOffers } from '../lib/offers.mjs'

export default async () =>
  new Response(JSON.stringify({ offers: await getOffers() }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=60, s-maxage=60',
    },
  })

export const config = { path: '/api/offers' }
