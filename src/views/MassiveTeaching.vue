<template>
  <div class="massive-teaching-page">
    <div class="header">
      <h1>大规模因材施教系统</h1>
    </div>
      
    <div class="back-button">
      <button @click="goBack">返回首页</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const goBack = () => {
  router.push('/')
}
</script>

<style scoped>
.massive-teaching-page {
  padding: 40px;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}
.header {
  margin-bottom: 60px;
}
.header h1 {
  font-size: 36px;
  color: #1ba766;
  margin-bottom: 20px;
}
.back-button {
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