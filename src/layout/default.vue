<template>
    <div>
      <nuxt />
    </div>
  </template>
  
  <script>
  export default {
    head() {
      return {
        meta: [
          { name: 'csrf-token', content: this.$store.state.csrfToken }
        ]
      }
    },
    async asyncData({ store }) {
      await store.dispatch('getCsrfToken')
    }
  }
  </script>