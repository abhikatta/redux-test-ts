import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SerializedUser {
  uid: string;
  displayName: string | null;
  email: string | null;
}

export interface UserState {
  isLoggedIn: boolean;
  user: SerializedUser | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  user: null,
};

const userSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
    getuser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
});

// const authUser = createAsyncThunk("authUser", async () => {});
export const { login, logout, getuser } = userSlice.actions;

export default userSlice.reducer;
