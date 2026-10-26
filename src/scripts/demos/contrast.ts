/**
 * “Contrast mastering”: drag the lightness of a shade, white text on it,
 * and watch the WCAG 2.1 ratio, its grade and the APCA Lc follow.
 */
import {
  apcaLc,
  hex,
  oklch,
  wcagGrade,
  wcagRatio,
  type Rgb,
  type WcagGrade,
} from './color'
import {
  approach,
  keyframes,
  ratioAlong,
  type DemoFactory,
  type Keys,
} from './engine'

const HUE = 264
export const CONTRAST_FOREGROUND: Rgb = [1, 1, 1]
/** Slider value (0–100) of the still picture: a comfortable AAA. */
export const CONTRAST_START = 20

const shade = (value: number) => {
  const l = 0.2 + (value / 100) * 0.72
  const c = 0.15 * (1 - Math.abs(2 * l - 1) ** 2)
  return oklch(l, c, HUE)
}

export const contrastAt = (value: number) => {
  const background = shade(value)
  const ratio = wcagRatio(CONTRAST_FOREGROUND, background)
  return {
    background: hex(background),
    ratio: `${ratio.toFixed(2)} : 1`,
    grade: wcagGrade(ratio) as WcagGrade,
    lc: `Lc ${Math.abs(apcaLc(CONTRAST_FOREGROUND, background)).toFixed(1)}`,
  }
}

/** The message shown for each WCAG grade (SemanticMessage type + text). */
export const GRADES: Record<
  WcagGrade,
  { type: 'success' | 'warning' | 'error'; text: string }
> = {
  AAA: { type: 'success', text: 'AAA · Any text size' },
  AA: { type: 'success', text: 'AA · Body text' },
  A: { type: 'warning', text: 'AA Large · 18px and up' },
  Fail: { type: 'error', text: 'Fail · Not readable' },
}

/** Track of the slider: the shade sampled across its range. */
export const contrastTrack = () =>
  Array.from({ length: 11 }, (_, i) => ({
    offset: i / 10,
    color: hex(shade(i * 10)),
  }))

/** AAA → AA → AA Large → Fail, then back. */
const KEYS: Keys = [
  [0, 20],
  [1600, 20],
  [2800, 45],
  [4200, 45],
  [5200, 60],
  [6600, 60],
  [7800, 80],
  [9600, 80],
  [11400, 20],
]

export const contrast: DemoFactory = ({ root, cursor, live, wake }) => {
  const track = root.querySelector<HTMLElement>('[data-track]')!
  const knob = track.querySelector<HTMLElement>('[data-knob]')!
  const preview = root.querySelector<HTMLElement>('[data-preview]')!
  const message = root.querySelector<HTMLElement>('[data-grade-message]')!
  const gradeText = root.querySelector('[data-grade-text]')!
  const ratio = root.querySelector('[data-ratio]')!
  const lc = root.querySelector('[data-lc]')!

  let value = CONTRAST_START
  let target = CONTRAST_START
  let drawn = NaN

  const draw = () => {
    const rounded = Math.round(value * 10) / 10
    if (rounded === drawn) return
    drawn = rounded
    const state = contrastAt(value)
    knob.style.left = `${value}%`
    knob.textContent = `${Math.round(value)}`
    preview.style.backgroundColor = state.background
    ratio.textContent = state.ratio
    lc.textContent = state.lc
    message.dataset.type = GRADES[state.grade].type
    gradeText.textContent = GRADES[state.grade].text
  }

  // Visitor: press anywhere on the track and drag.
  let dragging = false
  track.addEventListener('pointerdown', (event) => {
    dragging = true
    track.setPointerCapture(event.pointerId)
    target = ratioAlong(event, track) * 100
    wake()
  })
  track.addEventListener('pointermove', (event) => {
    if (!dragging) return
    target = ratioAlong(event, track) * 100
    wake()
  })
  const release = () => (dragging = false)
  track.addEventListener('pointerup', release)
  track.addEventListener('pointercancel', release)

  return {
    frame(t, dt) {
      if (t !== null) {
        const next = keyframes(KEYS, t)
        cursor.press(Math.abs(next - target) > 0.01)
        target = next
      }
      value = approach(value, target, dt, live() ? 40 : 90)
      draw()
      if (t !== null) {
        cursor.show(true)
        cursor.to(knob, true)
      }
      return Math.abs(target - value) > 0.05
    },
  }
}
