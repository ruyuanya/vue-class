<template>
  <div class="course-manager" :class="{ 'access-denied': !hasAccess }">
    <!-- 无权限提示 -->
    <div v-if="!hasAccess" class="access-denied-overlay">
      <div class="access-denied-content">
        <h2>无权限访问</h2>
        <p>您没有权限访问课程管理页面</p>
        <button class="back-btn" @click="goBack">返回首页</button>
      </div>
    </div>
    
    <!-- 课程管理内容 -->
    <div v-else>
      <!-- 页面标题 -->
      <div class="page-header">
        <h1>课程管理</h1>
      </div>
      
      <!-- 课程表单 -->
      <div class="course-form">
        <h2>添加课程</h2>
        <form @submit.prevent="handleAddCourse">
          <div class="form-group">
            <label for="className">课程名称</label>
            <input type="text" id="className" v-model="courseForm.className" required placeholder="请输入课程名称">
          </div>
          <div class="form-group">
            <label for="teacher">教师</label>
            <input type="text" id="teacher" v-model="courseForm.teacher" required placeholder="请输入教师姓名">
          </div>
          <div class="form-group">
            <label for="classroom">教室</label>
            <input type="text" id="classroom" v-model="courseForm.classroom" required placeholder="请输入教室">
          </div>
          <div class="form-group">
            <label for="startTime">开始时间</label>
            <input type="date" id="startTime" v-model="courseForm.startTime" required>
          </div>
          <button type="submit" class="submit-btn">添加课程</button>
        </form>
      </div>
      
      <!-- 课程列表 -->
      <div class="course-list">
        <h2>课程列表</h2>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>课程ID</th>
                <th>课程名称</th>
                <th>教师</th>
                <th>教室</th>
                <th>开始时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="course in courses" :key="course.id">
                <td>{{ course.id }}</td>
                <td>{{ course.class_name }}</td>
                <td>{{ course.teacher }}</td>
                <td>{{ course.classroom }}</td>
                <td>{{ course.start_time }}</td>
                <td>
                  <button class="edit-btn">编辑</button>
                  <button class="delete-btn">删除</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { addClass, getCourses } from '../services/api'
import { hasCourseManagerAccess } from '../stores/userStore'

const router = useRouter()

// 检查用户是否有权限
const hasAccess = computed(() => hasCourseManagerAccess())

// 课程表单数据
const courseForm = ref({
  className: '',
  teacher: '',
  classroom: '',
  startTime: ''
})

// 课程列表
const courses = ref<Array<{ id: number; class_name: string; teacher: string; classroom: string; start_time: string }>>([])

// 返回首页
const goBack = () => {
  router.push('/')
}

// 加载课程列表
const loadCourses = async () => {
  try {
    const courseList = await getCourses()
    courses.value = courseList
  } catch (error) {
    console.error('加载课程列表失败:', error)
  }
}

// 添加课程
const handleAddCourse = async () => {
  try {
    const response = await addClass(
      courseForm.value.className,
      courseForm.value.teacher,
      courseForm.value.classroom,
      courseForm.value.startTime
    )
    
    if (response.code === 200) {
      // 显示成功消息
      if (window.showGlobalMessage) {
        window.showGlobalMessage('课程添加成功', 'success')
      }
      
      // 重置表单
      courseForm.value = {
        className: '',
        teacher: '',
        classroom: '',
        startTime: ''
      }
      
      // 刷新课程列表
      await loadCourses()
    } else {
      // 显示错误消息
      if (window.showGlobalMessage) {
        window.showGlobalMessage(response.message, 'error')
      }
    }
  } catch (error) {
    console.error('添加课程失败:', error)
    if (window.showGlobalMessage) {
      window.showGlobalMessage('添加课程失败', 'error')
    }
  }
}

// 初始化页面
onMounted(() => {
  // 只有有权限的用户才加载课程列表
  if (hasAccess.value) {
    loadCourses()
  }
})
</script>

<style scoped>
.course-manager {
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 20px 40px;
  transition: filter 0.3s ease;
}

/* 无权限时模糊页面 */
.course-manager.access-denied {
  filter: blur(5px);
  pointer-events: none;
}

/* 无权限提示 */
.access-denied-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  pointer-events: auto;
}

.access-denied-content {
  background-color: #fff;
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  text-align: center;
  max-width: 400px;
  width: 90%;
}

.access-denied-content h2 {
  font-size: 24px;
  font-weight: 600;
  color: #dc3545;
  margin-bottom: 16px;
}

.access-denied-content p {
  font-size: 16px;
  color: #666;
  margin-bottom: 32px;
}

.back-btn {
  background-color: #1ba766;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 24px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-btn:hover {
  background-color: #168f58;
}

.page-header {
  margin-bottom: 40px;
  text-align: center;
}

.page-header h1 {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.course-form {
  background-color: #fff;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
}

.course-form h2 {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #1ba766;
  box-shadow: 0 0 0 2px rgba(27, 167, 102, 0.1);
}

.submit-btn {
  background-color: #1ba766;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #168f58;
}

.course-list {
  background-color: #fff;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.course-list h2 {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table th,
table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

table th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #333;
}

table tr:hover {
  background-color: #f8f9fa;
}

.edit-btn,
.delete-btn {
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: none;
  margin-right: 8px;
}

.edit-btn {
  background-color: #007bff;
  color: #fff;
}

.edit-btn:hover {
  background-color: #0069d9;
}

.delete-btn {
  background-color: #dc3545;
  color: #fff;
}

.delete-btn:hover {
  background-color: #c82333;
}

@media (max-width: 768px) {
  .course-manager {
    padding: 100px 10px 20px;
  }
  
  .course-form,
  .course-list {
    padding: 20px;
  }
  
  table th,
  table td {
    padding: 8px;
    font-size: 14px;
  }
}
</style>