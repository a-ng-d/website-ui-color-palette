/**
 * “Ready from the very first second”: the palette is there when the panel
 * opens (5 sources × 6 steps), and Reroll reshuffles it in one click.
 */
import { latch, stepAt, type DemoFactory } from './engine'
import { shadesOf, type Source } from './palette'

const NAMES = ['Primary', 'Neutral', 'Success', 'Warning', 'Alert']

/** Three rolls of the same five roles (the loop cycles through them). */
const ROLLS: number[][] = [
  [264, 264, 152, 78, 27],
  [318, 318, 168, 92, 14],
  [196, 210, 140, 64, 352],
]

const sources = (hues: number[]): Source[] =>
  hues.map((hue, i) => ({
    name: NAMES[i],
    hue,
    chroma: i === 1 ? 0.025 : 0.16,
  }))

/** Rows (one per source) of cells, each cell with its colour in every roll. */
export const readyRows = () => {
  const rolls = ROLLS.map((hues) => sources(hues).map((s) => shadesOf(s)))
  return NAMES.map((name, r) => ({
    name,
    cells: rolls[0][r].map((_, c) => rolls.map((roll) => roll[r][c])),
  }))
}

export const ROLL_COUNT = ROLLS.length

// Each roll: rest, reach Reroll, press, the palette changes.
const MARKS = [0, 1600, 2300, 2450, 3200]
const FILL_AFTER = 1500 // first play: the shades cascade in once uncovered

export const ready: DemoFactory = ({ root, cursor }) => {
  const grid = root.querySelector<HTMLElement>('[data-roll]')!
  const button = root.querySelector<HTMLElement>('[data-reroll]')!

  let roll = 0
  const setRoll = latch<number>((value) => {
    roll = value
    grid.dataset.roll = `${value}`
  })
  const fill = latch<boolean>((filled) =>
    grid.toggleAttribute('data-empty', !filled)
  )

  button.addEventListener('pointerdown', () => setRoll((roll + 1) % ROLL_COUNT))

  return {
    frame(t) {
      if (t === null) return
      fill(t > FILL_AFTER)
      const cycle = Math.floor(t / MARKS[MARKS.length - 1])
      const { index } = stepAt(t, MARKS)
      setRoll((cycle + (index >= 3 ? 1 : 0)) % ROLL_COUNT)
      cursor.show(true)
      cursor.to(index === 0 ? grid : button)
      cursor.press(index === 2)
      return true
    },
  }
}
