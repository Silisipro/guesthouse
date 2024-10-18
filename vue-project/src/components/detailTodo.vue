<template>
    <div class="p-4">
      <h3 class="text-xl font-bold mb-2">{{ task.title }}</h3>
      <p class="mb-2"><strong>Description:</strong> {{ task.description }}</p>
      <p class="mb-2"><strong>Start Date:</strong> {{ task.startDate }}</p>
      <p class="mb-2"><strong>Due Date:</strong> {{ task.dueDate }}</p>
      <p class="mb-2"><strong>Priority:</strong> {{ task.priority }}</p>
      <p class="mb-2"><strong>Status:</strong> {{ task.completed ? 'Completed' : 'Not Completed' }}</p>
      <div class="mt-4">
        <button @click="$emit('close')" class="bg-gray-500 text-white px-4 py-2 rounded">Close</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  
  const props = defineProps({
    task: Object
  })
  </script>
  

  