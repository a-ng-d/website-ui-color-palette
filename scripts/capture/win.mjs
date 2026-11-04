/**
 * A real, visible Chromium window for screen recordings (Screen Studio records
 * the window, so it must exist on screen). App mode = no tab strip, no URL bar.
 */
import os from 'node:os'
import path from 'node:path'
import fs from 'node:fs'
import { chromium } from 'playwright'
import { APP_URL, SESSION_PATH, dismissDialogs, sleep } from './app.mjs'

export async function openWindow({
  x = 60,
  y = 40,
  width = 1280,
  height = 860,
  profile = path.join(os.tmpdir(), 'uicp-capture-profile'),
} = {}) {
  // No "Translate this page?" bubble in a window that is about to be recorded.
  fs.mkdirSync(path.join(profile, 'Default'), { recursive: true })
  const prefsPath = path.join(profile, 'Default/Preferences')
  const prefs = fs.existsSync(prefsPath)
    ? JSON.parse(fs.readFileSync(prefsPath, 'utf8'))
    : {}
  prefs.translate = { ...(prefs.translate ?? {}), enabled: false }
  prefs.intl = { ...(prefs.intl ?? {}), accept_languages: 'en-US,en' }
  fs.writeFileSync(prefsPath, JSON.stringify(prefs))

  const session = JSON.parse(fs.readFileSync(SESSION_PATH, 'utf8'))
  const context = await chromium.launchPersistentContext(profile, {
    headless: false,
    viewport: null,
    colorScheme: 'light',
    locale: 'en-US',
    args: [
      `--app=${APP_URL}`,
      `--window-position=${x},${y}`,
      `--window-size=${width},${height}`,
      '--lang=en-US',
      '--disable-features=Translate,TranslateUI',
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-infobars',
    ],
  })
  if (session.cookies?.length) await context.addCookies(session.cookies)
  for (const o of session.origins ?? [])
    await context.addInitScript(
      ({ origin, items }) => {
        if (location.origin === origin)
          for (const { name, value } of items) localStorage.setItem(name, value)
      },
      { origin: o.origin, items: o.localStorage }
    )
  const page = context.pages()[0] ?? (await context.waitForEvent('page'))
  await page.reload({ waitUntil: 'networkidle' })
  await dismissDialogs(page)
  return { context, page }
}

/** Page coordinates -> global screen coordinates (what mousectl expects). */
export const toScreen = (page, x, y) =>
  page.evaluate(
    ([px, py]) => ({
      x: Math.round(screenX + px),
      y: Math.round(screenY + (outerHeight - innerHeight) + py),
    }),
    [x, y]
  )
