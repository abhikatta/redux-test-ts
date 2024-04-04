import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice"; // the default export
import inputReducer from "./input/inputSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    input: inputReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
