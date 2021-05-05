module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '\\.text.vue$': 'jest-raw-loader'
  }
}
