import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authReducer",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")!),
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: () => {
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    },
    loginSuccess: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    },
    loginFailure: () => {
      return {
        user: null,
        isFetching: false,
        error: true,
      };
    },
    logout: () => {
      return {
        user: null,
        isFetching: false,
        error: false,
      };
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;
