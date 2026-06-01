// API服务 - 连接真实后端API
import axios, { type AxiosResponse } from 'axios'
import type { LoginResponse, UserInfo, RegisterResponse } from './types'

// 创建axios实例
const apiClient = axios.create({
  baseURL: 'http://localhost:7003/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    // 可以在这里添加token等请求头
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API请求错误:', error)
    return Promise.reject(error)
  }
)

// 调用UserLogin存储过程
export const UserLogin = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post('/UserLogin', { username, password })
    const data = response.data
    
    if (data.success && data.data && Array.isArray(data.data) && data.data.length > 0) {
      const result = data.data[0][0]
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
    const response = await apiClient.post('/UserRegister', { username, password, email })
    const data = response.data
    
    if (data.success === false) {
      return {
        code: data.code || 500,
        message: data.message || '注册失败'
      }
    }
    
    if (data.data && Array.isArray(data.data) && data.data.length > 0) {
      const result = data.data[0][0]
      return {
        code: result.code || 200,
        message: result.message || '注册成功',
        user_id: result.user_id
      }
    }
    
    return {
      code: data.code || 200,
      message: data.message || '注册成功',
      user_id: data.user_id
    }
  } catch (error: any) {
    console.error('注册请求失败:', error)
    if (error.response) {
      return {
        code: error.response.status,
        message: error.response.data?.message || error.response.data?.error || `服务器错误 ${error.response.status}`
      }
    }
    return {
      code: 500,
      message: '网络连接失败，请检查后端服务是否启动'
    }
  }
}

// 获取用户信息
export const getUserInfo = async (userId: number): Promise<UserInfo | null> => {
  try {
    const response = await apiClient.get('/GetUserInfo', { params: { userId } })
    return response.data.user || null
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
    const response = await apiClient.get('/health')
    return response.data
  } catch (error) {
    return {
      status: 'error',
      message: '后端服务不可用'
    }
  }
}

// 添加课程
export const addClass = async (className: string, teacher: string, classroom: string, startTime: string): Promise<{ code: number; message: string; classId?: number }> => {
  try {
    const response = await apiClient.post('/addCourse', {
      class_name: className,
      teacher,
      classroom,
      start_time: startTime
    })
    const data = response.data
    
    let classId = null
    if (data.success && data.data && Array.isArray(data.data) && data.data.length > 0 && data.data[0].length > 0) {
      classId = data.data[0][0].new_id
    }
    
    return {
      code: 200,
      message: '添加课程成功',
      classId
    }
  } catch (error: any) {
    console.error('添加课程请求失败:', error)
    if (error.response) {
      return {
        code: error.response.status,
        message: error.response.data?.message || '添加课程失败'
      }
    }
    return {
      code: 500,
      message: '网络连接失败，请检查后端服务是否启动'
    }
  }
}

// 获取课程列表
export const getCourses = async (): Promise<Array<{ id: number; class_name: string; teacher: string; classroom: string; start_time: string }>> => {
  try {
    const response = await apiClient.get('/getCourse')
    const data = response.data
    
    if (data.success && data.data && Array.isArray(data.data) && data.data.length > 0) {
      return data.data[0] || []
    }
    return []
  } catch (error) {
    console.error('获取课程列表失败:', error)
    return []
  }
}