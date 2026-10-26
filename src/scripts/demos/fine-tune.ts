/**
 * “Fine-tune every stop”: drag a stop of the lightness scale, then the
 * chroma, then the hue, and watch the shades of the scale follow.
 */
import { hex, oklch } from './color'
import {
  approach,
  keyframes,
  ratioAlong,
  stepAt,
  type DemoFactory,
  type Keys,
} from './engine'

/** Stops of the scale: label and lightness position (0–100, dark → light). */
export const FINE_TUNE_STOPS = [
  { label: '60', position: 12 },
  { label: '50', position: 27 },
  { label: '40', position: 43 },
  { label: '30', position: 58 },
  { label: '20', position: 73 },
  { label: '10', position: 88 },
]

/** Chroma and hue sliders, 0–100 (hue: × 3.6 degrees). */
export const FINE_TUNE_CHROMA = 60
export const FINE_TUNE_HUE = 48 // ≈ 172°, a teal

const MIN_GAP = 4 // stops never cross

const lightness = (position: number) => 0.12 + (position / 100) * 0.86

export const shadeAt = (position: number, chroma: number, hue: number) => {
  const l = lightness(position)
  return hex(
    oklch(l, (chroma / 100) * 0.19 * (1 - Math.abs(2 * l - 1) ** 2), hue * 3.6)
  )
}

const track = (colour: (value: number) => string) =>
  Array.from({ length: 11 }, (_, i) => ({
    offset: i / 10,
    color: colour(i * 10),
  }))

/** Lightness: dark to light. Chroma: grey to vivid. Hue: around the wheel. */
export const lightnessTrack = () =>
  track((v) => shadeAt(v, FINE_TUNE_CHROMA, FINE_TUNE_HUE))
export const chromaTrack = () => track((v) => shadeAt(50, v, FINE_TUNE_HUE))
export const hueTrack = () => track((v) => shadeAt(55, 80, v))

const DRIVEN = 2 // the stop moved by the loop (“40”)

// Three acts: the stop, the chroma, the hue (each knob rests elsewhere).
const ACTS = [0, 6000, 12000, 18000]
const LOOP = ACTS[ACTS.length - 1]
const GLIDE = 600 // the cursor travels to the next control

const STOP_KEYS: Keys = [
  [0, 43],
  [1200, 43],
  [2300, 38],
  [3100, 38],
  [4300, 48],
  [5000, 48],
  [5800, 43],
  [LOOP, 43],
]
const CHROMA_KEYS: Keys = [
  [0, 60],
  [6800, 60],
  [7700, 12],
  [8400, 12],
  [9600, 96],
  [10300, 96],
  [11300, 60],
  [LOOP, 60],
]
const HUE_KEYS: Keys = [
  [0, 48],
  [12800, 48],
  [13800, 22],
  [14500, 22],
  [15800, 78],
  [16500, 78],
  [17400, 48],
  [LOOP, 48],
]

export const fineTune: DemoFactory = ({ root, cursor, live, wake }) => {
  const scale = root.querySelector<HTMLElement>('[data-scale]')!
  const knobs = [...scale.querySelectorAll<HTMLElement>('[data-knob]')]
  const sliders = {
    chroma: root.querySelector<HTMLElement>('[data-chroma]')!,
    hue: root.querySelector<HTMLElement>('[data-hue]')!,
  }
  const knobOf = (el: HTMLElement) =>
    el.querySelector<HTMLElement>('[data-knob]')!
  const chromaKnob = knobOf(sliders.chroma)
  const hueKnob = knobOf(sliders.hue)
  const swatches = [...root.querySelectorAll<HTMLElement>('[data-swatch]')]

  const positions = FINE_TUNE_STOPS.map((stop) => stop.position)
  const targets = [...positions]
  const value = { chroma: FINE_TUNE_CHROMA, hue: FINE_TUNE_HUE }
  const target = { ...value }

  const clampStop = (index: number, at: number) =>
    Math.min(
      (targets[index + 1] ?? 100 + MIN_GAP) - MIN_GAP,
      Math.max((targets[index - 1] ?? -MIN_GAP) + MIN_GAP, at)
    )

  const draw = () => {
    knobs.forEach((knob, i) => (knob.style.left = `${positions[i]}%`))
    chromaKnob.style.left = `${value.chroma}%`
    hueKnob.style.left = `${value.hue}%`
    swatches.forEach(
      (swatch, i) =>
        (swatch.style.backgroundColor = shadeAt(
          positions[i],
          value.chroma,
          value.hue
        ))
    )
  }

  // Visitor: grab the nearest stop, or the chroma or hue knob, and drag.
  let grabbed: number | 'chroma' | 'hue' | null = null
  const move = (event: PointerEvent) => {
    if (grabbed === 'chroma' || grabbed === 'hue')
      target[grabbed] = ratioAlong(event, sliders[grabbed]) * 100
    else if (grabbed !== null)
      targets[grabbed] = clampStop(grabbed, ratioAlong(event, scale) * 100)
    wake()
  }
  scale.addEventListener('pointerdown', (event) => {
    const at = ratioAlong(event, scale) * 100
    grabbed = targets.reduce(
      (best, position, i) =>
        Math.abs(position - at) < Math.abs(targets[best] - at) ? i : best,
      0
    )
    scale.setPointerCapture(event.pointerId)
    move(event)
  })
  for (const key of ['chroma', 'hue'] as const)
    sliders[key].addEventListener('pointerdown', (event) => {
      grabbed = key
      sliders[key].setPointerCapture(event.pointerId)
      move(event)
    })
  for (const el of [scale, sliders.chroma, sliders.hue]) {
    el.addEventListener(
      'pointermove',
      (event) => grabbed !== null && move(event)
    )
    el.addEventListener('pointerup', () => (grabbed = null))
    el.addEventListener('pointercancel', () => (grabbed = null))
  }

  return {
    frame(t, dt) {
      if (t !== null) {
        const stop = keyframes(STOP_KEYS, t)
        const chroma = keyframes(CHROMA_KEYS, t)
        const hue = keyframes(HUE_KEYS, t)
        const { index: act, local } = stepAt(t, ACTS)
        const control = [knobs[DRIVEN], chromaKnob, hueKnob][act]
        cursor.show(true)
        // Glide to the act's control, then follow it while dragging.
        cursor.to(control, local > GLIDE)
        cursor.press(
          Math.abs(stop - targets[DRIVEN]) > 0.01 ||
            Math.abs(chroma - target.chroma) > 0.01 ||
            Math.abs(hue - target.hue) > 0.01
        )
        // The loop drives one control at a time; the others go home.
        FINE_TUNE_STOPS.forEach((s, i) => (targets[i] = s.position))
        targets[DRIVEN] = stop
        target.chroma = chroma
        target.hue = hue
      }
      const tau = live() ? 40 : 90
      let moving = false
      positions.forEach((position, i) => {
        positions[i] = approach(position, targets[i], dt, tau)
        moving ||= Math.abs(targets[i] - positions[i]) > 0.05
      })
      for (const key of ['chroma', 'hue'] as const) {
        value[key] = approach(value[key], target[key], dt, tau)
        moving ||= Math.abs(target[key] - value[key]) > 0.05
      }
      draw()
      return moving
    },
  }
}
