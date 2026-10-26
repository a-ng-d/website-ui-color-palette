/**
 * “Publish & reuse anywhere”: publish once, then every design tool pulls
 * the same palette.
 */
import { latch, stepAt, type DemoFactory } from './engine'

// Reach Publish, press, uploading, published, tools pull one by one, hold,
// back to local.
const MARKS = [0, 800, 950, 1700, 2000, 5800, 6400]

export const publish: DemoFactory = ({ root, cursor }) => {
  const button = root.querySelector<HTMLElement>('[data-publish]')!
  const card = root.querySelector<HTMLElement>('[data-palette]')!
  const tools = root.querySelector<HTMLElement>('[data-tools]')!

  const setState = latch<string>((state) => (card.dataset.state = state))
  const setPulled = latch<boolean>((on) =>
    tools.toggleAttribute('data-pulled', on)
  )

  button.addEventListener('pointerdown', () => {
    setState('published')
    setPulled(true)
  })

  return {
    frame(t) {
      if (t === null) return
      const { index } = stepAt(t, MARKS)
      setState(
        index < 2 || index === 5
          ? 'local'
          : index === 2
            ? 'uploading'
            : 'published'
      )
      setPulled(index === 4)
      cursor.show(index <= 2)
      cursor.to(button)
      cursor.press(index === 1)
      return true
    },
  }
}
