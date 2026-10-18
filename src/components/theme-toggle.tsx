import { Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useTheme } from '@/lib/theme'

// Fixed px size, like the font size controls: it must not grow with the text size.
export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <Button
      variant="ghost"
      className="size-[36px] px-0"
      aria-label={isDark ? 'Activar modo día' : 'Activar modo noche'}
      onClick={toggle}
    >
      {isDark ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
    </Button>
  )
}
