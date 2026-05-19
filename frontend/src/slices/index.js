import { configureStore } from '@reduxjs/toolkit'
import dishesSlice from './dishesSlice.js'
import cartSlice from './cartSlice.js'

export default configureStore({
  reducer: {
    dishes: dishesSlice,
    cart: cartSlice,
  },
})
