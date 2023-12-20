import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
  },
  reducers: {
    setIsModalOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsModalOpen } = modalSlice.actions;

export default modalSlice.reducer;
