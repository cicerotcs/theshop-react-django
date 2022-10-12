import React from "react";

import "./Shipping.scss";
import "../../../App.scss";

import { OrderBox, OrderBreadcrumbs, OrderSidebar } from "../../../components";

import { store } from "../../../store/store";
import { addShippingMethod } from "../../../features/orderSlice/orderSlice";

import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const Shipping = () => {
  const { user, shippingAddress } = useSelector((state) => state.order);

  const navigate = useNavigate();

  const handleShipping = () => {
    store.dispatch(
      addShippingMethod({ method: "Standard Shipping", price: 8 })
    );
    navigate("/checkout/order/shipping/payment");
  };
  return (
    <div className="shipping__order">
      <div className="shipping__order-details">
        <OrderBreadcrumbs />
        {user && shippingAddress && (
          <OrderBox
            email={user.email}
            address={shippingAddress.address}
            unit={shippingAddress.unit}
            city={shippingAddress.city}
            zip_code={shippingAddress.zip}
            country={shippingAddress.country}
          />
        )}

        <div className="order__shippingMethod">
          <div className="order__shippingMethod-box">
            <p>Standard Shipping</p>
            <span>$8.00</span>
          </div>
        </div>

        <div className="order__shippingAddress-footer">
          <Link to="/checkout/order">{`< Return to information`}</Link>
          <button onClick={handleShipping} type="button">
            Continue to payment
          </button>
        </div>
      </div>
      <OrderSidebar />
    </div>
  );
};

export default Shipping;
