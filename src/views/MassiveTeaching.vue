<template>
  <div class="MassiveTeaching">
  <h1 class="teaching-title">AI助力大规模因材施教</h1>
  <h2 class="teaching-subtitle">基于AI的教学辅助系统，为学生量身定制学习路径</h2>

  <div class="container">
    <div class="card-list">
      <div class="card" @click="gotoWorkspace">
        <div class="icon-container diagnosis-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
            <path d="M12 20v-8"></path>
            <path d="M18 20v-8"></path>
            <path d="M6 20v-8"></path>
            <path d="M18 4l3 3-3 3"></path>
            <path d="M6 4l-3 3 3 3"></path>
            <path d="M15 9l-3 3-3-3"></path>
          </svg>
        </div>
        <h2>智能测评</h2>
        <div class="text">基于AI算法分析学生知识掌握情况，精准定位薄弱环节，生成个性化学习建议</div>
        <div class="enter">
          开始测评
          <span class="arrow">→</span>
        </div>
      </div>

      <div class="card" @click="gotoSmartTutor">
        <div class="icon-container">
          <svg t="1775028580194" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="4937">
            <path
              d="M463.99957 784.352211c0 26.509985 21.490445 48.00043 48.00043 48.00043s48.00043-21.490445 48.00043-48.00043c0-26.509985-21.490445-48.00043-48.00043-48.00043S463.99957 757.842226 463.99957 784.352211z"
              fill="#575B66" p-id="4938"></path>
            <path
              d="M512 960c-247.039484 0-448-200.960516-448-448S264.960516 64 512 64 960 264.960516 960 512 759.039484 960 512 960zM512 128.287273c-211.584464 0-383.712727 172.128262-383.712727 383.712727 0 211.551781 172.128262 383.712727 383.712727 383.712727 211.551781 0 383.712727-172.159226 383.712727-383.712727C895.712727 300.415536 723.551781 128.287273 512 128.287273z"
              fill="#575B66" p-id="4939"></path>
            <path
              d="M512 673.695256c-17.664722 0-32.00086-14.336138-32.00086-31.99914l0-54.112297c0-52.352533 39.999785-92.352318 75.32751-127.647359 25.887273-25.919957 52.67249-52.67249 52.67249-74.016718 0-53.343368-43.07206-96.735385-95.99914-96.735385-53.823303 0-95.99914 41.535923-95.99914 94.559333 0 17.664722-14.336138 31.99914-32.00086 31.99914s-32.00086-14.336138-32.00086-31.99914c0-87.423948 71.775299-158.559333 160.00086-158.559333s160.00086 72.095256 160.00086 160.735385c0 47.904099-36.32028 84.191695-71.424378 119.295794-27.839699 27.776052-56.575622 56.511974-56.575622 82.3356l0 54.112297C544.00086 659.328155 529.664722 673.695256 512 673.695256z"
              fill="#575B66" p-id="4940"></path>
          </svg>
        </div>
        <h2>智能导师</h2>
        <div class="text">AI智能导师提供个性化学习指导，帮助学生解决学习难题</div>
        <div class="enter">
          访问导师
          <span class="arrow">→</span>
        </div>
      </div>

      <div class="card">
        <div class="icon-container">
          <svg t="1775028580194" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="4937">
            <path
              d="M463.99957 784.352211c0 26.509985 21.490445 48.00043 48.00043 48.00043s48.00043-21.490445 48.00043-48.00043c0-26.509985-21.490445-48.00043-48.00043-48.00043S463.99957 757.842226 463.99957 784.352211z"
              fill="#575B66" p-id="4938"></path>
            <path
              d="M512 960c-247.039484 0-448-200.960516-448-448S264.960516 64 512 64 960 264.960516 960 512 759.039484 960 512 960zM512 128.287273c-211.584464 0-383.712727 172.128262-383.712727 383.712727 0 211.551781 172.128262 383.712727 383.712727 383.712727 211.551781 0 383.712727-172.159226 383.712727-383.712727C895.712727 300.415536 723.551781 128.287273 512 128.287273z"
              fill="#575B66" p-id="4939"></path>
            <path
              d="M512 673.695256c-17.664722 0-32.00086-14.336138-32.00086-31.99914l0-54.112297c0-52.352533 39.999785-92.352318 75.32751-127.647359 25.887273-25.919957 52.67249-52.67249 52.67249-74.016718 0-53.343368-43.07206-96.735385-95.99914-96.735385-53.823303 0-95.99914 41.535923-95.99914 94.559333 0 17.664722-14.336138 31.99914-32.00086 31.99914s-32.00086-14.336138-32.00086-31.99914c0-87.423948 71.775299-158.559333 160.00086-158.559333s160.00086 72.095256 160.00086 160.735385c0 47.904099-36.32028 84.191695-71.424378 119.295794-27.839699 27.776052-56.575622 56.511974-56.575622 82.3356l0 54.112297C544.00086 659.328155 529.664722 673.695256 512 673.695256z"
              fill="#575B66" p-id="4940"></path>
          </svg>
        </div>
        <h2>差异化教学</h2>
        <div class="text">根据学生的学习情况，提供差异化的教学方案，满足不同学生的学习需求</div>
        <div class="enter">
          教学管理
          <span class="arrow">→</span>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

const gotoWorkspace = () => {
  router.push('/Workspace')
}

const gotoSmartTutor = () => {
  router.push('/smart-tutor')
}
</script>

<style scoped>
.MassiveTeaching {
    padding-top: 80px; /* 根据 App.vue 中 top-nav 高度调整（可改为 72px / 80px 等） */
    box-sizing: border-box;
    min-height: calc(100vh - 100px);
}
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

/* 容器：居中并限制最大宽度 */
.container {
  width: 100%;
  max-width: 1100px;
  margin: 40px auto;
  padding: 20px 25px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 卡片列表：三列并排，居中，卡片间距 50px */
.card-list {
  display: flex;
  gap: 50px; /* 三个 card 之间保持 50px */
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
  flex-wrap: nowrap; /* 不换行，强制三列并排 */
}

/* 卡片 */
.card {
  flex: 0 0 320px; /* 固定宽度，保证三列对称 */
  width: 320px;
  height: 320px;
  padding: 20px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  border: 2px solid transparent;
  transition: all 0.5s ease;
  position: relative;
}

/* 卡片动画 */
.card:hover {
  transform: translateY(-8px);
  border-color: hsl(160, 79%, 61%);
  box-shadow: 0 4px 10px hsla(130, 80%, 50%, 0.15);
  cursor: pointer;
}

.icon-container {
  width: 60px;
  height: 60px;
  padding: 10px;
  background-color: hsl(160, 79%, 61%);
  border-radius: 15px;
  margin: 10px 0 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 认知诊断图标特殊样式 */
.diagnosis-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.diagnosis-icon .icon {
  width: 32px;
  height: 32px;
}

.text {
  font-size: 16px;
  color: #333;
  margin-top: 8px;
}

.enter {
  position: absolute;
  bottom: 24px;
  left: 20px;
  color: #1ba766;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  cursor: pointer;
}

.arrow {
  transition: transform 0.3s ease;
  font-size: 20px;
}

.card:hover .arrow {
  transform: translateX(5px);
}

/* 响应式：窄屏时改为垂直堆叠 */
@media (max-width: 1100px) {
  .card-list {
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }
  .card {
    flex: 0 0 auto;
    width: 90%;
    max-width: 520px;
    height: auto;
  }
}
</style>