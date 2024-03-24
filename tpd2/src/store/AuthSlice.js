import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authStatus: false,
  userData: null,
  // profileData: null,
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.authStatus = true;
      state.userData = action.payload;
      // state.profileData = action.payload.profileData;
    },
    logout: (state) => {
      state.authStatus = false;
      state.userData = null;
      // state.profileData = null;
    },
  },
});

export const { login, logout } = AuthSlice.actions;

export default AuthSlice.reducer;
