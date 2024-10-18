import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid';

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    currentUser: JSON.parse(localStorage.getItem('currentUserId')) || null
  }),

  actions: {
    setUser(userId) {
      this.currentUser = userId;
    },

    addTask(task) {
      if (!this.currentUser) return;
      
      task.id = uuidv4(); 
      task.userId = this.currentUser;
    
      console.log('Adding task:', task);
      this.tasks = [...this.tasks, task];
      console.log('Updated tasks:', this.tasks);
    
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },

  updateTask(taskId, updatedTask) {
    if (!this.currentUser) return;

    const index = this.tasks.findIndex(task => task.id === taskId);
    
    if (index !== -1) {
      this.tasks[index] = { ...this.tasks[index], ...updatedTask };
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    } else {
      console.error('Task not found for update');
    }
  },

  deleteTask(taskId) {
    if (!this.currentUser) return;
    const index = this.tasks.findIndex(task => task.id === taskId);
    
    if (index !== -1) {
      this.tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    } else {
      console.error('Task not found for deletion:');
    }
  }
  
},


getters: {
  filteredTasks: (state) => (search, filterStatus, filterPriority, filterDate) => {
    if (!state.currentUser) return [];

    return state.tasks
      .filter(task => task.userId === state.currentUser)
      .filter(task => {
        if (filterStatus === 'completed' && !task.completed) return false;
        if (filterStatus === 'notCompleted' && task.completed) return false;

        if (search && !task.title.toLowerCase().includes(search.toLowerCase())) return false;

        if (filterPriority && task.priority !== filterPriority) return false;
        if (filterDate && task.dueDate < filterDate) return false;

        return true;
      });
  }
}

})

