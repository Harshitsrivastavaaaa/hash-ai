import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/hash-ai/",
  server: {
    watch: {
      usePolling: true,
    }
  }
})