import 'vanilla-cookieconsent/dist/cookieconsent.css'
import '@/styles/consent.css'
import * as CookieConsent from 'vanilla-cookieconsent'
import { site, links } from '@/config/site'

/**
 * Consent banner (vanilla-cookieconsent) and the only place where third-party
 * scripts are loaded. Nothing is requested before the visitor accepts:
 *  - analytics → Google Analytics 4 (gtag.js)
 *  - support   → Tawk.to chat widget
 * Production builds only, so local, preview and CI pages never hit the live
 * property or open chat sessions.
 */

/** Third parties run in production, or locally when PUBLIC_THIRD_PARTY=true. */
const enabled =
  import.meta.env.PROD || import.meta.env.PUBLIC_THIRD_PARTY === 'true'

type GtagWindow = Window & {
  dataLayer?: unknown[]
  gtag?: (...args: unknown[]) => void
  Tawk_API?: unknown
  Tawk_LoadStart?: Date
}
const w = window as GtagWindow

const load = (src: string, attrs: Record<string, string> = {}) => {
  const s = document.createElement('script')
  s.async = true
  s.src = src
  for (const [k, v] of Object.entries(attrs)) s.setAttribute(k, v)
  document.head.appendChild(s)
}

let analyticsLoaded = false
const loadAnalytics = () => {
  if (analyticsLoaded || !enabled) return
  analyticsLoaded = true
  w.dataLayer = w.dataLayer || []
  w.gtag = function () {
    // gtag.js reads `arguments` objects from the dataLayer, not arrays.
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments)
  }
  w.gtag('consent', 'default', {
    ad_storage: 'denied',
    analytics_storage: 'granted',
  })
  w.gtag('js', new Date())
  w.gtag('config', site.googleAnalyticsId)
  load(
    `https://www.googletagmanager.com/gtag/js?id=${site.googleAnalyticsId}`
  )
}

let supportLoaded = false
const loadSupport = () => {
  if (supportLoaded || !enabled) return
  supportLoaded = true
  w.Tawk_API = w.Tawk_API || {}
  w.Tawk_LoadStart = new Date()
  load(`https://embed.tawk.to/${site.tawkWidget}`, {
    charset: 'UTF-8',
    crossorigin: '*',
  })
}

const apply = () => {
  if (CookieConsent.acceptedCategory('analytics')) loadAnalytics()
  if (CookieConsent.acceptedCategory('support')) loadSupport()
}

void CookieConsent.run({
  autoClearCookies: true,
  guiOptions: {
    consentModal: { layout: 'box inline', position: 'bottom right' },
    preferencesModal: { layout: 'box' },
  },
  categories: {
    necessary: { enabled: true, readOnly: true },
    analytics: {
      autoClear: { cookies: [{ name: /^_ga/ }] },
    },
    support: {
      autoClear: { cookies: [{ name: /^(tawk|__tawk)/i }, { name: /^Tawk/ }] },
    },
  },
  onConsent: apply,
  onChange: ({ changedCategories }) => {
    // A script that is already running can't be unloaded: reload to drop it.
    const revoked = changedCategories.some(
      (c) => !CookieConsent.acceptedCategory(c)
    )
    if (revoked) location.reload()
    else apply()
  },
  language: {
    default: 'en',
    translations: {
      en: {
        consentModal: {
          title: 'Cookies, your call',
          description:
            'We use optional cookies to measure audience (Google Analytics) and to run the support chat (Tawk.to). Nothing optional loads until you accept.',
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Reject all',
          showPreferencesBtn: 'Customize',
          footer: `<button type="button" class="consent-link" data-cc="accept-necessary">Continue without accepting</button><a href="${links.cookies}" target="_blank" rel="noopener">Cookies Policy</a>`,
        },
        preferencesModal: {
          title: 'Cookie preferences',
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Reject all',
          savePreferencesBtn: 'Save choices',
          closeIconLabel: 'Close',
          sections: [
            {
              title: 'Your choices',
              description: `Pick what you accept. You can change your mind anytime from the footer. <a href="${links.cookies}" target="_blank" rel="noopener">Cookies Policy</a>`,
            },
            {
              title: 'Strictly necessary',
              description:
                'Remember your choice here and your light or dark mode. Always on.',
              linkedCategory: 'necessary',
            },
            {
              title: 'Analytics',
              description:
                'Google Analytics 4 tells us which pages are read, so we can improve the site.',
              linkedCategory: 'analytics',
            },
            {
              title: 'Support chat',
              description:
                'Tawk.to chat widget. It sets an identifier and shares visit data with Tawk.to to answer you.',
              linkedCategory: 'support',
            },
          ],
        },
      },
    },
  },
})
