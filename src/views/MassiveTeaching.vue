<template>
  <div class="back-button">
    <button @click="goBack">返回首页</button>
  </div>
  <h1 class="teaching-title">AI助力大规模因材施教</h1>
  <h2 class="teaching-subtitle">基于AI的教学辅助系统，为学生量身定制学习路径</h2>
  <div class="container"></div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const goBack = () => {
  router.push('/')
}
</script>

<style scoped>
/* 主标题 */
.teaching-title {
  font-size: 60px;
  color: #1ba766;
  margin: 0 auto;
  text-align: center;
}

/* 副标题 */
.teaching-subtitle {
  font-size: 25px;
  text-align: center;
}

/* 返回首页按钮样式 */
.back-button {
  margin-left: 40px;
  margin-top: 40px;
}

.back-button button {
  background-color: #1ba766;
  color: white;
  border: none;
  padding: 12px 30px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-button button:hover {
  background-color: #158c4f;
}
</style>