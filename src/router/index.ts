import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import MassiveTeaching from '../views/MassiveTeaching.vue'
import AdaptiveStudy from '../views/AdaptiveStudy.vue'
import WorkspaceView from '../views/WorkspaceView.vue'
import SmartTutorView from '../views/SmartTutorView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import CourseDetail from '../views/CourseDetail.vue'
import WrongBook from '../views/WrongBook.vue'
import CourseManager from '../views/CourseManager.vue'

// 导入用户状态检查（与你项目中导出的函数名保持一致）
import { getIsLoggedIn, hasCourseManagerAccess } from '../stores/userStore'

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
      path: '/coursemanager',
      name: 'CourseManager',
      component: CourseManager,
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
      path: '/smart-tutor',
      name: 'SmartTutor',
      component: SmartTutorView,
      meta: { requiresAuth: true }
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

// 全局路由守卫：有 requiresAuth 的路由需先登录，课程管理页面需要特定权限
router.beforeEach((to, from, next) => {
  if ((to.meta as any)?.requiresAuth && !getIsLoggedIn()) {
    // 可携带重定向信息，登录后跳回
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else if (to.name === 'CourseManager' && !hasCourseManagerAccess()) {
    // 课程管理页面需要特定权限
    next({ name: 'Home' })
    // 显示无权限提示
    if (window.showGlobalMessage) {
      window.showGlobalMessage('您没有权限访问课程管理页面', 'error')
    }
  } else {
    next()
  }
})

export default router