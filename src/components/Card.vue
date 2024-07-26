<template>
  <div>
    <div class="w-full bg-[#1e2328] rounded-xl min-h-10 flex items-center justify-between cursor-pointer px-4 py-2">
      <span class="text-xl text-slate-300 pr-2 truncate">{{ title }}</span>

      <div class="inline-flex gap-2">
        <a @click="openDialog(id)"
          class="flex items-center text-gray-600 hover:text-gray-700 transition-opacity duration-300">
          <span class="material-symbols-outlined">edit</span>
        </a>

        <a @click="handleRemove()"
          class="flex items-center text-red-600 hover:text-red-800 transition-opacity duration-300">
          <span class="material-symbols-outlined">delete</span>
        </a>
      </div>
    </div>
  </div>

  <TaskDialog :visible="visible" :title="'Editar Tarefa'" :task="task" :status="status" @submit="edit"
    @cancel="visible = false" />
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useNuxtApp } from '#app';
import TaskDialog from './Task/TaskDialog.vue';
import validateTaskField from '../helpers/validateTaskField';

export default defineComponent({
  name: 'Card',
  components: {
    TaskDialog,
  },
  props: {
    title: String,
    onRemove: {
      type: Function,
      required: true,
    },
    onUpdate: {
      type: Function,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    toast: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const task = ref({
      id: '',
      title: '',
      description: '',
      status: '',
      created_at: '',
    });

    const status = ref([
      { name: 'pendente', code: 'NY' },
      { name: 'em progresso', code: 'RM' },
      { name: 'concluída', code: 'LDN' },
    ]);

    const visible = ref(false);

    const { $axios } = useNuxtApp();

    async function getById(id) {
      try {
        const csrfToken = await $axios.get('/sanctum/csrf-cookie');
        const response = await $axios.get(`/task/findById/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken.data.csrf_token,
          },
        });

        task.value = response.data;
        visible.value = true;
      } catch (error) {
        console.error('Error: ', error);
      }
    }

    async function edit() {
      const validationErrors = validateTaskField(task);

      if (validationErrors.length > 0) {
        validationErrors.forEach(error => {
          props.toast.add({ severity: 'error', detail: error, life: 3000 });
        });
        return;
      }

      try {
        const csrfToken = await $axios.get('/sanctum/csrf-cookie');
        const response = await $axios.patch(`/task/update/${task.value.id}`, task.value, {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken.data.csrf_token,
          },
        });

        props.onUpdate()
        props.toast.add({ severity: 'success', summary: 'Success Message', detail: response?.data?.message, life: 3000 });
        visible.value = false;
      } catch (error) {
        console.error('Error: ', error);
        props.toast.add({ severity: 'error', summary: 'Error Message', detail: 'Erro ao editar a tarefa', life: 3000 });
      }
    }

    async function openDialog(id) {
      await getById(id);
    }

    function handleRemove() {
      if (props.onRemove) {
        props.onRemove(props.id);
      }
    }

    return {
      visible,
      task,
      status,
      openDialog,
      edit,
      handleRemove,
    };
  },
});
</script>
