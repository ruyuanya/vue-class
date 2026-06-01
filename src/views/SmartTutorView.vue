<template>
  <div class="smart-tutor-container">
    <!-- 返回按钮 -->
    <div class="back-button">
      <button @click="$router.push('/massive-teaching')">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="back-icon">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
        返回
      </button>
    </div>

    <!-- AI导师内容 -->
    <div class="ai-tutor">
      <div class="tutor-header">
        <div class="tutor-avatar">
          <div class="avatar-icon">🤖</div>
        </div>
        <div class="tutor-info">
          <h1>智能导师</h1>
          <p>随时为您解答问题，提供个性化学习建议</p>
        </div>
        <div class="tutor-status">
          <span class="status-indicator online">在线</span>
        </div>
      </div>

      <div class="tutor-container">
        <!-- 对话区域 -->
        <div class="chat-area">
          <div class="chat-messages">
            <div class="message ai-message">
              <div class="message-avatar">🤖</div>
              <div class="message-content">
                <div class="message-text">
                  您好！我是您的AI学习导师。我可以帮您：
                  <ul>
                    <li>解答编程问题</li>
                    <li>提供学习建议</li>
                    <li>推荐学习资源</li>
                    <li>制定学习计划</li>
                  </ul>
                  请告诉我您需要什么帮助？
                </div>
                <div class="message-time">刚刚</div>
              </div>
            </div>

            <div v-for="(message, index) in chatMessages" :key="index" 
                 :class="['message', message.type + '-message']">
              <div class="message-avatar">
                {{ message.type === 'user' ? '👤' : '🤖' }}
              </div>
              <div class="message-content">
                <div class="message-text">{{ message.text }}</div>
                <div class="message-time">{{ message.time }}</div>
              </div>
            </div>
          </div>

          <!-- 输入区域 -->
          <div class="chat-input-area">
            <div class="quick-questions">
              <span class="quick-label">快速提问：</span>
              <button 
                v-for="question in quickQuestions" 
                :key="question"
                @click="askQuestion(question)"
                class="quick-btn"
              >
                {{ question }}
              </button>
            </div>
            <div class="input-container">
              <textarea 
                v-model="userInput"
                placeholder="请输入您的问题..."
                @keydown.enter.prevent="sendMessage"
                class="message-input"
                rows="3"
              ></textarea>
              <button @click="sendMessage" class="send-btn">
                <span>发送</span>
                <span class="send-icon">📤</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 侧边功能区域 -->
        <div class="sidebar">
          <!-- 学习建议 -->
          <div class="suggestion-card">
            <h3>今日学习建议</h3>
            <div class="suggestion-content">
              <div class="suggestion-item">
                <span class="suggestion-icon">📚</span>
                <span>复习Vue.js组件通信</span>
              </div>
              <div class="suggestion-item">
                <span class="suggestion-icon">💻</span>
                <span>完成Todo应用练习</span>
              </div>
              <div class="suggestion-item">
                <span class="suggestion-icon">📖</span>
                <span>阅读Vue Router文档</span>
              </div>
            </div>
          </div>

          <!-- 学习进度 -->
          <div class="progress-card">
            <h3>学习进度</h3>
            <div class="progress-item">
              <span class="progress-label">Vue.js基础</span>
              <div class="progress-bar">
                <div class="progress-fill" style="width: 85%"></div>
              </div>
              <span class="progress-percent">85%</span>
            </div>
            <div class="progress-item">
              <span class="progress-label">JavaScript进阶</span>
              <div class="progress-bar">
                <div class="progress-fill" style="width: 70%"></div>
              </div>
              <span class="progress-percent">70%</span>
            </div>
            <div class="progress-item">
              <span class="progress-label">TypeScript</span>
              <div class="progress-bar">
                <div class="progress-fill" style="width: 60%"></div>
              </div>
              <span class="progress-percent">60%</span>
            </div>
          </div>

          <!-- 常用功能 -->
          <div class="tools-card">
            <h3>常用工具</h3>
            <div class="tool-buttons">
              <button class="tool-btn" @click="generatePlan">
                <span class="tool-icon">📋</span>
                <span>生成学习计划</span>
              </button>
              <button class="tool-btn" @click="reviewKnowledge">
                <span class="tool-icon">🔍</span>
                <span>知识回顾</span>
              </button>
              <button class="tool-btn" @click="practiceTest">
                <span class="tool-icon">🧪</span>
                <span>模拟测试</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'

