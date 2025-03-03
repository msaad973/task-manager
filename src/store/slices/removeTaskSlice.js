import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to delete a task from the API
export const deleteTaskAsync = createAsyncThunk('tasks/deleteTaskAsync', async (taskId) => {
    await fetch(`https://dummyjson.com/todos/ ${taskId} `, {
        method: 'DELETE',
    });
    return taskId; // Returning the deleted task ID
});

const deleteTaskSlice = createSlice({
    name: 'deleteTask',
    initialState: {
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteTaskAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteTaskAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
            })
            .addCase(deleteTaskAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default deleteTaskSlice.reducer;
