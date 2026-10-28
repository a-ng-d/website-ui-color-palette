/**
 * Polar products sold from the site (production ids of the Polar organization).
 * Keep in sync with `polarProducts` in src/data/pricing.ts.
 */
export const PRODUCTS = new Set([
  '17eb1281-cf21-4d58-9144-76a1426ec73c', // week
  '1c4ad049-f424-4ec4-ac66-0997050e0060', // month
  '87a83311-cba6-424f-a72f-84a1785a1079', // year
  '9ed0e164-8972-4f60-88cf-91b805991e87', // lifetime
])

export const polarApi = () =>
  process.env.POLAR_SERVER === 'sandbox'
    ? 'https://sandbox-api.polar.sh'
    : 'https://api.polar.sh'
