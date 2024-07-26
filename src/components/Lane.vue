<template>
  <div class="bg-[#0a1400] w-96 p:w-80 pp:w-64 h-max max-h-[32rem] rounded-xl px-4 py-4 flex flex-col justify-between">
    <h2 class="text-xl text-white mb-4 px-2">{{ header }}</h2>

    <div class="h-full flex flex-col gap-y-3 overflow-y-scroll scroll-custom">
      <slot />
    </div>

    <a @click="visible()" class="text-base text-white hover:text-slate-300 mb-2 mt-4 flex items-center cursor-pointer">
      <span class="material-symbols-outlined pr-2">
        add
      </span>
      Adicionar um cartão
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "Lane",
  props: {
    header: String,
    visible: {
      type: Function,
      required: true,
    },
  },
});
</script>

<style>
.scroll-custom::-webkit-scrollbar {
  width: 6px;
}

.scroll-custom::-webkit-scrollbar-track {
  background: transparent;
}

.scroll-custom::-webkit-scrollbar-thumb {
  background: #3a3939;
  border-radius: 10px;
}

.scroll-custom::-webkit-scrollbar-thumb:hover {
  background: #3a3939;
}
</style>