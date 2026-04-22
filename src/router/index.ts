import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import MassiveTeaching from '../views/MassiveTeaching.vue'
import AdaptiveStudy from '../views/AdaptiveStudy.vue'
import WorkspaceView from '../views/WorkspaceView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import CourseDetail from '../views/CourseDetail.vue'
import WrongBook from '../views/WrongBook.vue'

// 导入用户状态检查（与你项目中导出的函数名保持一致）
import { getIsLoggedIn } from '../stores/userStore'

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
      meta: { requiresAuth: true } // 需要登录才能进入
    },
    {
      path: '/adaptive-study',
      name: 'AdaptiveStudy',
      component: AdaptiveStudy,
      meta: { requiresAuth: true } // 需要登录才能进入
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

// 全局路由守卫：有 requiresAuth 的路由需先登录
router.beforeEach((to, from, next) => {
  if ((to.meta as any)?.requiresAuth && !getIsLoggedIn()) {
    // 可携带重定向信息，登录后跳回
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
