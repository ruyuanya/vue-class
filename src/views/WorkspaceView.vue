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
        <!-- 这里是登录注册按钮容器 -->
        <div class="auth-buttons">
            <button class="auth-btn login-btn">登录</button>
            <button class="auth-btn register-btn">注册</button>
        </div>
    </div>
</template>

<script setup lang="ts">
// 组件逻辑
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
</style>