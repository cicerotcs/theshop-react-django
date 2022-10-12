export const cartProducts =
  localStorage.getItem("cartProducts") !== null
    ? JSON.parse(localStorage.getItem("cartProducts"))
    : [];

export const userInfo =
  localStorage.getItem("userInfo") !== null
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

export const guestInfo =
  localStorage.getItem("guestInfo") !== null
    ? JSON.parse(localStorage.getItem("guestInfo"))
    : null;

export const shippingAddress =
  localStorage.getItem("shippingAddress") !== null
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {};

export const shippingMethod =
  localStorage.getItem("shippingMethod") !== null
    ? JSON.parse(localStorage.getItem("shippingMethod"))
    : null;
