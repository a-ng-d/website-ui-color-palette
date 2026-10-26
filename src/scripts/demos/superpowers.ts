/**
 * Models of the “More superpowers under the hood” demos. Each one is a
 * choice (preset, vision, colour space, platform) and its result, computed
 * at build time; the loop is the shared choiceLoop.
 */
import {
  achromatopsia,
  hex,
  hsl,
  lch,
  oklch,
  perceivedLightness,
  protanomaly,
  tritanomaly,
  type Rgb,
} from './color'
import { choiceLoop } from './choices'
import { shadesOf, steps, taper } from './palette'

// ---- Best-in-class presets: same colour, scaled like each system ----

const PRESET_HUE = 262
const PRESET_CHROMA = 0.15

export const PRESETS = [
  {
    id: 'material',
    label: 'Material 3',
    stops: [99, 95, 90, 80, 70, 60, 50, 40, 30, 20, 10].map((tone) => ({
      label: `${tone}`,
      l: tone / 100,
    })),
  },
  {
    id: 'tailwind',
    label: 'Tailwind',
    stops: [
      [50, 0.97],
      [100, 0.932],
      [200, 0.882],
      [300, 0.809],
      [400, 0.707],
      [500, 0.623],
      [600, 0.546],
      [700, 0.488],
      [800, 0.424],
      [900, 0.379],
      [950, 0.282],
    ].map(([label, l]) => ({ label: `${label}`, l })),
  },
  {
    id: 'ant',
    label: 'Ant Design',
    stops: [0.97, 0.92, 0.85, 0.76, 0.67, 0.58, 0.49, 0.4, 0.32, 0.25].map(
      (l, i) => ({ label: `${i + 1}`, l })
    ),
  },
] as const

/** 11 cells; each one knows its colour and label in every preset. */
export const presetCells = () =>
  Array.from({ length: 11 }, (_, i) =>
    Object.fromEntries(
      PRESETS.map((preset) => {
        const stop = preset.stops[i]
        return [
          preset.id,
          stop
            ? {
                label: stop.label,
                colour: hex(
                  oklch(stop.l, PRESET_CHROMA * taper(stop.l), PRESET_HUE)
                ),
              }
            : null,
        ]
      })
    )
  )

// ---- Simulations that empathize ----

export const VISIONS = [
  { id: 'normal', label: 'Normal', simulate: (rgb: Rgb) => rgb },
  { id: 'red-weak', label: 'Red-weak', simulate: protanomaly },
  { id: 'blue-weak', label: 'Blue-weak', simulate: tritanomaly },
  { id: 'mono', label: 'Mono', simulate: achromatopsia },
]

const VISION_SOURCES = [
  { name: 'Alert', hue: 27, chroma: 0.17 },
  { name: 'Success', hue: 148, chroma: 0.15 },
  { name: 'Primary', hue: 264, chroma: 0.16 },
]

export const visionRows = () => {
  const lightness = steps(7, 0.92, 0.36)
  return VISION_SOURCES.map((source) => ({
    name: source.name,
    cells: lightness.map((l) => {
      const rgb = oklch(l, source.chroma * taper(l), source.hue)
      return Object.fromEntries(
        VISIONS.map((vision) => [vision.id, hex(vision.simulate(rgb))])
      )
    }),
  }))
}

// ---- Colors in outer Spaces: 8 hues at the “same” lightness ----

export const SPACES = [
  { id: 'hsl', label: 'HSL', colour: (h: number) => hsl(h, 0.75, 0.55) },
  { id: 'lch', label: 'LCH', colour: (h: number) => lch(66, 48, h) },
  { id: 'oklch', label: 'OKLCH', colour: (h: number) => oklch(0.72, 0.13, h) },
]

const SPACE_HUES = [20, 65, 110, 155, 200, 245, 290, 335]

/** Each hue in every space, with its perceived lightness (0–100). */
export const spaceCells = () =>
  SPACE_HUES.map((hue) =>
    Object.fromEntries(
      SPACES.map((space) => {
        const rgb = space.colour(hue)
        return [
          space.id,
          { colour: hex(rgb), lightness: perceivedLightness(rgb) * 100 },
        ]
      })
    )
  )

// ---- Ultra Handoff: the same shades, in each platform's language ----

export const handoffFiles = () => {
  const [a, b] = shadesOf({ name: 'primary', hue: 264, chroma: 0.16 })
  const up = (h: string) => h.slice(1).toUpperCase()
  return [
    {
      id: 'swiftui',
      label: 'SwiftUI',
      file: 'Colors.swift',
      lines: [
        'extension Color {',
        `  static let primary100 = Color(hex: 0x${up(a)})`,
        `  static let primary200 = Color(hex: 0x${up(b)})`,
        '}',
      ],
    },
    {
      id: 'compose',
      label: 'Compose',
      file: 'Color.kt',
      lines: [
        'object AppColors {',
        `  val Primary100 = Color(0xFF${up(a)})`,
        `  val Primary200 = Color(0xFF${up(b)})`,
        '}',
      ],
    },
    {
      id: 'css',
      label: 'CSS',
      file: 'colors.css',
      lines: [
        ':root {',
        `  --primary-100: ${a};`,
        `  --primary-200: ${b};`,
        '}',
      ],
    },
  ]
}

export const presets = choiceLoop({ step: 3000 })
export const simulations = choiceLoop({ step: 2600 })
export const spaces = choiceLoop({ step: 3000 })
export const handoff = choiceLoop({ step: 2800 })
