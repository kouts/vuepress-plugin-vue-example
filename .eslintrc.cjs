module.exports = {
  extends: ['@kouts/eslint-config/vue3'],
  overrides: [
    {
      // Disable multi-word-component-names for docs examples
      files: ['docs/.vuepress/**/*.vue', 'docs/.vuepress/**/*.js'],
      rules: {
        'vue/multi-word-component-names': 'off'
      }
    }
  ]
}
