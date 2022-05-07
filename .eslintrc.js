module.exports = {
  extends: ['eslint-config-kouts/vue3'],
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
