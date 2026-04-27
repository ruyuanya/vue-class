// 用户状态管理
import { ref } from 'vue'
import type { UserInfo } from '../services/types'

// 用户状态
const user = ref<UserInfo | null>(null)
const isLoggedIn = ref(false)
const token = ref<string | null>(null)

// 登录
export const login = (userInfo: UserInfo, authToken?: string) => {
  user.value = userInfo
  isLoggedIn.value = true
  token.value = authToken || `token_${Date.now()}`
  localStorage.setItem('user', JSON.stringify(userInfo))
  localStorage.setItem('token', token.value)
}

// 登出
export const logout = () => {
  user.value = null
  isLoggedIn.value = false
  token.value = null
  localStorage.removeItem('user')
  localStorage.removeItem('token')
}

// 初始化用户状态（从localStorage恢复）
export const initUser = () => {
  const savedUser = localStorage.getItem('user')
  const savedToken = localStorage.getItem('token')
  
  if (savedUser && savedToken) {
    try {
      user.value = JSON.parse(savedUser)
      isLoggedIn.value = true
      token.value = savedToken
    } catch (error) {
      console.error('Failed to parse saved user data:', error)
      logout()
    }
  }
}

// 获取用户信息
export const getUser = () => user.value
export const getIsLoggedIn = () => isLoggedIn.value
export const getToken = () => token.value

// 检查用户是否有权限访问课程管理页面
export const hasCourseManagerAccess = () => {
  const currentUser = user.value
  return currentUser && (currentUser.username === 'testuser' || currentUser.username === 'admin')
}

// 导出响应式状态
export { user, isLoggedIn, token }