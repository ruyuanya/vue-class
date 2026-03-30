import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import MassiveTeaching from '../views/MassiveTeaching.vue'
import AdaptiveStudy from '../views/AdaptiveStudy.vue'

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
    },
    {
      path:'/adaptive-study',
      name:'AdaptiveStudy',
      component:AdaptiveStudy
    }
  ],
})

export default router