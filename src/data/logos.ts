import figma from '@/assets/platforms/figma.svg'
import penpot from '@/assets/platforms/penpot.svg'
import sketch from '@/assets/platforms/sketch.svg'
import framer from '@/assets/platforms/framer.svg'
import claude from '@/assets/platforms/claude.svg'
import shardsA from '@/assets/decor/shards-a.svg'
import shardsB from '@/assets/decor/shards-b.svg'
import shardsC from '@/assets/decor/shards-c.svg'

/** Brand logos with the colour of their tile (allowed exception: brand colours). */
export const logos = {
  figma: { name: 'Figma', src: figma, tile: '#ffffff' },
  penpot: { name: 'Penpot', src: penpot, tile: '#f4f8fb' },
  sketch: { name: 'Sketch', src: sketch, tile: '#fbf9fa' },
  framer: { name: 'Framer', src: framer, tile: '#0099ff' },
  claude: { name: 'Claude', src: claude, tile: '#f4f3ee' },
} satisfies Record<
  string,
  { name: string; src: ImageMetadata; tile: string }
>

export type LogoId = keyof typeof logos

/** Each SVG has its own aspect ratio: the inset (top right bottom left, % of the
    tile) must match it, or the mask stretches the rays. */
export const shards = [
  { src: shardsA, inset: '-64.48% -51.32% -48.24% -54.32%' },
  { src: shardsB, inset: '-45.41% -47.26% -43.85% -45.58%' },
  { src: shardsC, inset: '-47.25% -54.13% -40.22% -49.83%' },
]
