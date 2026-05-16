import { configureStore } from '@reduxjs/toolkit'
import dishesSlice from './dishesSlice.js'

export default configureStore({
  reducer: {
    dishes: dishesSlice,
  },
})