<template>
  <div class="prism-container" :class="'language-' + language">
    <pre ref="code" :class="'language-' + language"></pre>
  </div>
</template>

<script>
import Prism from 'prismjs'

export default {
  name: 'VueExampleHighlight',
  props: {
    code: {
      type: String,
      default: '',
    },
    language: {
      type: String,
      default: 'markup',
    },
  },
  mounted: function () {
    const code = document.createElement('code')

    code.innerHTML = Prism.highlight(this.$props.code, Prism.languages[this.$props.language], this.$props.language)
    this.$refs.code.appendChild(code)
  },
}
</script>

<style lang="scss" scoped>
/**
* Tomorrow Night theme for Prism.js
* https://github.com/PrismJS/prism/blob/master/themes/prism-tomorrow.css
*/

.prism-container :deep(*) {
  code[class*='language-'],
  pre[class*='language-'] {
    color: #ccc;
    background: none;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    font-size: 1em;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;

    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;

    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  /* Code blocks */
  pre[class*='language-'] {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
  }

  :not(pre) > code[class*='language-'],
  pre[class*='language-'] {
    background: #2d2d2d;
  }

  /* Inline code */
  :not(pre) > code[class*='language-'] {
    padding: 0.1em;
    border-radius: 0.3em;
    white-space: normal;
  }

  .token.comment,
  .token.block-comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #999;
  }

  .token.punctuation {
    color: #ccc;
  }

  .token.tag,
  .token.attr-name,
  .token.namespace,
  .token.deleted {
    color: #e2777a;
  }

  .token.function-name {
    color: #6196cc;
  }

  .token.boolean,
  .token.number,
  .token.function {
    color: #f08d49;
  }

  .token.property,
  .token.class-name,
  .token.constant,
  .token.symbol {
    color: #f8c555;
  }

  .token.selector,
  .token.important,
  .token.atrule,
  .token.keyword,
  .token.builtin {
    color: #cc99cd;
  }

  .token.string,
  .token.char,
  .token.attr-value,
  .token.regex,
  .token.variable {
    color: #7ec699;
  }

  .token.operator,
  .token.entity,
  .token.url {
    color: #67cdcc;
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }
  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }

  .token.inserted {
    color: green;
  }
}

// Fix for the code block margin
.prism-container {
  margin-top: 0;
  margin-bottom: 0;
}

.prism-container :deep(pre) {
  margin-top: 0;
  margin-bottom: 0;
}

// Fix the code block color
.prism-container :deep(pre > code) {
  color: #fff;
}
</style>

<style lang="scss">
/* Fix code block font color globally */
.theme-default-content [data-highlighter='prismjs'] pre code {
  color: #fff;
}
</style>
