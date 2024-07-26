<template>
    <PrimeDialog
      class="bg-[#0a1400] text-white w-full p:!w-64 px-8 py-4 rounded-xl"
      v-model:visible="visible"
      modal
      :style="{ width: '40rem' }"
    >
      <span class="dark:text-surface-400 block mb-8">{{ title }}</span>
  
      <slot name="body">
        <div class="flex flex-col gap-4 mb-4">
          <label for="title" class="font-semibold w-24">Título</label>
          <PrimeInputText
            v-model="task.title"
            id="title"
            class="flex-auto rounded-xl px-4 py-2"
            autocomplete="off"
          />
        </div>
        <div class="flex flex-col gap-4 mb-8">
          <label for="description" class="font-semibold w-24">Descrição</label>
          <PrimeTextarea
            v-model="task.description"
            rows="5"
            cols="30"
            class="rounded-xl px-4 py-2"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for="status" class="font-semibold w-24">Status</label>
          <PrimeSelect
            overlayClass="rounded-b-lg cursor-pointer px-4 py-1 flex justify-center"
            v-model="task.status"
            :options="status"
            optionLabel="name"
            placeholder="Selecione o status"
            class="w-full md:w-56 p:!w-full flex justify-center items-center gap-2 rounded-md px-4 py-1 cursor-pointer"
          />
        </div>
      </slot>
  
      <div class="flex justify-end gap-2 mt-4">
        <PrimeButton
          class="bg-slate-700 hover:bg-slate-500 text-white w-32 h-7 rounded-xl"
          type="button"
          label="Cancelar"
          severity="secondary"
          @click="onCancel()"
        />
        <PrimeButton
          class="bg-slate-700 hover:bg-slate-500 text-white w-32 h-7 rounded-xl"
          type="button"
          label="Salvar"
          @click="onSubmit()"
        />
      </div>
    </PrimeDialog>
  </template>
  
  <script lang="ts">
  import { defineComponent, reactive, watch, computed } from 'vue';
  import PrimeDialog from 'primevue/dialog';
  import PrimeInputText from 'primevue/inputtext';
  import PrimeTextarea from 'primevue/textarea';
  import PrimeSelect from 'primevue/selectbutton';
  import PrimeButton from 'primevue/button';
  
  export default defineComponent({
    name: 'TaskDialog',
    components: {
      PrimeDialog,
      PrimeInputText,
      PrimeTextarea,
      PrimeSelect,
      PrimeButton,
    },
    props: {
      visible: {
        type: Boolean,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      task: {
        type: Object,
        required: true,
      },
      status: {
        type: Array,
        required: true,
      },
      onCancel: {
        type: Function,
        required: true,
      },
      onSubmit: {
        type: Function,
        required: true,
      },
    },
    data(props) {
      return {
        actuallyTask: props.task,
      }
    },
  });
  </script>
