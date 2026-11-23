import figmaMono from '@/assets/icons/figma-mono.svg'
import penpotMono from '@/assets/icons/penpot-mono.svg'
import sketchMono from '@/assets/icons/sketch-mono.svg'
import framerMono from '@/assets/icons/framer-mono.svg'
import claudeMono from '@/assets/icons/claude-mono.svg'

export interface Platform {
  id: 'figma' | 'penpot' | 'sketch' | 'framer' | 'claude'
  name: string
  href: string
  pun: string
  tilt: number
  /** Index in `shards` of `@/data/logos`: the shape the design gives this platform. */
  shard: number
  icon: typeof figmaMono
  isNew?: boolean
}

export const platforms: Platform[] = [
  {
    id: 'figma',
    name: 'Figma',
    href: '/figma',
    pun: 'Figure it out',
    tilt: 2,
    shard: 2,
    icon: figmaMono,
  },
  {
    id: 'penpot',
    name: 'Penpot',
    href: '/penpot',
    pun: 'Sweeten the pot',
    tilt: -1,
    shard: 2,
    icon: penpotMono,
  },
  {
    id: 'sketch',
    name: 'Sketch',
    href: '/sketch',
    pun: 'Sketch it out',
    tilt: 2,
    shard: 0,
    icon: sketchMono,
  },
  {
    id: 'framer',
    name: 'Framer',
    href: '/framer',
    pun: 'Frame it up',
    tilt: -2,
    shard: 1,
    icon: framerMono,
  },
  {
    id: 'claude',
    name: 'Claude',
    href: '/claude',
    pun: 'On Claude nine',
    tilt: -1,
    shard: 0,
    icon: claudeMono,
    isNew: true,
  },
]
