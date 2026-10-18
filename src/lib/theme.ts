import { useSyncExternalStore } from 'react'

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

let fadeTimer: ReturnType<typeof setTimeout> | undefined

// While this class is on, index.css blends the colors instead of switching them at once.
function fadeColors() {
  const root = document.documentElement
  root.classList.add('theme-fade')
  clearTimeout(fadeTimer)
  fadeTimer = setTimeout(() => root.classList.remove('theme-fade'), 400)
}

function toggle() {
  theme = theme === 'dark' ? 'light' : 'dark'
  stored = theme
  fadeColors()
  apply()
  try {
    localStorage.setItem(KEY, theme)
  } catch {
    // Ignore: the theme still changes, it just is not remembered.
  }
  emit()
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
