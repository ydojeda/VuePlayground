import { createRouter, createWebHistory } from 'vue-router'
import Exercise1 from '../views/VueFundamentals.vue'
import Exercise2 from '@/views/ComponentFundamentals.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ex1',
      component: Exercise1
    },
    {
      path: '/ex2',
      name: 'ex2',
      component: Exercise2
    }
  ]
})

export default router
