import React, { useEffect } from "react";

import "../OrderSidebar/OrderSidebar.scss";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OrderSidebar = () => {
  const { cart } = useSelector((state) => state.cart);
  const { shippingMethod } = useSelector((state) => state.order);

  const navigate = useNavigate();

  useEffect(() => {
    if (cart.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const subtotal =
    cart && cart.reduce((acc, item) => acc + item.qty * item.price, 0);

  return (
    <div className="order__product">
      {cart.map((item) => (
        <div className="order__product-item" key={item._id}>
          <div className="order__product-img">
            <span className="quantity-badge">{item.qty}</span>
            <img src={item.image} alt={item.title} />
            <p>{item.title}</p>
          </div>
          <span>{`$${parseFloat(item.totalPrice).toFixed(2)}`}</span>
        </div>
      ))}
      <div className="separator" />
      <div className="order__product-price">
        <div className="subtotal">
          <p>Subtotal</p>
          <span>{`$${parseFloat(subtotal).toFixed(2)}`}</span>
        </div>
        <div className="shipping">
          <p>Shipping</p>
          <span>
            {shippingMethod === null
              ? "Processing..."
              : `$${shippingMethod.price}`}
          </span>
        </div>
      </div>
      <div className="separator" />
      <div className="order__product-total">
        <p>Total</p>
        <span>{`$${parseFloat(
          shippingMethod !== null
            ? shippingMethod.price + subtotal
            : subtotal + 0
        ).toFixed(2)}`}</span>
      </div>
    </div>
  );
};

export default OrderSidebar;