// AI导师相关数据
const userInput = ref('')
const chatMessages = ref<any[]>([])
const quickQuestions = [
  'Vue.js组件如何通信？',
  '什么是响应式编程？',
  '如何学习TypeScript？',
  '推荐前端学习路线'
]

// 发送消息
const sendMessage = () => {
  if (!userInput.value.trim()) return
  
  const userMessage = {
    type: 'user',
    text: userInput.value,
    time: '刚刚'
  }
  chatMessages.value.push(userMessage)
  
  const messageText = userInput.value
  userInput.value = ''
  
  setTimeout(() => {
    const aiResponse = generateAIResponse(messageText)
    const aiMessage = {
      type: 'ai',
      text: aiResponse,
      time: '刚刚'
    }
    chatMessages.value.push(aiMessage)
    scrollToBottom()
  }, 1000)
}

// 快速提问
const askQuestion = (question: string) => {
  userInput.value = question
  sendMessage()
}

// 生成AI回复（模拟）
const generateAIResponse = (userMessage: string) => {
  const responses: Record<string, string> = {
    'vue': 'Vue.js是一个渐进式JavaScript框架，用于构建用户界面。核心概念包括：\n• 响应式数据绑定\n• 组件化开发\n• 虚拟DOM\n• 生命周期钩子',
    'typescript': 'TypeScript是JavaScript的超集，添加了静态类型检查。学习建议：\n1. 先掌握JavaScript基础\n2. 学习类型注解和接口\n3. 实践泛型和装饰器\n4. 结合框架使用',
    '路线': '前端学习路线建议：\n1. HTML/CSS基础\n2. JavaScript核心语法\n3. Vue.js或React框架\n4. Node.js后端基础\n5. 工程化和部署',
    '组件': 'Vue组件通信方式：\n• Props向下传递\n• $emit向上传递\n• Vuex/Pinia状态管理\n• Provide/Inject依赖注入\n• Event Bus事件总线'
  }
  
  const lowerMessage = userMessage.toLowerCase()
  for (const [key, response] of Object.entries(responses)) {
    if (lowerMessage.includes(key)) {
      return response
    }
  }
  
  return `关于"${userMessage}"，这是一个很好的问题！作为前端开发，建议您：\n1. 查阅官方文档\n2. 实践相关代码示例\n3. 参考社区最佳实践\n4. 遇到具体问题时可以继续问我`
}

// 滚动到底部
const scrollToBottom = () => {
  nextTick(() => {
    const container = document.querySelector('.chat-messages')
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  })
}

// 工具功能
const generatePlan = () => {
  const planMessage = {
    type: 'ai',
    text: '为您生成了个性化学习计划：\n\n📅 本周计划：\n• 周一：Vue组件通信\n• 周二：Vue Router路由\n• 周三：状态管理Vuex\n• 周四：项目实战\n• 周五：复习总结\n\n💡 建议每天学习2-3小时，结合实际项目练习。',
    time: '刚刚'
  }
  chatMessages.value.push(planMessage)
  scrollToBottom()
}

const reviewKnowledge = () => {
  const reviewMessage = {
    type: 'ai',
    text: '知识回顾：\n\n📚 已掌握知识点：\n• HTML/CSS基础 (95%)\n• JavaScript核心 (85%)\n• Vue.js基础 (75%)\n\n🔍 需要加强：\n• Vue Router路由守卫\n• 组件生命周期\n• 性能优化技巧',
    time: '刚刚'
  }
  chatMessages.value.push(reviewMessage)
  scrollToBottom()
}

