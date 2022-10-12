import { configureStore } from "@reduxjs/toolkit";

import { cartSlice } from "../features/cartSlice/cartSlice";
import { authSlice } from "../features/authSlice";
import { orderSlice } from "../features/orderSlice/orderSlice";

export const store = configureStore({
  reducer: {
    order: orderSlice.reducer,
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
  },
});
