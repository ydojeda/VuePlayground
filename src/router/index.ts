import { createRouter, createWebHistory } from 'vue-router'
import ShoppingListPage from '../views/VueFundamentalsShoppingList.vue'
import ToDoListPage from '@/views/TodoList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Shopping List',
      component: ShoppingListPage
    },
    {
      path: '/todo',
      name: 'To Do List',
      component: ToDoListPage
    }
  ]
})

export default router
