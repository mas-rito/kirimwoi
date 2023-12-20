import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "error",
  initialState: {
    isError: "",
  },
  reducers: {
    setError: (state, action) => {
      state.isError = action.payload;
      console.log(state.isError);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setError } = counterSlice.actions;

export default counterSlice.reducer;
