/**
 * Mounts every capability demo of the page (see engine.ts).
 * Stages without a known `data-demo` stay still pictures.
 */
import { mountDemo, type DemoFactory } from './engine'
import { ai } from './ai'
import { contrast } from './contrast'
import { explore } from './explore'
import { fineTune } from './fine-tune'
import { image } from './image'
import { modes } from './modes'
import { publish } from './publish'
import { readability } from './readability'
import { ready } from './ready'
import { share } from './share'
import { handoff, presets, simulations, spaces } from './superpowers'
import { sync } from './sync'
import { tokens } from './tokens'
import { wheel } from './wheel'

const demos: Record<string, DemoFactory> = {
  // Generate it
  ready,
  ai,
  image,
  wheel,
  explore,
  // Master it
  contrast,
  modes,
  'fine-tune': fineTune,
  // Deploy it
  sync,
  tokens,
  publish,
  share,
  // More superpowers
  presets,
  simulations,
  handoff,
  spaces,
  readability,
}

for (const root of document.querySelectorAll<HTMLElement>('[data-demo]')) {
  const factory = demos[root.dataset.demo ?? '']
  if (factory) mountDemo(root, factory)
}
