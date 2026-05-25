<template>
    <!-- 注册页面 -->
    <div class="register-container">
        <div class="back-button">
            <button @click="goBack">返回</button>
        </div>
        <div class="register-card">
            <h1 class="register-title">注册</h1>

            <!-- 错误消息 -->
            <div v-if="errorMessage" class="error-message">
                <span class="error-icon">✖</span>
                {{ errorMessage }}
            </div>

            <div class="form-group">
                <input 
                    type="text" 
                    v-model="username" 
                    placeholder="用户名" 
                    class="form-input" 
                    :class="{ 'input-error': usernameError, 'input-success': username && !usernameError }"
                    @blur="validateUsername"
                >
                <span v-if="usernameError" class="field-error">{{ usernameError }}</span>
                <span v-if="username && !usernameError" class="field-success">✔ 用户名可用</span>
            </div>

            <div class="form-group">
                <input 
                    type="text" 
                    v-model="email" 
                    placeholder="邮箱" 
                    class="form-input" 
                    :class="{ 'input-error': emailError, 'input-success': email && !emailError }"
                    @blur="validateEmail"
                >
                <span v-if="emailError" class="field-error">{{ emailError }}</span>
                <span v-if="email && !emailError" class="field-success">✔ 邮箱格式正确</span>
            </div>
            
            <div class="form-group">
                <input 
                    type="password" 
                    v-model="password" 
                    placeholder="密码" 
                    class="form-input" 
                    :class="{ 'input-error': passwordError, 'input-success': password && !passwordError }"
                    @blur="validatePassword"
                >
                <span v-if="passwordError" class="field-error">{{ passwordError }}</span>
                <div v-if="password && !passwordError" class="password-strength">
                    <span class="strength-label">密码强度:</span>
                    <div class="strength-bar">
                        <div 
                            class="strength-fill" 
                            :class="passwordStrengthClass"
                            :style="{ width: passwordStrengthWidth }"
                        ></div>
                    </div>
                    <span class="strength-text">{{ passwordStrengthText }}</span>
                </div>
            </div>

            <div class="form-group">
                <input 
                    type="password" 
                    v-model="confirmPassword" 
                    placeholder="确认密码" 
                    class="form-input" 
                    :class="{ 'input-error': confirmPasswordError, 'input-success': confirmPassword && !confirmPasswordError }"
                    @blur="validateConfirmPassword"
                >
                <span v-if="confirmPasswordError" class="field-error">{{ confirmPasswordError }}</span>
                <span v-if="confirmPassword && !confirmPasswordError" class="field-success">✔ 密码一致</span>
            </div>

            <button 
                class="register-button" 
                @click="handleRegister"
                :disabled="isLoading"
            >
                <span v-if="isLoading" class="loading-spinner"></span>
                {{ isLoading ? '注册中...' : '注册' }}
            </button>

            <div class="login-link">
                已有账号？
                <a href="#" class="login-btn" @click.prevent="goToLogin">去登录</a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
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

// 字段级错误
const usernameError = ref('')
const emailError = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')

// 验证用户名
const validateUsername = () => {
    if (!username.value) {
        usernameError.value = '请输入用户名'
        return false
    }
    if (username.value.length < 3) {
        usernameError.value = '用户名至少需要3个字符'
        return false
    }
    if (username.value.length > 20) {
        usernameError.value = '用户名不能超过20个字符'
        return false
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username.value)) {
        usernameError.value = '用户名只能包含字母、数字和下划线'
        return false
    }
    usernameError.value = ''
    return true
}

// 验证邮箱
const validateEmail = () => {
    if (!email.value) {
        emailError.value = '请输入邮箱'
        return false
    }
    const emailRegex = /^[\w.-]+@[\w.-]+\.\w+$/
        if (!emailRegex.test(email.value)) {
        emailError.value = '请输入有效的邮箱地址'
        return false
    }
    emailError.value = ''
    return true
}

// 验证密码
const validatePassword = () => {
    if (!password.value) {
        passwordError.value = '请输入密码'
        return false
    }
    if (password.value.length < 6) {
        passwordError.value = '密码至少需要6个字符'
        return false
    }
    if (password.value.length > 30) {
        passwordError.value = '密码不能超过30个字符'
        return false
    }
    passwordError.value = ''
    return true
}

// 验证确认密码
const validateConfirmPassword = () => {
    if (!confirmPassword.value) {
        confirmPasswordError.value = '请确认密码'
        return false
    }
    if (password.value !== confirmPassword.value) {
        confirmPasswordError.value = '两次输入的密码不一致'
        return false
    }
    confirmPasswordError.value = ''
    return true
}

