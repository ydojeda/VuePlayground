import { createRouter, createWebHistory } from 'vue-router'
import ShoppingListPage from '../views/VueFundamentalsShoppingList.vue'
import ToDoListPage from '@/views/BlogPostsList.vue'
import BlogPostForm from '@/views/BlogPostForm.vue'

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
      name: 'Blog posts list',
      component: ToDoListPage
    },
    {
      path: '/blogpost/form',
      name: 'Blog post form',
      component: BlogPostForm
    }
  ]
})

export default router
