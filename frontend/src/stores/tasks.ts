import { defineStore } from 'pinia';
import api from '../plugins/axios';

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
        const res = await api.get('/api/tasks');
        this.tasks = res.data;
      } catch (err) {
        console.error('Erro ao buscar tasks:', err);
        this.clear();
      }
    },

    async addTask(task: { title: string; description?: string }) {
      try {
        const res = await api.post('/api/tasks', task);
        this.tasks.push(res.data);
      } catch (err) {
        console.error('Erro ao adicionar task:', err);
      }
    },

    async updateTask(id: number, task: Task) {
      try {
        const res = await api.put(`/api/tasks/${id}`, task);
        const index = this.tasks.findIndex(t => t.id === id);
        if (index !== -1) this.tasks[index] = res.data;
      } catch (err) {
        console.error('Erro ao atualizar task:', err);
      }
    },

    async deleteTask(id: number) {
      try {
        await api.delete(`/api/tasks/${id}`);
        this.tasks = this.tasks.filter(t => t.id !== id);
      } catch (err) {
        console.error('Erro ao deletar task:', err);
      }
    },

    clear() {
      this.tasks = [];
    },
  },
});