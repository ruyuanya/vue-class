<template>
    <div class="workspace-container">
        <!-- 导航栏 -->
        <div class="container-nav">
            <!-- 返回按钮 -->
            <div class="back-button">
                <button @click="$router.push('/massive-teaching')">返回</button>
            </div>

            <!-- 自适应学习容器 -->
            <div class="icon-study">
                <div class="icon-container">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
                        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
                        <path d="M5 3v4"></path>
                        <path d="M19 17v4"></path>
                        <path d="M3 5h4"></path>
                        <path d="M17 19h4"></path>
                    </svg>
                </div>
            </div>

            <!-- 导航按钮容器 -->
            <div class="nav-buttons">
                <button class="nav-btn" :class="{ active: activeTab === 'center' }" @click="activeTab = 'center'">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-svg">
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    <span>学习中心</span>
                </button>
                <button class="nav-btn" :class="{ active: activeTab === 'path' }" @click="activeTab = 'path'">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-svg">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                    </svg>
                    <span>学习路径</span>
                </button>
                <button class="nav-btn" :class="{ active: activeTab === 'map' }" @click="activeTab = 'map'">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-svg">
                        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon>
                        <line x1="9" y1="3" x2="9" y2="18"></line>
                        <line x1="15" y1="6" x2="15" y2="21"></line>
                    </svg>
                    <span>知识图谱</span>
                </button>
                <button class="nav-btn" :class="{ active: activeTab === 'ai' }" @click="activeTab = 'ai'">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-svg">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                        <path d="M12 17h.01"></path>
                    </svg>
                    <span>AI导师</span>
                </button>
            </div>

            <!-- 用户信息或登录注册按钮 -->
            <div class="auth-buttons">
                <!-- 登出按钮已移除 -->
            </div>
        </div>

        <!-- 内容区域 -->
        <div class="content-area">
            <!-- 学习中心内容 -->
            <div v-if="activeTab === 'center'" class="learning-center">
                <!-- 欢迎区域 -->
                <div class="welcome-section">
                    <h1 v-if="isLoggedIn">欢迎回来，{{ currentUser?.username }}！</h1>
                    <h1 v-else>欢迎来到学习中心</h1>
                    <p>开始您的个性化学习之旅</p>
                </div>

                <!-- 学习统计 -->
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon">📚</div>
                        <div class="stat-info">
                            <h3>已学习课程</h3>
                            <p class="stat-number">12</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">⏱️</div>
                        <div class="stat-info">
                            <h3>学习时长</h3>
                            <p class="stat-number">36h</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">📊</div>
                        <div class="stat-info">
                            <h3>完成率</h3>
                            <p class="stat-number">85%</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">⭐</div>
                        <div class="stat-info">
                            <h3>平均评分</h3>
                            <p class="stat-number">4.2</p>
                        </div>
                    </div>
                </div>

                <!-- 进行中的课程 -->
                <div class="ongoing-courses">
                    <h2>进行中的课程</h2>
                    <div class="course-list">
                        <div class="course-card">
                            <div class="course-info">
                                <h4>Vue.js 高级开发</h4>
                                <p>已完成 65%</p>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 65%"></div>
                                </div>
                            </div>
                        </div>
                        <div class="course-card">
                            <div class="course-info">
                                <h4>TypeScript 实战</h4>
                                <p>已完成 40%</p>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 40%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 推荐课程 -->
                <div class="recommended-courses">
                    <h2>推荐课程</h2>
                    <div class="course-grid">
                        <div class="rec-course-card">
                            <div class="rec-course-image">📱</div>
                            <div class="rec-course-info">
                                <h4>移动端开发</h4>
                                <p>学习React Native和Flutter</p>
                                <button class="start-btn">开始学习</button>
                            </div>
                        </div>
                        <div class="rec-course-card">
                            <div class="rec-course-image">🔗</div>
                            <div class="rec-course-info">
                                <h4>后端开发</h4>
                                <p>Node.js与数据库设计</p>
                                <button class="start-btn">开始学习</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else-if="activeTab === 'path'" class="learning-path">
                <!-- 页面标题和描述 -->
                <div class="path-header">
                    <h1>个性化学习路径</h1>
                    <p>根据您的学习目标和进度，为您量身定制的学习路径</p>
                </div>

                <!-- 学习目标设置 -->
                <div class="goal-section">
                    <div class="goal-card">
                        <h3>当前学习目标</h3>
                        <div class="goal-info">
                            <div class="goal-item">
                                <span class="goal-label">主要方向：</span>
                                <span class="goal-value">全栈Web开发</span>
                            </div>
                            <div class="goal-item">
                                <span class="goal-label">预计完成：</span>
                                <span class="goal-value">6个月</span>
                            </div>
                            <div class="goal-item">
                                <span class="goal-label">当前进度：</span>
                                <span class="goal-value">25%</span>
                            </div>
                        </div>
                        <button class="edit-goal-btn">修改目标</button>
                    </div>
                </div>

                <!-- 学习路径时间线 -->
                <div class="timeline-section">
                    <h2>学习路径时间线</h2>
                    <div class="timeline">
                        <!-- 阶段1：基础阶段 -->
                        <div class="timeline-item completed">
                            <div class="timeline-marker">
                                <div class="marker-icon">✓</div>
                            </div>
                            <div class="timeline-content">
                                <div class="timeline-header">
                                    <h4>阶段一：前端基础</h4>
                                    <span class="timeline-status completed">已完成</span>
                                </div>
                                <div class="timeline-body">
                                    <div class="skill-list">
                                        <span class="skill-tag completed">HTML/CSS</span>
                                        <span class="skill-tag completed">JavaScript基础</span>
                                        <span class="skill-tag completed">响应式设计</span>
                                    </div>
                                    <p class="timeline-desc">掌握网页开发基础，构建静态页面</p>
                                    <div class="timeline-progress">
                                        <div class="progress-bar">
                                            <div class="progress-fill" style="width: 100%"></div>
                                        </div>
                                        <span class="progress-text">100%完成</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 阶段2：Vue.js开发 -->
                        <div class="timeline-item current">
                            <div class="timeline-marker">
                                <div class="marker-icon">⚡</div>
                            </div>
                            <div class="timeline-content">
                                <div class="timeline-header">
                                    <h4>阶段二：Vue.js框架</h4>
                                    <span class="timeline-status current">进行中</span>
                                </div>
                                <div class="timeline-body">
                                    <div class="skill-list">
                                        <span class="skill-tag completed">Vue基础</span>
                                        <span class="skill-tag current">Vue Router</span>
                                        <span class="skill-tag pending">Vuex/Pinia</span>
                                        <span class="skill-tag pending">组件开发</span>
                                    </div>
                                    <p class="timeline-desc">学习现代前端框架，构建单页应用</p>
                                    <div class="timeline-progress">
                                        <div class="progress-bar">
                                            <div class="progress-fill" style="width: 65%"></div>
                                        </div>
                                        <span class="progress-text">65%完成</span>
                                    </div>
                                    <div class="action-buttons">
                                        <button class="continue-btn">继续学习</button>
                                        <button class="review-btn">复习</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 阶段3：后端开发 -->
                        <div class="timeline-item pending">
                            <div class="timeline-marker">
                                <div class="marker-icon">🔜</div>
                            </div>
                            <div class="timeline-content">
                                <div class="timeline-header">
                                    <h4>阶段三：Node.js后端</h4>
                                    <span class="timeline-status pending">待开始</span>
                                </div>
                                <div class="timeline-body">
                                    <div class="skill-list">
                                        <span class="skill-tag pending">Node.js基础</span>
                                        <span class="skill-tag pending">Express框架</span>
                                        <span class="skill-tag pending">数据库设计</span>
                                        <span class="skill-tag pending">API开发</span>
                                    </div>
                                    <p class="timeline-desc">掌握服务器端开发，构建完整应用</p>
                                    <div class="timeline-estimate">
                                        <span>预计开始：2周后</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 阶段4：全栈项目 -->
                        <div class="timeline-item pending">
                            <div class="timeline-marker">
                                <div class="marker-icon">🎯</div>
                            </div>
                            <div class="timeline-content">
                                <div class="timeline-header">
                                    <h4>阶段四：全栈项目</h4>
                                    <span class="timeline-status pending">待开始</span>
                                </div>
                                <div class="timeline-body">
                                    <div class="skill-list">
                                        <span class="skill-tag pending">项目架构</span>
                                        <span class="skill-tag pending">部署上线</span>
                                        <span class="skill-tag pending">性能优化</span>
                                    </div>
                                    <p class="timeline-desc">综合运用所学知识，完成真实项目</p>
                                    <div class="timeline-estimate">
                                        <span>预计开始：3个月后</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 推荐学习资源 -->
                <div class="resources-section">
                    <h2>推荐学习资源</h2>
                    <div class="resources-grid">
                        <div class="resource-card">
                            <div class="resource-icon">📖</div>
                            <div class="resource-info">
                                <h4>Vue官方文档</h4>
                                <p>最权威的Vue.js学习资料</p>
                                <a href="#" class="resource-link">查看文档</a>
                            </div>
                        </div>
                        <div class="resource-card">
                            <div class="resource-icon">🎥</div>
                            <div class="resource-info">
                                <h4>实战视频课程</h4>
                                <p>从零开始构建Vue应用</p>
                                <a href="#" class="resource-link">开始学习</a>
                            </div>
                        </div>
                        <div class="resource-card">
                            <div class="resource-icon">💻</div>
                            <div class="resource-info">
                                <h4>练习项目</h4>
                                <p>Todo应用开发实战</p>
                                <a href="#" class="resource-link">开始挑战</a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 学习建议 -->
                <div class="suggestion-section">
                    <div class="suggestion-card">
                        <h3>AI学习建议</h3>
                        <div class="suggestion-content">
                            <p>根据您的学习进度，建议您：</p>
                            <ul>
                                <li>每天花1-2小时学习Vue Router相关概念</li>
                                <li>完成至少3个路由相关的练习项目</li>
                                <li>阅读官方文档中的路由守卫部分</li>
                                <li>尝试构建一个多页面的个人博客应用</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else-if="activeTab === 'map'">
                <div class="content-box">这是知识图谱内容</div>
            </div>
            <div v-else-if="activeTab === 'ai'">
                <div class="content-box">这是AI导师内容</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getIsLoggedIn, getUser } from '../stores/userStore'

