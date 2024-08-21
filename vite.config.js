import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { glob } from 'glob'
import { resolve } from 'path'
import { defineConfig } from 'vite'

const createEntries = () => {
  const entries = new Map()
  const excludeFiles = []

  for (const file of glob.sync('src/**/*.{js,vue}')) {
    const fileName = file.split('/').at(-1)?.split('.')[0]

    if (excludeFiles.some((excludeFile) => file.endsWith(excludeFile))) {
      continue
    }

    if (!fileName) {
      continue
    }

    entries.set(`${fileName}`, fileURLToPath(new URL(file, import.meta.url)))
  }

  entries.set('index', fileURLToPath(new URL('src/index.js', import.meta.url)))

  const res = Object.fromEntries(entries)

  return res
}

export default defineConfig(({ mode }) => {
  const isTest = mode === 'test' || !!process.env.VITEST

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve(__dirname, '/src'),
        ...(isTest ? { '@temp': resolve(__dirname, '/tests/unit/__mocks__/temp') } : {}),
      },
    },
    test: {
      globals: true,
      clearMocks: true,
      environment: 'jsdom',
      reporters: ['default'],
    },
    build: {
      minify: false,
      copyPublicDir: false,
      emptyOutDir: true,
      lib: {
        entry: createEntries(),
        name: 'VuepressPluginVueExample',
        formats: ['es'],
      },
      rollupOptions: {
        external: [
          /^node:/,
          'fs/promises',
          'vue',
          'vuepress/client',
          'vuepress/utils',
          'vuepress/shared',
          /^@temp/,
          '@vuepress/plugin-register-components',
        ],
        output: {
          assetFileNames: 'assets/[name][extname]',
          entryFileNames: '[name].js',
        },
      },
    },
  }
})
