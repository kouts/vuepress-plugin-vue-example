import { config } from '@kouts/eslint-config'
import vitest from '@vitest/eslint-plugin'

export default [
  ...config({
    ts: false,
    vue: true,
  }),
  {
    // Ignores has to be its own object - https://github.com/eslint/eslint/issues/17400
    name: 'project-ignores',
    ignores: ['.husky', '.history', 'coverage'],
  },
  {
    name: 'project-overrides',
    // Disable multi-word-component-names for docs examples
    files: ['docs/.vuepress/**/*.vue', 'docs/.vuepress/**/*.js'],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
  {
    name: 'project-vitest',
    files: ['tests/**'],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
      'vitest/max-nested-describe': ['error', { max: 3 }],
    },
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
      },
    },
  },
]
