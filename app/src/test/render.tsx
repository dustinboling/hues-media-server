import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { MuseumRoutes } from '../App'

export function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <MuseumRoutes />
    </MemoryRouter>,
  )
}
