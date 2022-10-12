import { Routes, Route, Navigate } from "react-router-dom";

import {
  Auth,
  Home,
  Product,
  Register,
  Profile,
  Checkout,
  Order,
} from "./containers/";

import { Shipping, Payment, OrderSummary, MyOrders } from "./components";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/products/:id" element={<Product />} />
      <Route path="/signin" element={<Auth />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/myorders" element={<MyOrders />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/checkout/order" element={<Order />} />
      <Route path="/checkout/order/shipping" element={<Shipping />} />
      <Route path="/checkout/order/shipping/payment" element={<Payment />} />
      <Route path="/orders/:id" element={<OrderSummary />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
