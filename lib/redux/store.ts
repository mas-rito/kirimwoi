import { configureStore } from "@reduxjs/toolkit";
import errorSlices from "./slices/errorSlices";

export const store = configureStore({
  reducer: {
    isError: errorSlices,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
