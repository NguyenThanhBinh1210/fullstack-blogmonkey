import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './feature/authSlice.js'
import BlogReducer from './feature/blogSlice.js'

export default configureStore({
  reducer: {
    auth: AuthReducer,
    blog: BlogReducer
  }
})
