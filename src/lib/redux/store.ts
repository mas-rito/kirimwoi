import { configureStore } from "@reduxjs/toolkit"

import errorSlices from "./slices/errorSlices"
import modalSlice from "./slices/modalSlice"

export const store = configureStore({
  reducer: {
    isError: errorSlices,
    isModalOpen: modalSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store
