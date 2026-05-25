import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  address: null,
  isDelivery: false,
}

const deliverySlice = createSlice({
  name: 'delivery',
  initialState,
  reducers: {
    addAddress: (state, action) => {
      state.address = action.payload
    },
    toggleDelivery: (state) => {
      state.isDelivery = !state.isDelivery
    },
  },
})

export const { addAddress, toggleDelivery } = deliverySlice.actions
export default deliverySlice.reducer
