import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// Vitest exposes no globals by default, so Testing Library's auto-cleanup
// does not install itself — register it explicitly.
afterEach(() => {
  cleanup()
})

// jsdom does not implement scrolling; the app's scroll manager calls it on
// every navigation, so stub it once rather than spamming stderr.
window.scrollTo = vi.fn()
