import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    signin: (state, action) => {
      const data = action.payload;
      if (data) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        state.isAuthenticated = true;
        localStorage.removeItem("guestInfo");
      }
    },
    signout: (state, action) => {
      localStorage.removeItem("userInfo");
      state.isAuthenticated = false;
    },
  },
});

export const { signin, signout } = authSlice.actions;
