import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../lib/firebase";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: {}
  },
  reducers: {
    setIsAuthenticated: (state) => {
      state.isAuthenticated = true;
      state.user = {
        id: auth.currentUser.uid,
        email: auth.currentUser.email,
        displayName: auth.currentUser.displayName
      };
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = {};
    },
  },
});

export default authSlice.reducer;
export const { setIsAuthenticated, logout } = authSlice.actions;