const router = useRouter()

// 获取用户状态
const isLoggedIn = computed(() => getIsLoggedIn())
const currentUser = computed(() => getUser())

// 登录/注册按钮点击
const gotoLogin = () => {
    router.push('/login')
}

const goToRegister = () => {
    router.push('/register')
}

// 当前激活的标签
const activeTab = ref('center')

// 全局消息函数
// declare global {
//     interface Window {
//         showGlobalMessage: (text: string, type?: string) => void
//     }
// }

const showGlobalMessage = (text: string, type: string = 'success') => {
    if (window.showGlobalMessage) {
        window.showGlobalMessage(text, type)
    }
}
</script>

<style scoped>
/* 将页面整体下移，避免被 fixed 顶部导航覆盖 */
.workspace-container {
    padding-top: 80px; /* 根据 App.vue 中 top-nav 高度调整（可改为 72px / 80px 等） */
    box-sizing: border-box;
    min-height: calc(100vh - 100px);
}

/* 导航栏整体样式 */

/* 用户信息样式 */
.user.user-info {
    display: flex;
    align-items: center;
    gap: 15px;
}

.welcome-text {
    color: #333;
    font-weight: 500;
}

.logout-btn {
    width: 80px;
    height: 40px;
    border-radius: 20px;
    background-color: #dc3545;
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

.logout-btn:hover {
    background-color: #c82333;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.logout-btn:active {
    transform: translateY(0);
}
/* 返回按钮 */
.back-button {
    position: static;
    display: flex;
    align-items: center;
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
.container-nav {
    width: 100%;
    height: 60px;
    padding-left: 10%;
    padding-right: 10%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* 左右两端对齐 */
    box-sizing: border-box;
    /* 确保padding包含在宽度内 */
}

/* 自适应学习容器 */
.icon-container {

    width: 50px;
    height: 50px;
    border-radius: 30%;
    background-color: hwb(160 10% 25%);
    padding-top: 2px;
    transition: all 0.3s ease;
}

.icon-container:hover {
    background-color: hwb(160 5% 20%);
    /* 稍微亮一点的绿色 */
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.icon {
    padding: 11px;
    color: white;
}

.icon-study {
    position: relative;
    width: 150px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.box-icon {
    width: 52px;
    height: 100%;
    padding: 2%;
}

.box-title {
    width: 90px;
    height: 100%;
}

.text-learning {
    font-size: 12px;
    text-align: center;
}

.icon-text {
    padding-top: 4px;
    font-size: 17px;
    font-weight: bold;
    text-align: center;
}

/* 灰色框容器 */
.nav-box {
    background-color: #f5f5f5;
    border-radius: 20px;
    padding: 6px 12px;
    display: flex;
    align-items: center;
    flex: 1;
    max-width: 500px;
    margin: 0 20px;
}

/* 导航按钮容器 */
.nav-buttons {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
}

/* 导航按钮样式 */
.nav-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border: none;
    background: none;
    border-radius: 16px;
    font-size: 14px;
    font-weight: 500;
    color: #666;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    flex: 1;
    justify-content: center;
}

/* 导航按钮悬停效果 */
.nav-btn:hover {
    background-color: #e8f5e8;
    color: #1ba766;
}

/* 激活状态 */
.nav-btn.active {
    background-color: #1ba766;
    color: white;
}

/* 图标样式 */
.icon-svg {
    width: 14px;
    height: 14px;
    stroke: currentColor;
}

/* 导航按钮文字 */
.nav-btn span {
    white-space: nowrap;
}

/* 内容区域 */
.content-area {
    padding: 40px 10%;
    min-height: 400px;
}

/* 内容盒子 */
.content-box {
    background-color: white;
    border-radius: 12px;
    padding: 40px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    font-size: 18px;
    color: #333;
    text-align: center;
}
/* 学习中心样式 */
.learning-center {
    max-width: 1200px;
    margin: 0 auto;
}

/* 欢迎区域 */
.welcome-section {
    text-align: center;
    margin-bottom: 40px;
    padding: 30px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 15px;
    color: white;
}

.welcome-title {
    font-size: 2.5rem;
    margin-bottom: 10px;
    font-weight: 700;
}

.welcome-subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
}

/* 统计网格 */
.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
}

.stat-card {
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 20px;
    transition: transform 0.3s ease;
}

.stat-card:hover {
    transform: translateY(-5px);
}

.stat-icon {
    font-size: 2.5rem;
}

.stat-number {
    font-size: 2rem;
    font-weight: bold;
    color: #1ba766;
}

.stat-label {
    color: #666;
    font-size: 0.9rem;
}

/* 区域标题 */
.section {
    margin-bottom: 40px;
}

.section-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 20px;
    color: #333;
}

