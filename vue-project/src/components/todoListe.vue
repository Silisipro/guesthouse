<template>
  <div class="w-[70%] mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
    <h2 class="text-2xl font-bold mb-4">TO-DO LIST</h2>
    <div class="flex mb-4">
      <input v-model="search" type="text" placeholder="Search tasks..." class="flex-grow p-2 border-b-2 border-teal-500 outline-none" />
      <button @click="openAddModal" class="ml-2 bg-teal-500 text-white px-4 py-2 rounded">Add</button>
    </div>
    <select v-model="filterStatus" class="ml-2 border-gray-300 rounded-md shadow-sm p-2">
      <option value="">All</option>
      <option value="completed">Completed</option>
      <option value="notCompleted">Not Completed</option>
    </select>
    <select v-model="filterPriority" class="ml-2 border-gray-300 rounded-md shadow-sm p-2">
        <option value="">All Priorities</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input v-model="filterDate" type="date" class="ml-2 border-gray-300 rounded-md shadow-sm p-2 mt-5" />
      <div v-if="filteredTasks.length === 0" class="text-center mt-4 text-gray-500">
      <p>No tasks match your criteria. Try adjusting your filters or adding a new task.</p>
    </div>
      <ul v-else style="height: 300px; overflow: scroll;">
        <hr>
        <li v-for="(task, index) in filteredTasks" :key="task.id" class="flex items-center mb-2">
          
          <input
            type="checkbox"
            v-model="task.completed"
            @change="updateTask(task.id)"
            class="mr-2"
          />
          <span
            :class="{'line-through': task.completed, 'font-bold': !task.completed}"
            class="flex-grow"
          >
            {{ task.title.slice(0, 20) }}...
            <span v-if="task.dueDate" class="text-sm text-gray-500 mr-5">Due on {{ task.dueDate }}</span>
            <span v-if="task.priority" class="text-sm text-gray-500 mr-5">Priority : {{ task.priority }}</span>
            <span v-if="task.priority" class="text-sm text-gray-500">Status : {{ task.completed ? 'Completed' : 'Not Completed' }}</span>
          </span>
          <button @click="openDetailModal(task.id)" class="bg-green-500 text-white px-2 py-1 rounded mr-3">Detail</button>
          <button @click="openEditModal(task.id)" class="bg-yellow-500 text-white px-2 py-1 rounded mr-3">Edit</button>
          <button @click="confirmDelete(task.id)" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
          
        </li>
        <hr>
      </ul>
     
    
    <Modal ref="taskModal">
      <TaskForm :task="selectedTask" :index="selectedIndex" @close="closeModal" />
    </Modal>
   
    <Modal ref="editModal">
      <TaskForm :task="selectedTask" :index="selectedIndex" @close="closeModal" />
    </Modal>

    <Modal ref="detailModal">
      <TaskDetail :task="selectedTask" @close="closeDetailModal" />
    </Modal>

    <Modal ref="deleteModal">
      <div v-if="showConfirmationModal" @close="closeConfirmationModal">
      <div class="p-4">
        <p>Are you sure you want to delete this task ?</p>
        <div class="mt-4">
          <button @click="deleteTask" class="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
          <button @click="closeConfirmationModal" class="bg-gray-500 text-white px-4 py-2 rounded ml-2">Cancel</button>
        </div>
      </div>
    </div>
    </Modal>
  
    
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTaskStore } from '@/stores/todo'
import Modal from './Modal.vue'
import TaskForm from './modalForm.vue'
import TaskDetail from './detailTodo.vue'

const store = useTaskStore()
const search = ref('')
const showConfirmationModal = ref(false)
const selectedTask = ref(null)
const selectedIndex = ref(null)
const filterStatus = ref('')
const filterPriority = ref('')
const filterDate = ref('')

const filteredTasks = computed(() => {
  return store.filteredTasks(search.value, filterStatus.value, filterPriority.value, filterDate.value)
})

const openDetailModal = (taskId) => {
  console.log(taskId);
  
  selectedTask.value = store.tasks.find(task => task.id === taskId)
  detailModal.value.openModal()
}

const openEditModal = (taskId) => {
  selectedTask.value = { ...store.tasks.find(task => task.id === taskId) }
  selectedIndex.value = taskId
  editModal.value.openModal()
}

const confirmDelete = (taskId) => {

  selectedIndex.value = taskId 
  showConfirmationModal.value = true
  deleteModal.value.openModal()
}

const updateTask = (taskId) => {
  const task = store.tasks.find(task => task.id === taskId)
  store.updateTask(taskId, task)
}

const openAddModal = () => {
  selectedTask.value = null
  selectedIndex.value = null
  taskModal.value.openModal()
}

const closeModal = () => {
  taskModal.value.closeModal()
  editModal.value.closeModal()
  selectedIndex.value = null
}

const closeDetailModal = () => {
  detailModal.value.closeModal()
}

const deleteTask = () => {
  store.deleteTask(selectedIndex.value)
  selectedIndex.value = null
  showConfirmationModal.value = false
  deleteModal.value.closeModal()
}

const closeConfirmationModal = () => {
  showConfirmationModal.value = false
  deleteModal.value.closeModal()
}

const taskModal = ref(null)
const editModal = ref(null)
const detailModal = ref(null)
const deleteModal = ref(null)
</script>


