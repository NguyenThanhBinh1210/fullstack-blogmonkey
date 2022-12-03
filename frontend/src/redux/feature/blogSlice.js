import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api'

export const createBlog = createAsyncThunk(
  'blog/createBlog',
  async ({ newData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createBlog(newData)
      navigate(`/user/${newData.userId}`)
      toast.success('Đăng bài thành công!')
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)
export const editBlog = createAsyncThunk(
  'blog/editBlog',
  async ({ updatedBlogData, id, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.editBlog(updatedBlogData, id)
      navigate(`/user/${updatedBlogData.userId}`)
      toast.success('Chỉnh sửa thành công!')
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)
export const getBlogs = createAsyncThunk('blog/getBlogs', async (_, { rejectWithValue }) => {
  try {
    const response = await api.getBlogs()
    return response.data
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})
export const getBlogByUserId = createAsyncThunk('blog/getBlogByUserId', async (id, { rejectWithValue }) => {
  try {
    const response = await api.getBlogByUserId(id)
    return response.data
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})
export const getBlog = createAsyncThunk('blog/getBlog', async (id, { rejectWithValue }) => {
  try {
    const response = await api.getBlog(id)
    return response.data
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})
export const getBlogByTag = createAsyncThunk('blog/getBlogByTag', async (tag, { rejectWithValue }) => {
  try {
    const response = await api.getBlogByTag(tag)
    return response.data
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const searchBlog = createAsyncThunk('blog/searchBlog', async (searchQuery, { rejectWithValue }) => {
  try {
    const response = await api.getBlogBySearch(searchQuery)
    return response.data
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const deleteBlog = createAsyncThunk('blog/deleteBlog', async ({ id, toast }, { rejectWithValue }) => {
  try {
    const response = await api.deleteBlog(id)
    // navigate('/')
    toast.info('Xoá thành công!')
    return response.data
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})
const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    blog: {},
    blogs: [],
    error: '',
    loading: false,
    userBlog: []
  },
  extraReducers: {
    [createBlog.pending]: (state, action) => {
      state.loading = true
    },
    [createBlog.fulfilled]: (state, action) => {
      state.loading = false
    },
    [createBlog.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [getBlogs.pending]: (state, action) => {
      state.loading = true
    },
    [getBlogs.fulfilled]: (state, action) => {
      state.loading = false
      state.blogs = action.payload
    },
    [getBlogs.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [getBlog.pending]: (state, action) => {
      state.loading = true
    },
    [getBlog.fulfilled]: (state, action) => {
      state.loading = false
      state.blog = action.payload
    },
    [getBlog.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [getBlogByTag.pending]: (state, action) => {
      state.loading = true
    },
    [getBlogByTag.fulfilled]: (state, action) => {
      state.loading = false
      state.tagBlog = action.payload
    },
    [getBlogByTag.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [getBlogByUserId.pending]: (state, action) => {
      state.loading = true
    },
    [getBlogByUserId.fulfilled]: (state, action) => {
      state.loading = false
      state.userBlog = action.payload
    },
    [getBlogByUserId.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [deleteBlog.pending]: (state, action) => {
      state.loading = true
    },
    [deleteBlog.fulfilled]: (state, action) => {
      state.loading = false
      const {
        arg: { id }
      } = action.meta
      if (id) {
        state.blogs = state.blogs.filter((item) => item._id !== id)
      }
    },
    [deleteBlog.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [editBlog.pending]: (state, action) => {
      state.loading = true
    },
    [editBlog.fulfilled]: (state, action) => {
      state.loading = false
      const {
        arg: { id }
      } = action.meta
      if (id && state.blog._id === id) {
        state.blog = action.payload
      }
    },
    [editBlog.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [searchBlog.pending]: (state, action) => {
      state.loading = true
    },
    [searchBlog.fulfilled]: (state, action) => {
      state.loading = false
      state.blogs = action.payload
    },
    [searchBlog.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    }
  }
})
export default blogSlice.reducer
