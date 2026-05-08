
import FormView from '@/views/Form/FormView.vue'
import MainView from '@/views/MainView/MainView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView,
    },
    {
      path: '/form/:id',
      name: 'form',
      component: FormView,
    },
    
  ],
})

export default router
