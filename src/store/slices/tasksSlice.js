// tasksSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch tasks from the API
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const response = await fetch('https://dummyjson.com/todos');
    const data = await response.json();
    return data.todos; // Extracting tasks array from API response
});

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],  // Ensure it's an array
        status: 'idle',
        error: null,
    },
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        toggleTaskCompletion: (state, action) => {
            const task = state.tasks.find(task => task.id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
        },
        removeTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state. status = 'loading';
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks = action.payload; // Storing tasks as an array
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { addTask, toggleTaskCompletion, removeTask } = tasksSlice.actions;
export default tasksSlice.reducer;
