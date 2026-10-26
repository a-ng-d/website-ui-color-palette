/**
 * Tiny runtime for the capability demos (no framework, no hydration).
 *
 * A demo is server-rendered HTML (real @unoff/ui components) in a
 * `[data-demo]` stage, `inert` and `aria-hidden` in the markup: without JS,
 * or with reduced motion, it is a still picture of its final state.
 *
 * With JS the engine:
 * - plays the demo's loop with rAF, only while the stage is on screen and the
 *   tab is visible, and never when the visitor asked for reduced motion;
 * - on a fine pointer, hands the controls to the visitor while the pointer is
 *   over the stage (the loop pauses, the demo's drag/click handlers act), then
 *   glides back into the loop when the pointer leaves.
 *
 * The stage stays `aria-hidden`: its meaning is in the card's title and text.
 */

export type Ease = (x: number) => number

export const easeInOut: Ease = (x) =>
  x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2

/** Keyframes as [time in ms, value]; the last time is the loop length. */
export type Keys = Array<[number, number]>

/** Value of looping keyframes at time t, eased between keys. */
export const keyframes = (keys: Keys, t: number, ease: Ease = easeInOut) => {
  const length = keys[keys.length - 1][0]
  const time = ((t % length) + length) % length
  for (let i = 1; i < keys.length; i++) {
    const [t1, v1] = keys[i]
    const [t0, v0] = keys[i - 1]
    if (time <= t1) return v0 + (v1 - v0) * ease((time - t0) / (t1 - t0 || 1))
  }
  return keys[keys.length - 1][1]
}

/** Frame-rate independent smoothing toward a target (tau in ms). */
export const approach = (
  current: number,
  target: number,
  dt: number,
  tau = 70
) => current + (target - current) * (1 - Math.exp(-dt / tau))

/** Position of an element's centre in % of an ancestor's box.
 *  Ratios are immune to CSS zoom and to the reveal `scale`. */
export const centreIn = (el: Element, ancestor: Element) => {
  const box = ancestor.getBoundingClientRect()
  const rect = el.getBoundingClientRect()
  return {
    x: ((rect.left + rect.width / 2 - box.left) / box.width) * 100,
    y: ((rect.top + rect.height / 2 - box.top) / box.height) * 100,
  }
}

/** Ratio (0–1) of the pointer along an element, for slider drags. */
export const ratioAlong = (event: PointerEvent, el: Element) => {
  const rect = el.getBoundingClientRect()
  return Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))
}

/** Index of the step a looping timeline is in: `marks` are step starts (ms),
 *  the last one is the loop length. */
export const stepAt = (t: number, marks: number[]) => {
  const time = t % marks[marks.length - 1]
  let index = 0
  while (index < marks.length - 2 && time >= marks[index + 1]) index++
  return { index, local: time - marks[index] }
}

/** The first `length × progress` characters of a text (typewriter). */
export const typed = (text: string, elapsed: number, perChar = 45) =>
  text.slice(
    0,
    Math.max(0, Math.min(text.length, Math.floor(elapsed / perChar)))
  )

/** Runs `apply` only when the value changes (discrete demo states). */
export const latch = <T>(apply: (value: T) => void) => {
  let current: T | typeof latch = latch
  return (value: T) => {
    if (value === current) return
    current = value
    apply(value)
  }
}

/** The fake cursor that performs the interaction during the loop. */
export class Cursor {
  private target: Element | null = null

  constructor(
    private el: HTMLElement,
    private panel: HTMLElement
  ) {}

  /** Glide (CSS transition) or follow (instant) to an element's centre. */
  to(target: Element, follow = false) {
    if (target !== this.target) this.press(false)
    this.target = target
    target.setAttribute('data-press-target', '')
    const { x, y } = centreIn(target, this.panel)
    this.el.toggleAttribute('data-follow', follow)
    this.el.style.left = `${x}%`
    this.el.style.top = `${y}%`
  }

  /** Press (the target sinks, a ring shows) or release. */
  press(down: boolean) {
    this.el.toggleAttribute('data-press', down)
    this.target?.toggleAttribute('data-pressed', down)
  }

  show(visible: boolean) {
    this.el.toggleAttribute('data-visible', visible)
  }
}

export interface DemoContext {
  root: HTMLElement
  panel: HTMLElement
  cursor: Cursor
  /** True while the visitor drives the demo. */
  live: () => boolean
  /** Ask for frames (e.g. after a drag) even when the loop is paused. */
  wake: () => void
}

export interface Demo {
  /**
   * One frame. `t` is the loop time (ms) when autoplaying, `null` while the
   * visitor drives. Return true while something still moves (smoothing), so
   * the engine keeps drawing after the visitor stops.
   */
  frame: (t: number | null, dt: number) => boolean | void
}

export type DemoFactory = (ctx: DemoContext) => Demo

const reducedMotion = () =>
  matchMedia('(prefers-reduced-motion: reduce)').matches
const finePointer = () =>
  matchMedia('(hover: hover) and (pointer: fine)').matches

export const mountDemo = (root: HTMLElement, factory: DemoFactory) => {
  const panel = root.querySelector<HTMLElement>('[data-demo-panel]')
  const cursorEl = root.querySelector<HTMLElement>('[data-demo-cursor]')
  if (!panel || !cursorEl) return

  let inView = false
  let live = false
  let settling = false
  let time = 0
  let last = 0
  let raf = 0

  const autoplay = () => !reducedMotion() && !live && inView && !document.hidden

  const tick = (now: number) => {
    raf = 0
    const dt = last ? Math.min(now - last, 64) : 16
    last = now
    const auto = autoplay()
    if (auto) time += dt
    const moving = demo.frame(auto ? time : null, dt)
    settling = Boolean(moving)
    if (auto || (inView && (live || settling)))
      raf = requestAnimationFrame(tick)
    else last = 0
  }

  const wake = () => {
    if (!raf) raf = requestAnimationFrame(tick)
  }

  const cursor = new Cursor(cursorEl, panel)
  const demo = factory({ root, panel, cursor, live: () => live, wake })

  // Interactive on a fine pointer: leave `inert`, keep everything out of the
  // tab order (the stage is aria-hidden, its controls are pointer-only).
  if (finePointer()) {
    const focusable = '[tabindex], a[href], button, input, textarea, select'
    for (const el of root.querySelectorAll(focusable))
      el.setAttribute('tabindex', '-1')
    for (const field of root.querySelectorAll<HTMLInputElement>(
      'input, textarea'
    ))
      field.readOnly = true
    root.inert = false
    root.addEventListener('pointerenter', () => {
      live = true
      cursor.show(false)
      wake()
    })
    root.addEventListener('pointerleave', () => {
      live = false
      wake()
    })
  }

  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting
    if (inView) wake()
  }).observe(root)

  document.addEventListener('visibilitychange', wake)
  // First frame: the demo lays out its cursor even under reduced motion.
  wake()
}
