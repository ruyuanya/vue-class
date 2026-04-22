<template>
  <div class="course-page">
    <button class="back" @click="back">← 返回</button>

    <div class="card" v-if="items.length">
      <h2>错题本（共 {{ items.length }} 题）</h2>
      <ul>
        <li v-for="(w, idx) in items" :key="w.courseId + '|' + w.id" class="topic-block">
          <strong>{{ w.courseTitle || '未知课程' }} / {{ w.topicTitle || '章节' }}</strong>
          <div class="q-row">
            <span class="q-text">{{ w.text }}</span>
            <div class="q-actions">
              <button @click="toggleAnswer(w)">{{ w.showAnswer ? '收起答案' : '显示答案' }}</button>
              <button @click="remove(w)">移除错题</button>
            </div>
          </div>
          <div v-if="w.showAnswer" class="q-answer">答案：{{ w.answer }}</div>
        </li>
      </ul>
    </div>

    <div v-else class="card">
      <h2>错题本为空</h2>
      <p class="desc">你可以在课程页面将题目加入错题本，加入后会在这里显示。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

interface WrongItem {
  id: string
  text: string
  answer: string
  showAnswer?: boolean
  courseId?: string
  courseTitle?: string
  topicId?: string
  topicTitle?: string
}

const STORAGE_KEY = 'coco_wrong_book'
const router = useRouter()

const loadWrong = (): WrongItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const items = ref<WrongItem[]>(loadWrong())

const persist = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items.value))
}

const toggleAnswer = (w: WrongItem) => {
  w.showAnswer = !w.showAnswer
}

const remove = (w: WrongItem) => {
  items.value = items.value.filter(x => !(x.id === w.id && x.courseId === w.courseId))
  persist()
}

const back = () => {
  router.push('/adaptive-study')
}
</script>

<style scoped>
.course-page {
  padding-top: 100px;
  box-sizing: border-box;
  min-height: calc(100vh - 100px);
  max-width: 1100px;
  margin: 0 auto;
  padding-left: 16px;
  padding-right: 16px;
}

.back {
  margin-bottom: 12px;
  border: 1px solid transparent;
  background: transparent;
  cursor: pointer;
  background-color: #fff;
  border-color:#64748b;
  position: relative;
  z-index: 2;
}

.card {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(2,6,23,0.06);
}

.desc {
  color: #64748b;
  margin-top: 6px;
}

.questions ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.q-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
}

.q-text {
  color: #0f172a;
}

.q-answer {
  color: #065f46;
  margin-top: 6px;
  font-size: 13px;
}

button {
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid #e6e9ee;
  background: #f8fafc;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.topic-block {
  margin-top: 12px;
  padding-bottom: 6px;
  border-bottom: 1px dashed #e6e9ee;
}
</style>