import { defineStore } from 'pinia';
import axios from 'axios';
import router from '../router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
  }),
  actions: {
    async login(email: string, password: string) {
      const res = await axios.post('/api/auth/login', { email, password });
      this.token = res.data.access_token;

      if(!this.token) {
        throw new Error('No token received');
      }
      
      localStorage.setItem('token', this.token);
      router.push('/tasks');
    },
    async register(data: { name: string; email: string; password: string }) {
      await axios.post('/api/auth/register', data);
    },
  }
});
