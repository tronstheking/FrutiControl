import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'lemon.svg', 'robots.txt'],
      manifest: {
        name: 'FrutiControl VE - POS & Gestión Frutícola',
        short_name: 'FrutiControl',
        description: 'Sistema POS, Inventario y Gestión Frutícola con Conversión BCV en Tiempo Real',
        theme_color: '#059669',
        background_color: '#f4f7f4',
        display: 'standalone',
        orientation: 'any',
        start_url: './',
        icons: [
          {
            src: './lemon.svg',
            sizes: '192x192 512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,ico,png,svg}'],
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true
      }
    })
  ],
  build: {
    chunkSizeWarningLimit: 1500
  }
});
