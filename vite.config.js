import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, '/src'),
      '@temp': resolve(__dirname, '/tests/unit/__mocks__/temp'),
    },
  },
  test: {
    globals: true,
    clearMocks: true,
    environment: 'jsdom',
    reporters: ['default'],
  },
})
