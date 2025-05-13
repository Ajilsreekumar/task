// src/store/tasksSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Load tasks from localStorage (if any)
const loadTasksFromLocalStorage = () => {
  const savedTasks = localStorage.getItem('tasks');
  return savedTasks ? JSON.parse(savedTasks) : [];
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: loadTasksFromLocalStorage(), // Initialize state from localStorage
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state)); // Save tasks to localStorage
    },
    deleteTask: (state, action) => {
      const newState = state.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(newState)); // Update localStorage
      return newState;
    },
    toggleTaskCompletion: (state, action) => {
      const task = state.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(state)); // Update localStorage
      }
    },
  },
});

export const { addTask, deleteTask, toggleTaskCompletion } = tasksSlice.actions;
export default tasksSlice.reducer;
