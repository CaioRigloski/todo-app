<template>
  <div class="register">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <input v-model="name" placeholder="Name" />
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Register</button>
    </form>
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
  try {
    await auth.register({ name: name.value, email: email.value, password: password.value });
    alert('Registration successful! Please login.');
    router.push('/');
  } catch (err) {
    console.error(err);
    alert('Registration failed');
  }
}
</script>
