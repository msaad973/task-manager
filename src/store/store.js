import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './slices/tasksSlice'
import addTaskReducer from './slices/addTaskSlice'
import deleteTaskReducer from './slices/removeTaskSlice'

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    addTask: addTaskReducer,
    deleteTask: deleteTaskReducer,
  },
})