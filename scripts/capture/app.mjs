/**
 * Helpers to drive the UI Color Palette web app (https://app.ui-color-palette.com)
 * with Playwright. Shared by the screenshot and video agents.
 *
 * Session: a Playwright storage state with a /pro test license already
 * activated, kept OUTSIDE the repo (default ~/.config/uicp-capture/session.json,
 * override with UICP_CAPTURE_SESSION). Never write a license key in the repo.
 */
import os from 'node:os'
import path from 'node:path'
import fs from 'node:fs'
import { chromium } from 'playwright'

export const APP_URL = 'https://app.ui-color-palette.com'
export const SESSION_PATH =
  process.env.UICP_CAPTURE_SESSION ??
  path.join(os.homedir(), '.config/uicp-capture/session.json')
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
export const hasSession = () => fs.existsSync(SESSION_PATH)

/** Cookie banner, then the multi-step "Welcome to the /web beta" dialog. */
export async function dismissDialogs(page) {
  await page
    .getByRole('button', { name: 'Deny all' })
    .first()
    .click({ timeout: 6000 })
    .catch(() => {})
  for (let i = 0; i < 6; i++) {
    const dialog = page.locator('dialog:visible').first()
    if (!(await dialog.count())) break
    const button = dialog
      .getByRole('button', { name: /^(Got it|Let's build|Next|close)$/ })
      .first()
    await button.click({ timeout: 3000 }).catch(() => {})
    await sleep(600)
  }
}

/** Headless 2x browser for screenshots. Returns { browser, context, page }. */
export async function openHeadless({
  width = 1440,
  height = 900,
  session = hasSession(),
} = {}) {
  const browser = await chromium.launch()
  const context = await browser.newContext({
    ...(session ? { storageState: SESSION_PATH } : {}),
    viewport: { width, height },
    deviceScaleFactor: 2,
    colorScheme: 'light',
  })
  const page = await context.newPage()
  await page.goto(APP_URL, { waitUntil: 'networkidle', timeout: 45000 })
  await dismissDialogs(page)
  return { browser, context, page }
}

export async function newPalette(page) {
  await page
    .getByRole('button', { name: /New UI Color Palette/ })
    .first()
    .click()
  await sleep(2000)
}

/** Right-hand tabs: Scale, Colors, Modes, Imports, Settings. */
export async function tab(page, name) {
  await page.getByRole('button', { name, exact: true }).first().click()
  await sleep(700)
}

/** Replace the palette's source colors: list = [[name, '#RRGGBB'], ...]. */
export async function setColors(page, list) {
  await tab(page, 'Colors')
  const removers = () => page.getByRole('button', { name: 'Remove color' })
  while ((await removers().count()) > list.length) {
    await removers().last().click()
    await sleep(500)
  }
  while ((await removers().count()) < list.length) {
    await page.getByRole('button', { name: 'New UI Color' }).first().click()
    await sleep(500)
  }
  const names = page.getByRole('textbox', { name: 'Text input' })
  const hexes = page.getByRole('textbox', { name: 'Hex color code' })
  for (let i = 0; i < list.length; i++) {
    const [name, hex] = list[i]
    await names.nth(i).fill(name)
    await names.nth(i).press('Enter')
    await names.nth(i).blur()
    await sleep(300)
    await hexes.nth(i).fill(hex.replace('#', ''))
    await hexes.nth(i).press('Enter')
    await hexes.nth(i).blur()
    await sleep(500)
  }
}

/**
 * Menus render several hidden copies of their items, so locators like
 * getByText('LCH') are ambiguous. rectOf returns the visible matches with
 * their centre in page coordinates; pick the one you want (see callers).
 */
export const rectOf = (page, text) =>
  page.evaluate((t) => {
    const out = []
    document.querySelectorAll('li, button, div, span').forEach((e) => {
      if (e.children.length <= 2 && (e.innerText || '').trim() === t) {
        const r = e.getBoundingClientRect()
        const cs = getComputedStyle(e)
        if (
          r.width > 0 &&
          r.height > 0 &&
          cs.visibility !== 'hidden' &&
          cs.display !== 'none' &&
          r.x >= 0 &&
          r.y >= 0
        )
          out.push({
            x: r.x + r.width / 2,
            y: r.y + r.height / 2,
            w: r.width,
            h: r.height,
          })
      }
    })
    return out
  }, text)

/** Preset menu: group = 'Google' | 'Frameworks' | 'Atlassian' | 'Adobe' | 'More presets' | 'Custom sets'. */
export async function setPreset(page, group, item) {
  await tab(page, 'Scale')
  await page.locator('#presets button').first().click()
  await sleep(800)
  const g = (await rectOf(page, group)).sort((a, b) => a.x - b.x).pop()
  await page.mouse.move(g.x, g.y)
  await sleep(800)
  const it = (await rectOf(page, item)).sort((a, b) => a.x - b.x).shift()
  await page.mouse.move(it.x, it.y, { steps: 8 })
  await sleep(300)
  await page.mouse.click(it.x, it.y)
  await sleep(1000)
}

/** Palette color space (bottom bar): LCH, OKLCH, CIELAB, OKLAB, HSL, HSV, HSLuv, CMYK. */
export async function setSpace(page, name) {
  await page.getByRole('button', { name: 'Color space' }).click({ force: true })
  await sleep(800)
  const r = (await rectOf(page, name)).sort((a, b) => b.y - a.y)[0]
  await page.mouse.click(r.x, r.y)
  await sleep(1200)
  await page.mouse.move(100, 600)
  await sleep(400)
}

/** Type a value on a knob of a multi-slider (Contrast ratio: slider 1 = light foreground, 2 = dark). */
export async function typeKnob(page, sliderIndex, stopId, value) {
  const knob = page
    .locator('.multiple-slider')
    .nth(sliderIndex)
    .locator(`[role=slider][data-id="${stopId}"]`)
  await knob.focus()
  await page.keyboard.press('Enter')
  await sleep(250)
  const input = page.locator('input[aria-label="Number input"]').first()
  await input.fill(String(value))
  await input.press('Enter')
  await sleep(500)
}

/** The three icon-only tabs of the top bar, in order: Edit (sliders), Preview (eye), Export (`</>`). */
const viewToggles = (page) =>
  page.locator('[role=tab]:visible').filter({ hasNotText: /\S/ })
export async function openExport(page) {
  await viewToggles(page).nth(2).click({ force: true })
  await sleep(1200)
}

/** Export format menu: group = 'Stylesheet' | 'Tailwind' | 'Tokens' | 'Apple' | 'Android'; item = e.g. 'Tailwind v4 (CSS)'. */
export async function setFormat(page, group, item) {
  await page.locator('button[role=combobox]').first().click()
  await sleep(800)
  const g = (await rectOf(page, group)).sort((a, b) => a.x - b.x).pop()
  await page.mouse.move(g.x, g.y)
  await sleep(800)
  if (item) {
    const it = (await rectOf(page, item)).sort((a, b) => a.x - b.x).shift()
    await page.mouse.move(it.x, it.y, { steps: 8 })
    await sleep(300)
    await page.mouse.click(it.x, it.y)
    await sleep(1000)
  }
}

/** Text of the export code preview (the longest code-like element). */
export const getCode = (page) =>
  page.evaluate(
    () =>
      [
        ...document.querySelectorAll(
          'pre, code, textarea, [class*=code], [class*=editor]'
        ),
      ]
        .map((e) => e.value || e.innerText || '')
        .sort((a, b) => b.length - a.length)[0] || ''
  )
