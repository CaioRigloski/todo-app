<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    @click.self="cancelEdit"
  >
    <div class="bg-white shadow-md rounded-xl p-6 w-full max-w-lg relative">
      <!-- Close button -->
      <button
        class="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        @click="cancelEdit"
      >
        ✖
      </button>

      <h2 class="text-2xl font-semibold text-gray-800 mb-4">
        {{ isEditing ? '✏️ Editar Task' : '➕ Nova Task' }}
      </h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Título -->
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700 mb-1">
            Título
          </label>
          <input
            id="title"
            v-model="form.title"
            type="text"
            placeholder="Digite o título"
            required
            class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <!-- Descrição -->
        <div>
          <label
            for="description"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Descrição
          </label>
          <textarea
            id="description"
            v-model="form.description"
            placeholder="Digite a descrição"
            rows="3"
            class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
          ></textarea>
        </div>

        <!-- Botões -->
        <div class="flex items-center gap-3">
          <button
            type="submit"
            class="px-4 py-2 rounded-lg text-white font-medium shadow-md transition
                   bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
          >
            {{ isEditing ? '💾 Salvar Alterações' : '➕ Adicionar Task' }}
          </button>

          <button
            type="button"
            @click="cancelEdit"
            class="px-4 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 font-medium shadow-md transition focus:ring-2 focus:ring-gray-400"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useTasksStore } from '@/stores/tasks'

const props = defineProps({
  task: {
    type: Object,
    default: null
  },
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['saved', 'cancel'])

const store = useTasksStore()

const form = ref({
  title: '',
  description: ''
})

const isEditing = computed(() => !!props.task)

watch(
  () => props.task,
  (task) => {
    if (task) {
      form.value.title = task.title
      form.value.description = task.description
    } else {
      resetForm()
    }
  },
  { immediate: true }
)

function resetForm() {
  form.value = {
    title: '',
    description: ''
  }
}

async function handleSubmit() {
  if (isEditing.value) {
    await store.updateTask(props.task.id, form.value)
  } else {
    await store.addTask(form.value)
  }

  resetForm()
  emit('saved')
}

function cancelEdit() {
  resetForm()
  emit('cancel')
}
</script>
