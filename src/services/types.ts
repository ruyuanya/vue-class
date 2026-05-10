// API类型定义
export interface LoginResponse {
  code: number
  message: string
  user_id?: number
  username?: string
  email?: string
}

export interface UserInfo {
  id: number
  username: string
  email: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterResponse {
  code: number
  message: string
  user_id?: number
}