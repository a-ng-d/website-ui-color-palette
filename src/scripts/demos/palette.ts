/**
 * Palette helpers shared by the demos: a source colour (hue + chroma)
 * becomes a scale of shades, as UI Color Palette builds them in OKLCH.
 */
import { hex, oklch } from './color'

export interface Source {
  name: string
  hue: number
  chroma: number
}

/** Chroma tapers towards white and black, so shades stay in gamut. */
export const taper = (l: number) => 1 - Math.abs(2 * l - 1) ** 2

/** Lightness of each step, light → dark. */
export const steps = (count = 6, light = 0.94, dark = 0.34) =>
  Array.from(
    { length: count },
    (_, i) => light - ((light - dark) * i) / (count - 1)
  )

export const shadesOf = (source: Source, lightness = steps()) =>
  lightness.map((l) => hex(oklch(l, source.chroma * taper(l), source.hue)))

/** One readable colour of a source (mid lightness). */
export const swatchOf = (source: Source, l = 0.68) =>
  hex(oklch(l, source.chroma * taper(l), source.hue))

/** CSS linear gradient (left → right) from sampled stops. */
export const gradientOf = (stops: Array<{ offset: number; color: string }>) =>
  `linear-gradient(90deg, ${stops
    .map(({ offset, color }) => `${color} ${Math.round(offset * 100)}%`)
    .join(', ')})`
