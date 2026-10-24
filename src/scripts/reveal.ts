export {}

/**
 * Reveal-on-scroll for the motion defined in styles/motion.css.
 *
 * - `data-revealed` is set once, when an element first enters the viewport.
 *   Elements entering together get a phase-shifted `--reveal-delay` and
 *   `--reveal-wipe-delay`, so they unveil with a rhythm, not all at once.
 * - `data-inview` follows visibility, so ambient loops pause off screen.
 */
const REVEAL = [
  '.card',
  '.surface-card',
  '.shade-grid__area',
  '.platforms__intro',
  '.posts__intro',
  '.extra__intro',
  '.faq__intro',
].join(',')

const LOOPS = '.shade-grid, .card'

/** Extra delay (ms) and spinner time (ms) per position in a batch. */
const JITTER = [0, 110, 40, 170, 70, 140, 20, 190, 90]
const SPINNER = [640, 900, 760, 1020, 700, 860, 980, 680, 820]

const root = document.documentElement

declare global {
  interface Window {
    __revealReady?: boolean
  }
}
window.__revealReady = true

const revealAll = (elements: Iterable<Element>) => {
  for (const el of elements) el.setAttribute('data-revealed', '')
}

if (root.classList.contains('motion')) {
  const revealables = [...document.querySelectorAll<HTMLElement>(REVEAL)]
  const grids = [...document.querySelectorAll<HTMLElement>('.shade-grid')]

  if (!('IntersectionObserver' in window)) {
    revealAll([...revealables, ...grids])
  } else {
    const reveal = new IntersectionObserver(
      (entries) => {
        const entering = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top ||
              a.boundingClientRect.left - b.boundingClientRect.left
          )
        entering.forEach((entry, index) => {
          const el = entry.target as HTMLElement
          // Phase shift: an irregular but repeatable rhythm within one view.
          const step = Math.min(index, 8)
          el.style.setProperty(
            '--reveal-delay',
            `${step * 150 + JITTER[step % JITTER.length]}ms`
          )
          el.style.setProperty(
            '--reveal-wipe-delay',
            `${SPINNER[step % SPINNER.length]}ms`
          )
          el.setAttribute('data-revealed', '')
          reveal.unobserve(el)
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
    )
    for (const el of [...revealables, ...grids]) reveal.observe(el)

    const inView = new IntersectionObserver((entries) => {
      for (const entry of entries)
        entry.target.toggleAttribute('data-inview', entry.isIntersecting)
    })
    for (const el of document.querySelectorAll(LOOPS)) inView.observe(el)
  }
}
