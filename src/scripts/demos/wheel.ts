/**
 * “Color wheel”: turn the base colour on the wheel, the harmony follows;
 * switch the harmony and the source colours re-arrange.
 */
import { choiceChips } from './choices'
import { hex, oklch } from './color'
import { approach, easeInOut, latch, stepAt, type DemoFactory } from './engine'

const L = 0.76
const C = 0.13

export const HARMONIES = [
  { id: 'complementary', label: 'Complementary', offsets: [0, 180] },
  { id: 'triadic', label: 'Triadic', offsets: [0, 120, 240] },
  { id: 'tetradic', label: 'Tetradic', offsets: [0, 90, 180, 270] },
] as const

export const WHEEL_START = { hue: 200, harmony: 2 }

export const colourAt = (hue: number) => hex(oklch(L, C, hue))

/** Conic gradient of the wheel (hue 0 at the top, clockwise). */
export const wheelGradient = () =>
  `conic-gradient(${Array.from({ length: 13 }, (_, i) => colourAt(i * 30)).join(',')})`

/** Handle position (% of the wheel) for a hue. */
export const handleAt = (hue: number, radius = 38) => {
  const angle = ((hue - 90) * Math.PI) / 180
  return {
    left: 50 + radius * Math.cos(angle),
    top: 50 + radius * Math.sin(angle),
  }
}

// Per harmony: reach the handle, turn it (+120°), reach the next harmony,
// press, it switches, rest.
const MARKS = [0, 600, 3000, 3700, 3850, 4600]
const TURN = 120

export const wheel: DemoFactory = ({ root, cursor, live, wake }) => {
  const disc = root.querySelector<HTMLElement>('[data-wheel]')!
  const handles = [...root.querySelectorAll<HTMLElement>('[data-handle]')]
  const columns = [...root.querySelectorAll<HTMLElement>('[data-column]')]
  const base = root.querySelector<HTMLElement>('[data-base]')!
  const choice = choiceChips(root)
  const chips = HARMONIES.map((h) => choice.chips.get(h.id)!)
  const sources = root.querySelector<HTMLElement>('[data-count]')!

  let hue = WHEEL_START.hue
  let target = WHEEL_START.hue
  let harmony = -1

  const setHarmony = latch<number>((i) => {
    harmony = i
    sources.dataset.count = `${HARMONIES[i].offsets.length}`
    choice.select(HARMONIES[i].id)
  })
  setHarmony(WHEEL_START.harmony)

  const draw = () => {
    const offsets = HARMONIES[harmony].offsets
    handles.forEach((handle, i) => {
      const h = hue + (offsets[i] ?? 0)
      const { left, top } = handleAt(h)
      handle.style.left = `${left}%`
      handle.style.top = `${top}%`
      handle.style.backgroundColor = colourAt(h)
    })
    columns.forEach((column, i) => {
      const colour = colourAt(hue + (offsets[i] ?? 0))
      column.style.setProperty('--colour', colour)
      column.querySelector('[data-hex]')!.textContent = colour
        .slice(1)
        .toUpperCase()
    })
    base.textContent = colourAt(hue).slice(1).toUpperCase()
  }

  // Visitor: drag around the wheel turns the base; chips switch harmony.
  let dragging = false
  const turn = (event: PointerEvent) => {
    const rect = disc.getBoundingClientRect()
    const x = event.clientX - rect.left - rect.width / 2
    const y = event.clientY - rect.top - rect.height / 2
    const angle = (Math.atan2(y, x) * 180) / Math.PI + 90
    // Shortest way round, so the handle never spins backwards.
    const delta = ((((angle - target) % 360) + 540) % 360) - 180
    target += delta
    wake()
  }
  disc.addEventListener('pointerdown', (event) => {
    dragging = true
    disc.setPointerCapture(event.pointerId)
    turn(event)
  })
  disc.addEventListener('pointermove', (event) => dragging && turn(event))
  disc.addEventListener('pointerup', () => (dragging = false))
  chips.forEach((chip, i) =>
    chip.addEventListener('pointerdown', () => {
      setHarmony(i)
      wake()
    })
  )

  return {
    frame(t, dt) {
      if (t !== null) {
        const cycle = MARKS[MARKS.length - 1]
        const round = Math.floor(t / cycle)
        const { index, local } = stepAt(t, MARKS)
        const progress =
          index === 0 ? 0 : index === 1 ? easeInOut(local / 2400) : 1
        // Three rounds of 120° make a full turn, so the loop never jumps;
        // after a drag, take the nearest equivalent angle.
        const timeline = WHEEL_START.hue + TURN * (round + progress)
        target = timeline + 360 * Math.round((hue - timeline) / 360)
        const next = (WHEEL_START.harmony + round + 1) % 3
        setHarmony(index >= 4 ? next : (next + 2) % 3)

        cursor.show(true)
        cursor.to(index <= 1 ? handles[0] : chips[next], index === 1)
        cursor.press(index === 1 || index === 3)
      }
      hue = approach(hue, target, dt, live() ? 40 : 60)
      draw()
      return Math.abs(target - hue) > 0.05 || t !== null
    },
  }
}
