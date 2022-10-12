import { createSlice } from "@reduxjs/toolkit";
import { cartProducts } from "../../utils/getLocalStorage";
import {
  userInfo,
  shippingAddress,
  guestInfo,
  shippingMethod,
} from "../../utils/getLocalStorage";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    cart: cartProducts,
    user: userInfo || guestInfo,
    shippingAddress: shippingAddress,
    shippingMethod: shippingMethod,
  },
  reducers: {
    addUser: (state, action) => {
      const { name, email } = action.payload;

      state.user = {
        name,
        email,
      };

      if (userInfo === null) {
        localStorage.setItem("guestInfo", JSON.stringify(state.user));
      }
    },
    addShippingAddress: (state, action) => {
      const { country, address, unit, city, c_state, zip, phone } =
        action.payload;

      state.shippingAddress = {
        country,
        address,
        unit,
        city,
        c_state,
        zip,
        phone,
      };

      localStorage.setItem(
        "shippingAddress",
        JSON.stringify(state.shippingAddress)
      );
    },
    addShippingMethod: (state, action) => {
      const { method, price } = action.payload;

      state.shippingMethod = {
        method,
        price,
      };

      localStorage.setItem(
        "shippingMethod",
        JSON.stringify(state.shippingMethod)
      );
    },
  },
});

export const { addUser, addShippingAddress, addShippingMethod } =
  orderSlice.actions;
