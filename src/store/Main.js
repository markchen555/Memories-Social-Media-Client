import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

const initialState = {
	status: 'idle',
	posts: [],
	error: ''
}

export const fetchPosts = createAsyncThunk(
	'posts/getPosts',
	async (thunkAPI) => {
	  const res = await api.fetchPosts();
	  console.log('check res', res)
	return res.data;
  })

export const main = createSlice({
	name: 'main',
	initialState,
	reducers: {
		// reducers is for synchronous requests made to the store
		getPosts(state, action) {
			const fetchPosts = JSON.parse(localStorage.getItem('posts')) || [];
			console.log('check fetch post', fetchPosts)
            state.posts = fetchPosts;
		}
	},
	extraReducers: (builder) => {
		// extraReducers handles asynchronous requests
		builder.addCase(fetchPosts.pending, (state, action) => {
            state.status = 'loading';
			console.log('check pending: ', state.loading)
        });
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'succeeded';
			console.log('check payload: ', action.payload)
            state.posts = action.payload;
        });
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed';
			console.log('check rejected: ', state.loading)
            state.posts = [];
            state.error = action.error.message;
        });
	}
})

// Redux Action
export const { getPosts } = main.actions;

// Redux Reducers
export default main.reducer;