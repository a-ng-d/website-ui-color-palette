/**
 * Special offers on the client: dated Polar discounts running now, read from
 * /api/offers (see netlify/lib/offers.mjs). One request per page, shared by
 * the header and the Pricing tabs. Any failure means no offer.
 */
export interface Offer {
  productId: string
  eventName: string
  discountId: string
  discountCode: string | null
  percentOff: number
  startsAt: string | null
  endsAt: string | null
}

let request: Promise<Offer[]> | undefined

export const loadOffers = (): Promise<Offer[]> =>
  (request ??= fetch('/api/offers')
    .then((response) => (response.ok ? response.json() : null))
    .then((data: { offers?: Offer[] } | null) =>
      Array.isArray(data?.offers) ? data.offers : []
    )
    .catch(() => []))

const startOf = (offer: Offer) =>
  offer.startsAt ? Date.parse(offer.startsAt) : -Infinity

export const isRunning = (offer: Offer, now = Date.now()) =>
  startOf(offer) <= now && (!offer.endsAt || now < Date.parse(offer.endsAt))

export const featuredOffer = (offers: Offer[], now = Date.now()) =>
  offers
    .filter((offer) => isRunning(offer, now))
    .reduce<Offer | undefined>(
      (best, offer) =>
        !best ||
        offer.percentOff > best.percentOff ||
        (offer.percentOff === best.percentOff && startOf(offer) > startOf(best))
          ? offer
          : best,
      undefined
    )

export const offerLabel = (offer: Offer) =>
  `${offer.discountCode ?? offer.eventName} → −${offer.percentOff}%`

export const createChip = (text: string) => {
  const chip = document.createElement('span')
  chip.className = 'chip chip--solo offer-chip'
  const label = document.createElement('span')
  label.className = 'chip__text'
  label.textContent = text
  chip.append(label)
  return chip
}
