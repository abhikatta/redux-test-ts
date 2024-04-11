import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InputState {
  value: string;
}

export const initialState: InputState = {
  value: "",
};

const inputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    setInput: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    clearInput: (state) => {
      state.value = "";
    },
  },
});
export const { setInput, clearInput } = inputSlice.actions;

export default inputSlice.reducer;
