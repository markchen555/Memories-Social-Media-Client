import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

const initialState = {
	status: 'idle',
	posts: [],
	error: ''
}

export const fetchPosts = createAsyncThunk(
	'posts/fetchPosts',
	async (thunkAPI) => {
	  const res = await api.fetchPosts();
	return res.data;
  	}
)

export const createPost = createAsyncThunk(
	'posts/createPost',
	async (postData, thunkAPI) => {
		const res = await api.createPost(postData);
	return res.data;
	}
)

export const updatePost = createAsyncThunk(
	'posts/updatePost',
	async (updatedData, thunkAPI) => {
		const {currentId, postData} = updatedData;
		const res = await api.updatePost(currentId, postData);
		return res.data;
	}
)

export const deletePost = createAsyncThunk(
	'posts/deletePost',
	async (id, thunkAPI) => {
		const res = await api.deletePost(id);
		return {...res.data, id};
	}
)

export const posts = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		// reducers is for synchronous requests made to the store
		getPosts(state, action) {
			const fetchPosts = JSON.parse(localStorage.getItem('posts')) || [];
            state.posts = fetchPosts;
		}
	},
	extraReducers: (builder) => {
		// extraReducers handles asynchronous requests
		builder.addCase(fetchPosts.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.posts = action.payload;
        });
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed';
            state.posts = [];
            state.error = action.error.message;
        });
		builder.addCase(createPost.fulfilled, (state, action) => {
			state.posts = [...state.posts, action.payload];
		});
		builder.addCase(updatePost.fulfilled, (state, action) => {
			console.log('check updatedPost: ', action.payload)
			state.posts = state.posts.map((post) => post._id === action.payload._id ? action.payload : post);
		})
		builder.addCase(deletePost.fulfilled, (state, action) => {
			console.log('check deletePost: ', action)
			state.posts = state.posts.filter((post) => post._id !== action.payload.id);
		})
	}
})

// Redux Action
export const { getPosts } = posts.actions;

// Redux Reducers
export default posts.reducer;