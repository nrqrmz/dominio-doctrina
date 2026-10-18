import { useState } from 'react'
import { Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useTheme } from '@/lib/theme'
import { cn } from '@/lib/utils'

// Fixed px size, like the font size controls: it must not grow with the text size.
export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'
  // The icon only animates after the student taps the button, not on every page load.
  const [touched, setTouched] = useState(false)
  const iconClass = cn('size-[18px]', touched && 'animate-in fade-in spin-in-45 duration-300')

  return (
    <Button
      variant="ghost"
      className="size-[36px] px-0"
      aria-label={isDark ? 'Activar modo día' : 'Activar modo noche'}
      onClick={() => {
        setTouched(true)
        toggle()
      }}
    >
      {isDark ? <Sun className={iconClass} /> : <Moon className={iconClass} />}
    </Button>
  )
}
