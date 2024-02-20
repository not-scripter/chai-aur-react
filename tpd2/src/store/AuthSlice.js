import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginStatus: false,
  userData: null,
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.loginStatus = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.loginStatus = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = AuthSlice.actions;

export default AuthSlice.reducer;
