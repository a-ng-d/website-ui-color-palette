/**
 * Content of the Download page. One card per install route, in DOM order:
 * the tablet and mobile stacks follow it.
 */
import { links } from '@/config/site'
import figmaMono from '@/assets/icons/figma-mono.svg'
import penpotMono from '@/assets/icons/penpot-mono.svg'
import sketchMono from '@/assets/icons/sketch-mono.svg'
import framerMono from '@/assets/icons/framer-mono.svg'

export interface DownloadCard {
  id: string
  platform: string
  title: string
  text: string
  cta: { label: string; href: string }
  icon: typeof figmaMono
  /** Two columns wide on desktop. */
  wide?: boolean
  variant?: 'primary' | 'secondary'
}

export const downloadPage = {
  path: '/download',
  seo: {
    title: 'Download UI Color Palette — Every Platform',
    description:
      'Add UI Color Palette to Figma, Penpot, Sketch or Framer in one click and start building accessible, WCAG & APCA-ready color palettes.',
  },
  hero: {
    title: 'Download UI Color Palette for Figma, Penpot, Sketch and Framer',
    tagline:
      'Get UI Color Palette on your favorite platform and start building accessible color palettes.',
  },
}

export const downloads: DownloadCard[] = [
  {
    id: 'sketch',
    platform: 'Sketch',
    title: 'UI Color Palette /one on Sketch',
    text: 'Download and install the plugin in your local machine.',
    cta: { label: 'Download for Sketch', href: links.runSketchPlugin },
    icon: sketchMono,
    wide: true,
    variant: 'primary',
  },
  {
    id: 'penpot',
    platform: 'Penpot',
    title: 'UI Color Palette /one on Penpot',
    text: 'Copy and paste the manifest link to enable the plugin and open it.',
    cta: { label: 'Add to Penpot', href: links.runPenpotPlugin },
    icon: penpotMono,
  },
  {
    id: 'figma-one',
    platform: 'Figma',
    title: 'UI Color Palette /one on Figma',
    text: 'Subscriptions support only, tailored for individuals.',
    cta: { label: 'Add /one to Figma', href: links.runFigmaPlugin },
    icon: figmaMono,
  },
  {
    id: 'figma-team',
    platform: 'Figma',
    title: 'UI Color Palette /team on Figma',
    text: 'License keys support only, tailored for teams.',
    cta: { label: 'Add /team to Figma', href: links.runFigmaTeamPlugin },
    icon: figmaMono,
  },
  {
    id: 'framer',
    platform: 'Framer',
    title: 'UI Color Palette /one on Framer',
    text: "Click the 'Open plugin' button to run the plugin on the desired document.",
    cta: { label: 'Add to Framer', href: links.runFramerPlugin },
    icon: framerMono,
  },
]
