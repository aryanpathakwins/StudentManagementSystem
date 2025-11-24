import { configureStore } from "@reduxjs/toolkit";
import { phoneSlice } from "./apislice"; 

export const storeAppi = configureStore({
  reducer: {
    [phoneSlice.reducerPath]: phoneSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(phoneSlice.middleware),
});

export type RootState = ReturnType<typeof storeAppi.getState>;
export type AppDispatch = typeof storeAppi.dispatch;

export default storeAppi;
