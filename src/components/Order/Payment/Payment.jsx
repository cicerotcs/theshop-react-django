import React, { useState } from "react";

import "./Payment.scss";

import { OrderBox, OrderBreadcrumbs, OrderSidebar } from "../../../components";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Payment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const { cart } = useSelector((state) => state.cart);
  const { user, shippingAddress, shippingMethod } = useSelector(
    (state) => state.order
  );

  const subtotal =
    cart && cart.reduce((acc, item) => acc + item.qty * item.price, 0);

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post("/api/checkout/payment", {
        cart,
        name: user.name,
        email: user.email,
        paymentMethod: "Standard",
        shippingPrice: shippingMethod.price,
        totalPrice: subtotal + shippingMethod.price,
        address: shippingAddress.address,
        unit: shippingAddress.unit,
        city: shippingAddress.city,
        state: shippingAddress.c_state,
        postalCode: shippingAddress.zip,
        country: shippingAddress.country,
        phone: shippingAddress.phone,
      });
      if (res.status === 200) {
        setIsLoading(false);
        setMessage("Payment successful!");
        navigate(`/orders/${res.data._id}`, { state: "paid" });
      }
    } catch (e) {
      setMessage(
        "Something went wrong! Please refresh the page and try again."
      );
    }
  };

  return (
    <div className="payment__order">
      <div className="payment__order-details">
        <OrderBreadcrumbs />
        {user && shippingAddress && shippingMethod && (
          <OrderBox
            email={user.email}
            address={shippingAddress.address}
            unit={shippingAddress.unit}
            city={shippingAddress.city}
            zip_code={shippingAddress.zip}
            country={shippingAddress.country}
            method={shippingMethod.method}
            price={shippingMethod.price}
          />
        )}

        <div className="order__payment">
          <div className="order__payment-box">
            <h2>Payment</h2>
            <p>All transactions are secure and encrypted.</p>
            <div className="order__payment-message">
              <p>Please press the Pay Now button to simulate this purchase.</p>
            </div>
          </div>
        </div>

        <div className="order__shippingAddress-footer">
          <Link to="/checkout/order/shipping">{`< Return to shipping`}</Link>
          <button onClick={handlePayment} type="button" disabled={isLoading}>
            {isLoading ? "Paying..." : "Pay now"}
          </button>
        </div>
        {message.length > 0 && (
          <div
            style={{
              padding: 16,
              border: "1px solid var(--secondary-color",
              marginTop: 16,
              fontWeight: 700,
            }}
          >
            {message}
          </div>
        )}
      </div>
      <OrderSidebar />
    </div>
  );
};

export default Payment;
