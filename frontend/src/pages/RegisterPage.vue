<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Registrar</h2>

      <form @submit.prevent="register" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
          <input
            id="name"
            type="text"
            v-model="name"
            placeholder="Digite seu nome"
            required
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
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
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Senha</label>
          <input
            id="password"
            type="password"
            v-model="password"
            placeholder="Digite sua senha"
            required
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <p v-if="auth.errorMessage" class="text-red-600 text-sm">{{ auth.errorMessage }}</p>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Registrar
        </button>
      </form>

      <p class="mt-4 text-center text-gray-600">
        Já tem uma conta?
        <router-link to="/" class="text-blue-600 hover:underline">Faça login</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');

async function register() {
  const success = await auth.register({ name: name.value, email: email.value, password: password.value });
  if (success) {
    alert('Registro realizado com sucesso! Faça login.');
    router.push('/');
  }
}
</script>