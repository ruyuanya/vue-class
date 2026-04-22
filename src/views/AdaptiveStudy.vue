<template>
  <div class="learning-page">
    <div class="subjects">
      <button 
        v-for="s in subjects" 
        :key="s.id"
        :class="{ active: current === s.id }"
        @click="current = s.id"
      >
        {{ s.name }}
      </button>
    </div>

    <main class="content">
      <div v-if="current === 'math'" class="math-page">
        <div class="buttons">
          <button @click="handleClick('学习课程')">📚 学习课程</button>
          <button @click="handleClick('学习建议')">💡 学习建议</button>
          <button @click="handleClick('错题本')">📘 错题本</button>
        </div>
      </div>
      <div v-else class="placeholder">
        <p>{{ currentName }}页面开发中...</p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

interface Subject {
  id: string
  name: string
}

const subjects: Subject[] = [
  { id: 'chinese', name: '语文' },
  { id: 'math', name: '数学' },
  { id: 'english', name: '英语' }
]

const current = ref<string>('math')

const currentName = computed(() => {
  const s = subjects.find(s => s.id === current.value)
  return s ? s.name : ''
})

const router = useRouter()

const handleClick = (name: string) => {
  if (name === '学习课程') {
    router.push('/learning/course/algebra-basic')
  } else if (name === '学习建议') {
    router.push({ path: '/learning', query: { tab: 'advice' } })
  } else if (name === '错题本') {
    // 跳转到新增的错题本页面
    router.push('/wrong-book')
  } else {
    alert(`「${name}」功能待接入`)
  }
}
</script>

<style scoped>
/* 将页面整体下移，避免被 fixed 顶部导航覆盖 */
.learning-page {
  padding-top: 50px; /* 根据 App.vue 中 top-nav 高度调整为 72/80/100px 等 */
  box-sizing: border-box;
  min-height: calc(100vh - 100px);
  font-family: system-ui, -apple-system, sans-serif;
  background-color: #f5f7fa;
  border-radius: 16px;
}

/* 选科按钮条保持在顶部并水平展开 */
.subjects {
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 8px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  /* 保证 subjects 在内容区可见并不会被导航覆盖 */
  position: relative;
  z-index: 1;
}

.subjects button {
  padding: 8px 24px;
  font-size: 16px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 24px;
  color: #64748b;
}

.subjects button.active {
  background: #1ba766;
  color: white;
}

/* 内容区：设置最大宽度并居中，内部使用响应式网格均匀铺满 */
.content {
  max-width: 1000px;
  margin: 24px auto;
  padding: 0 20px;
}

/* 卡片风格容器 */
.math-page {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
}

/* 关键改动：按钮区域使用响应式网格，均匀铺满 */
.buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  align-items: stretch;
}

.buttons button {
  padding: 18px;
  font-size: 18px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 12px;
  cursor: pointer;
  text-align: left;
  width: 100%;
  box-shadow: 0 1px 6px rgba(0,0,0,0.03);
}

.buttons button:hover {
  background: #f8fafc;
  border-color: #1ba766;
}

.placeholder {
  text-align: center;
  padding: 60px;
  background: white;
  border-radius: 16px;
  color: #64748b;
}
</style>