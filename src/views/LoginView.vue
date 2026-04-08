<template>
    <!-- 登录页面 -->
    <div class="login-container">
        <div class="login-card">
            <h1 class="login-title">登录</h1>

            <div class="form-group">
                <input type="text" v-model="username" placeholder="用户名" class="form-input">
            </div>

            <div class="form-group">
                <input type="password" v-model="password" placeholder="密码" class="form-input">
            </div>

            <button class="login-button" @click="handleLogin">登录</button>

            <div class="register-link">
                还没有账号？
                <a href="#" class="register-btn" @click.prevent="goToRegister">立即注册</a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 表单数据
const username = ref('')
const password = ref('')

// 登录处理
const handleLogin = () => {
    // 这里可以添加登录逻辑
    console.log('登录信息:', { username: username.value, password: password.value })
    // 模拟登录成功
    router.push('/workspace')
}

const goToRegister = () => {
    router.push('/register')
}
</script>

<style scoped>
/* 登录容器 */
.login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f8f9fa;
    padding: 20px;
}

/* 登录卡片 */
.login-card {
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 40px;
    width: 100%;
    max-width: 400px;
}

/* 登录标题 */
.login-title {
    font-size: 28px;
    font-weight: bold;
    color: #333;
    margin-bottom: 30px;
    text-align: center;
}

/* 表单组 */
.form-group {
    margin-bottom: 20px;
}

/* 输入框 */
.form-input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    font-size: 16px;
    transition: all 0.3s ease;
    box-sizing: border-box;
}

.form-input:focus {
    outline: none;
    border-color: #1ba766;
    box-shadow: 0 0 0 3px rgba(27, 167, 102, 0.1);
}

/* 登录按钮 */
.login-button {
    width: 100%;
    padding: 14px;
    background-color: hwb(160 10% 25%);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 20px;
}

.login-button:hover {
    background-color: hwb(160 5% 20%);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(27, 167, 102, 0.3);
}

.login-button:active {
    transform: translateY(0);
}

/* 注册链接 */
.register-link {
    text-align: center;
    font-size: 14px;
    color: #666;
}

/* 注册按钮 */
.register-btn {
    color: #1ba766;
    text-decoration: none;
    font-weight: 500;
    margin-left: 5px;
    transition: color 0.3s ease;
}

.register-btn:hover {
    color: #158c4f;
    text-decoration: underline;
}
</style>