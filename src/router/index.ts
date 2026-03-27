import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import MassiveTeaching from '../views/MassiveTeaching.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || '/'),
  routes: [
    {
      path:'/',
      name:'Home',
      component:Home
    },
    {
      path:'/massive-teaching',
      name:'MassiveTeaching',
      component:MassiveTeaching
    }
  ],
})

export default router