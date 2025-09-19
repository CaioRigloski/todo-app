<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>

      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            v-model="email"
            placeholder="Digite seu email"
            required
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
            Senha
          </label>
          <input
            id="password"
            type="password"
            v-model="password"
            placeholder="Digite sua senha"
            required
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <p v-if="auth.loginErrorMessage" class="text-red-600 text-sm">{{ auth.loginErrorMessage }}</p>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Entrar
        </button>
      </form>

      <p class="mt-4 text-center text-gray-600">
        Não tem uma conta?
        <router-link to="/register" class="text-blue-600 hover:underline">
          Registre-se
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useAuthStore } from '../stores/auth';

const auth = useAuthStore();
const email = ref('');
const password = ref('');

async function login() {
  const success = await auth.login(email.value, password.value);
  if (!success) return;
}

onMounted(() => {
  auth.loginErrorMessage = '';
});

onBeforeUnmount(() => {
  auth.loginErrorMessage = '';
});
</script>