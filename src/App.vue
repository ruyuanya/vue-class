<template>
  <!-- 全局消息提示 -->
  <div v-if="showMessage" class="global-message" :class="messageType">
    <span class="message-icon">{{ messageIcon }}</span>
    <span class="message-text">{{ messageText }}</span>
    <button class="message-close" @click="hideMessage">×</button>
  </div>
  
  <!-- 顶部导航栏（从 HomeView.vue 原封不动剪切过来） -->
  <div class="top-nav">
    <div class="nav-content">
      <!-- 左侧占位元素（可留空） -->
      <div class="nav-left"></div>

      <!-- 中间标题部分（绝对居中） -->
      <div class="nav-center">
        <span class="logo" @click="goToHome" style="cursor: pointer">COCO</span>
        <!-- 欢迎信息：仅在登录时显示
        <span v-if="isLoggedIn && currentUser" class="welcome-text">
          欢迎, {{ currentUser.username }}
        </span> -->
      </div>
      
      <!-- 用户按钮、登出按钮和下拉菜单 -->
      <div class="user-menu-container">
        <button class="user-btn" @click="toggleUserMenu">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="user-icon">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <!-- 显示用户名或默认文本 -->
          <span>{{ isLoggedIn && currentUser ? currentUser.username : '用户' }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="dropdown-icon">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        <!-- 登出按钮：仅在已登录时显示，位于用户按钮右侧 -->
        <button v-if="isLoggedIn" class="nav-logout-btn" @click="handleLogout" title="退出登录">
          退出
        </button>

        <!-- 下拉菜单 -->
        <div v-if="showUserMenu" class="user-dropdown">
          <!-- 未登录时显示登录/注册 -->
          <template v-if="!isLoggedIn">
            <button class="dropdown-item" @click="gotoLogin">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="dropdown-icon">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                <polyline points="10 17 15 12 10 7"></polyline>
                <line x1="15" y1="12" x2="3" y2="12"></line>
              </svg>
              登录
            </button>
            <button class="dropdown-item" @click="goToRegister">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="dropdown-icon">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <polyline points="16 11 18 13 22 9"></polyline>
              </svg>
              注册
            </button>
          </template>
          
          <!-- 已登录时显示用户信息和操作 -->
          <template v-else>
            <!-- 用户信息 -->
            <div class="dropdown-user-info">
              <div class="dropdown-user-name">{{ currentUser?.username }}</div>
              <div class="dropdown-user-email">{{ currentUser?.email }}</div>
            </div>
            <hr class="dropdown-divider">
            <!-- 课程管理选项，只有特定用户可见 -->
            <button v-if="hasCourseAccess" class="dropdown-item" @click="goToCourseManager">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="dropdown-icon">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              课程管理
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>

  <router-view></router-view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { initUser, getIsLoggedIn, getUser, logout, hasCourseManagerAccess } from './stores/userStore'

// 初始化用户状态（在组件挂载时恢复用户登录状态）

// 消息状态
const showMessage = ref(false)
const messageText = ref('')
const messageType = ref('success') // success, error, warning, info

// 消息图标
const messageIcon = computed(() => {
  switch (messageType.value) {
    case 'success': return '✓'
    case 'error': return '✕'
    case 'warning': return '⚠'
    case 'info': return 'ℹ'
    default: return 'ℹ'
  }
})

// 显示消息的方法
const showGlobalMessage = (text: string, type: string = 'success') => {
  messageText.value = text
  messageType.value = type
  showMessage.value = true
  
  // 3秒后自动隐藏
  setTimeout(() => {
    hideMessage()
  }, 3000)
}

// 隐藏消息
const hideMessage = () => {
  showMessage.value = false
}
const goToHome = () => {
  router.push('/')
}

// 暴露方法给全局使用
// @ts-ignore
window.showGlobalMessage = showGlobalMessage

// --- 从 HomeView 剪切过来的导航交互逻辑 ---
const router = useRouter()

// 用户菜单控制
const showUserMenu = ref(false)

// 新增：登录状态与当前用户
const isLoggedIn = computed(() => getIsLoggedIn())
const currentUser = computed(() => getUser())
const hasCourseAccess = computed(() => hasCourseManagerAccess())

const toggleUserMenu = (e?: Event) => {
  // 阻止事件冒泡（避免立即触发 document click）
  e?.stopPropagation?.()
  showUserMenu.value = !showUserMenu.value
}

const gotoLogin = () => {
  showUserMenu.value = false
  router.push('/login')
}

const goToRegister = () => {
  showUserMenu.value = false
  router.push('/register')
}

const goToMassiveTeaching = () => {
  router.push('/massive-teaching')
}

const goToAdaptiveStudy = () => {
  router.push('/adaptive-study')
}

const goToCourseManager = () => {
  showUserMenu.value = false
  router.push('/coursemanager')
}

// 新增：导航栏登出处理（与 WorkspaceView 的登出行为一致）
const handleLogout = () => {
  logout()
  if (window.showGlobalMessage) window.showGlobalMessage('登出成功', 'success')
  showUserMenu.value = false
  router.push('/')
}

// 点击页面其他地方关闭下拉菜单
const closeUserMenu = (event: MouseEvent) => {
  const target = event.target as HTMLElement | null
  if (!target) return
  if (!target.closest('.user-menu-container')) {
    showUserMenu.value = false
  }
}

// 添加 / 移除全局点击事件监听
onMounted(() => {
  // 初始化用户状态（从localStorage恢复）
  initUser()
  // 添加全局点击事件监听
  document.addEventListener('click', closeUserMenu)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', closeUserMenu)
})
</script>

<style scoped>
/* 全局消息样式（调整：放在导航下方并提高 z-index，避免被遮挡） */
.global-message {
  position: fixed;
  top: 100px; /* 调整：放在顶部导航下方，避免被遮挡；如需更精确请改为实际 top-nav 高度 */
  right: 20px;
  z-index: 11000; /* 提高到比导航栏更高，确保可见 */
  padding: 12px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 300px;
  max-width: 400px;
  animation: slideIn 0.3s ease;
  font-weight: 500;
}

.global-message.success {
  background-color: #f0f9f4;
  color: #0f5132;
  border: 1px solid #badbcc;
}

.global-message.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.global-message.warning {
  background-color: #fff3cd;
  color: #856404;
  border: 1px solid #ffeaa7;
}

.global-message.info {
  background-color: #d1ecf1;
  color: #0c5460;
  border: 1px solid #bee5eb;
}

.message-icon {
  font-size: 16px;
  font-weight: bold;
}

.message-text {
  flex: 1;
  font-size: 14px;
}

.message-close {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.message-close:hover {
  opacity: 1;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* 顶部导航栏样式 */
.top-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10000;
  background-color: #fff;
  border-bottom: 1px solid #eaeaea;
  /* 通过 padding 控制高度，避免内容被绝对定位影响容器高度 */
  padding: 12px 0;
  /* display: flex; */
  justify-content: center;
  animation: slideDown 0.3s ease;
  box-sizing: border-box;
}
.logo {
  font-size: 24px;
  font-weight: bold;
  color: #1ba766;
  }

/* 容器采用 flex 居中，并给左右两侧固定宽度占位，保证标题始终居中 */
.nav-content {
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: center; /* 使中间内容居中 */
  padding: 0 20px;
  box-sizing: border-box;
  gap: 16px;
  position: relative;
}

/* 左侧占位，宽度与右侧用户区保持一致，确保中间完全居中 */
.nav-left {
  flex: 0 0 220px; /* 根据需要调整宽度（与 .user-menu-container 保持一致） */
  min-width: 220px;
}

/* 中间标题区域为正常文档流元素，居中显示，不使用绝对定位 */
.nav-center {
  
  flex: 1 1 auto;
  text-align: left;
  pointer-events: auto;
}

/* 标题细节 */
.home-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.home-subtitle {
  font-size: 14px;
  color: #666;
  margin: 4px 0 0;
}

.welcome-text {
  font-size: 14px;
  color: #666;
  margin-left: 16px;
  font-weight: 400;
}

.welcome-text {
  font-size: 14px;
  color: #666;
  margin-left: 16px;
  font-weight: 400;
}

/* 右侧用户菜单，占位宽度与左侧一致，使用 flex 对齐按钮 */
.user-menu-container {
  flex: 0 0 220px;
  min-width: 220px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
}

/* 其余样式保持不变 */
.user-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: transparent;
  border: 1px solid #1ba766;
  border-radius: 4px;
  padding: 8px 12px;
  color: #1ba766;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.user-btn:hover {
  background-color: #007bff;
  color: #fff;
}

.user-icon {
  width: 18px;
  height: 18px;
  stroke-width: 2;
}

.dropdown-icon {
  width: 14px;
  height: 14px;
  stroke-width: 2;
}

.user-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10001;
  min-width: 180px;
  max-width: 200px;
  animation: fadeIn 0.3s ease;
  transform-origin: top right;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: none;
  background: none;
}

.dropdown-item:hover {
  background-color: #f1f1f1;
}

/* 下拉菜单分隔线 */
.dropdown-divider {
  border: none;
  border-top: 1px solid #eaeaea;
  margin: 4px 0;
}

/* 下拉菜单用户信息 */
.dropdown-user-info {
  padding: 12px 16px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #eaeaea;
}

.dropdown-user-name {
  font-weight: 600;
  color: #333;
  font-size: 14px;
}

.dropdown-user-email {
  font-size: 12px;
  color: #666;
  margin-top: 4px;
}

/* 导航栏右侧登出按钮样式 */
.nav-logout-btn {
  margin-left: 12px;
  padding: 8px 12px;
  border-radius: 8px;
  background: #dc3545;
  color: #fff;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.nav-logout-btn:hover {
  background: #c82333;
  transform: translateY(-2px);
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>