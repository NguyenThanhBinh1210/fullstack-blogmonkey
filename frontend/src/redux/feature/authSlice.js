import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api'

export const loginAccount = createAsyncThunk('auth/login', async ({ data, navigate, toast }, { rejectWithValue }) => {
  try {
    const response = await api.signIn(data)
    navigate('/')
    toast.success('Đăng nhập thành công!')
    return response.data
  } catch (err) {
    toast.error(err.response.data.message)
    return rejectWithValue(err.response.data)
  }
})
export const registerAccount = createAsyncThunk(
  'auth/register',
  async ({ data, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signUp(data)
      navigate('/login')
      toast.success('Đã đăng ký thành công, hãy đăng nhập!')
      return response.data
    } catch (err) {
      toast.warn(err.response.data.message)
      return rejectWithValue(err.response.data)
    }
  }
)
export const getUser = createAsyncThunk('auth/getUser', async (id, { rejectWithValue }) => {
  try {
    const response = await api.getUser(id)
    return response.data
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const editUser = createAsyncThunk('auth/editUser', async ({ updateUser, id }, { rejectWithValue }) => {
  try {
    const response = await api.editUser(updateUser, id)
    return response.data
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    error: '',
    loading: false
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setLogout: (state, action) => {
      localStorage.clear()
      state.user = null
    }
  },
  extraReducers: {
    [loginAccount.pending]: (state, action) => {
      state.loading = true
    },
    [loginAccount.fulfilled]: (state, action) => {
      state.loading = false
      localStorage.setItem('profile', JSON.stringify({ ...action.payload }))
      state.user = action.payload
    },
    [loginAccount.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [registerAccount.pending]: (state, action) => {
      state.loading = true
    },
    [registerAccount.fulfilled]: (state, action) => {
      state.loading = false
      localStorage.setItem('profile', JSON.stringify({ ...action.payload }))
      state.user = action.payload
    },
    [registerAccount.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [getUser.pending]: (state, action) => {
      state.loading = true
    },
    [getUser.fulfilled]: (state, action) => {
      state.loading = false
      state.user = action.payload
    },
    [getUser.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [editUser.pending]: (state, action) => {
      state.loading = true
    },
    [editUser.fulfilled]: (state, action) => {
      state.loading = false
      const {
        arg: { id }
      } = action.meta
      if (id && state.user._id === id) {
        state.user = action.payload
      }
    },
    [editUser.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    }
  }
})
export const { setUser, setLogout } = authSlice.actions
export default authSlice.reducer
