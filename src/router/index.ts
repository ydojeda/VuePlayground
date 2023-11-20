import { createRouter, createWebHistory } from 'vue-router'
import ShoppingListPage from '../views/VueFundamentalsShoppingList.vue'
import ToDoListPage from '@/views/BlogPostsList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Shopping List',
      component: ShoppingListPage
    },
    {
      path: '/blogpost',
      name: 'To Do List',
      component: ToDoListPage
    }
  ]
})

export default router
