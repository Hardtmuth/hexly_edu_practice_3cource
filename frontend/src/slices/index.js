import { configureStore } from '@reduxjs/toolkit'
import dishesSlice from './dishesSlice.js'
import cartSlice from './cartSlice.js'
import authSlice from './authSlice.js'
import deliverySlice from './deliverySlice.js'

export default configureStore({
  reducer: {
    dishes: dishesSlice,
    cart: cartSlice,
    auth: authSlice,
    delivery: deliverySlice,
  },
})
