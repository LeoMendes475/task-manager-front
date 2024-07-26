<template>
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <div id="app" class="flex justify-center min-h-full">
    <Home />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Home from './src/pages/Home.vue';

export default defineComponent({
  name: "App",
  components: {
    Home,
  }
});
</script>

<style scoped>
#app {
  background: linear-gradient(155deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 55%, rgba(0,26,255,1) 100%);
  height: 100vh;
}
</style>