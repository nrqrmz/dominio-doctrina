import { Fragment } from 'react'

import { maskWords, type MaskedChar } from '@/lib/skeleton'
import { cn } from '@/lib/utils'

// A letter that can be hidden. Its character lives in a data attribute and is drawn by CSS,
// so hidden letters are not in the page text (they cannot be selected or copied).
// Shown: the letter. Blank: the letter fades out and a short line fades in.
// Gone: the line fades out and the space closes.
function Letter({ char, state }: { char: string; state: MaskedChar['state'] }) {
  return (
    <span
      data-char={char}
      className={cn(
        'relative inline-block max-w-[1.1em] overflow-x-clip leading-none transition-[max-width,color] duration-500 ease-in-out',
        "before:content-[attr(data-char)] after:absolute after:inset-x-[0.06em] after:bottom-[0.08em] after:h-[0.07em] after:rounded-full after:bg-foreground after:opacity-0 after:transition-opacity after:duration-500 after:content-['']",
        state === 'blank' && 'text-transparent after:opacity-100',
        state === 'gone' && 'max-w-0 text-transparent',
      )}
    />
  )
}

export default function MaskedText({ text, step, seed }: { text: string; step: number; seed: string }) {
  return (
    <>
      {maskWords(text, step, seed).map((word, wordIndex) => (
        <Fragment key={wordIndex}>
          {wordIndex > 0 && ' '}
          {/* nowrap keeps a word together: lines only break between words */}
          <span className="whitespace-nowrap">
            {word.map((c, index) =>
              c.fixed ? c.char : <Letter key={index} char={c.char} state={c.state} />,
            )}
          </span>
        </Fragment>
      ))}
    </>
  )
}
