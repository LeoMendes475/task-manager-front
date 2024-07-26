<template>
  <div class="flex lg:flex-col justify-center h-full gap-12 py-12">
    <Lane :header="'Pendente'" :visible="handleVisible">
      <Card v-for="task in filteredTask('pendente')" :key="task?.id" :id="task?.id" :title="task?.title"
        :onRemove="(id) => remove(id)" :onUpdate="getData" :toast="toast" />
    </Lane>

    <Lane 
      :header="'Em progresso'" 
      :visible="handleVisible" 
    >
      <Card v-for="task in filteredTask('em progresso')" :key="task?.id" :id="task?.id" :title="task?.title"
        :onRemove="(id) => remove(id)" :onUpdate="getData" :toast="toast" />
    </Lane>

    <Lane :header="'Concluida'" :visible="handleVisible">
      <Card v-for="task in filteredTask('concluída')" :key="task?.id" :id="task?.id" :title="task?.title"
        :onRemove="(id) => remove(id)" :onUpdate="getData" :toast="toast" />
    </Lane>

    <PrimeDialog class="bg-[#0a1400] text-white w-full px-8 py-4 rounded-xl p:!w-64" v-model:visible="visible" modal
      :style="{ width: '40rem' }">
      <span class="dark:text-surface-400 block mb-8">Crie sua tarefa</span>
      <div class="flex flex-col gap-4 mb-4">
        <label for="username" class="font-semibold w-24">Titulo</label>
        <PrimeInputText v-model="task.title" id="username" class="flex-auto rounded-xl px-4 py-2"
          autocomplete="off" />
      </div>
      <div class="flex flex-col gap-4 mb-8">
        <label for="email" class="font-semibold w-24">Descrição</label>
        <PrimeTextarea v-model="task.description" rows="5" cols="30" class="rounded-xl px-4 py-2" />
      </div>

      <div class="flex flex-col gap-2">
        <label for="email" class="font-semibold w-24">Status</label>
        <PrimeSelect overlayClass="rounded-b-lg cursor-pointer px-4 py-1 flex justify-center"
          v-model="task.status" :options="status" optionLabel="name" placeholder="Selecione o status"
          class="w-full md:w-56 p:!w-full flex justify-center items-center gap-2 rounded-md px-4 py-1 cursor-pointer" />
      </div>
      <div class="flex justify-end gap-2 mt-4">
        <PrimeButton class="bg-slate-700 hover:bg-slate-500 text-white w-32 h-7 rounded-xl" type="button"
          label="Cancelar" severity="secondary" @click="visible = false" />
        <PrimeButton class="bg-slate-700 hover:bg-slate-500 text-white w-32 h-7 rounded-xl" type="button" label="Criar"
          @click="submit()" />
      </div>
    </PrimeDialog>

    <PrimeToast styleClass="z-50" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#app';
import validateTaskField from '../helpers/validateTaskField.ts';

import { useToast } from "primevue/usetoast";
import Lane from '../components/Lane.vue';
import Card from '../components/Card.vue';

const { $axios } = useNuxtApp();

const visible = ref(false);
const toast = useToast();

const task = ref({
  title: "",
  description: "",
  status: "",
});

const taskList = ref([]);

const status = ref([
  { name: 'pendente', code: 'NY' },
  { name: 'em progresso', code: 'RM' },
  { name: 'concluída', code: 'LDN' },
]);

onMounted(() => {
  getData();
})

async function getData() {
  try {
    const response = await $axios.get('/task/findAll');
    taskList.value = response.data;
  } catch (error) {
    console.error("Error: ", error);
  }
}

async function submit() {
  const validationErrors = validateTaskField(task);

  if (validationErrors.length > 0) {
    validationErrors.forEach(error => {
      toast.add({ severity: 'error', detail: error, life: 3000 });
    });
    return;
  }
  
  try {
    const csrfToken = await $axios.get('/sanctum/csrf-cookie');

    const response = await $axios.post('/task/create', task.value, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken.data.csrf_token,
      },
      body: task.value,
    })

    toast.add({ severity: 'success', detail: response?.data?.message, life: 3000 });
    await getData();
    task.value = {
      title: "",
      description: "",
      status: "",
    };
    visible.value = false
  } catch (error) {
    toast.add({ severity: 'error', detail: 'Erro ao criar a tarefa', life: 3000 });
    console.error("Error: ", error)
    visible.value = false
  }
}

async function remove(id) {
  try {
    const csrfToken = await $axios.get('/sanctum/csrf-cookie')

    const response = await $axios.delete(`/task/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken.data.csrf_token,
      }
    })

    toast.add({ severity: 'success', detail: response?.data?.message, life: 3000 });
    await getData();
  } catch (error) {
    toast.add({ severity: 'error', detail: 'Erro ao deletar a tarefa', life: 3000 });
    console.error("Error: ", error);
  }
}

function handleVisible() {
  visible.value = true;
}

function filteredTask(statusFiltered) {
  const entries = Object.entries(taskList.value);
  const filteredEntries = entries.filter(([key, value]) => value.status === statusFiltered);

  return Object.fromEntries(filteredEntries);
}
</script>