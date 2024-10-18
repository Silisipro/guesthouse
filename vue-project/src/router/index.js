import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import TodoList from '@/views/TodoListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/todolist',
      name: 'todolist',
      component: TodoList,
      meta: { 
        requiresAuth: true,
      }
    },
  ]
})

 export default router

// router.beforeEach((to, from, next) => {
//   const user = JSON.parse(localStorage.getItem('currentUser'));
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

//   if (requiresAuth && !user) {
//     next('/login');
//   } else {
//     next();
//   }
// });