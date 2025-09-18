<template>
  <div>
    <h2>My Tasks</h2>
    <form @submit.prevent="addTask">
      <input v-model="title" placeholder="Title" />
      <input v-model="description" placeholder="Description" />
      <button type="submit">Add</button>
    </form>
    <ul>
      <li v-for="task in tasksStore.tasks" :key="task.id">
        {{ task.title }} - {{ task.status }}
        <button @click="tasksStore.deleteTask(task.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useTasksStore } from '../stores/tasks';

const tasksStore = useTasksStore();
const title = ref('');
const description = ref('');

onMounted(() => {
  tasksStore.fetchTasks();
});

function addTask() {
  tasksStore.addTask({ title: title.value, description: description.value });
  title.value = '';
  description.value = '';
}
</script>
