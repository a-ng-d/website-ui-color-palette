/**
 * Keep only the @unoff/ui theme and modes used by the website.
 *
 * @unoff/ui ships every platform theme (Figma, Penpot, Sketch, Framer) in each
 * component stylesheet, and every Yelbolt brand mode in yelbolt-modes.css.
 * Choosing imports cannot split those files, so rules that only target another
 * theme or mode are dropped at build time (~42 → ~22 KB gzip on the home page).
 *
 * To support another mode (e.g. dark mode switching), add it to KEEP_MODES.
 */
const KEEP_THEMES = ['yelbolt']
const KEEP_MODES = ['yelbolt-uicp-light', 'yelbolt-uicp-dark']

const THEME = /\[data-theme=["']?([\w-]+)["']?\]/g
const MODE = /\[data-mode=["']?([\w-]+)["']?\]/g // exact match only, not *= (commons)

const targetsOther = (selector) => {
  for (const [, theme] of selector.matchAll(THEME))
    if (!KEEP_THEMES.includes(theme)) return true
  for (const [, mode] of selector.matchAll(MODE))
    if (!KEEP_MODES.includes(mode)) return true
  return false
}

const unoffScope = () => ({
  postcssPlugin: 'unoff-scope',
  Rule(rule) {
    if (!/data-(theme|mode)=/.test(rule.selector)) return
    const kept = rule.selectors.filter((selector) => !targetsOther(selector))
    if (kept.length === 0) rule.remove()
    else if (kept.length !== rule.selectors.length) rule.selectors = kept
  },
})
unoffScope.postcss = true

export default {
  plugins: [unoffScope()],
}
