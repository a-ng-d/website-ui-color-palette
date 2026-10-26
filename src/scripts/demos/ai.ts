/**
 * “AI generation”: pick a mood, the prompt writes itself, Generate, and
 * five named source colours come back.
 */
import { choiceChips } from './choices'
import { latch, stepAt, typed, type DemoFactory } from './engine'

export const PROMPTS = [
  {
    mood: 'Cyberpunk',
    prompt: 'Cyberpunk interface with neon accents',
    colours: [
      { name: 'Primary', hex: '#00F0FF' },
      { name: 'Alert', hex: '#FF0040' },
      { name: 'Success', hex: '#00FF40' },
      { name: 'Warning', hex: '#FFB000' },
      { name: 'Text', hex: '#E0E0E0' },
    ],
  },
  {
    mood: 'Nature',
    prompt: 'Calm forest app, earthy and soft',
    colours: [
      { name: 'Primary', hex: '#3F7D58' },
      { name: 'Neutral', hex: '#EFE9D9' },
      { name: 'Success', hex: '#6FA36B' },
      { name: 'Warning', hex: '#D9A441' },
      { name: 'Alert', hex: '#B5523B' },
    ],
  },
]

export const MOODS = ['Cyberpunk', 'Pastel', 'Nature']

// Per prompt: clear, reach the mood, press, type, reach Generate, press,
// think, results (held), end.
const MARKS = [0, 400, 1100, 1250, 2900, 3600, 3750, 4500, 7600]

export const ai: DemoFactory = ({ root, cursor }) => {
  const input = root.querySelector<HTMLElement>('[data-prompt]')!
  const generate = root.querySelector<HTMLElement>('[data-generate]')!
  const results = root.querySelector<HTMLElement>('[data-results]')!
  const { chips: moods, select: setMood } = choiceChips(root)

  const setText = latch<string>((text) => (input.textContent = text))
  const setTyping = latch<boolean>((on) =>
    on ? (input.dataset.state = 'focus') : delete input.dataset.state
  )
  const setState = latch<string>((state) => (results.dataset.state = state))
  const setPrompt = latch<number>((i) => (results.dataset.prompt = `${i}`))

  const run = (i: number) => {
    setPrompt(i)
    setMood(PROMPTS[i].mood)
    setText(PROMPTS[i].prompt)
    setState('ready')
  }

  // Visitor: a mood with a prompt generates it.
  PROMPTS.forEach((p, i) =>
    moods.get(p.mood)?.addEventListener('pointerdown', () => run(i))
  )

  return {
    frame(t) {
      if (t === null) return
      const cycle = MARKS[MARKS.length - 1]
      const i = Math.floor(t / cycle) % PROMPTS.length
      const { prompt, mood } = PROMPTS[i]
      const { index, local } = stepAt(t, MARKS)

      setPrompt(i)
      setMood(index >= 3 ? mood : '')
      setText(index < 3 ? '' : index === 3 ? typed(prompt, local, 38) : prompt)
      setTyping(index === 3)
      setState(index < 6 ? 'empty' : index === 6 ? 'thinking' : 'ready')

      cursor.show(true)
      cursor.to(index < 4 ? moods.get(mood)! : generate)
      cursor.press(index === 2 || index === 5)
      return true
    },
  }
}
