import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter/counterSlice'
import tasksReducer from './slices/tasksSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    tasks: tasksReducer,
  },
})