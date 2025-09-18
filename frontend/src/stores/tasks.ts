import { defineStore } from 'pinia';
import axios from 'axios';

interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
}

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as Task[],
    token: localStorage.getItem('token') || '',
  }),
  actions: {
    // Buscar tasks do backend
    async fetchTasks() {
      try {
        const res = await axios.get('/api/tasks', {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        this.tasks = res.data;
      } catch (err) {
        console.error('Erro ao buscar tasks:', err);
      }
    },

    // Adicionar uma nova task
    async addTask(task: { title: string; description?: string }) {
      try {
        const res = await axios.post('/api/tasks', task, {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        this.tasks.push(res.data);
      } catch (err) {
        console.error('Erro ao adicionar task:', err);
      }
    },

    // Deletar uma task
    async deleteTask(id: number) {
      try {
        await axios.delete(`/api/tasks/${id}`, {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        this.tasks = this.tasks.filter((t) => t.id !== id);
      } catch (err) {
        console.error('Erro ao deletar task:', err);
      }
    },
  },
});
