import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
  token: null,
  error: null,
  expirationTime: null, 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { user, token } = action.payload;
      const expirationTime = Date.now() + 60 * 60 * 1000; 

      state.isLoggedIn = true;
      state.user = user;
      state.token = token;
      state.error = null;
      state.expirationTime = expirationTime;

      setTimeout(() => {
        state.isLoggedIn = false;
        state.user = null;
        state.token = null;
        state.error = null;
        localStorage.removeItem('token');
      }, 60 * 60 * 1000); 

      localStorage.setItem('expirationTime', expirationTime);
      localStorage.setItem('token', token);
    },
    loginFailure: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      state.error = action.payload.error;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem('token');
      localStorage.removeItem('expirationTime');
    },
    checkTokenExpiration: (state) => {
      const storedExpirationTime = localStorage.getItem('expirationTime');
      if (storedExpirationTime && Date.now() > storedExpirationTime) {
        state.isLoggedIn = false;
        state.user = null;
        state.token = null;
        state.error = null;
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
      }
    },
  },
});

export const { loginSuccess, loginFailure, logout, checkTokenExpiration } = authSlice.actions;
export default authSlice.reducer;
