// stores/authStore.js
import { defineStore } from 'pinia';
import bcrypt from 'bcryptjs';
import { useTaskStore } from './todo'


export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    auth: {
      name: '',
      email: '',
      password: '',
      confirm_password: '',
      userId: ''

    },
    errorMessage: '',
    successMessage: ''

  }),
  actions: {
    async register(user) {
      try {
        
        if (user.password !== user.confirm_password) {
          throw new Error('Passwords do not match');
        }

        
        let users = JSON.parse(localStorage.getItem('users')) || [];

      
        if (users.some(existingUser => existingUser.email === user.email)) {
          throw new Error('Email already exists');
        }
        const motDePasseHache = await bcrypt.hash(user.password, 10);
    
        users.push({
          name: user.name,
          email: user.email,
          password: motDePasseHache,
          userId: Date.now().toString(),
        });

     
        localStorage.setItem('users', JSON.stringify(users));

        this.auth = {
          name: '',
          email: '',
          password: '',
          confirm_password: ''
        };

        
        this.successMessage = 'User registered successfully';
        this.errorMessage = '';

     
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);

      } catch (error) {
        console.error('Error registering user:', error);
        this.errorMessage = error.message;
        this.successMessage = '';
      }
    },

    async login(email, password) {
      try {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email);

        if (!user) {
          this.errorMessage = 'Email not found';
          this.successMessage = '';
          return false; 
        }


        if (user) {
          bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            const taskStore = useTaskStore()
            this.successMessage = 'Login successful! Redirecting...';
            this.errorMessage = '';
            if(localStorage.getItem('currentUserId')) {
              localStorage.removeItem('currentUserId')
              localStorage.setItem('currentUserId', JSON.stringify(user.userId));
              taskStore.currentUser = user.userId
            } else{
              localStorage.setItem('currentUserId', JSON.stringify(user.userId));
              taskStore.currentUser = user.userId
            }
            if (localStorage.getItem('currentUser')) {
              localStorage.removeItem('currentUser')
              localStorage.setItem('currentUser', JSON.stringify(user));
            } else {
              localStorage.setItem('currentUser', JSON.stringify(user));
              
            }

          } else {
            this.errorMessage = 'Incorrect password';
            this.successMessage = '';
          }
          });
 
      } 

      return true
    } 
      catch (error) {
        console.error('Error logging in:', error);
        this.errorMessage = 'An error occurred while logging in';
        this.successMessage = '';
        return false;
      }
    },

    async logout() {
      try {
        localStorage.removeItem('currentUserId')
        localStorage.removeItem('currentUser')
        const taskStore = useTaskStore()
        taskStore.currentUser = null

        alert('Logout succeffuly')

        this.successMessage = '';
    } 
      catch (error) {
        console.error('Error loggout :', error);
        this.errorMessage = 'An error occurred while logging out';
        this.successMessage = '';
        return false;
      }
    }


  }
});