// 计算密码强度
const passwordStrength = computed(() => {
    if (!password.value) return 0
    let score = 0
    if (password.value.length >= 8) score++
    if (password.value.length >= 12) score++
    if (/[a-z]/.test(password.value)) score++
    if (/[A-Z]/.test(password.value)) score++
    if (/[0-9]/.test(password.value)) score++
    if (/[^a-zA-Z0-9]/.test(password.value)) score++
    return Math.min(score, 5)
})

const passwordStrengthClass = computed(() => {
    const strength = passwordStrength.value
    if (strength <= 2) return 'strength-weak'
    if (strength <= 3) return 'strength-medium'
    return 'strength-strong'
})

const passwordStrengthWidth = computed(() => {
    return `${(passwordStrength.value / 5) * 100}%`
})

const passwordStrengthText = computed(() => {
    const strength = passwordStrength.value
    if (strength <= 1) return '弱'
    if (strength <= 2) return '较弱'
    if (strength <= 3) return '中等'
    if (strength <= 4) return '较强'
    return '强'
})

// 表单验证
const validateForm = () => {
    errorMessage.value = ''
    const isUsernameValid = validateUsername()
    const isEmailValid = validateEmail()
    const isPasswordValid = validatePassword()
    const isConfirmValid = validateConfirmPassword()
    return isUsernameValid && isEmailValid && isPasswordValid && isConfirmValid
}

// 注册处理
const handleRegister = async () => {
    if (!validateForm()) {
        return
    }

    isLoading.value = true
    errorMessage.value = ''

    try {
        const result = await UserRegister(username.value, password.value, email.value)

        console.log('注册响应:', result)

        if (result.code === 200) {
            // 注册成功
            alert('注册成功！请登录')
            router.push('/login')
        } else {
            // 根据不同的错误码显示不同的错误信息
            if (result.code === 500) {
                errorMessage.value = result.message || '服务器内部错误，请稍后重试'
            } else if (result.code === 400) {
                errorMessage.value = result.message || '请求参数错误'
            } else if (result.code === 409) {
                errorMessage.value = result.message || '用户名或邮箱已存在'
            } else {
                errorMessage.value = result.message || '注册失败'
            }
        }
    } catch (error) {
        console.error('注册错误:', error)
        errorMessage.value = '网络连接失败，请检查后端服务是否启动'
    } finally {
        isLoading.value = false
    }
}

// 跳转到登录页面
const goToLogin = () => {
    router.push('/login')
}

const goBack = () => {
    router.push('/')
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

/* 错误消息 */
.error-message {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    background-color: #fee2e2;
    border: 1px solid #fecaca;
    border-radius: 8px;
    color: #dc2626;
    font-size: 14px;
    margin-bottom: 20px;
}

.error-icon {
    margin-right: 8px;
    font-weight: bold;
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

/* 输入框错误状态 */
.form-input.input-error {
    border-color: #ef4444;
    background-color: #fef2f2;
}

.form-input.input-error:focus {
    border-color: #ef4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

/* 输入框成功状态 */
.form-input.input-success {
    border-color: #1ba766;
    background-color: #f0fdf4;
}

/* 字段错误提示 */
.field-error {
    display: block;
    margin-top: 6px;
    color: #ef4444;
    font-size: 12px;
}

/* 字段成功提示 */
.field-success {
    display: block;
    margin-top: 6px;
    color: #1ba766;
    font-size: 12px;
}

/* 密码强度 */
.password-strength {
    margin-top: 8px;
    font-size: 12px;
}

.strength-label {
    color: #666;
    margin-right: 8px;
}

.strength-bar {
    display: inline-block;
    width: 120px;
    height: 6px;
    background-color: #e5e7eb;
    border-radius: 3px;
    overflow: hidden;
    vertical-align: middle;
    margin-right: 8px;
}

.strength-fill {
    height: 100%;
    border-radius: 3px;
    transition: all 0.3s ease;
}

.strength-fill.strength-weak {
    background-color: #ef4444;
}

.strength-fill.strength-medium {
    background-color: #f59e0b;
}

.strength-fill.strength-strong {
    background-color: #1ba766;
}

.strength-text {
    color: #666;
    font-weight: 500;
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
    display: flex;
    align-items: center;
    justify-content: center;
}

.register-button:hover:not(:disabled) {
    background-color: hwb(160 5% 20%);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(27, 167, 102, 0.3);
}

.register-button:active:not(:disabled) {
    transform: translateY(0);
}

.register-button:disabled {
    background-color: #a3a3a3;
    cursor: not-allowed;
    opacity: 0.7;
}

/* 加载动画 */
.loading-spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-right: 8px;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
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

/* 返回按钮 */
.back-button {
    position: absolute;
    top: 20px;
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
</style>