import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  base: '/gym/',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      pwaAssets: {
        image: 'public/pwa-icon.svg',
        preset: 'minimal-2023',
        includeHtmlHeadLinks: true,
        overrideManifestIcons: true,
        injectThemeColor: true,
      },
      manifest: {
        id: '/gym/',
        name: 'GymBack',
        short_name: 'GymBack',
        description: 'Ejercicios de espalda',
        start_url: '/gym/',
        scope: '/gym/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#171717',
        theme_color: '#171717',
        lang: 'es',
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,webmanifest,json}'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 1234,
    strictPort: true,
    host: true,
  },
})
