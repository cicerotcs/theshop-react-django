import { createSlice } from "@reduxjs/toolkit";

import { cartProducts } from "../../utils/getLocalStorage";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: cartProducts,
    showCart: false,
  },
  reducers: {
    add: (state, action) => {
      const { _id, title, price, image, countInStock } = action.payload;
      const existingProduct = state.cart.find((item) => item._id === _id);

      if (!existingProduct) {
        state.cart.push({
          _id,
          title,
          price,
          image,
          countInStock,
          qty: 1,
          totalPrice: price,
        });
      } else {
        if (existingProduct.qty < countInStock) {
          existingProduct.qty++;
        }
        existingProduct.totalPrice = price * existingProduct.qty;
      }
      localStorage.setItem("cartProducts", JSON.stringify(state.cart));
    },
    remove: (state, action) => {
      const _id = action.payload;

      const product = state.cart.find((item) => item._id === _id);

      if (product.qty === 1) {
        state.cart = state.cart.filter((item) => item._id !== _id);
      } else {
        product.qty--;
        product.totalPrice = product.price * product.qty;
      }
      localStorage.setItem("cartProducts", JSON.stringify(state.cart));
    },
    removeAll: (state, action) => {
      const _id = action.payload;
      const product = state.cart.find((item) => item._id === _id);
      state.cart = state.cart.filter((item) => item._id !== _id);
      product.qty = 0;
      localStorage.setItem("cartProducts", JSON.stringify(state.cart));
    },
    openCart: (state) => {
      state.showCart = true;
    },
    closeCart: (state) => {
      state.showCart = false;
    },
    removeLocalStorage: (state) => {
      localStorage.removeItem("cartProducts");
      localStorage.removeItem("shippingMethod");
      state.cart = [];
    },
  },
});

export const {
  add,
  openCart,
  closeCart,
  remove,
  removeAll,
  removeLocalStorage,
} = cartSlice.actions;
