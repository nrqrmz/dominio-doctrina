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

// Every word keeps its first letter and its punctuation. Hidden letters become "_",
// except at step 4, where they are removed and only the first letters remain.
export function maskText(text: string, step: number, seed: string): string {
  const share = HIDDEN_SHARE[step - 1] ?? 1
  if (share === 0) return text

  return text
    .split(' ')
    .map((word, wordIndex) => {
      let letterIndex = -1
      let masked = ''
      for (const ch of Array.from(word)) {
        if (!isLetter(ch)) {
          masked += ch
          continue
        }
        letterIndex++
        if (letterIndex === 0) {
          masked += ch
        } else if (share < 1) {
          masked += hash(`${seed}:${wordIndex}:${letterIndex}`) < share ? '_' : ch
        }
      }
      return masked
    })
    .join(' ')
}
