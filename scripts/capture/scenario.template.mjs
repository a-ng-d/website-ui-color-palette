/**
 * Template of a recorded scenario (copy it, rename it, fill in `setup` and `steps`).
 *
 *   node my-scenario.mjs        # opens the window, runs `setup`, prints READY, then waits
 *   touch "$UICP_CAPTURE_DIR/go"  # ...the recording is already running: steps start
 *
 * The orchestrating agent starts Screen Studio between READY and `go`.
 * Timing rule of the blog videos: 5 s after the recording starts, the steps
 * begin; 5 s after the last step, the script prints DONE and the agent stops.
 */
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import {
  sleep,
  newPalette,
  setColors,
  setPreset,
  setSpace,
  tab,
  rectOf,
} from './app.mjs'
import { openWindow, toScreen } from './win.mjs'

const DIR = process.env.UICP_CAPTURE_DIR ?? process.cwd()
const MOUSECTL = process.env.UICP_MOUSECTL ?? path.join(DIR, 'mousectl')
const GO = path.join(DIR, 'go')
const mouse = (...args) =>
  execFileSync(MOUSECTL, args.map(String), { encoding: 'utf8' }).trim()

/** Real cursor: glide to a point of the page, then click. Needed for Screen Studio's zooms. */
async function realMove(page, x, y, seconds = 0.9) {
  const p = await toScreen(page, x, y)
  mouse('move', p.x, p.y, seconds)
  await sleep(250)
}
async function realClickAt(page, x, y, seconds = 0.9) {
  await realMove(page, x, y, seconds)
  mouse('click')
  await sleep(400)
}
async function realClick(page, locator, seconds = 0.9) {
  const b = await locator.boundingBox()
  await realClickAt(page, b.x + b.width / 2, b.y + b.height / 2, seconds)
}

const { context, page } = await openWindow()

// ---- setup: NOT recorded. Name the palette so the title bar does not say "Untitled".
await newPalette(page)
await setColors(page, [['Brand', '#2563EB']])
await setPreset(page, 'Frameworks', 'Tailwind, 50-950')
await tab(page, 'Scale')
// TODO: put the app in the state the video starts from, then park the cursor.

console.log('READY')
while (!fs.existsSync(GO)) await sleep(200)
fs.unlinkSync(GO)

// ---- recorded part
await sleep(5000) // 5 s of calm before the first move
// TODO: steps, e.g.
//   await realClick(page, page.getByRole('button', { name: 'Color space' }))
//   const item = (await rectOf(page, 'LCH')).sort((a, b) => b.y - a.y)[0]
//   await realClickAt(page, item.x, item.y)
//   await sleep(3000)
await sleep(5000) // 5 s of calm after the last step

console.log('DONE')
await context.close()
