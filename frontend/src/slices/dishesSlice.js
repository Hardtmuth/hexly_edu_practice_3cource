import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import routes from '../routes.js'

export const fetchDishes = createAsyncThunk(
  'dishes/fetchDishes',
  async () => {
    const response = await axios.get(routes.dishesPath())
    return response.data
  },
)

const dishesAdapter = createEntityAdapter()

const initialState = dishesAdapter.getInitialState({
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
})

const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishes.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchDishes.fulfilled, (state, action) => {
        dishesAdapter.setAll(state, action.payload)
        state.status = 'succeeded'
        state.error = null
      })
      .addCase(fetchDishes.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Unknown error'
      })
  },
})

export const dishesSelectors = dishesAdapter.getSelectors(state => state.dishes)
export default dishesSlice.reducer
