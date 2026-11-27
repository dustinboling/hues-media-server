import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Shell } from './components/Shell'
import { Entrance } from './pages/Entrance'
import { ParkLanding } from './pages/ParkLanding'
import { PieceView } from './pages/PieceView'
import { WingLanding } from './pages/WingLanding'
import { Museum404 } from './pages/Museum404'
import { hasPendingReturnState } from './lib/restore'

// Every navigation starts at the top — except a return to /park with saved
// gallery state, which ParkLanding restores exactly (Nadia §4.5).
function ScrollManager() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (pathname === '/park' && hasPendingReturnState('/park')) return
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export function MuseumRoutes() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route element={<Shell />}>
          <Route index element={<Entrance />} />
          <Route path="park" element={<ParkLanding />} />
          <Route path="park/:slug" element={<PieceView />} />
          <Route path="dahlias" element={<WingLanding slug="dahlias" />} />
          <Route path="art" element={<WingLanding slug="art" />} />
          <Route path="arcade" element={<WingLanding slug="arcade" />} />
          <Route path="music" element={<WingLanding slug="music" />} />
          <Route path="*" element={<Museum404 />} />
        </Route>
      </Routes>
    </>
  )
}
