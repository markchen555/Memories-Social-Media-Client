import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	count: 0
}

export const posts = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		increment: (state) => {
			state.count +=1;
		},
		decrement: (state) => {
			state.count -=1;
		},
		reset: (state) => {
			state.count = 0;
		},
		incrementByAmount: (state, action) => {
			state.count += action.payload
		}
	}
})

// Redux Action
export const { increment, decrement, reset, incrementByAmount } = posts.actions;

// Redux Reducers
export default posts.reducer;