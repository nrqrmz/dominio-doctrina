export const STEP_COUNT = 5

export const STEP_LABELS = [
  'Lee el versículo completo',
  'Algunas letras ocultas',
  'Casi todas las letras ocultas',
  'Solo las primeras letras',
  'Solo la referencia',
] as const

// Share of each word's letters (after the first one) that is hidden at steps 1-4.
// Step 5 hides the whole verse, so the page handles it without calling maskText.
const HIDDEN_SHARE = [0, 0.4, 0.8, 1]

// FNV-1a hash mapped to [0, 1). Deterministic, so the same letter is always
// picked for the same verse: a letter hidden at one step stays hidden in the
// next ones, and the text does not change when the screen re-renders.
function hash(seed: string): number {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return (h >>> 0) / 2 ** 32
}

const isLetter = (ch: string) => /\p{L}/u.test(ch)

export type MaskedChar = {
  char: string
  // First letters and punctuation never change, so they are plain text.
  fixed: boolean
  // "blank" is drawn as a short line (steps 2-3); "gone" is removed (step 4).
  state: 'shown' | 'blank' | 'gone'
}

// Describes every character of the text for the given step. Every word keeps its first
// letter and its punctuation. A letter hidden at one step stays hidden in the next ones.
export function maskWords(text: string, step: number, seed: string): MaskedChar[][] {
  const share = HIDDEN_SHARE[step - 1] ?? 1

  return text.split(' ').map((word, wordIndex) => {
    let letterIndex = -1
    return Array.from(word).map((char): MaskedChar => {
      if (!isLetter(char)) return { char, fixed: true, state: 'shown' }
      letterIndex++
      if (letterIndex === 0) return { char, fixed: true, state: 'shown' }
      const hidden = share === 1 || hash(`${seed}:${wordIndex}:${letterIndex}`) < share
      if (!hidden) return { char, fixed: false, state: 'shown' }
      return { char, fixed: false, state: step >= 4 ? 'gone' : 'blank' }
    })
  })
}
