// src/store/tasksSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loadTasksFromLocalStorage = () => {
  const savedTasks = localStorage.getItem('tasks');
  return savedTasks ? JSON.parse(savedTasks) : [];
};

const saveToLocalStorage = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: loadTasksFromLocalStorage(),
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
      saveToLocalStorage(state);
    },
    deleteTask: (state, action) => {
      const newState = state.filter(task => task.id !== action.payload);
      saveToLocalStorage(newState);
      return newState;
    },
    deleteMultipleTasks: (state, action) => {
      const idsToDelete = action.payload;
      const newState = state.filter(task => !idsToDelete.includes(task.id));
      saveToLocalStorage(newState);
      return newState;
    },
    toggleTaskCompletion: (state, action) => {
      const task = state.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveToLocalStorage(state);
      }
    },
    editTask: (state, action) => {
      const { id, newTitle } = action.payload;
      const task = state.find(task => task.id === id);
      if (task) {
        task.title = newTitle;
        saveToLocalStorage(state);
      }
    },
    setTaskPriority: (state, action) => {
      const { id, priority } = action.payload; // priority can be 'High', 'Medium', 'Low'
      const task = state.find(task => task.id === id);
      if (task) {
        task.priority = priority;
        saveToLocalStorage(state);
      }
    },
  },
});

export const {
  addTask,
  deleteTask,
  toggleTaskCompletion,
  editTask,
  setTaskPriority,
  deleteMultipleTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;