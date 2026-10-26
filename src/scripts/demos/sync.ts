/**
 * “Sync with your team”: Synchronize → pick variables (or styles) → the
 * local library fills up, item by item.
 */
import { choiceChips } from './choices'
import { latch, stepAt, type DemoFactory } from './engine'
import { shadesOf } from './palette'

export const SYNC_TARGETS = [
  { id: 'variables', label: 'Variables', title: 'Local variables' },
  { id: 'styles', label: 'Styles', title: 'Local styles' },
  { id: 'tokens', label: 'Tokens', title: 'Local tokens' },
] as const

export const SYNC_PALETTE = 'UICP Color Primitives'

const STOPS = ['100', '200', '300', '400', '500', '600']

/** The items created in the library: primary shades. */
export const syncItems = () =>
  shadesOf({ name: 'primary', hue: 264, chroma: 0.16 }).map((hex, i) => ({
    stop: STOPS[i],
    hex,
  }))

// Per round: rest on the synced library, reach the other chip, press, the
// library is rebuilt item by item, hold.
const MARKS = [0, 1000, 1600, 1750, 1900, 5400]

export const sync: DemoFactory = ({ root, cursor }) => {
  const library = root.querySelector<HTMLElement>('[data-library]')!
  const { chips, ids, select } = choiceChips(root)

  const setTarget = latch<string>((id) => (library.dataset.target = id))
  const setFilled = latch<boolean>((on) =>
    library.toggleAttribute('data-filled', on)
  )
  const apply = (id: string) => {
    select(id)
    setTarget(id)
  }

  // Visitor: a chip syncs the other kind of items.
  for (const [id, chip] of chips)
    chip.addEventListener('pointerdown', () => {
      setFilled(false)
      apply(id)
      requestAnimationFrame(() => requestAnimationFrame(() => setFilled(true)))
    })

  return {
    frame(t) {
      if (t === null) return
      const cycle = MARKS[MARKS.length - 1]
      const k = Math.floor(t / cycle) % ids.length
      const current = ids[k]
      const next = ids[(k + 1) % ids.length]
      const { index } = stepAt(t, MARKS)

      apply(index >= 3 ? next : current)
      setFilled(index !== 3)

      cursor.show(index >= 1 && index <= 3)
      cursor.to(chips.get(next)!)
      cursor.press(index === 2)
      return true
    },
  }
}
