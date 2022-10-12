import React, { useState, useEffect } from "react";

import "../OrderSummary/OrderSummary.scss";

import axios from "axios";

import { useParams, Link } from "react-router-dom";
import { userInfo } from "../../../utils/getLocalStorage";

import { Loading } from "../../../components";

import { useNavigate, useLocation } from "react-router-dom";

import { removeLocalStorage } from "../../../features/cartSlice/cartSlice";
import { store } from "../../../store/store";

const OrderSummary = () => {
  const [order, setOrder] = useState();

  const { id } = useParams();

  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (state === "paid") {
      store.dispatch(removeLocalStorage());
    }
  }, [state]);

  useEffect(() => {
    async function getOrder() {
      try {
        if (userInfo !== null) {
          const config = {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          };
          const { data } = await axios.get(`/api/orders/${id}`, config);
          setOrder(data);
        } else {
          navigate("/signin");
        }
      } catch (e) {
        navigate("/");
      }
    }
    getOrder();
  }, [id, navigate]);

  return (
    <div className="order__summary container">
      {order ? (
        <>
          <div className="order__summary-details">
            <h1>Your order details</h1>
            <div className="order__summary-shipping">
              <h2>Shipping</h2>
              <p>
                <span>Name:</span> {order.name}
              </p>
              <p>
                <span>Email:</span> {order.email}
              </p>
              <p>
                <span>Address:</span> {order.shippingAddress.address}
              </p>
              <div
                className={`order__summary-shipping-status ${
                  order.isDelivered ? `success` : `danger`
                }`}
              >
                {order.isDelivered ? "Delivered" : "Pending delivery"}
              </div>
              <div className="product-divider" />
            </div>
            <div className="order__summary-payment">
              <h2>Payment method</h2>
              <p>
                <span>Method:</span> {order.paymentMethod}
              </p>
              <div
                className={`order__summary-payment-status ${
                  order.isPaid ? `success` : `danger`
                }`}
              >
                {order.isPaid ? "Paid" : "Pending payment"}
              </div>
              <div className="product-divider" />
            </div>
            <div className="order__summary-items">
              <h2>Order items</h2>
              {order.cart.map((item) => (
                <div key={item._id} className="order__summary-items-item">
                  <div>
                    <img src={item.image} alt={item.name} />
                    <p>{item.name}</p>
                  </div>
                  <p>
                    {item.qty} x ${item.price} = $
                    {parseFloat(item.qty * item.price).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="order__summary-expenses">
            <h2>Order summary</h2>
            <div className="order__summary-expenses-box">
              <div className="order__summary-expenses-details">
                <p>{`Subtotal (${order.cart.reduce(
                  (acc, item) => acc + item.qty,
                  0
                )} items)`}</p>
                <span>
                  $
                  {parseFloat(
                    order.cart.reduce(
                      (acc, item) => acc + item.qty * item.price,
                      0
                    )
                  ).toFixed(2)}
                </span>
              </div>
              <div className="order__summary-expenses-details">
                <p>Discounts</p>
                <span>{`- `}</span>
              </div>
              <div className="order__summary-expenses-details">
                <p>Shipping</p>
                <span>{`$${order.shippingPrice}`}</span>
              </div>
              <div className="order__summary-expenses-details">
                <p style={{ fontSize: 20 }}>Total</p>
                <span style={{ fontSize: 20 }}>{`$${parseFloat(
                  order.cart.reduce(
                    (acc, item) => acc + item.qty * item.price,
                    0
                  ) + parseFloat(order.shippingPrice)
                ).toFixed(2)}`}</span>
              </div>
            </div>
            <div style={{ marginTop: 32, textAlign: "right" }}>
              <Link to="/myorders">Go to orders </Link>
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default OrderSummary;
