/**
 * Colour maths shared by the capability demos, at build time (Astro
 * frontmatter renders the first frame) and in the browser (the demos
 * recompute while they play). Real formulas, so the numbers the demos show
 * are the ones UI Color Palette would show.
 */

export type Rgb = [number, number, number] // sRGB, 0–1

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

const toLinear = (c: number) =>
  c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4

const fromLinear = (c: number) =>
  c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055

/** OKLCH (L 0–1, C ≈ 0–0.37, h in degrees) → sRGB, clipped to the gamut. */
export const oklch = (l: number, c: number, h: number): Rgb => {
  const hue = (h * Math.PI) / 180
  const a = c * Math.cos(hue)
  const b = c * Math.sin(hue)

  const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3

  return [
    4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
  ].map((channel) => clamp01(fromLinear(channel))) as Rgb
}

export const hex = (rgb: Rgb) =>
  `#${rgb
    .map((channel) =>
      Math.round(channel * 255)
        .toString(16)
        .padStart(2, '0')
    )
    .join('')}`

/** WCAG 2.1 contrast ratio (1–21). */
export const wcagRatio = (fg: Rgb, bg: Rgb) => {
  const luminance = ([r, g, b]: Rgb) =>
    0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)
  const [light, dark] = [luminance(fg), luminance(bg)].sort((x, y) => y - x)
  return (light + 0.05) / (dark + 0.05)
}

export type WcagGrade = 'AAA' | 'AA' | 'A' | 'Fail'

/** Grade for body text: AAA ≥ 7, AA ≥ 4.5, large text only (A) ≥ 3. */
export const wcagGrade = (ratio: number): WcagGrade =>
  ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : ratio >= 3 ? 'A' : 'Fail'

/** APCA lightness contrast (Lc), SAPC 0.0.98G-4g constants. */
export const apcaLc = (text: Rgb, background: Rgb) => {
  const y = ([r, g, b]: Rgb) =>
    0.2126729 * r ** 2.4 + 0.7151522 * g ** 2.4 + 0.072175 * b ** 2.4
  const soft = (value: number) =>
    value > 0.022 ? value : value + (0.022 - value) ** 1.414

  const txt = soft(y(text))
  const bg = soft(y(background))
  if (Math.abs(bg - txt) < 0.0005) return 0

  if (bg > txt) {
    const sapc = (bg ** 0.56 - txt ** 0.57) * 1.14
    return sapc < 0.1 ? 0 : (sapc - 0.027) * 100
  }
  const sapc = (bg ** 0.65 - txt ** 0.62) * 1.14
  return sapc > -0.1 ? 0 : (sapc + 0.027) * 100
}

/** Deuteranopia (Machado et al. 2009, severity 1), applied in linear RGB. */
export const deuteranopia = ([r, g, b]: Rgb): Rgb => {
  const [lr, lg, lb] = [r, g, b].map(toLinear)
  return [
    0.367322 * lr + 0.860646 * lg - 0.227968 * lb,
    0.280085 * lr + 0.672501 * lg + 0.047413 * lb,
    -0.01182 * lr + 0.04294 * lg + 0.968881 * lb,
  ].map((channel) => clamp01(fromLinear(clamp01(channel)))) as Rgb
}

/** Machado et al. 2009, severity 0.6 (anomalous trichromacy). */
const matrix =
  (m: number[]) =>
  ([r, g, b]: Rgb): Rgb => {
    const [lr, lg, lb] = [r, g, b].map(toLinear)
    return [0, 1, 2].map((row) =>
      clamp01(
        fromLinear(
          clamp01(m[row * 3] * lr + m[row * 3 + 1] * lg + m[row * 3 + 2] * lb)
        )
      )
    ) as Rgb
  }

/** Red-weak vision (protanomaly). */
export const protanomaly = matrix([
  0.38545, 0.769005, -0.154455, 0.100526, 0.829802, 0.069673, -0.007442,
  -0.02219, 1.029632,
])

/** Blue-weak vision (tritanomaly). */
export const tritanomaly = matrix([
  1.104996, -0.046633, -0.058363, -0.032137, 0.971635, 0.060503, 0.001336,
  0.317922, 0.680742,
])

/** Total colour blindness (achromatopsia): luminance only. */
export const achromatopsia = ([r, g, b]: Rgb): Rgb => {
  const y = fromLinear(
    0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)
  )
  return [y, y, y]
}

/** HSL (h in degrees, s and l 0–1) → sRGB. */
export const hsl = (h: number, s: number, l: number): Rgb => {
  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  return [0, 8, 4].map((n) =>
    clamp01(l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1)))
  ) as Rgb
}

