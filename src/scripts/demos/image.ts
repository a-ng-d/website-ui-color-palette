/**
 * “Image extraction”: drop an image, it is scanned, and its main colours
 * land in the palette. The picture is drawn with the very colours that
 * come out of it, so the extraction is honest.
 */
import { latch, stepAt, type DemoFactory } from './engine'

/** Extracted colours, and where each one is sampled on the picture (%). */
export const EXTRACTED = [
  { name: 'Wine Dregs', hex: '#653342', x: 22, y: 18 },
  { name: 'Tapestry', hex: '#B0607E', x: 72, y: 34 },
  { name: 'Japonica', hex: '#E0785F', x: 30, y: 56 },
  { name: 'Peach', hex: '#FFD3A1', x: 62, y: 60 },
  { name: 'Jaguar', hex: '#1F0A18', x: 46, y: 86 },
]

export const IMAGE_NAME = 'lonesome_cowboy.png'

// Carry the file in, drop, scan, colours, hold, fade out.
const MARKS = [0, 500, 1500, 1700, 2500, 7400, 8000]

export const image: DemoFactory = ({ root, cursor }) => {
  const zone = root.querySelector<HTMLElement>('[data-zone]')!
  const file = root.querySelector<HTMLElement>('[data-file]')!

  const setState = latch<string>((state) => (zone.dataset.state = state))

  return {
    frame(t) {
      if (t === null) return
      const { index } = stepAt(t, MARKS)
      setState(
        ['empty', 'carry', 'dropped', 'scan', 'done', 'done', 'empty'][index]
      )
      cursor.show(index >= 1 && index <= 2)
      cursor.to(file, index === 1 || index === 2)
      cursor.press(index === 1)
      return true
    },
  }
}
