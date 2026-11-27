import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Single-file build: all JS/CSS inline into dist/index.html, which the Worker
// serves from its bundle (see scripts/embed-shell.mjs). No separate assets,
// no manifest, no service worker — no PWA, deliberate (Dustin's ruling).
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: { outDir: 'dist', emptyOutDir: true },
  test: { environment: 'jsdom', setupFiles: ['./src/test/setup.ts'] },
})
