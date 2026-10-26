/**
 * “Share with the community”: search the shared palettes, the list narrows,
 * add the one you need to your local palettes.
 */
import { latch, stepAt, typed, type DemoFactory } from './engine'

export const SHARED = [
  {
    id: 'spectrum',
    name: 'Adobe Spectrum 6.0',
    meta: '1 source · 11 shades · 2 modes',
    hue: 250,
  },
  {
    id: 'fluent',
    name: 'Microsoft Fluent 2',
    meta: '5 sources · 75 shades',
    hue: 235,
  },
  {
    id: 'material',
    name: 'Google Material 3',
    meta: '6 sources · 78 shades',
    hue: 300,
  },
]

const QUERIES = [
  { query: 'Fluent', id: 'fluent' },
  { query: 'Spectrum', id: 'spectrum' },
]

// Type, the list narrows, reach Add, press (added), hold, clear.
const MARKS = [0, 300, 1300, 2100, 2250, 4300, 4800]

export const share: DemoFactory = ({ root, cursor }) => {
  const input = root.querySelector<HTMLElement>('[data-search]')!
  const list = root.querySelector<HTMLElement>('[data-shared]')!
  const rows = new Map(
    [...root.querySelectorAll<HTMLElement>('[data-item]')].map((el) => [
      el.dataset.item!,
      el,
    ])
  )

  const setText = latch<string>((text) => {
    input.textContent = text
    if (text) input.dataset.state = 'focus'
    else delete input.dataset.state
    const query = text.trim().toLowerCase()
    for (const item of SHARED)
      rows
        .get(item.id)!
        .toggleAttribute(
          'data-hidden',
          query.length > 0 && !item.name.toLowerCase().includes(query)
        )
  })
  const setAdded = latch<string>((id) => {
    list.dataset.added = id
  })

  for (const [id, row] of rows)
    row
      .querySelector('[data-add]')
      ?.addEventListener('pointerdown', () => setAdded(id))

  return {
    frame(t) {
      if (t === null) return
      const cycle = MARKS[MARKS.length - 1]
      const { query, id } = QUERIES[Math.floor(t / cycle) % QUERIES.length]
      const { index, local } = stepAt(t, MARKS)

      setText(
        index === 0 || index === 6
          ? ''
          : index === 1
            ? typed(query, local, 90)
            : query
      )
      setAdded(index >= 4 && index < 6 ? id : '')
      cursor.show(index >= 2 && index <= 4)
      cursor.to(rows.get(id)!.querySelector('[data-add]')!)
      cursor.press(index === 3)
      return true
    },
  }
}
