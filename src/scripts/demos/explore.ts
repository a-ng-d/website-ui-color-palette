/**
 * “Explore & import”: community palettes scroll by; one click on + and the
 * palette is imported.
 */
import { latch, stepAt, type DemoFactory } from './engine'

/** Classic community palettes (COLOURlovers). */
export const COMMUNITY = [
  {
    name: 'Giant Goldfish',
    author: 'manekineko',
    views: '504K',
    colours: ['#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900'],
  },
  {
    name: 'Thought Provoking',
    author: 'mk2',
    views: '312K',
    colours: ['#ECD078', '#D95B43', '#C02942', '#542437', '#53777A'],
  },
  {
    name: '(◕ ” ◕)',
    author: 'sugar!',
    views: '498K',
    colours: ['#FE4365', '#FC9D9A', '#F9CDAD', '#C8C8A9', '#83AF9B'],
  },
  {
    name: 'cheer up emo kid',
    author: 'electrikmonk',
    views: '421K',
    colours: ['#556270', '#4ECDC4', '#C7F464', '#FF6B6B', '#C44D58'],
  },
]

// Per palette: reach +, press, imported, scroll to the next one.
const MARKS = [0, 900, 1050, 1900, 2600]

export const explore: DemoFactory = ({ root, cursor }) => {
  const list = root.querySelector<HTMLElement>('[data-list]')!
  const rows = [...root.querySelectorAll<HTMLElement>('[data-row]')]
  const count = COMMUNITY.length

  const imported = (i: number, on: boolean) => {
    for (const row of rows)
      if (Number(row.dataset.row) % count === i)
        row.toggleAttribute('data-imported', on)
  }

  const scrollTo = latch<number>((k) => {
    // Past the last palette, the duplicated list lets us jump back unseen.
    list.toggleAttribute('data-jump', k === 0)
    list.style.setProperty('--k', `${k}`)
    if (k === 0) rows.forEach((_, i) => i < count && imported(i, false))
  })

  // Visitor: + toggles the import of its palette.
  for (const row of rows)
    row
      .querySelector('[data-import]')
      ?.addEventListener('pointerdown', () =>
        imported(
          Number(row.dataset.row) % count,
          !row.hasAttribute('data-imported')
        )
      )

  return {
    frame(t) {
      if (t === null) return
      const cycle = MARKS[MARKS.length - 1]
      const k = Math.floor(t / cycle) % count
      const { index } = stepAt(t, MARKS)

      scrollTo(index === 3 ? k + 1 : k)
      if (index >= 2) imported(k, true)

      cursor.show(index < 3)
      cursor.to(rows[k].querySelector('[data-import]')!, false)
      cursor.press(index === 1)
      return true
    },
  }
}
