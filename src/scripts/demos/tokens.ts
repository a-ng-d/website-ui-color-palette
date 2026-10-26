/**
 * “Grab your tokens & config”: pick a format, the code follows; copy it.
 */
import { choiceChips } from './choices'
import { latch, stepAt, type DemoFactory } from './engine'
import { shadesOf } from './palette'

const shades = () =>
  shadesOf({ name: 'primary', hue: 264, chroma: 0.16 })
    .slice(0, 3)
    .map((hex, i) => ({ stop: `${(i + 1) * 100}`, hex }))

/** Code of each format (lines), from the same shades. */
export const tokenFormats = () => {
  const s = shades()
  return [
    {
      id: 'tailwind',
      label: 'Tailwind v4',
      lines: [
        '@theme {',
        ...s.map((x) => `  --color-primary-${x.stop}: ${x.hex};`),
        '}',
      ],
    },
    {
      id: 'dtcg',
      label: 'DTCG',
      lines: [
        '{ "primary": {',
        ...s.map((x) => `  "${x.stop}": { "$value": "${x.hex}" },`),
        '} }',
      ],
    },
    {
      id: 'style-dictionary',
      label: 'Style Dictionary',
      lines: [
        'color: { primary: {',
        ...s.map((x) => `  ${x.stop}: { value: '${x.hex}' },`),
        '} }',
      ],
    },
  ]
}

const FORMAT_IDS = ['tailwind', 'dtcg', 'style-dictionary']

// Per format: reach the chip, press (code switches), read, reach copy,
// press (copied), hold.
const MARKS = [0, 700, 850, 2200, 2900, 3050, 4400]

export const tokens: DemoFactory = ({ root, cursor }) => {
  const code = root.querySelector<HTMLElement>('[data-code]')!
  const copy = root.querySelector<HTMLElement>('[data-copy]')!
  const { chips, select } = choiceChips(root)

  const setFormat = latch<string>((id) => {
    code.dataset.active = id
    select(id)
  })
  const setCopied = latch<boolean>((on) =>
    copy.toggleAttribute('data-copied', on)
  )

  for (const [id, el] of chips)
    el.addEventListener('pointerdown', () => setFormat(id))
  copy.addEventListener('pointerdown', () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  })

  return {
    frame(t) {
      if (t === null) return
      const cycle = MARKS[MARKS.length - 1]
      const round = Math.floor(t / cycle)
      const next = FORMAT_IDS[(round + 1) % FORMAT_IDS.length]
      const current = FORMAT_IDS[round % FORMAT_IDS.length]
      const { index } = stepAt(t, MARKS)

      setFormat(index >= 2 ? next : current)
      setCopied(index === 5)
      cursor.show(true)
      cursor.to(index < 3 ? chips.get(next)! : copy)
      cursor.press(index === 1 || index === 4)
      return true
    },
  }
}
