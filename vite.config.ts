import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import vuetify from 'vite-plugin-vuetify'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves the site from /random-password/, so asset URLs need that prefix.
  // The deploy workflow sets BASE_PATH; locally it stays '/'.
  base: process.env.BASE_PATH ?? '/',
  plugins: [vue(), vuetify({ autoImport: true }), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
