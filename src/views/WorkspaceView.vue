<template>
    <!-- 这里是整个导航栏 -->
    <div class="container-nav">
        <!-- 这里是自适应学习容器 -->
        <div class="icon-study">
            <div class="box-icon">
                <div class="icon-container">
                    <div class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="inline-block w-6 h-6 text-white">
                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="box-title">
                <div class="icon-text">自适应学习</div>
                <div class="text-learning">smart learning</div>
            </div>
        </div>

        <!-- 灰色框容器 -->
        <div class="nav-box">
            <!-- 这里是导航按钮容器 -->
            <div class="nav-buttons">
                <button class="nav-btn" :class="{ active: activeTab === 'center' }" @click="activeTab = 'center'">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-svg">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        <path d="M8 14v-4"></path>
                        <path d="M16 14v-4"></path>
                    </svg>
                    <span>学习中心</span>
                </button>
                <button class="nav-btn" :class="{ active: activeTab === 'path' }" @click="activeTab = 'path'">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-svg">
                        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                    </svg>
                    <span>学习路径</span>
                </button>
                <button class="nav-btn" :class="{ active: activeTab === 'map' }" @click="activeTab = 'map'">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-svg">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        <path d="M7.5 8h9"></path>
                        <path d="M7.5 12h9"></path>
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
        </div>

        <!-- 这里是登录注册按钮容器 -->
        <div class="auth-buttons">
            <button class="auth-btn login-btn">登录</button>
            <button class="auth-btn register-btn">注册</button>
        </div>
    </div>

    <!-- 内容区域 -->
    <div class="content-area">
        <div v-if="activeTab === 'center'">
            <div class="content-box">你好，这是学习中心内容</div>
        </div>
        <div v-else-if="activeTab === 'path'">
            <div class="content-box">你好，这是学习路径内容</div>
        </div>
        <div v-else-if="activeTab === 'map'">
            <div class="content-box">你好，这是知识图谱内容</div>
        </div>
        <div v-else-if="activeTab === 'ai'">
            <div class="content-box">你好，这是AI导师内容</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 当前激活的标签
const activeTab = ref('center')
</script>

<style scoped>
/* 导航栏整体样式 */
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

/* 登录注册按钮容器 */
.auth-buttons {
    display: flex;
    gap: 12px;
    /* 按钮间距 */
}

/* 按钮基础样式 */
.auth-btn {
    width: 80px;
    height: 40px;
    border-radius: 20px;
    /* 相同的圆角 */
    background-color: hwb(160 10% 25%);
    /* 相同的颜色 */
    border: none;
    color: white;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* 按钮悬停效果 */
.auth-btn:hover {
    background-color: hwb(160 5% 20%);
    /* 稍微亮一点的绿色 */
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* 登录按钮样式 */
.login-btn {
    background-color: hwb(160 10% 25%);
    /* 与icon-container相同的颜色 */
}

/* 注册按钮样式 */
.register-btn {
    background-color: hwb(160 15% 20%);
    /* 稍微不同的绿色 */
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
</style>