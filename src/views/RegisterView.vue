<template>
    <!-- 注册页面 -->
    <div class="register-container">
        <div class="register-card">
            <h1 class="register-title">注册</h1>

            <div class="form-group">
                <input type="text" v-model="username" placeholder="用户名" class="form-input">
            </div>

            <div class="form-group">
                <input type="password" v-model="password" placeholder="密码" class="form-input">
            </div>

            <div class="form-group">
                <input type="password" v-model="confirmPassword" placeholder="确认密码" class="form-input">
            </div>

            <button class="register-button" @click="handleRegister">注册</button>

            <div class="login-link">
                已有账号？
                <a href="#" class="login-btn" @click.prevent="goToLogin">去登录</a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { UserRegister } from '../services/api'
const router = useRouter()

// 表单数据
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const email = ref('')
const isLoading = ref(false)
const errorMessage = ref('')


// 注册处理
const handleRegister = async () => {
    if (!username.value || !password.value) {
        errorMessage.value = '请输入用户名和密码'
        return
    }
    
    if (password.value !== confirmPassword.value) {
        errorMessage.value = '两次输入的密码不一致'
        return
    }
    
    if (password.value.length < 6) {
        errorMessage.value = '密码长度不能少于6位'
        return
    }
    
    isLoading.value = true
    errorMessage.value = ''
    
    try {
        const result = await UserRegister(username.value, password.value, email.value)
        
        if (result.code === 200) {
            // 注册成功
            alert('注册成功！请登录')
            router.push('/login')
        } else {
            errorMessage.value = result.message || '注册失败'
        }
    } catch (error) {
        console.error('注册错误:', error)
        errorMessage.value = '注册失败，请稍后重试'
    } finally {
        isLoading.value = false
    }
}

// 跳转到登录页面
const goToLogin = () => {
    router.push('/login')
}
</script>

<style scoped>
/* 注册容器 */
.register-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f8f9fa;
    padding: 20px;
}

/* 注册卡片 */
.register-card {
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 40px;
    width: 100%;
    max-width: 400px;
}

/* 注册标题 */
.register-title {
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

/* 注册按钮 */
.register-button {
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

.register-button:hover {
    background-color: hwb(160 5% 20%);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(27, 167, 102, 0.3);
}

.register-button:active {
    transform: translateY(0);
}

/* 登录链接 */
.login-link {
    text-align: center;
    font-size: 14px;
    color: #666;
}

/* 登录按钮 */
.login-btn {
    color: #1ba766;
    text-decoration: none;
    font-weight: 500;
    margin-left: 5px;
    transition: color 0.3s ease;
}

.login-btn:hover {
    color: #158c4f;
    text-decoration: underline;
}
</style>