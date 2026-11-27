import { useEffect } from 'react'

export const MUSEUM_NAME = 'The Media Museum'

export function useDocumentTitle(title: string): void {
  useEffect(() => {
    const previous = document.title
    document.title = title === MUSEUM_NAME ? MUSEUM_NAME : `${title} · ${MUSEUM_NAME}`
    return () => {
      document.title = previous
    }
  }, [title])
}
