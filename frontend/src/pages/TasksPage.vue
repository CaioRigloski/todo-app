<template>
  <div class="max-w-3xl mx-auto p-6">
    <button
      @click="openForm()"
      class="mb-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
    >
      ➕ Nova Task
    </button>

    <TaskForm
      :visible="showModal"
      :task="selectedTask"
      @saved="handleSaved"
      @cancel="handleCancel"
    />

    <TaskList
      :tasks="tasksStore.tasks"
      @edit-task="editTask"
      @delete-task="deleteTask"
      @toggle-status="toggleStatus"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTasksStore } from '@/stores/tasks'
import TaskForm from '@/components/TaskForm.vue'
import TaskList from '@/components/TaskList.vue'

const tasksStore = useTasksStore()
const showModal = ref(false)
const selectedTask = ref(null)

onMounted(() => {
  tasksStore.fetchTasks()
})

function openForm() {
  selectedTask.value = null
  showModal.value = true
}

function editTask(task) {
  selectedTask.value = task
  showModal.value = true
}

function deleteTask(id) {
  tasksStore.deleteTask(id)
}

function toggleStatus(id) {
  const task = tasksStore.tasks.find(t => t.id === id)
  if (!task) return

  const newStatus = task.status === 'concluída' ? 'pendente' : 'concluída'
  tasksStore.updateTask(id, { ...task, status: newStatus })
}

function handleSaved() {
  showModal.value = false
}

function handleCancel() {
  showModal.value = false
}
</script>