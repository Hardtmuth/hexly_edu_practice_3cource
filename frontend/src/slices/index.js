import { configureStore } from '@reduxjs/toolkit'
import dishesSlice from './dishesSlice.js'
import cartSlice from './cartSlice.js'
import authSlice from './authSlice.js'

export default configureStore({
  reducer: {
    dishes: dishesSlice,
    cart: cartSlice,
    auth: authSlice,
  },
})
