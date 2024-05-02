import { createSlice } from "@reduxjs/toolkit"

export const errorSlice = createSlice({
  name: "error",
  initialState: {
    isError: "",
  },
  reducers: {
    setError: (state, action) => {
      state.isError = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setError } = errorSlice.actions

export default errorSlice.reducer