/* 课程网格 */
.courses-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 20px;
}

.course-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.course-card:hover {
    transform: translateY(-5px);
}

.course-image {
    height: 120px;
    background: linear-gradient(135deg, #1ba766, #158c4f);
}

.course-info {
    padding: 20px;
}

.course-title {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 10px;
    color: #333;
}

.course-description {
    color: #666;
    margin-bottom: 15px;
    line-height: 1.5;
}

.progress-bar {
    width: 100%;
    height: 6px;
    background: #f0f0f0;
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 8px;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #1ba766, #158c4f);
    border-radius: 3px;
    transition: width 0.3s ease;
}

.progress-text {
    font-size: 0.9rem;
    color: #666;
    text-align: right;
}

/* 推荐课程网格 */
.recommendations-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}

.recommendation-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.recommendation-card:hover {
    transform: translateY(-5px);
}

.rec-image {
    height: 100px;
    background: linear-gradient(135deg, #667eea, #764ba2);
}

.rec-info {
    padding: 20px;
}

.rec-info h4 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 8px;
    color: #333;
}

.rec-info p {
    color: #666;
    margin-bottom: 15px;
    line-height: 1.4;
}

.start-btn {
    background: #1ba766;
    color: white;
    border: none;
    padding: 8px 20px;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}

