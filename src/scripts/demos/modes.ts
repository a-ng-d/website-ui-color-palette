/**
 * “Light, Dark, and beyond”: switch the color mode and watch the whole
 * palette follow — a dark mode, then a color-blind (deuteranopia) simulation.
 *
 * The colours of every mode are computed at build time and written as CSS
 * custom properties on each cell; switching mode is one attribute, the
 * cascade and a staggered transition do the rest.
 */
import { deuteranopia, hex, oklch } from './color'
import { choiceLoop } from './choices'

export const MODES = [
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
  { id: 'deuteranopia', label: 'Color-blind' },
] as const

export type ModeId = (typeof MODES)[number]['id']

const SOURCES = [
  { name: 'Primary', hue: 264, chroma: 0.16 },
  { name: 'Success', hue: 148, chroma: 0.15 },
  { name: 'Alert', hue: 27, chroma: 0.17 },
]

const LIGHT = [0.94, 0.84, 0.72, 0.6, 0.48, 0.36]
const DARK = [0.24, 0.33, 0.45, 0.58, 0.71, 0.84]

const taper = (l: number) => 1 - Math.abs(2 * l - 1) ** 2

const colours = (hue: number, chroma: number) => {
  const light = LIGHT.map((l) => oklch(l, chroma * taper(l), hue))
  const dark = DARK.map((l) => oklch(l, chroma * 0.85 * taper(l), hue))
  return light.map((rgb, i) => ({
    light: hex(rgb),
    dark: hex(dark[i]),
    deuteranopia: hex(deuteranopia(rgb)),
  }))
}

/** Rows of cells, each cell carrying its colour in every mode. */
export const modeRows = () =>
  SOURCES.map((source) => ({
    name: source.name,
    cells: colours(source.hue, source.chroma),
  }))

/** Canvas behind the palette (surface and ink) for each mode. */
export const modeCanvas = () => {
  const surfaceLight = hex(oklch(0.985, 0.004, 264))
  const surfaceDark = hex(oklch(0.17, 0.01, 264))
  return {
    light: { surface: surfaceLight, ink: surfaceDark },
    dark: { surface: surfaceDark, ink: surfaceLight },
    deuteranopia: { surface: surfaceLight, ink: surfaceDark },
  }
}

/** Pick a mode, the palette follows (the shared choice loop). */
export const modes = choiceLoop({ step: 2800 })
