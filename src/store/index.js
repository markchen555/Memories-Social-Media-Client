import { configureStore } from '@reduxjs/toolkit'

import mainReducers from './Main';
import postsReducers from './Posts';

export default configureStore({
  reducer: {
    main: mainReducers,
    posts: postsReducers
  }
})