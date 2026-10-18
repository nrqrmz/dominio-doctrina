import { useMemo, useSyncExternalStore } from 'react'

const KEY = 'dominio-learned-passages'

// Progress only lives in this browser. Storage can be blocked (private mode),
// so every access is wrapped and the app works without it (in memory only).
function read(): string {
  try {
    return localStorage.getItem(KEY) ?? '[]'
  } catch {
    return '[]'
  }
}

// Serialized list of learned ids. Kept as a string so React sees a stable snapshot.
let raw = read()
const listeners = new Set<() => void>()

const emit = () => listeners.forEach((listener) => listener())

function parse(value: string): Set<string> {
  try {
    return new Set(JSON.parse(value) as string[])
  } catch {
    return new Set()
  }
}

function write(ids: Set<string>) {
  raw = JSON.stringify([...ids])
  try {
    localStorage.setItem(KEY, raw)
  } catch {
    // Ignore: progress is a convenience, not required.
  }
  emit()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  // Keep several open tabs in sync.
  const onStorage = (event: StorageEvent) => {
    if (event.key === KEY || event.key === null) {
      raw = read()
      emit()
    }
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', onStorage)
  }
}

// Re-renders the component whenever the learned passages change.
export function useLearned(): Set<string> {
  const value = useSyncExternalStore(subscribe, () => raw)
  return useMemo(() => parse(value), [value])
}

export function setLearned(id: string, learned: boolean) {
  const ids = parse(raw)
  if (learned) ids.add(id)
  else ids.delete(id)
  write(ids)
}

export function clearLearned() {
  write(new Set())
}
