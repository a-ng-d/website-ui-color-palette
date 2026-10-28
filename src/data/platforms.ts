import type { ImageMetadata } from 'astro'

import figmaLogo from '@/assets/platforms/figma.svg'
import penpotLogo from '@/assets/platforms/penpot.svg'
import sketchLogo from '@/assets/platforms/sketch.svg'
import framerLogo from '@/assets/platforms/framer.svg'
import claudeLogo from '@/assets/platforms/claude.svg'
import shardsA from '@/assets/decor/shards-a.svg'
import shardsB from '@/assets/decor/shards-b.svg'
import shardsC from '@/assets/decor/shards-c.svg'
import figmaMono from '@/assets/icons/figma-mono.svg'
import penpotMono from '@/assets/icons/penpot-mono.svg'
import sketchMono from '@/assets/icons/sketch-mono.svg'
import framerMono from '@/assets/icons/framer-mono.svg'
import claudeMono from '@/assets/icons/claude-mono.svg'

export interface Platform {
  id: 'figma' | 'penpot' | 'sketch' | 'framer' | 'claude'
  name: string
  href: string
  /** Playful call to action shown under the name on the home grid. */
  pun: string
  logo: ImageMetadata
  /** Brand tile colour behind the logo. */
  tile: string
  /** Tilt of the logo tile in degrees. */
  tilt: number
  shards: ImageMetadata
  /** Position of the decorative rays around the tile (CSS inset). */
  shardsInset: string
  /** Monochrome icon used in the “Add to …” list (inlined, follows currentColor). */
  icon: typeof figmaMono
  isNew?: boolean
}

export const platforms: Platform[] = [
  {
    id: 'figma',
    name: 'Figma',
    href: '/figma',
    pun: 'Figure it out',
    logo: figmaLogo,
    tile: '#ffffff',
    tilt: 2,
    shards: shardsC,
    shardsInset: '-47.25% -54.13% -40.22% -49.83%',
    icon: figmaMono,
  },
  {
    id: 'penpot',
    name: 'Penpot',
    href: '/penpot',
    pun: 'Sweeten the pot',
    logo: penpotLogo,
    tile: '#f4f8fb',
    tilt: -1,
    shards: shardsC,
    shardsInset: '-47.25% -54.13% -40.22% -49.83%',
    icon: penpotMono,
  },
  {
    id: 'sketch',
    name: 'Sketch',
    href: '/sketch',
    pun: 'Sketch it out',
    logo: sketchLogo,
    tile: '#fbf9fa',
    tilt: 2,
    shards: shardsA,
    shardsInset: '-64.48% -51.32% -48.24% -54.32%',
    icon: sketchMono,
  },
  {
    id: 'framer',
    name: 'Framer',
    href: '/framer',
    pun: 'Frame it up',
    logo: framerLogo,
    tile: '#0099ff',
    tilt: -2,
    shards: shardsB,
    shardsInset: '-45.41% -47.26% -43.85% -45.58%',
    icon: framerMono,
  },
  {
    id: 'claude',
    name: 'Claude',
    href: '/claude',
    pun: 'On Claude nine',
    logo: claudeLogo,
    tile: '#f4f3ee',
    tilt: -1,
    shards: shardsA,
    shardsInset: '-64.48% -51.32% -48.24% -54.32%',
    icon: claudeMono,
    isNew: true,
  },
]
