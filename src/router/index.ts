import { createRouter, createWebHistory } from 'vue-router'
import ShoppingListPage from '../views/VueFundamentalsShoppingList.vue'
import ToDoListPage from '@/views/BlogPostsList.vue'
import BlogPostForm from '@/views/BlogPostForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'shop-list',
      component: ShoppingListPage
    },
    {
      path: '/blogpost',
      name: 'blog-post-list',
      component: ToDoListPage
    },
    {
      path: '/blogpost/new ',
      name: 'blog-post-new',
      component: BlogPostForm
    },
    {
      path: '/blogpost/:id',
      name: 'blog-post-edit',
      component: BlogPostForm
    }
  ]
})

export default router
