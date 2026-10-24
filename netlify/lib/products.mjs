/**
 * Polar products sold from the site (same ids as the plugin, `plan.storePro*Id`).
 * Keep in sync with `polarProducts` in src/data/pricing.ts.
 */
export const PRODUCTS = new Set([
  '20d1df96-8052-47de-bf62-36b412c35885', // week
  '5f0502a5-9708-459d-b002-495e2860c23a', // month
  '66a55061-29ff-4c52-8ce0-0661ab12890e', // year
  'ae8ecdd5-badd-42d1-98fc-91f6ffdc77a6', // lifetime
])

export const polarApi = () =>
  process.env.POLAR_SERVER === 'sandbox'
    ? 'https://sandbox-api.polar.sh'
    : 'https://api.polar.sh'
