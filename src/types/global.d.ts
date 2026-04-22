declare global { interface Window { showGlobalMessage?: (text: string, type?: string) => void } }

// 将文件视为模块，避免全局污染
export {}