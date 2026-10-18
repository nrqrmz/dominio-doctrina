import { useSyncExternalStore } from 'react'
import { flushSync } from 'react-dom'

const KEY = 'dominio-theme'

export type Theme = 'light' | 'dark'

const systemDark = window.matchMedia('(prefers-color-scheme: dark)')

// Storage can be blocked (private mode): then the choice only lasts for this visit.
function readStored(): Theme | null {
  try {
    const value = localStorage.getItem(KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

let stored = readStored()
let theme: Theme = stored ?? (systemDark.matches ? 'dark' : 'light')
const listeners = new Set<() => void>()

const apply = () => document.documentElement.classList.toggle('dark', theme === 'dark')
const emit = () => listeners.forEach((listener) => listener())

// index.html already applied the theme before the first paint; this keeps it in sync.
apply()

// Until the student picks a theme by hand, follow the phone's own light/dark setting.
systemDark.addEventListener('change', (event) => {
  if (stored !== null) return
  theme = event.matches ? 'dark' : 'light'
  apply()
  emit()
})

type Point = { x: number; y: number }

function change(next: Theme) {
  theme = next
  stored = next
  apply()
  try {
    localStorage.setItem(KEY, next)
  } catch {
    // Ignore: the theme still changes, it just is not remembered.
  }
  emit()
}

// The new theme is revealed as a circle growing from the toggle button. Every part of the
// screen is either fully the old theme or fully the new one, so it never turns to gray mush.
// Without support for view transitions, or with "reduce motion", the theme just switches.
function toggle(origin?: Point) {
  const next: Theme = theme === 'dark' ? 'light' : 'dark'
  const canAnimate =
    origin !== undefined &&
    'startViewTransition' in document &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!canAnimate) {
    change(next)
    return
  }

  const radius = Math.hypot(
    Math.max(origin.x, window.innerWidth - origin.x),
    Math.max(origin.y, window.innerHeight - origin.y),
  )
  // flushSync makes React update the button before the browser takes the "after" picture.
  const transition = document.startViewTransition(() => flushSync(() => change(next)))
  transition.ready
    .then(() =>
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${origin.x}px ${origin.y}px)`,
            `circle(${radius}px at ${origin.x}px ${origin.y}px)`,
          ],
        },
        { duration: 700, easing: 'ease-in-out', fill: 'forwards', pseudoElement: '::view-transition-new(root)' },
      ),
    )
    .catch(() => {})
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function useTheme() {
  return { theme: useSyncExternalStore(subscribe, () => theme), toggle }
}
