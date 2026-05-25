import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import routes from '../routes.js'

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(routes.authPath(), credentials)

      localStorage.setItem('authToken', response.data.token)
      localStorage.setItem('userData', JSON.stringify(response.data.user))

      return response.data
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.error || 'Ошибка авторизации'
        return rejectWithValue(errorMessage);
      } else if (error.request) {
        return rejectWithValue('Нет ответа от сервера')
      } else {
        return rejectWithValue('Ошибка сети')
      }
    }
  }
)

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(routes.registerPath(), userData) 
      
      localStorage.setItem('authToken', response.data.token)
      localStorage.setItem('userData', JSON.stringify(response.data.user))
      
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Ошибка при регистрации')
    }
  }
)

export const deleteAccount = createAsyncThunk(
  'auth/deleteAccount',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth

      const response = await axios.delete(routes.deletePath(), {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      localStorage.removeItem('authToken')
      localStorage.removeItem('userData')

      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Ошибка при удалении аккаунта')
    }
  }
)

export const updateUser= createAsyncThunk(
  'auth/updateUser',
  async (userData, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth
      const response = await axios.put(routes.updatePath(), userData, {
        headers: { Authorization: `Bearer ${token}` }
      })

      localStorage.setItem('userData', JSON.stringify(response.data.user))
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Ошибка при обновлении данных профиля')
    }
  }
)

const savedUser = localStorage.getItem('userData')
let parsedUser = null

try {
  parsedUser = savedUser ? JSON.parse(savedUser) : null
} catch (e) {
  console.error("Ошибка парсинга userData из localStorage", e)
}

const initialState = {
  user: parsedUser,
  token: localStorage.getItem('authToken'),
  isAuthenticated: !!localStorage.getItem('authToken'),
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('authToken')
      localStorage.removeItem('userData')
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(deleteAccount.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.loading = false
        state.user = null
        state.token = null
        state.isAuthenticated = false
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