.start-btn:hover {
    background: #158c4f;
    transform: translateY(-2px);
}

/* 内容区域 */
.content-area {
    padding: 40px 10%;
    min-height: 400px;
}

/* 内容盒子 */
.content-box {
    background-color: white;
    border-radius: 12px;
    padding: 40px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    font-size: 18px;
    color: #333;
    text-align: center;
}

/* 学习路径样式 */
.learning-path {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.path-header {
    text-align: center;
    margin-bottom: 40px;
}

.path-header h1 {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 10px;
}

.path-header p {
    font-size: 1.1rem;
    color: #7f8c8d;
}

/* 目标设置 */
.goal-section {
    margin-bottom: 40px;
}

.goal-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.goal-card h3 {
    margin-bottom: 20px;
    font-size: 1.5rem;
}

.goal-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 20px;
}

.goal-item {
    display: flex;
    flex-direction: column;
}

.goal-label {
    font-size: 0.9rem;
    opacity: 0.8;
    margin-bottom: 5px;
}

.goal-value {
    font-size: 1.2rem;
    font-weight: 600;
}

.edit-goal-btn {
    background: rgba(255,255,255,0.2);
    border: 1px solid rgba(255,255,255,0.3);
    color: white;
    padding: 10px 20px;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.edit-goal-btn:hover {
    background: rgba(255,255,255,0.3);
}

/* 时间线样式 */
.timeline-section {
    margin-bottom: 40px;
}

.timeline-section h2 {
    margin-bottom: 30px;
    color: #2c3e50;
}

.timeline {
    position: relative;
    padding-left: 30px;
}

.timeline::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #e0e0e0;
}

