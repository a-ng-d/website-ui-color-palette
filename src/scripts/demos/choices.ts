/**
 * Choice chips (components/capabilities/demos/ChoiceChips.astro) and the
 * loop shared by demos whose interaction is “pick an option, see the
 * result”: the cursor reaches the next chip, presses, the choice switches.
 */
import { latch, stepAt, type DemoFactory } from './engine'

/** The chips of a stage, and a setter that turns one on. */
export const choiceChips = (root: HTMLElement) => {
  const chips = new Map(
    [...root.querySelectorAll<HTMLElement>('[data-choice]')].map((el) => [
      el.dataset.choice!,
      el,
    ])
  )
  const select = latch<string>((id) => {
    for (const [key, el] of chips) el.toggleAttribute('data-on', key === id)
  })
  return { chips, ids: [...chips.keys()], select }
}

/**
 * Loop through the chips. The selected id is written on the `[data-active]`
 * element of the stage, so CSS shows the matching result.
 */
export const choiceLoop =
  ({ step = 2800 } = {}): DemoFactory =>
  ({ root, cursor }) => {
    const result = root.querySelector<HTMLElement>('[data-active]')!
    const { chips, ids, select: selectChip } = choiceChips(root)
    const select = (id: string) => {
      selectChip(id)
      result.dataset.active = id
    }
    for (const [id, chip] of chips)
      chip.addEventListener('pointerdown', () => select(id))

    // Rest, reach the next chip, press, switch.
    const marks = [0, step * 0.4, step * 0.75, step * 0.8, step]
    let aimed = ''

    return {
      frame(t) {
        if (t === null) return
        const k = Math.floor(t / step) % ids.length
        const current = ids[k]
        const next = ids[(k + 1) % ids.length]
        const { index } = stepAt(t, marks)

        select(index >= 3 ? next : current)
        const aim = index >= 1 ? next : current
        if (aim !== aimed) {
          aimed = aim
          cursor.to(chips.get(aim)!)
        }
        cursor.press(index === 2)
        cursor.show(true)
        return true
      },
    }
  }