/** CIE LCh(ab) (L 0–100, D65) → sRGB, clipped. */
export const lch = (l: number, c: number, h: number): Rgb => {
  const a = c * Math.cos((h * Math.PI) / 180)
  const b = c * Math.sin((h * Math.PI) / 180)
  const fy = (l + 16) / 116
  const fx = fy + a / 500
  const fz = fy - b / 200
  const inv = (t: number) =>
    t ** 3 > 0.008856 ? t ** 3 : (t - 16 / 116) / 7.787
  const [x, y, z] = [0.95047 * inv(fx), inv(fy), 1.08883 * inv(fz)]
  return [
    3.2404542 * x - 1.5371385 * y - 0.4985314 * z,
    -0.969266 * x + 1.8760108 * y + 0.041556 * z,
    0.0556434 * x - 0.2040259 * y + 1.0572252 * z,
  ].map((channel) => clamp01(fromLinear(channel))) as Rgb
}

/** Perceived lightness (OKLab L, 0–1) of an sRGB colour. */
export const perceivedLightness = ([r, g, b]: Rgb) => {
  const [lr, lg, lb] = [r, g, b].map(toLinear)
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb)
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb)
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb)
  return 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s
}

const SRGB_FROM_XYZ = [
  [3.240969941904521, -1.537383177570093, -0.498610760293],
  [-0.96924363628087, 1.87596750150772, 0.041555057407175],
  [0.055630079696993, -0.20397695888897, 1.056971514242878],
]
const KAPPA = 903.2962962
const EPSILON = 0.0088564516

/** HSLuv (h in degrees, s and l 0–100) → sRGB, via CIELUV (Boronine's reference). */
export const hsluv = (h: number, s: number, l: number): Rgb => {
  if (l > 99.9999999) return [1, 1, 1]
  if (l < 1e-8) return [0, 0, 0]

  // Saturation is a share of the most chroma sRGB allows at this hue and lightness.
  const sub1 = (l + 16) ** 3 / 1560896
  const sub2 = sub1 > EPSILON ? sub1 : l / KAPPA
  const hue = (h * Math.PI) / 180
  let maxChroma = Infinity
  for (const [m1, m2, m3] of SRGB_FROM_XYZ)
    for (const t of [0, 1]) {
      const top1 = (284517 * m1 - 94839 * m3) * sub2
      const top2 =
        (838422 * m3 + 769860 * m2 + 731718 * m1) * l * sub2 - 769860 * t * l
      const bottom = (632260 * m3 - 126452 * m2) * sub2 + 126452 * t
      const length =
        top2 / bottom / (Math.sin(hue) - (top1 / bottom) * Math.cos(hue))
      if (length >= 0) maxChroma = Math.min(maxChroma, length)
    }

  const c = (maxChroma / 100) * s
  const u = c * Math.cos(hue)
  const v = c * Math.sin(hue)
  const varU = u / (13 * l) + 0.19783000664283
  const varV = v / (13 * l) + 0.46831999493879
  const y = l <= 8 ? l / KAPPA : ((l + 16) / 116) ** 3
  const x = -(9 * y * varU) / ((varU - 4) * varV - varU * varV)
  const z = (9 * y - 15 * varV * y - varV * x) / (3 * varV)

  return SRGB_FROM_XYZ.map(([a, b, d]) =>
    clamp01(fromLinear(a * x + b * y + d * z))
  ) as Rgb
}

export type VisionType =
  | 'protanomaly'
  | 'protanopia'
  | 'deuteranomaly'
  | 'deuteranopia'
  | 'tritanomaly'
  | 'tritanopia'
  | 'achromatomaly'
  | 'achromatopsia'

const VISION_MATRICES: Record<VisionType, number[][]> = {
  protanomaly: [
    [0.817, 0.183, 0],
    [0.333, 0.667, 0],
    [0, 0.125, 0.875],
  ],
  protanopia: [
    [0.567, 0.433, 0],
    [0.558, 0.442, 0],
    [0, 0.242, 0.758],
  ],
  deuteranomaly: [
    [0.8, 0.2, 0],
    [0.258, 0.742, 0],
    [0, 0.142, 0.858],
  ],
  deuteranopia: [
    [0.625, 0.375, 0],
    [0.7, 0.3, 0],
    [0, 0.3, 0.7],
  ],
  tritanomaly: [
    [0.967, 0.033, 0],
    [0, 0.733, 0.267],
    [0, 0.183, 0.817],
  ],
  tritanopia: [
    [0.95, 0.05, 0],
    [0, 0.433, 0.567],
    [0, 0.475, 0.525],
  ],
  achromatomaly: [
    [0.618, 0.32, 0.062],
    [0.163, 0.775, 0.062],
    [0.163, 0.32, 0.516],
  ],
  achromatopsia: [
    [0.299, 0.587, 0.114],
    [0.299, 0.587, 0.114],
    [0.299, 0.587, 0.114],
  ],
}

export const simulateVision = ([r, g, b]: Rgb, type: VisionType): Rgb =>
  VISION_MATRICES[type].map(([x, y, z]) =>
    clamp01(x * r + y * g + z * b)
  ) as Rgb