.timeline-item {
    position: relative;
    margin-bottom: 40px;
}

.timeline-marker {
    position: absolute;
    left: -40px;
    top: 0;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
}

.timeline-item.completed .timeline-marker {
    background: #27ae60;
    color: white;
}

.timeline-item.current .timeline-marker {
    background: #3498db;
    color: white;
    animation: pulse 2s infinite;
}

.timeline-item.pending .timeline-marker {
    background: #bdc3c7;
    color: white;
}

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}

.timeline-content {
    background: white;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.08);
    border-left: 4px solid;
}

.timeline-item.completed .timeline-content {
    border-left-color: #27ae60;
}

.timeline-item.current .timeline-content {
    border-left-color: #3498db;
}

.timeline-item.pending .timeline-content {
    border-left-color: #bdc3c7;
}

.timeline-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.timeline-header h4 {
    margin: 0;
    color: #2c3e50;
}

.timeline-status {
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
}

.timeline-status.completed {
    background: #d5f4e6;
    color: #27ae60;
}

.timeline-status.current {
    background: #d6eaf8;
    color: #3498db;
}

.timeline-status.pending {
    background: #ecf0f1;
    color: #7f8c8d;
}

.skill-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 15px;
}

.skill-tag {
    padding: 5px 12px;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 500;
}

.skill-tag.completed {
    background: #d5f4e6;
    color: #27ae60;
}

.skill-tag.current {
    background: #d6eaf8;
    color: #3498db;
}

.skill-tag.pending {
    background: #ecf0f1;
    color: #7f8c8d;
}

.timeline-desc {
    color: #7f8c8d;
    margin-bottom: 15px;
}

.timeline-progress {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 15px;
}

.progress-bar {
    flex: 1;
    height: 8px;
    background: #ecf0f1;
    border-radius: 4px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #3498db, #2980b9);
    border-radius: 4px;
    transition: width 0.3s ease;
}

.progress-text {
    font-size: 0.9rem;
    color: #7f8c8d;
    min-width: 80px;
}

.action-buttons {
    display: flex;
    gap: 10px;
}

.continue-btn, .review-btn {
    padding: 8px 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.3s ease;
}

.continue-btn {
    background: #3498db;
    color: white;
}

.continue-btn:hover {
    background: #2980b9;
}

.review-btn {
    background: #ecf0f1;
    color: #7f8c8d;
}

.review-btn:hover {
    background: #bdc3c7;
}

.timeline-estimate {
    color: #7f8c8d;
    font-style: italic;
}

/* 资源推荐 */
.resources-section {
    margin-bottom: 40px;
}

.resources-section h2 {
    margin-bottom: 30px;
    color: #2c3e50;
}

.resources-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}

.resource-card {
    background: white;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.08);
    display: flex;
    align-items: center;
    gap: 20px;
    transition: transform 0.3s ease;
}

.resource-card:hover {
    transform: translateY(-5px);
}

.resource-icon {
    font-size: 2rem;
}

.resource-info h4 {
    margin: 0 0 10px 0;
    color: #2c3e50;
}

.resource-info p {
    margin: 0 0 15px 0;
    color: #7f8c8d;
    font-size: 0.9rem;
}

.resource-link {
    color: #3498db;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
}

.resource-link:hover {
    color: #2980b9;
}

/* 学习建议 */
.suggestion-card {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.suggestion-card h3 {
    margin-bottom: 20px;
    font-size: 1.5rem;
}

.suggestion-content ul {
    list-style: none;
    padding: 0;
}

.suggestion-content li {
    padding: 8px 0;
    border-bottom: 1px solid rgba(255,255,255,0.2);
}

.suggestion-content li:last-child {
    border-bottom: none;
}
</style>