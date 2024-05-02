import { createSlice } from "@reduxjs/toolkit"

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: {
      status: false,
      url: "",
    },
  },
  reducers: {
    setIsModalOpen: (state, action) => {
      state.isOpen.status = action.payload.status
      state.isOpen.url = action.payload.url
    },
  },
})

// Action creators are generated for each case reducer function
export const { setIsModalOpen } = modalSlice.actions

export default modalSlice.reducer
