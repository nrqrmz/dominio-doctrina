import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ChevronLeft, ChevronRight, Check, Eye, EyeOff } from 'lucide-react'

import MaskedText from '@/components/masked-text'
import { Button } from '@/components/ui/button'
import { passages, type Passage } from '@/data/passages'
import { setLearned } from '@/lib/progress'
import { STEP_COUNT, STEP_LABELS } from '@/lib/skeleton'
import { cn } from '@/lib/utils'
import NotFoundPage from '@/pages/NotFoundPage'

// The bottom bar uses px sizes so it keeps fitting at any text size setting. The arrows
// are hidden on very narrow phones to leave the room to the labels.
const BAR_BUTTON =
  'h-[48px] min-w-0 flex-1 gap-[6px] px-[6px] text-[14px] sm:gap-[8px] sm:px-[16px] sm:text-[16px]'
const ICON = 'size-[16px]'
const ARROW_ICON = 'hidden size-[16px] min-[360px]:block'

// The practice card has two faces: the front shows the verse for the current step and
// the back shows the full verse. "Revisar" flips the card, like a flashcard.
const FACE =
  'col-start-1 row-start-1 flex min-h-48 flex-col gap-4 rounded-2xl border bg-card p-5 [backface-visibility:hidden] [-webkit-backface-visibility:hidden]'

const VERSE_CLASS = 'space-y-4 font-serif text-xl leading-9 md:text-2xl md:leading-10'

function VerseNumber({ n }: { n: number }) {
  return <sup className="mr-1.5 font-sans text-sm font-semibold text-gold">{n}</sup>
}

// The back of the card is plain text, so it can be selected and read by screen readers.
function FullVerses({ passage }: { passage: Passage }) {
  return (
    <div lang="es" className={VERSE_CLASS}>
      {passage.verses.map((verse) => (
        <p key={verse.n}>
          <VerseNumber n={verse.n} />
          {verse.text}
        </p>
      ))}
    </div>
  )
}

// The front is drawn letter by letter so the letters can dissolve between steps. Hidden
// letters are not in the page text, and screen readers get a plain description instead.
function MaskedVerses({ passage, step }: { passage: Passage; step: number }) {
  return (
    <div lang="es">
      <p className="sr-only">
        {step === 1
          ? passage.verses.map((verse) => `${verse.n} ${verse.text}`).join(' ')
          : 'Versículo con letras ocultas. Usa Revisar para ver el versículo completo.'}
      </p>
      <div aria-hidden className={VERSE_CLASS}>
        {passage.verses.map((verse) => (
          <p key={verse.n}>
            <VerseNumber n={verse.n} />
            <MaskedText text={verse.text} step={step} seed={`${passage.id}:${verse.n}`} />
          </p>
        ))}
      </div>
    </div>
  )
}

export default function PracticePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const passage = passages.find((p) => p.id === id)
  const [step, setStep] = useState(1)
  const [peek, setPeek] = useState(false)

  if (!passage) return <NotFoundPage />

  const goTo = (next: number) => {
    setStep(next)
    setPeek(false)
  }

  const isLast = step === STEP_COUNT

  const finish = () => {
    setLearned(passage.id, true)
    // Tells the menu which passage was just learned, so it can celebrate it quietly.
    navigate('/', { state: { learnedId: passage.id } })
  }

  return (
    <div className="pb-28">
      <Link
        to="/"
        className="mb-4 inline-flex min-h-10 items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Todos los pasajes
      </Link>

      <div className="space-y-2">
        <p key={step} className="animate-in fade-in text-sm font-medium text-muted-foreground duration-200">
          Paso {step} de {STEP_COUNT} · {STEP_LABELS[step - 1]}
        </p>
        <div className="flex gap-1.5">
          {STEP_LABELS.map((label, index) => (
            <button
              key={label}
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label={`Ir al paso ${index + 1}: ${label}`}
              aria-current={index + 1 === step}
              className="flex h-6 flex-1 items-center outline-none"
            >
              <span className="block h-1.5 w-full overflow-hidden rounded-full bg-muted">
                {/* The fill grows from the left when the step is reached. */}
                <span
                  className={cn(
                    'block h-full w-full origin-left rounded-full bg-primary transition-transform duration-500 ease-out',
                    index + 1 <= step ? 'scale-x-100' : 'scale-x-0',
                  )}
                />
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 [perspective:1200px]">
        <div
          className={cn(
            'grid transition-transform duration-500 ease-in-out [transform-style:preserve-3d]',
            peek && '[transform:rotateY(180deg)]',
          )}
        >
          <div aria-hidden={peek} inert={peek} className={FACE}>
            {/* Both layers share the same cell, so the card keeps its height while they cross-fade. */}
            <div className="grid flex-1">
              <div
                aria-hidden={isLast}
                className={cn(
                  'col-start-1 row-start-1 flex flex-col gap-4 transition-opacity duration-500',
                  isLast && 'opacity-0',
                )}
              >
                <h1 className="text-2xl font-bold tracking-tight text-primary md:text-3xl">
                  {passage.reference}
                </h1>
                {/* Step 5 keeps the step 4 text while the layer fades out. */}
                <MaskedVerses passage={passage} step={Math.min(step, 4)} />
              </div>
              <div
                aria-hidden={!isLast}
                className={cn(
                  'col-start-1 row-start-1 flex items-center justify-center text-center transition-opacity duration-500',
                  !isLast && 'opacity-0',
                )}
              >
                <h1 className="text-4xl font-bold tracking-tight text-primary md:text-5xl">
                  {passage.reference}
                </h1>
              </div>
            </div>
          </div>
          <div aria-hidden={!peek} inert={!peek} className={cn(FACE, '[transform:rotateY(180deg)]')}>
            <p className="text-2xl font-bold tracking-tight text-primary md:text-3xl">{passage.reference}</p>
            <FullVerses passage={passage} />
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-10 border-t bg-background">
        <div className="mx-auto flex max-w-2xl gap-[8px] px-[16px] pt-[12px] pb-[max(12px,env(safe-area-inset-bottom))]">
          <Button
            variant="outline"
            className={BAR_BUTTON}
            disabled={step === 1}
            onClick={() => goTo(step - 1)}
          >
            <ChevronLeft className={ARROW_ICON} /> Atrás
          </Button>
          {step > 1 && (
            <Button
              variant="secondary"
              className={BAR_BUTTON}
              onClick={() => setPeek((value) => !value)}
            >
              {peek ? <EyeOff className={ICON} /> : <Eye className={ICON} />} {peek ? 'Ocultar' : 'Revisar'}
            </Button>
          )}
          {isLast ? (
            <Button className={BAR_BUTTON} onClick={finish}>
              <Check className={ICON} /> Lo sé
            </Button>
          ) : (
            <Button className={BAR_BUTTON} onClick={() => goTo(step + 1)}>
              Siguiente <ChevronRight className={ARROW_ICON} />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
