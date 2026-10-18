import { useSyncExternalStore } from 'react'

const KEY = 'dominio-font-size'

// Root font size as a share of the browser default (100 = 16px). Everything sized
// in rem follows it. The top bar and the bottom buttons use px on purpose, so they
// keep fitting on narrow phones at any size.
export const FONT_SIZES = [100, 115, 130, 150, 175]
const DEFAULT_INDEX = 0

// The percentage is stored (not the position), so changing the list of sizes never
// turns a saved choice into a different size. Unknown or blocked storage (private
// mode) falls back to the default size.
function read(): number {
  try {
    const index = FONT_SIZES.indexOf(Number(localStorage.getItem(KEY)))
    return index === -1 ? DEFAULT_INDEX : index
  } catch {
    return DEFAULT_INDEX
  }
}

let index = read()
const listeners = new Set<() => void>()

function apply() {
  document.documentElement.style.fontSize = `${FONT_SIZES[index]}%`
}

// Applied when the module loads, before the first render, so there is no flash.
apply()

function change(next: number) {
  index = Math.min(Math.max(next, 0), FONT_SIZES.length - 1)
  apply()
  try {
    localStorage.setItem(KEY, String(FONT_SIZES[index]))
  } catch {
    // Ignore: the size still changes, it just is not remembered.
  }
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function useFontSize() {
  const current = useSyncExternalStore(subscribe, () => index)
  return {
    canDecrease: current > 0,
    canIncrease: current < FONT_SIZES.length - 1,
    decrease: () => change(index - 1),
    increase: () => change(index + 1),
  }
}
