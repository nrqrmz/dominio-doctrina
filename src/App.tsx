import { Link, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'

import FontSizeControls from '@/components/font-size-controls'
import ThemeToggle from '@/components/theme-toggle'
import { passages } from '@/data/passages'
import { useLearned } from '@/lib/progress'
import HomePage from '@/pages/HomePage'
import NotFoundPage from '@/pages/NotFoundPage'
import PracticePage from '@/pages/PracticePage'

function Layout() {
  const learned = useLearned()
  const { pathname } = useLocation()

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b-2 border-gold/45 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        {/* px sizes on purpose: the bar must not grow with the font size setting. */}
        <div className="mx-auto flex h-[56px] max-w-2xl items-center justify-between gap-[8px] px-[16px]">
          <Link to="/" className="min-w-0 truncate text-[16px] font-semibold text-primary">
            <span className="min-[380px]:hidden">Dominio</span>
            <span className="hidden min-[380px]:inline">Dominio de la Doctrina</span>
          </Link>
          <div className="flex shrink-0 items-center gap-[4px]">
            <FontSizeControls />
            <ThemeToggle />
            <span
              className="flex items-center gap-[4px] text-[14px] font-medium text-muted-foreground"
              aria-label={`${learned.size} de ${passages.length} pasajes aprendidos`}
            >
              <CheckCircle2 className="hidden size-[16px] text-success sm:block" aria-hidden />
              {learned.size}/{passages.length}
            </span>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-2xl px-4 py-6">
        {/* The key restarts the fade-in on every page change (not on search or state changes). */}
        <div key={pathname} className="animate-in fade-in duration-200">
          <Outlet />
        </div>
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
