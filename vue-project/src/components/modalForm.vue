<template>
    <div class="p-4 w-full bg-white rounded-lg shadow-md">
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Title</label>
          <input v-model="form.title" type="text" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
          <p v-if="errors.title" class="text-red-500 text-sm mt-1">{{ errors.title }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Description</label>
          <textarea v-model="form.description" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required></textarea>
          <p v-if="errors.description" class="text-red-500 text-sm mt-1">{{ errors.description }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Start Date</label>
          <input v-model="form.startDate" type="date" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
          <p v-if="errors.startDate" class="text-red-500 text-sm mt-1">{{ errors.startDate }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Due Date</label>
          <input v-model="form.dueDate" type="date" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
          <p v-if="errors.dueDate" class="text-red-500 text-sm mt-1">{{ errors.dueDate }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Priority</label>
          <select v-model="form.priority" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required>
            <option value="">None</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded mr-3">Save</button>
          <button type="button" @click="cancel" class="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  import { useTaskStore } from '@/stores/todo'
  
  const props = defineProps({
    task: Object,
    index: String || Number 
  })
  
  const emit = defineEmits(['close'])
  
  const store = useTaskStore()
  const form = ref({ ...props.task })
 
  const errors = ref({})

  
  const validateForm = () => {
    errors.value = {}
    if (!form.value.title) errors.value.title = 'Title is required'
    if (!form.value.description) errors.value.description = 'Description is required'
    if (form.value.startDate && form.value.dueDate && form.value.startDate > form.value.dueDate) {
      errors.value.dueDate = 'Due Date must be after Start Date'
    }
    return Object.keys(errors.value).length === 0
  }
  
  const handleSubmit = () => {

  if (validateForm()) {
   
    if (props.index !== undefined && props.index !== null) {
      
      store.updateTask(props.index, form.value);
    } else {
     
      store.addTask(form.value);
    }
    emit('close');
  }
}

  
  const cancel = () => {
    emit('close')
  }
  </script>
  