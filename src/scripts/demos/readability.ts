/**
 * “Readability playground”: real text on a stop; drag the font size and see
 * when it becomes readable for its contrast (APCA minimum font size).
 */
import { apcaLc, hex, oklch, wcagGrade, wcagRatio, type Rgb } from './color'
import {
  approach,
  keyframes,
  ratioAlong,
  type DemoFactory,
  type Keys,
} from './engine'

const FOREGROUND: Rgb = [1, 1, 1]
const BACKGROUND = oklch(0.62, 0.12, 200)

export const SIZE = { min: 12, max: 36, start: 28 }

/** APCA guidance for regular weight body text: minimum size for a Lc. */
const minimumSize = (lc: number) =>
  lc >= 90 ? 14 : lc >= 75 ? 18 : lc >= 60 ? 24 : lc >= 45 ? 36 : 48

export const readabilityPair = () => {
  const lc = Math.abs(apcaLc(FOREGROUND, BACKGROUND))
  const ratio = wcagRatio(FOREGROUND, BACKGROUND)
  const grade = wcagGrade(ratio)
  return {
    foreground: hex(FOREGROUND),
    background: hex(BACKGROUND),
    lc: `Lc ${lc.toFixed(1)}`,
    wcag: `${ratio.toFixed(2)} : 1 (${grade === 'A' ? 'AA Large' : grade})`,
    minimum: minimumSize(lc),
  }
}

const KEYS: Keys = [
  [0, 28],
  [1600, 28],
  [3000, 14],
  [4600, 14],
  [5600, 20],
  [6800, 20],
  [8000, 28],
]

export const readability: DemoFactory = ({ root, cursor, live, wake }) => {
  const { minimum } = readabilityPair()
  const track = root.querySelector<HTMLElement>('[data-track]')!
  const knob = track.querySelector<HTMLElement>('[data-knob]')!
  const text = root.querySelector<HTMLElement>('[data-text]')!
  const status = root.querySelector<HTMLElement>('[data-status]')!
  const toPercent = (size: number) =>
    ((size - SIZE.min) / (SIZE.max - SIZE.min)) * 100

  let size = SIZE.start
  let target = SIZE.start

  let dragging = false
  const drag = (event: PointerEvent) => {
    target = SIZE.min + ratioAlong(event, track) * (SIZE.max - SIZE.min)
    wake()
  }
  track.addEventListener('pointerdown', (event) => {
    dragging = true
    track.setPointerCapture(event.pointerId)
    drag(event)
  })
  track.addEventListener('pointermove', (event) => dragging && drag(event))
  track.addEventListener('pointerup', () => (dragging = false))

  return {
    frame(t, dt) {
      if (t !== null) {
        const next = keyframes(KEYS, t)
        cursor.press(Math.abs(next - target) > 0.01)
        target = next
        cursor.show(true)
        cursor.to(knob, true)
      }
      size = approach(size, target, dt, live() ? 40 : 90)
      const rounded = Math.round(size)
      knob.style.left = `${toPercent(size)}%`
      knob.textContent = `${rounded}px`
      text.style.fontSize = `${size}px`
      status.dataset.type = rounded >= minimum ? 'success' : 'error'
      return Math.abs(target - size) > 0.05
    },
  }
}
