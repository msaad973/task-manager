import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to add a new task to the API
export const addTaskAsync = createAsyncThunk('tasks/addTaskAsync', async (task) => {
    const response = await fetch('https://dummyjson.com/todos/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
    });
    const data = await response.json();
    return data; // Returning the newly created task
});

const addTaskSlice = createSlice({
    name: 'addTask',
    initialState: {
        task: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addTaskAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addTaskAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.task = action.payload; // Store the newly added task
            })
            .addCase(addTaskAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default addTaskSlice.reducer;
