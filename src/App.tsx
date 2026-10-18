import { Link, Outlet, Route, Routes } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'

import { passages } from '@/data/passages'
import { useLearned } from '@/lib/progress'
import HomePage from '@/pages/HomePage'
import NotFoundPage from '@/pages/NotFoundPage'
import PracticePage from '@/pages/PracticePage'

function Layout() {
  const learned = useLearned()

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex h-14 max-w-2xl items-center justify-between gap-3 px-4">
          <Link to="/" className="font-semibold">
            Dominio de la Doctrina
          </Link>
          <span
            className="flex shrink-0 items-center gap-1.5 text-sm font-medium text-muted-foreground"
            aria-label={`${learned.size} de ${passages.length} pasajes aprendidos`}
          >
            <CheckCircle2 className="size-4 text-green-600" aria-hidden />
            {learned.size}/{passages.length}
          </span>
        </div>
      </header>
      <main className="mx-auto max-w-2xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/practice/:id" element={<PracticePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
