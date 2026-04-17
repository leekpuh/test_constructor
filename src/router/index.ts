import BlankFormView from '@/views/BlankFormView.vue/BlankFormView.vue'
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
      path: '/blank-form',
      name: 'blank-form',
      component: BlankFormView,
    },
    
  ],
})

export default router
