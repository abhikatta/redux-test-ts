import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import inputReducer from "./input/inputSlice";
import productsReducer from "./product/productSlice";
import userSlice from "./user/userSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    input: inputReducer,
    allProducts: productsReducer,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
