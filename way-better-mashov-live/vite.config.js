import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/mashov/',      // <--- add this
  optimizeDeps: {
    exclude: ['mashovscraper', 'playwright-core', 'chromium-bidi']
  }
})

