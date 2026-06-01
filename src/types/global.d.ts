// 全局类型定义
declare global {
  interface Window {
    showGlobalMessage?: (text: string, type?: 'success' | 'error' | 'warning' | 'info') => void
  }
}

// 将文件视为模块，避免全局污染
export {}