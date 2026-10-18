import { useState } from 'react'
import { Link } from 'react-router-dom'
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
import { clearLearned, getLearned } from '@/lib/progress'

export default function HomePage() {
  const [learned, setLearnedIds] = useState(getLearned)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const resetProgress = () => {
    clearLearned()
    setLearnedIds(new Set())
    setConfirmOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Antiguo Testamento</h1>
        <p className="text-muted-foreground">
          Elige un pasaje para practicar. {learned.size} de {passages.length} aprendidos.
        </p>
      </div>

      <ul className="grid gap-3 md:grid-cols-2">
        {passages.map((passage) => (
          <li key={passage.id}>
            <Link
              to={`/practice/${passage.id}`}
              className="flex min-h-16 items-center gap-3 rounded-xl border bg-card p-4 transition-colors outline-none hover:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{passage.reference}</p>
                <p lang="es" className="mt-0.5 text-sm text-muted-foreground">
                  {passage.keyPhrase}
                </p>
              </div>
              {learned.has(passage.id) && (
                <CheckCircle2 className="size-5 shrink-0 text-green-600" aria-label="Aprendido" />
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
