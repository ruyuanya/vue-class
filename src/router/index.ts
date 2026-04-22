import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import MassiveTeaching from '../views/MassiveTeaching.vue'
import AdaptiveStudy from '../views/AdaptiveStudy.vue'
import WorkspaceView from '../views/WorkspaceView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import CourseDetail from '../views/CourseDetail.vue'
import WrongBook from '../views/WrongBook.vue'
 
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || '/'),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/massive-teaching',
      name: 'MassiveTeaching',
      component: MassiveTeaching,
    },
    {
      path: '/adaptive-study',
      name: 'AdaptiveStudy',
      component: AdaptiveStudy,
    },
    {
      path: '/wrong-book',
      name: 'WrongBook',
      component: WrongBook,
    },
    {
      path: '/workspace',
      name: 'Workspace',
      component: WorkspaceView,
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView,
    },
    {
      path: '/learning/course/:id',
      name: 'CourseDetail',
      component: CourseDetail,
    },
  ],
})
 
export default router
