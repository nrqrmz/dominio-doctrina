const KEY = 'dominio-learned-passages'

// Progress only lives in this browser. Storage can be blocked (private mode),
// so every access is wrapped and the app works without it.
export function getLearned(): Set<string> {
  try {
    const raw = localStorage.getItem(KEY)
    return new Set(raw ? (JSON.parse(raw) as string[]) : [])
  } catch {
    return new Set()
  }
}

export function setLearned(id: string, learned: boolean) {
  try {
    const ids = getLearned()
    if (learned) ids.add(id)
    else ids.delete(id)
    localStorage.setItem(KEY, JSON.stringify([...ids]))
  } catch {
    // Ignore: progress is a convenience, not required.
  }
}
