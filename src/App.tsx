import { Link, Outlet, Route, Routes } from 'react-router-dom'

import HomePage from '@/pages/HomePage'
import NotFoundPage from '@/pages/NotFoundPage'
import PracticePage from '@/pages/PracticePage'

function Layout() {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="mx-auto flex h-14 max-w-2xl items-center px-4">
          <Link to="/" className="font-semibold">
            Dominio de la Doctrina
          </Link>
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
