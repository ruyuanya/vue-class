// API服务 - 连接真实后端API
import type { LoginResponse, UserInfo, RegisterResponse } from './types'

// 后端API基础URL
const API_BASE_URL = 'http://localhost:7003/api'

// 调用UserLogin存储过程
export const UserLogin = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/UserLogin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      // 处理HTTP错误状态
      return {
        code: response.status,
        message: data.message || '登录失败'
      }
    }
    
    // 解析后端返回的数据格式
    if (data.success && data.data && Array.isArray(data.data) && data.data.length > 0) {
      const result = data.data[0][0] // 提取存储过程返回的实际数据
      return {
        code: result.code || 200,
        message: result.message || '登录成功',
        user_id: result.user_id,
        username: result.username,
        email: result.email
      }
    } else {
      return {
        code: 500,
        message: '服务器返回数据格式错误'
      }
    }
  } catch (error) {
    console.error('登录请求失败:', error)
    return {
      code: 500,
      message: '网络连接失败，请检查后端服务是否启动'
    }
  }
}

// 调用UserRegister存储过程
export const UserRegister = async (username: string, password: string, email?: string): Promise<RegisterResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/UserRegister`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, email })
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      // 处理HTTP错误状态
      return {
        code: response.status,
        message: data.message || '注册失败'
      }
    }
    
    return data
  } catch (error) {
    console.error('注册请求失败:', error)
    return {
      code: 500,
      message: '网络连接失败，请检查后端服务是否启动'
    }
  }
}

// 获取用户信息
export const getUserInfo = async (userId: number): Promise<UserInfo | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/GetUserInfo?userId=${userId}`)
    
    if (!response.ok) {
      return null
    }
    
    const data = await response.json()
    return data.user || null
  } catch (error) {
    console.error('获取用户信息失败:', error)
    return null
  }
}

// 登出
export const userLogout = async (): Promise<{ code: number; message: string }> => {
  return {
    code: 200,
    message: '登出成功'
  }
}

// 健康检查
export const healthCheck = async (): Promise<{ status: string; message: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`)
    const data = await response.json()
    return data
  } catch (error) {
    return {
      status: 'error',
      message: '后端服务不可用'
    }
  }
}