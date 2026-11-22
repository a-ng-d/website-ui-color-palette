/**
 * Anonymous counter of the cookie banner's outcomes, to know how much of the
 * audience Google Analytics can't see (it only loads after "Accept all").
 *
 *   POST /api/consent   body: shown | accept_all | reject | custom → 204
 *   GET  /api/consent?days=28   Authorization: Bearer $CONSENT_STATS_TOKEN → {
 *     "from", "to",
 *     "totals": { shown, accept_all, reject, custom, ignored },
 *     "rates":  { accept_all, reject, custom, ignored },   // share of `shown`
 *     "days":   { "2026-11-19": { shown, accept_all, reject, custom }, … }
 *   }
 *
 * Stores one aggregate per UTC day in Netlify Blobs (store "consent"): no IP,
 * no identifier, no user-agent, no cookie. Only production deploys count, so
 * deploy previews don't pollute the figures. Obvious bots are skipped.
 * Read-modify-write is not atomic: two hits in the same instant can lose one
 * increment, which is fine at this volume.
 */
import { getStore } from '@netlify/blobs'

const EVENTS = ['shown', 'accept_all', 'reject', 'custom']
const BOT = /bot|crawl|spider|slurp|headless|lighthouse|preview/i

const empty = () => Object.fromEntries(EVENTS.map((e) => [e, 0]))
const store = () => getStore({ name: 'consent', consistency: 'strong' })
const day = (date) => date.toISOString().slice(0, 10)

const record = async (req, context) => {
  const deploy = context?.deploy?.context
  if (deploy && deploy !== 'production') return
  if (BOT.test(req.headers.get('user-agent') ?? '')) return

  const event = (await req.text()).trim()
  if (!EVENTS.includes(event)) return

  const consent = store()
  const key = day(new Date())
  const counts = { ...empty(), ...(await consent.get(key, { type: 'json' })) }
  counts[event] += 1
  await consent.setJSON(key, counts)
}

const report = async (req) => {
  const token = process.env.CONSENT_STATS_TOKEN
  if (!token || req.headers.get('authorization') !== `Bearer ${token}`)
    return new Response('Not found', { status: 404 })

  const asked = Number(new URL(req.url).searchParams.get('days'))
  const span = Number.isInteger(asked) && asked > 0 ? Math.min(asked, 366) : 28
  const to = new Date()
  const from = new Date(to.getTime() - (span - 1) * 86_400_000)

  const consent = store()
  const { blobs } = await consent.list()
  const keys = blobs
    .map((b) => b.key)
    .filter((k) => k >= day(from) && k <= day(to))
    .sort()

  const days = {}
  const totals = empty()
  for (const key of keys) {
    days[key] = { ...empty(), ...(await consent.get(key, { type: 'json' })) }
    for (const e of EVENTS) totals[e] += days[key][e]
  }
  totals.ignored = Math.max(
    0,
    totals.shown - totals.accept_all - totals.reject - totals.custom
  )

  const share = (n) =>
    totals.shown ? Math.round((n / totals.shown) * 1000) / 10 : null
  const rates = {
    accept_all: share(totals.accept_all),
    reject: share(totals.reject),
    custom: share(totals.custom),
    ignored: share(totals.ignored),
  }

  return new Response(
    JSON.stringify(
      { from: day(from), to: day(to), totals, rates, days },
      null,
      2
    ),
    {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    }
  )
}

export default async (req, context) => {
  if (req.method === 'GET') return report(req)
  if (req.method !== 'POST') return new Response(null, { status: 405 })

  // A failed count must never surface to the visitor.
  try {
    await record(req, context)
  } catch (error) {
    console.error('[consent]', error)
  }
  return new Response(null, { status: 204 })
}

export const config = { path: '/api/consent' }
