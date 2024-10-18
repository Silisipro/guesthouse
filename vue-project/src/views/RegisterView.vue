<template>
   <NavComponent />
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create your account for free</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    
      <p v-if="successMessage" class="text-green-500 text-sm text-center mb-4">{{ successMessage }}</p>

      <form @submit.prevent="register" class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
          <div class="mt-2">
            <input v-model="user.name" id="name" name="name" type="text" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            <p v-if="nameError" class="text-red-500 text-sm">{{ nameError }}</p>
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <input v-model="user.email" id="email" name="email" type="email" autocomplete="email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            <p v-if="emailError" class="text-red-500 text-sm">{{ emailError }}</p>
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div class="mt-2">
            <input v-model="user.password" id="password" name="password" type="password" autocomplete="current-password" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            <p v-if="passwordError" class="text-red-500 text-sm">{{ passwordError }}</p>
          </div>
        </div>

        <div>
          <label for="confirm_password" class="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
          <div class="mt-2">
            <input v-model="user.confirm_password" id="confirm_password" name="confirm_password" type="password" autocomplete="current-password" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            <p v-if="confirmPasswordError" class="text-red-500 text-sm">{{ confirmPasswordError }}</p>
          </div>
        </div>

        <div>
          <button type="submit" :disabled="isButtonDisabled" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Sign up
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Already a member?
        <router-link class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" to="/login">Login here</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/AuthStore';
import NavComponent from "@/components/NavComponent.vue"

const authStore = useAuthStore();
const router = useRouter();

const user = reactive({
  name: '',
  email: '',
  password: '',
  confirm_password: ''
});

const nameError = ref('');
const emailError = ref('');
const passwordError = ref('');
const confirmPasswordError = ref('');
const successMessage = ref('');

const isButtonDisabled = computed(() => {
  return nameError.value || emailError.value || passwordError.value || confirmPasswordError.value || !user.name || !user.email || !user.password || !user.confirm_password;
});

watch(() => user.name, (newValue) => {
  if (newValue.trim() === '' || newValue.trim().length < 3) {
    nameError.value = 'The name is required and must have at least 3 characters';
  } else {
    nameError.value = '';
  }
});

watch(() => user.email, (newValue) => {
  if (!newValue.includes('@') || !newValue.includes('.')) {
    emailError.value = 'Invalid email address';
  } else {
    emailError.value = '';
  }
});

watch(() => user.password, (newValue) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(newValue)) {
    passwordError.value = 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter and one digit';
  } else {
    passwordError.value = '';
  }
});

watch(() => user.confirm_password, (newValue) => {
  if (newValue !== user.password) {
    confirmPasswordError.value = 'Passwords do not match';
  } else {
    confirmPasswordError.value = '';
  }
});

const validateInputs = () => {
  nameError.value = user.name.trim() === '' || user.name.trim().length < 3 ? 'The name is required and must have at least 3 characters' : '';
  emailError.value = !user.email.includes('@') || !user.email.includes('.') ? 'Invalid email address' : '';
  passwordError.value = !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(user.password) ? 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter and one digit' : '';
  confirmPasswordError.value = user.confirm_password !== user.password ? 'Passwords do not match' : '';
};

const register = async () => {
  validateInputs();
  if (nameError.value || emailError.value || passwordError.value || confirmPasswordError.value) {
    return;
  }

  try {
    await authStore.register(user);
    successMessage.value = 'User registered successfully!';
    
  
    user.name = '';
    user.email = '';
    user.password = '';
    user.confirm_password = '';


    setTimeout(() => {
      router.push('/login');
    }, 1000);
  } catch (error) {
    console.error('Registration failed:', error);
  }
};
</script>

<style scoped>
button:disabled {
  cursor: not-allowed;
  opacity: 0.5; 
}
</style>
