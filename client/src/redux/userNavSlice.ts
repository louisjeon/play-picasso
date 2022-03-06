import { createSlice } from "@reduxjs/toolkit";

export const userNavSlice = createSlice({
  name: "userNavReducer",
  initialState: false,
  reducers: {
    userNavOff: () => false,
    userNavSwitch: (state) => !state,
  },
});

export const { userNavOff, userNavSwitch } = userNavSlice.actions;
