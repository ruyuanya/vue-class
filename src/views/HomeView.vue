<template>
  <p class="home-title">个性化学习中心</p>
  <p class="home-subtitle">让每一位学习者都能获得最适合自己的教育!</p>
  <div class="container">
    <div class="card" @click="goToMassiveTeaching">
      <div class="icon-container">
        <svg t="1774422027809" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="6502">
          <path d="M0 0h1024v1024H0z" fill="#FFFFFF" fill-opacity="0" p-id="6503"></path>
          <path
            d="M714.666667 752.554667v21.632c0 37.205333-13.781333 73.045333-38.784 100.608a32 32 0 0 1-47.445334-43.008 85.76 85.76 0 0 0 22.229334-57.642667v-21.632a125.269333 125.269333 0 0 0-94.976-122.069333 38.613333 38.613333 0 0 0-28.074667 3.541333 254.848 254.848 0 0 1-244.309333 0 38.656 38.656 0 0 0-28.373334-3.754667 125.312 125.312 0 0 0-95.018666 122.069334v21.632c0 21.333333 7.893333 41.856 22.229333 57.642666a32 32 0 0 1-47.402667 42.965334 149.546667 149.546667 0 0 1-38.784-100.608v-21.632a189.184 189.184 0 0 1 143.530667-184.192 103.509333 103.509333 0 0 1 74.922667 9.898666 190.421333 190.421333 0 0 0 182.058666 0 103.296 103.296 0 0 1 74.666667-9.728 189.44 189.44 0 0 1 143.530667 184.277334z m69.802666-184.149334a32 32 0 0 0-15.445333 62.122667 125.269333 125.269333 0 0 1 94.976 122.069333v21.632c0 21.333333-7.893333 41.856-22.229333 57.642667a32 32 0 0 0 47.445333 43.008c25.002667-27.562667 38.826667-63.402667 38.784-100.608v-21.632a189.226667 189.226667 0 0 0-143.530667-184.234667zM202.666667 341.333333a202.666667 202.666667 0 1 1 405.333333 0 202.666667 202.666667 0 0 1-405.333333 0z m64 0a138.666667 138.666667 0 1 0 277.333333 0 138.666667 138.666667 0 0 0-277.333333 0z m554.666666 0a202.794667 202.794667 0 0 0-177.365333-201.088 32 32 0 0 0-7.936 63.488 138.709333 138.709333 0 0 1 69.290667 245.888 32 32 0 1 0 40.021333 49.92A201.898667 201.898667 0 0 0 821.333333 341.333333z"
            fill="#41416E" p-id="6504"></path>
        </svg>
      </div>
      <h1>大规模因材施教</h1>
      <p class="text">AI诊断认知起点，辅助教师实现个性化与差异化教学</p>
      <div class="circle-container">
        <div class="circle">认知诊断</div>
        <div class="circle">智能导师</div>
        <div class="circle">因材施教</div>
      </div>
      <div class="enter">
        进入系统
        <span class="arrow">→</span>
      </div>
    </div>

    <div class="card" @click="goToAdaptiveStudy">
      <div class="icon-container">
        <svg t="1774422508451" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="8428" width="200" height="200">
          <path
            d="M267.648 758.976L72.192 540.288a33.408 33.408 0 0 1 0-43.776L111.68 452.8a26.112 26.112 0 0 1 39.488 0l136.32 153.088 303.744-340.8a26.112 26.112 0 0 1 39.488 0l39.488 43.776a33.28 33.28 0 0 1 0 43.648L307.136 758.976a26.112 26.112 0 0 1-39.488 0m205.696-108.16l96.64 108.16c10.88 12.032 28.608 12.032 39.488 0L972.48 352.448a33.28 33.28 0 0 0 0-43.648l-39.488-43.776a26.112 26.112 0 0 0-39.488 0l-303.744 340.8-38.08-42.752-78.336 87.68z"
            p-id="8429"></path>
        </svg>
      </div>
      <h1>自适应学习</h1>
      <p class="text">AI提供即时、个性化反馈，赋能学生自主学习</p>
      <div class="circle-container">
        <div class="circle">智能学习</div>
        <div class="circle">自主学习</div>
        <div class="circle">学习路径</div>
      </div>
      <div class="enter">
        进入系统
        <span class="arrow">→</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const goToMassiveTeaching = () => {
  router.push('/massive-teaching')
}
const goToAdaptiveStudy = () => {
  router.push('/adaptive-study')
}
</script>

<style scoped>
/* 标题 */
.home-title {
  text-align: center;
  font-size: 50px;
  font-weight: bold;
}

/* 副标题 */
.home-subtitle {
  text-align: center;
  font-size: 30px;
  margin-top: -10px;
}

.container {
  width: 800px;
  height: 400px;
  margin-left: 328px;
  /*   background-color: #fff; */
  /* #f5e6d3 */
  /* 背景颜色 */
  padding: 20px 25px;
  /* 内边距 */
  border-radius: 15px;
  /* 圆角 */
  margin-bottom: 20px;
  /* 以下仅用来测试盒子模型！ */
  /* 底部外边距 */
  /*   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); */
  /* 初始阴影 */
  /*   border: 1px solid #e6d5c3; */
  /* 边框 */
  transition: all 0.3s ease, border-color 0.3s ease, border-width 0.3s ease;
  /* 过渡效果 */

  /* 添加 Flexbox 布局 */
  display: flex;
  justify-content: space-between;
  /* 两端对齐，中间有间距 */
  align-items: center;
  /* 垂直居中对齐 */
  gap: 70px;
  /* 设置卡片之间的间距 */
}

/* 卡片 */
.card {
  width: 600px;
  height: 360px;
  padding: 20px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  margin-left: 20px;
  /* 动画组件 */
  border: 2px solid transparent;
  transition: all 0.5s ease
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
  width: 80px;
  height: 80px;
  background-color: hsl(160, 79%, 61%);
  border-radius: 15px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  width: 60px;
  /* SVG图标大小 */
  height: 60px;
}

.text {
  font-size: 18px;
}

.circle-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.circle {
  width: 80px;
  height: 30px;
  margin: 10px;
  border-radius: 40px;
  background-color: aquamarine;
  text-align: center;
  color: hsl(155, 80%, 27%);
  line-height: 30px;
  /* 与高度相同 */
  font-size: 16px;
}

.enter {
  margin-top: 20px;
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