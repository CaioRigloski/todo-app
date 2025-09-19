<template>
  <div class="space-y-4">
    <div
      v-for="task in tasks"
      :key="task.id"
      :class="[
        'bg-white shadow-md rounded-xl p-4 flex justify-between items-start transition',
        task.status === 'concluída' ? 'opacity-70' : ''
      ]"
    >
      <div>
        <h3
          :class="[
            'text-lg font-semibold text-gray-800',
            task.status === 'concluída' ? 'line-through text-gray-500' : ''
          ]"
        >
          {{ task.title }}
        </h3>
        <p
          :class="[
            'text-gray-600 text-sm',
            task.status === 'concluída' ? 'line-through text-gray-400' : ''
          ]"
        >
          {{ task.description }}
        </p>
        <span
          :class="[
            'mt-2 inline-block px-2 py-1 text-xs rounded-full font-medium',
            task.status === 'concluída' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
          ]"
        >
          {{ task.status }}
        </span>
      </div>

      <div class="flex flex-col gap-2">
        <button
          @click="$emit('edit-task', task)"
          class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
        >
          ✏️ Editar
        </button>

        <button
          @click="$emit('toggle-status', task.id)"
          :class="[
            'px-3 py-1 rounded text-sm',
            task.status === 'concluída'
              ? 'bg-gray-400 text-white hover:bg-gray-500'
              : 'bg-green-600 text-white hover:bg-green-700'
          ]"
        >
          {{ task.status === 'concluída' ? '↩️ Marcar Pendente' : '✅ Concluir' }}
        </button>

        <button
          @click="$emit('delete-task', task.id)"
          class="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
        >
          🗑️ Excluir
        </button>
      </div>
    </div>

    <p v-if="tasks.length === 0" class="text-gray-500 text-center mt-4">
      Nenhuma task encontrada.
    </p>
  </div>
</template>

<script setup>
defineProps({
  tasks: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['edit-task', 'delete-task', 'toggle-status'])
</script>