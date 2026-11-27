// Exact Back restoration (Nadia §4.5): returning from a piece view restores
// the originating gallery's scroll position and focuses the card that was
// opened. The card saves its state on the way out; the gallery consumes it
// on the way back (browser Back and the Back link land in the same place).
export interface ReturnState {
  scrollY: number
  slug: string
}

const keyFor = (wingPath: string): string => `museum:return:${wingPath}`

export function saveReturnState(wingPath: string, state: ReturnState): void {
  try {
    sessionStorage.setItem(keyFor(wingPath), JSON.stringify(state))
  } catch {
    // Private mode or no storage: navigation still works, restoration skips.
  }
}

export function consumeReturnState(wingPath: string): ReturnState | null {
  try {
    const raw = sessionStorage.getItem(keyFor(wingPath))
    sessionStorage.removeItem(keyFor(wingPath))
    if (!raw) return null
    const parsed = JSON.parse(raw) as ReturnState
    if (typeof parsed.scrollY !== 'number' || typeof parsed.slug !== 'string') return null
    return parsed
  } catch {
    return null
  }
}

export function hasPendingReturnState(wingPath: string): boolean {
  try {
    return sessionStorage.getItem(keyFor(wingPath)) !== null
  } catch {
    return false
  }
}

export function restoreReturnState(wingPath: string): void {
  const state = consumeReturnState(wingPath)
  if (!state) return
  window.scrollTo(0, state.scrollY)
  document.querySelector<HTMLElement>(`[data-exhibit-slug="${state.slug}"]`)?.focus({ preventScroll: true })
}
