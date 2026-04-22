<template>
  <div class="course-page">
    <button class="back" @click="back">← 返回课程列表</button>

    <div class="card">
      <h2>{{ course?.title || '课程未找到' }}</h2>
      <p class="desc">{{ course?.desc }}</p>

      <section class="resources">
        <h3>视频</h3>
        <div class="video-placeholder">
            XXX
        </div>

        <h3>PPT / 课件</h3>
        <div class="ppt-placeholder">
            XXX
        </div>
      </section>

      <section v-if="course" class="questions">
        <h3>练习题</h3>

        <ul>
          <li
            v-for="t in course.topics"
            :key="t.id"
            class="topic-block"
          >
            <strong>{{ t.title }}</strong>

            <ul class="q-list">
              <li
                v-for="q in t.questions"
                :key="q.id"
                class="q-item"
              >
                <div class="q-row">
                  <span class="q-text">{{ q.text }}</span>

                  <div class="q-actions">
                    <button @click="toggleAnswer(q)">
                      {{ q.showAnswer ? '收起答案' : '显示答案' }}
                    </button>
                    <button
                      @click="toggleWrong(q)"
                    >
                      {{ isInWrong(q.id) ? '移除错题本' : '加入错题本' }}
                    </button>
                  </div>
                </div>

                <div v-if="q.showAnswer" class="q-answer">
                  答案：{{ q.answer }}
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface Question {
  id: string
  text: string
  answer: string
  showAnswer?: boolean
}

interface Topic {
  id: string
  title: string
  questions: Question[]
}

interface Course {
  id: string
  title: string
  desc?: string
  topics: Topic[]
}

const route = useRoute()
const router = useRouter()

const id = String(route.params.id || '')

/* 示例课程数据（后续可替换为 API 请求） */
const courses: Course[] = [
  {
    id: 'algebra-basic',
    title: '代数基础',
    desc: '一元一次、二次方程与因式分解基础课程',
    topics: [
      {
        id: 't1',
        title: '一元一次方程',
        questions: [
          { id: 'q1', text: '3x - 5 = 10', answer: 'x = 5' }
        ]
      },
      {
        id: 't2',
        title: '一元二次方程',
        questions: [
          { id: 'q2', text: 'x^2 - 5x + 6 = 0', answer: 'x = 2 或 x = 3' }
        ]
      },
      {
        id: 't3',
        title: '因式分解',
        questions: [
          { id: 'q3', text: 'x^2 + 5x + 6 分解', answer: '(x+2)(x+3)' }
        ]
      }
    ]
  },
  {
    id: 'quadratic-advanced',
    title: '一元二次方程进阶',
    desc: '配方法、求根公式、应用题练习',
    topics: [
      {
        id: 't1',
        title: '配方法',
        questions: [
          { id: 'q4', text: '配方法示例题', answer: '略' }
        ]
      },
      {
        id: 't2',
        title: '应用题',
        questions: [
          { id: 'q5', text: '应用题示例', answer: '略' }
        ]
      }
    ]
  }
]

const course = ref<Course | undefined>(courses.find(c => c.id === id))

/* 错题本（localStorage 持久化，与 Learning.vue 使用相同 key） */
const STORAGE_KEY = 'coco_wrong_book'

const loadWrong = (): Question[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const wrongBook = ref<Question[]>(loadWrong())

const persistWrong = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(wrongBook.value))
}

const isInWrong = (qid: string) => {
  return wrongBook.value.some(w => w.id === qid)
}

const addToWrong = (q: Question) => {
  wrongBook.value.push({
    id: q.id,
    text: q.text,
    answer: q.answer
  })
  persistWrong()
  alert('已加入错题本')
}

const removeFromWrong = (qid: string) => {
  wrongBook.value = wrongBook.value.filter(w => w.id !== qid)
  persistWrong()
  alert('已从错题本移除')
}

/* 切换：已存在则移除，否则加入 */
const toggleWrong = (q: Question) => {
  if (isInWrong(q.id)) {
    removeFromWrong(q.id)
  } else {
    addToWrong(q)
  }
}

const toggleAnswer = (q: Question) => {
  q.showAnswer = !q.showAnswer
}

const back = () => {
  router.push('/learning')
}
</script>

<style scoped>
.course-page {
  padding: 16px;
  max-width: 1100px;
  margin: 0 auto;
}

.back {
  margin-bottom: 12px;
  border: 1px solid transparent;
  background: transparent;
  cursor: pointer;
  background-color: #fff;
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

.resources .video-placeholder,
.resources .ppt-placeholder {
  margin: 12px 0;
  padding: 16px;
  border-radius: 8px;
  background: #f3f4f6;
  color: #64748b;
  text-align: center;
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
}

.q-list {
  padding-left: 12px;
}
</style>