import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ChevronLeft, ChevronRight, Check, Eye, EyeOff } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { passages } from '@/data/passages'
import { setLearned } from '@/lib/progress'
import { maskText, STEP_COUNT, STEP_LABELS } from '@/lib/skeleton'
import { cn } from '@/lib/utils'
import NotFoundPage from '@/pages/NotFoundPage'

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
        <p className="text-sm font-medium text-muted-foreground">
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
          'mt-6 font-bold tracking-tight',
          isLast && !peek ? 'py-16 text-center text-4xl md:text-5xl' : 'text-2xl md:text-3xl',
        )}
      >
        {passage.reference}
      </h1>

      {showVerses && (
        <div
          lang="es"
          className={cn(
            'mt-4 space-y-4 font-serif text-xl leading-9 md:text-2xl md:leading-10',
            maskStep > 1 && maskStep < 4 && 'tracking-wider',
          )}
        >
          {passage.verses.map((verse) => (
            <p key={verse.n}>
              <sup className="mr-1.5 font-sans text-sm font-semibold text-muted-foreground">
                {verse.n}
              </sup>
              {maskText(verse.text, maskStep, `${passage.id}:${verse.n}`)}
            </p>
          ))}
        </div>
      )}

      <div className="fixed inset-x-0 bottom-0 z-10 border-t bg-background">
        <div className="mx-auto flex max-w-2xl gap-2 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <Button
            variant="outline"
            className="h-12 min-w-0 flex-1 px-2 text-sm sm:px-4 sm:text-base"
            disabled={step === 1}
            onClick={() => goTo(step - 1)}
          >
            <ChevronLeft /> Atrás
          </Button>
          {step > 1 && (
            <Button
              variant="secondary"
              className="h-12 min-w-0 flex-1 px-2 text-sm sm:px-4 sm:text-base"
              onClick={() => setPeek((value) => !value)}
            >
              {peek ? <EyeOff /> : <Eye />} {peek ? 'Ocultar' : 'Revisar'}
            </Button>
          )}
          {isLast ? (
            <Button className="h-12 min-w-0 flex-1 px-2 text-sm sm:px-4 sm:text-base" onClick={finish}>
              <Check /> Lo sé
            </Button>
          ) : (
            <Button className="h-12 min-w-0 flex-1 px-2 text-sm sm:px-4 sm:text-base" onClick={() => goTo(step + 1)}>
              Siguiente <ChevronRight />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
