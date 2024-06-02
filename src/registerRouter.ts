import { createMemoryHistory, createRouter } from 'vue-router'

import TodolistHome from '@/features/todolist/views/TodolistHome.vue'

const routes = [
  { path: '/', component: TodolistHome },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})