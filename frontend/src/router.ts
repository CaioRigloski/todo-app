import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './pages/LoginPage.vue';
import TasksPage from './pages/TasksPage.vue';
import RegisterPage from './pages/RegisterPage.vue';

const routes = [
  { path: '/', component: LoginPage },
  { path: '/tasks', component: TasksPage },
  { path: '/register', component: RegisterPage },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});

