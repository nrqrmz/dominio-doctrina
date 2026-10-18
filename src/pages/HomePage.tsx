import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, ChevronRight } from 'lucide-react'

import { passages } from '@/data/passages'
import { getLearned } from '@/lib/progress'

export default function HomePage() {
  const [learned] = useState(getLearned)

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
    </div>
  )
}
