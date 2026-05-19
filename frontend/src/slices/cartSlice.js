import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.find(item => item.id === action.payload.id)
      if (existingItem) {
        existingItem.count += 1
      }
      else {
        state.push({ ...action.payload, count: 1 })
      }
    },
    increment: (state, action) => {
      const item = state.find(item => item.id === action.payload)
      if (item) item.count += 1
    },
    decrement: (state, action) => {
      const item = state.find(item => item.id === action.payload)
      if (item && item.count > 1) item.count -= 1
    },
    removeItem: (state, action) => {
      return state.filter(item => item.id !== action.payload)
    },
    clearCart: () => [],
  },
})

export const { addToCart, increment, decrement, removeItem, clearCart } = cartSlice.actions
export default cartSlice.reducer
