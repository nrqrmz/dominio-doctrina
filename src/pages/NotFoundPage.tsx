import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
  return (
    <div className="space-y-4 py-16 text-center">
      <h1 className="text-3xl font-bold">Página no encontrada</h1>
      <p className="text-muted-foreground">Esta dirección no corresponde a ninguna página de la aplicación.</p>
      <Button asChild>
        <Link to="/">Ir al inicio</Link>
      </Button>
    </div>
  )
}
