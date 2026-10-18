import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CheckCircle2, ChevronRight, RotateCcw } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { passages } from '@/data/passages'
import { clearLearned, useLearned } from '@/lib/progress'
import { cn } from '@/lib/utils'

export default function HomePage() {
  const learned = useLearned()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  // Set by the practice page when a passage was just marked as learned.
  const [justLearnedId] = useState(() => (location.state as { learnedId?: string } | null)?.learnedId)
  const justLearnedRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!justLearnedId) return
    justLearnedRef.current?.scrollIntoView({ block: 'center' })
    // Drop the marker so the highlight does not replay when the page is reloaded.
    navigate(location.pathname, { replace: true, state: null })
    // Runs once, when the menu opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const resetProgress = () => {
    clearLearned()
    setConfirmOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-primary md:text-3xl">Antiguo Testamento</h1>
        <p className="text-muted-foreground">
          Elige un pasaje para practicar. {learned.size} de {passages.length} aprendidos.
        </p>
      </div>

      <ul className="grid gap-3 md:grid-cols-2">
        {passages.map((passage) => (
          <li key={passage.id}>
            <Link
              to={`/practice/${passage.id}`}
              ref={passage.id === justLearnedId ? justLearnedRef : undefined}
              className={cn(
                'flex min-h-16 items-center gap-3 rounded-xl border bg-card p-4 transition-colors outline-none hover:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring/50',
                passage.id === justLearnedId && 'animate-soft-highlight',
              )}
            >
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-primary">{passage.reference}</p>
                <p lang="es" className="mt-0.5 text-sm text-muted-foreground">
                  {passage.keyPhrase}
                </p>
              </div>
              {learned.has(passage.id) && (
                <CheckCircle2
                  className={cn(
                    'size-5 shrink-0 text-success',
                    passage.id === justLearnedId &&
                      'animate-in fade-in zoom-in-75 duration-500 fill-mode-backwards',
                  )}
                  style={passage.id === justLearnedId ? { animationDelay: '300ms' } : undefined}
                  aria-label="Aprendido"
                />
              )}
              <ChevronRight className="size-5 shrink-0 text-muted-foreground" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>

      {learned.size > 0 && (
        <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="h-12 w-full text-base">
              <RotateCcw /> Reiniciar aprendidos
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>¿Reiniciar tu progreso?</DialogTitle>
              <DialogDescription>
                Se quitarán las marcas de los {learned.size} pasajes aprendidos. Esto no se puede
                deshacer.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button variant="destructive" onClick={resetProgress}>
                Sí, reiniciar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
