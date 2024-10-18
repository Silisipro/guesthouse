<template>
   <NavComponent />

   <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 class="text-4xl font-extrabold text-teal-600 mb-4">
         TASK MANAGEMENT
      </h1>
      <p v-if="!store.currentUser" class="text-lg text-gray-600">
         Please log in to add your tasks
      </p>
   </div>
</template>


<script setup>
import NavComponent from "@/components/NavComponent.vue"
import { useTaskStore } from '@/stores/todo'


const store = useTaskStore()


</script>



<style scoped>

</style>