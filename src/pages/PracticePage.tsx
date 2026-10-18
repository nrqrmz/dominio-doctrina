import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ChevronLeft, ChevronRight, Check, Eye, EyeOff } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { passages } from '@/data/passages'
import { setLearned } from '@/lib/progress'
import { maskText, STEP_COUNT, STEP_LABELS } from '@/lib/skeleton'
import { cn } from '@/lib/utils'
import NotFoundPage from '@/pages/NotFoundPage'

// The bottom bar uses px sizes so it keeps fitting at any text size setting. The arrows
// are hidden on very narrow phones to leave the room to the labels.
const BAR_BUTTON =
  'h-[48px] min-w-0 flex-1 gap-[6px] px-[6px] text-[14px] sm:gap-[8px] sm:px-[16px] sm:text-[16px]'
const ICON = 'size-[16px]'
const ARROW_ICON = 'hidden size-[16px] min-[360px]:block'

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
  // The verse is hidden completely on the last step, unless the student peeks to check.
  const showVerses = step < STEP_COUNT || peek
  const maskStep = peek ? 1 : step

  const finish = () => {
    setLearned(passage.id, true)
    navigate('/')
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
              <span
                className={cn(
                  'h-1.5 w-full rounded-full transition-colors',
                  index + 1 <= step ? 'bg-primary' : 'bg-muted',
                )}
              />
            </button>
          ))}
        </div>
      </div>

      <h1
        className={cn(
          'mt-6 font-bold tracking-tight text-primary',
          isLast && !peek ? 'py-16 text-center text-4xl md:text-5xl' : 'text-2xl md:text-3xl',
        )}
      >
        {passage.reference}
      </h1>

      {showVerses && (
        <div
          // The key restarts the fade-in every time the visible text changes.
          key={maskStep}
          lang="es"
          className={cn(
            'animate-in fade-in duration-300 mt-4 space-y-4 font-serif text-xl leading-9 md:text-2xl md:leading-10',
            maskStep > 1 && maskStep < 4 && 'tracking-wider',
          )}
        >
          {passage.verses.map((verse) => (
            <p key={verse.n}>
              <sup className="mr-1.5 font-sans text-sm font-semibold text-gold">
                {verse.n}
              </sup>
              {maskText(verse.text, maskStep, `${passage.id}:${verse.n}`)}
            </p>
          ))}
        </div>
      )}

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