const practiceTest = () => {
  const testMessage = {
    type: 'ai',
    text: '开始模拟测试：\n\n1. Vue组件中如何实现双向绑定？\n2. 什么是Vue的响应式原理？\n3. 如何优化Vue应用性能？\n\n请思考这些问题，我会在您回答后给出反馈和解析。',
    time: '刚刚'
  }
  chatMessages.value.push(testMessage)
  scrollToBottom()
}
</script>

<style scoped>
.smart-tutor-container {
  padding-top: 100px;
  min-height: calc(100vh - 100px);
  background-color: #f5f7fa;
}

.back-button {
  position: fixed;
  top: 70px;
  left: 20px;
  z-index: 100;
}

.back-button button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background-color: #1ba766;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-button button:hover {
  background-color: #158f58;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.back-icon {
  width: 16px;
  height: 16px;
}

.ai-tutor {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.tutor-header {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  color: white;
  margin-bottom: 20px;
}

.tutor-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-icon {
  font-size: 3rem;
}

.tutor-info h1 {
  margin: 0 0 8px 0;
  font-size: 1.8rem;
}

.tutor-info p {
  margin: 0;
  opacity: 0.9;
}

.tutor-status {
  margin-left: auto;
}

.status-indicator {
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
}

.status-indicator.online {
  background-color: #27ae60;
}

.tutor-container {
  display: flex;
  gap: 20px;
}

.chat-area {
  flex: 1;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 600px;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.message {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.message-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.ai-message .message-avatar {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.user-message .message-avatar {
  background: #1ba766;
}

.message-content {
  max-width: 70%;
}

.user-message .message-content {
  margin-left: auto;
}

.message-text {
  background: #f5f7fa;
  padding: 12px 16px;
  border-radius: 0 12px 12px 12px;
  line-height: 1.6;
  white-space: pre-wrap;
}

.user-message .message-text {
  background: #1ba766;
  color: white;
  border-radius: 12px 0 12px 12px;
}

.message-time {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

.user-message .message-time {
  text-align: right;
  color: rgba(255, 255, 255, 0.7);
}

.chat-input-area {
  padding: 20px;
  border-top: 1px solid #eee;
}

.quick-questions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 15px;
}

.quick-label {
  font-size: 14px;
  color: #666;
  margin-right: 5px;
}

.quick-btn {
  padding: 6px 14px;
  background: #f0f0f0;
  border: none;
  border-radius: 20px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quick-btn:hover {
  background: #e8f5e8;
  color: #1ba766;
}

.input-container {
  display: flex;
  gap: 12px;
}

.message-input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 10px;
  resize: none;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

.message-input:focus {
  outline: none;
  border-color: #1ba766;
}

.send-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: #1ba766;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.send-btn:hover {
  background: #158f58;
  transform: translateY(-2px);
}

.sidebar {
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.suggestion-card,
.progress-card,
.tools-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.suggestion-card h3,
.progress-card h3,
.tools-card h3 {
  margin: 0 0 15px 0;
  font-size: 1.1rem;
  color: #333;
}

.suggestion-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.suggestion-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.suggestion-icon {
  font-size: 1.2rem;
}

.suggestion-item span:last-child {
  color: #666;
  font-size: 14px;
}

.progress-item {
  margin-bottom: 15px;
}

.progress-item:last-child {
  margin-bottom: 0;
}

.progress-label {
  display: block;
  font-size: 14px;
  color: #666;
  margin-bottom: 6px;
}

.progress-bar {
  height: 6px;
  background: #f0f0f0;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 4px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #1ba766, #158f58);
  border-radius: 3px;
}

.progress-percent {
  font-size: 13px;
  color: #1ba766;
  font-weight: 500;
}

.tool-buttons {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

.tool-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background: #f8f9fa;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tool-btn:hover {
  background: #e8f5e8;
  color: #1ba766;
}

.tool-icon {
  font-size: 1.1rem;
}

@media (max-width: 900px) {
  .tutor-container {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
  }
  
  .chat-area {
    height: 400px;
  }
}
</style>