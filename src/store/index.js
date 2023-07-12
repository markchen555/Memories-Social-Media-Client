import { configureStore } from '@reduxjs/toolkit'

import postsReducers from './Posts';

export default configureStore({
  reducer: {
    posts: postsReducers
  }
})