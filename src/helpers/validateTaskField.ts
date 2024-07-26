export default function validateTaskField(task: any) {
    const errors = [];
    
    if (!task.value.title) errors.push('É necessário preencher o campo título');
    if (!task.value.description) errors.push('É necessário preencher o campo descrição');
    if (!task.value.status) errors.push('É necessário selecionar o status da tarefa');
    
    return errors;
  }