<template>
  <!-- This is a test comment inside the template part -->
  <p class="demo">
    <button class="btn-primary" @click.prevent="handleClick"><slot></slot>(clicked - {{ count }})</button>
  </p>
</template>

<script>
export default {
  name: 'TestComponent',
  // This is a test comment inside the script part
  data() {
    return {
      count: 0,
    }
  },
  methods: {
    handleClick() {
      this.count++
      console.log('clicked', this.count)
    },
  },
}
</script>

<style scoped>
/* This is a test comment inside the style part */
.btn-primary {
  display: inline-block;
  font-size: 1.2rem;
  color: #fff;
  background-color: #3eaf7c;
  padding: 0.8rem 1.6rem;
  border-radius: 4px;
  transition: background-color 0.1s ease;
  box-sizing: border-box;
  border-bottom: 1px solid #389d70;
}
</style>
