import { getContrastColor } from '@mantine/core'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  ids: [],
  entities: {},
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const { item } = action.payload
      console.log('Slice item: ', item)
      state.entities[item.id] = item
      state.ids.push(item.id)
    },
    removeItem(state, action) {
      const { dishId } = action.payload

      delete state.entities[dishId]
      state.ids = state.ids.filter(id => id !== dishId)
    },
  },
})

export const { addItem, removeItem } = cartSlice.actions

export default cartSlice.reducer