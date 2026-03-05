import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Relative base keeps assets working for both custom domain and project pages URLs.
export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
