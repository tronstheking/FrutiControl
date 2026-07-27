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
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react';
            }
            if (id.includes('firebase')) {
              return 'vendor-firebase';
            }
            if (id.includes('recharts')) {
              return 'vendor-charts';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            if (id.includes('zustand')) {
              return 'vendor-store';
            }
            return 'vendor-libs';
          }
        }
      }
    }
  }
});
