<template>
    <!-- 登录页面 -->
    <div class="login-container">
        <div class="back-button">
            <button @click="goBack">返回</button>
        </div>
        <div class="login-card">
            <h1 class="login-title">登录</h1>

            <div class="form-group">
                <input type="text" v-model="username" placeholder="用户名" class="form-input"
                    @keyup.enter="handleLogin">
            </div>

            <div class="form-group">
                <input type="password" v-model="password" placeholder="密码" class="form-input"
                    @keyup.enter="handleLogin">
            </div>

            <button class="login-button" @click="handleLogin" :disabled="isLoading">
                {{ isLoading ? '登录中...' : '登录' }}
            </button>

            <div class="register-link">
                还没有账号？
                <a href="#" class="register-btn" @click.prevent="goToRegister">立即注册</a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { UserLogin } from '../services/api'
import { login } from '../stores/userStore'

const router = useRouter()
const route = useRoute()

// 表单数据
const username = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

// 返回首页
const goBack = () => {
    router.push('/')
}

// 登录处理 - 集成MySQL存储过程（登录成功后优先跳转 route.query.redirect 指定的页面）
const handleLogin = async () => {
    // 表单验证
    if (!username.value.trim()) {
        showGlobalMessage('请输入用户名', 'error')
        return
    }
    
    if (!password.value.trim()) {
        showGlobalMessage('请输入密码', 'error')
        return
    }

    isLoading.value = true

    try {
        // 调用API服务（调用真实的MySQL存储过程）
        const response = await UserLogin(username.value, password.value)
        
        if (response && response.code === 200) {
            // 登录成功 - 根据存储过程返回的数据
            showGlobalMessage(`${response.message}！欢迎回来，${response.username}`, 'success')
            
            // 保存用户信息到状态管理（如有）
            if (response.user_id && response.username && response.email) {
                login({
                    id: response.user_id,
                    username: response.username,
                    email: response.email
                })
            }

            // 登录成功后优先跳转到 redirect（若有），否则回到 workspace
            const redirect = (route.query.redirect as string) || ''
            setTimeout(() => {
                if (redirect) {
                    // 如果是命名路由或完整路径，直接 push
                    router.push(redirect)
                } else {
                    router.push('/workspace')
                }
            }, 800)
        } else {
            // 登录失败 - 根据存储过程返回的错误信息
            showGlobalMessage(response?.message || '登录失败', 'error')
        }
    } catch (error) {
        console.error('登录失败:', error)
        showGlobalMessage('网络错误，请稍后重试', 'error')
    } finally {
        isLoading.value = false
    }
}

// 跳转到注册页面
const goToRegister = () => {
    router.push('/register')
}

// 全局消息函数
const showGlobalMessage = (text: string, type: string = 'success') => {
    // @ts-ignore
    if (typeof window.showGlobalMessage === 'function') {
        // 使用 App.vue 暴露的全局提示
        window.showGlobalMessage(text, type)
    } else {
        // 回退方案（简易提示）
        alert(text)
    }
}
</script>

<style scoped>
/* 返回按钮 */
.back-button {
    position: absolute;
    top: 70px;
    left: 20px;
    z-index: 10;
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

/* 登录容器 */
.login-container {
    /* top: 100px; */
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f8f9fa;
    padding: 20px;
    position: relative;
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

.login-button:hover:not(:disabled) {
    background-color: hwb(160 5% 20%);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(27, 167, 102, 0.3);
}

.login-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
}

.login-button:active:not(:disabled) {
    transform: translateY(0);
}

/* 注册链接 */
.register-link {
    text-align: center;
    font-size: 14px;
    color: #666;
    margin-bottom: 20px;
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

/* 测试账号样式 */
.test-accounts {
    margin-top: 20px;
    padding: 15px;
    background-color: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid #1ba766;
}

.test-accounts h3 {
    margin: 0 0 10px 0;
    font-size: 14px;
    color: #333;
    font-weight: 600;
}

.test-accounts p {
    margin: 5px 0;
    font-size: 12px;
    color: #666;
    line-height: 1.4;
}
</style>