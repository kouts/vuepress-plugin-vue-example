<template>
  <div ref="formattedCode" :class="['shiki-container', `shiki-${language}`]"></div>
</template>

<script>
import { codeToHtml } from 'shiki'

export default {
  name: 'VueExampleHighlight',
  props: {
    code: {
      type: String,
      default: '',
    },
    language: {
      type: String,
      default: 'vue-html',
    },
  },
  mounted: async function () {
    const res = await codeToHtml(this.$props.code, {
      lang: this.$props.language,
      theme: 'github-dark-default',
    })

    const codeEl = document.createElement('div')

    codeEl.innerHTML = res

    this.$refs.formattedCode.appendChild(codeEl)
  },
}
</script>

<style lang="scss" scoped>
.shiki-container :deep(pre) {
  padding: 0;
  margin: 0;
  overflow: auto;
  line-height: 1.4;
  padding: 1.25rem 1.5rem;
  border-radius: 6px;
  font-size: 14px;
}

.shiki-container :deep(pre > code) {
  background-color: transparent;
}
</style>
