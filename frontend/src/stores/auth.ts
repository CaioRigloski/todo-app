import { defineStore } from 'pinia';
import api from '../plugins/axios';
import router from '../router';
import { useTasksStore } from './tasks';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    errorMessage: '' as string,
  }),
  actions: {
    async login(email: string, password: string) {
      this.errorMessage = '';
      try {
        const res = await api.post('/api/auth/login', { email, password });
        this.token = res.data.access_token;

        if (!this.token) {
          this.errorMessage = 'Não foi possível obter o token.';
          return false;
        }

        localStorage.setItem('token', this.token);
        router.push('/tasks');
        return true;
      } catch (err: any) {
        if (err.response?.status === 401) {
          this.errorMessage = 'Email ou senha incorretos.';
        } else {
          this.errorMessage = 'Ocorreu um erro. Tente novamente.';
        }
        return false;
      }
    },
    async register(data: { name: string; email: string; password: string }) {
      this.errorMessage = '';
      try {
        await api.post('/api/auth/register', data);
        return true;
      } catch (err: any) {
        if (err.response?.status === 409) {
          this.errorMessage = 'Este e-mail já está cadastrado.';
        } else {
          this.errorMessage = 'Falha ao registrar. Tente novamente.';
        }
        return false;
      }
    },
    logout() {
      this.token = null;
      localStorage.removeItem('token');

      // Limpa tasks
      const tasksStore = useTasksStore();
      tasksStore.clear();

      router.push('/');
    }
  }
});
