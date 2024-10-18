<template>
    <div class="w-full h-12 bg-[#219ebc] flex items-center justify-between">
        <RouterLink to="/" >
            <p class="text-2xl text-white font-bold">Todo-list</p>
        </RouterLink>
    <div class="">
        <RouterLink class="text-md text-black font-bold mr-8" to="/login" v-if="!islogin">Login</RouterLink>
        <RouterLink class="text-md text-black font-bold mr-4" to="/register" v-if="!islogin">Register</RouterLink>
        <RouterLink class="text-md text-black font-bold mr-4" to="/todolist" v-if="islogin">Todo-list</RouterLink>
        <a class="text-md text-black font-bold mr-4" href="#" @click.prevent="logout" v-if="islogin">Déconnexion</a>
        <!-- <img src="../assets/todologo.png" alt="" class="h-10"> -->
    </div>
    </div>
 </template>
 
 <script setup>
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';


const router = useRouter();
const authStore = useAuthStore();
const user = ref()
onMounted(() =>{

const currentUser = localStorage.getItem('currentUser') || null
user.value = currentUser

})

const islogin = user


const logout =() =>{
    authStore.logout()
    router.push('/login');
}

 
 </script>
 
 <style scoped>
 
 </style>