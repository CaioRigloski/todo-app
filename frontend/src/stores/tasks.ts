// tasksStore.ts
import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './auth';

interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
}

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as Task[],
  }),
  actions: {
    async fetchTasks() {
      try {
        const auth = useAuthStore();
        if (!auth.token) {
          this.clear();
          return;
        }

        const res = await axios.get('/api/tasks', {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        this.tasks = res.data;
      } catch (err) {
        console.error('Erro ao buscar tasks:', err);
        this.clear();
      }
    },

    async addTask(task: { title: string; description?: string }) {
      const auth = useAuthStore();
      if (!auth.token) return;

      const res = await axios.post('/api/tasks', task, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      this.tasks.push(res.data);
    },

    async updateTask(id: number, task: Task) {
      const auth = useAuthStore();
      if (!auth.token) return;

      const res = await axios.put(`/api/tasks/${id}`, task, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      const index = this.tasks.findIndex(t => t.id === id);
      if (index !== -1) this.tasks[index] = res.data;
    },

    async deleteTask(id: number) {
      const auth = useAuthStore();
      if (!auth.token) return;

      await axios.delete(`/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      this.tasks = this.tasks.filter(t => t.id !== id);
    },

    clear() {
      this.tasks = [];
    },
  },
});
