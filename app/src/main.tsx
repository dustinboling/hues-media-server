import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MuseumRoutes } from './App'
import './styles/tokens.css'
import './styles/base.css'
import './styles/museum.css'

const root = document.getElementById('root')
if (!root) throw new Error('museum: #root element missing from the shell document')

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <MuseumRoutes />
    </BrowserRouter>
  </StrictMode>,
)
