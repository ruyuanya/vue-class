<template>
  <div class="back-button">
    <button @click="goBack">返回首页</button>
  </div>
  <h1 class="teaching-title">AI助力大规模因材施教</h1>
  <h2 class="teaching-subtitle">基于AI的教学辅助系统，为学生量身定制学习路径</h2>
  <div class="container">
    <div class="card" @click="gotoWorkspace">
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
      <h2>认知诊断</h2>
      <div class="text">通过AI技术诊断学生的认知起点和学习能力了，为教师提供个性化教学参考</div>
      <div class="enter">
        开始诊断
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
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const goBack = () => {
  router.push('/')
}

const gotoWorkspace = () => {
  router.push('/Workspace')
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
    width: 80px;
    height: 40px;
    border-radius: 20px;
    background-color: hwb(160 10% 25%);
    color: white;
    border: none;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.back-button button:hover {
    background-color: hwb(160 5% 20%);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.back-button button:active {
    transform: translateY(0);
}

.container {
  width: 800px;
  height: 400px;
  margin-left: 310px;
  padding: 20px 25px;
  display: flex;
  justify-content: center;
  /* 两端对齐，中间有间距 */
  align-items: center;
  display: flex;
  justify-content: space-between;
  /* 两端对齐，中间有间距 */
  align-items: center;
  /* 垂直居中对齐 */
  gap: 70px;
}

.card {
  width: 600px;
  height: 300px;
  padding: 20px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  margin-left: -16px;
  /* 动画组件 */
  border: 2px solid transparent;
  transition: all 0.5s ease;
  /* 为卡片添加相对定位 */
  position: relative;
}

/* 卡片动画 */
.card:hover {
  transform: translateY(-8px);
  border-color: hsl(160, 79%, 61%);
  box-shadow: 0 4px 10px hsla(130, 80%, 50%, 0.15);
  cursor: pointer;
  /* 绿色描边 */
}

.icon-container {
  width: 40px;
  height: 40px;
  padding: 10px;
  background-color: hsl(160, 79%, 61%);
  border-radius: 15px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.text {
  font-size: 18px;
}

.enter {
  margin-left: 15px;
  position: absolute;
  /* 绝对定位 */
  bottom: 30px;
  /* 距离卡片底部20px */
  left: 0;
  /* 左边缘对齐 */
  right: 0;
  /* 右边缘对齐 */
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
</style>