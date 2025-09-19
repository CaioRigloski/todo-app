import axios from 'axios';
import { useAuthStore } from '../stores/auth';

// @ts-ignore
const API_URL = `${import.meta.env.VITE_API_URL}` || 'http://localhost:3000';

// URL base da API
axios.defaults.baseURL = API_URL;

export function setupAxiosInterceptors() {
  const authStore = useAuthStore();

  // Intercepta todas as requisições
  axios.interceptors.request.use(
    (config) => {
      if (authStore.token) {
        config.headers.Authorization = `Bearer ${authStore.token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // intercepta respostas
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        authStore.logout(); // desloga usuário se token inválido
      }
      return Promise.reject(error);
    }
  );
}

export default axios;