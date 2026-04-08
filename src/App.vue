<template>
  <!-- 全局消息提示 -->
  <div v-if="showMessage" class="global-message" :class="messageType">
    <span class="message-icon">{{ messageIcon }}</span>
    <span class="message-text">{{ messageText }}</span>
    <button class="message-close" @click="hideMessage">×</button>
  </div>
  
  <router-view></router-view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { initUser } from './stores/userStore'

// 初始化用户状态
onMounted(() => {
  initUser()
})

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

// 暴露方法给全局使用
window.showGlobalMessage = showGlobalMessage
</script>

<style scoped>
/* 全局消息样式 */
.global-message {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
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
</style>