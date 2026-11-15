/**
 * Special offers are calendar events (Black Friday, Christmas…): Polar
 * percentage discounts with both a start and an end date. Undated discounts
 * (partner or support codes, like TLGUIDE20) are never shown. A dated discount
 * can still be kept private with the metadata `campaign = private` (API or CLI
 * only: the Polar dashboard does not edit discount metadata).
 *
 * An offer runs from `starts_at` to `ends_at`, exclusive: in the dashboard,
 * "Ends at Nov 10" stops the offer at the very start of Nov 10. It applies to
 * the products the discount is restricted to (all of them when none is set),
 * until its redemption limit is reached.
 *
 * Polar does not return discounted prices: the page applies the percentage to
 * the product price, and /api/checkout applies the discount to the checkout.
 *
 * Any failure returns no offer, so the site falls back to the nominal prices.
 * The Polar token needs the `discounts:read` scope.
 */
import { PRODUCTS, polarApi } from './products.mjs'

const TIMEOUT = 3000
const MAX_PAGES = 5

const isCalendarOffer = (discount) =>
  Boolean(discount.starts_at && discount.ends_at) &&
  String(discount.metadata?.campaign ?? '').toLowerCase() !== 'private'

const isRunning = (discount, now) =>
  (!discount.starts_at || Date.parse(discount.starts_at) <= now) &&
  (!discount.ends_at || now < Date.parse(discount.ends_at)) &&
  (discount.max_redemptions === null ||
    discount.max_redemptions === undefined ||
    discount.redemptions_count < discount.max_redemptions)

const toOffers = (discount) => {
  const percentOff = discount.basis_points / 100
  if (!(percentOff > 0 && percentOff < 100)) return []

  const restricted = (discount.products ?? []).map((product) => product.id)
  const products = restricted.length
    ? restricted.filter((id) => PRODUCTS.has(id))
    : [...PRODUCTS]

  return products.map((productId) => ({
    productId,
    eventName: discount.name,
    discountId: discount.id,
    discountCode: discount.code ?? null,
    percentOff,
    startsAt: discount.starts_at ?? null,
    endsAt: discount.ends_at ?? null,
  }))
}

/**
 * The offers running now, one per product: when several overlap on a product,
 * the one that started last wins.
 */
export const getOffers = async (now = Date.now()) => {
  const token = process.env.POLAR_ACCESS_TOKEN
  if (!token) return []

  try {
    const discounts = []
    for (let page = 1; page <= MAX_PAGES; page++) {
      const response = await fetch(
        `${polarApi()}/v1/discounts/?limit=100&page=${page}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          signal: AbortSignal.timeout(TIMEOUT),
        }
      )
      if (!response.ok) return []

      const { items = [], pagination } = await response.json()
      discounts.push(...items)
      if (!pagination || page >= pagination.max_page) break
    }

    const startOf = (offer) =>
      offer.startsAt ? Date.parse(offer.startsAt) : -Infinity
    const byProduct = new Map()
    for (const offer of discounts
      .filter(
        (discount) =>
          discount.type === 'percentage' &&
          isCalendarOffer(discount) &&
          isRunning(discount, now)
      )
      .flatMap(toOffers)) {
      const current = byProduct.get(offer.productId)
      if (!current || startOf(offer) > startOf(current))
        byProduct.set(offer.productId, offer)
    }
    return [...byProduct.values()]
  } catch {
    return []
  }
}

export const offerFor = (offers, productId) =>
  offers.find((offer) => offer.productId === productId)
