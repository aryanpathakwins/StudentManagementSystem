import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../studentSlice";
import phoneReducer from "./phoneSlice";
import { phoneSlice } from "../ReduxAPI/apislice";
import { studentsApi } from "../Student/studentApi";
import { phoneEntriesApi } from "../Phone/phoneApi";

export const store = configureStore({
  reducer: {
    students: studentReducer,
    phones: phoneReducer,
    [phoneSlice.reducerPath]: phoneSlice.reducer,
    [studentsApi.reducerPath]: studentsApi.reducer,
    [phoneEntriesApi.reducerPath]: phoneEntriesApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(phoneSlice.middleware)
      .concat(studentsApi.middleware)
      .concat(phoneEntriesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;