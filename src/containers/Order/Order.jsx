import React, { useState } from "react";

import "./Order.scss";
import "../../App.scss";

import { Link } from "react-router-dom";
import { store } from "../../store/store";
import {
  addUser,
  addShippingAddress,
} from "../../features/orderSlice/orderSlice";
import { userInfo } from "../../utils/getLocalStorage";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  OrderSidebar,
  OrderBreadcrumbs,
  ValidationForm,
} from "../../components";

const Order = () => {
  const { shippingAddress, user } = useSelector((state) => state.order);

  const [message, setMessage] = useState("");

  const [formData, setFormdData] = useState({
    name: user ? user.name : "",
    email: user ? user.email : "",
    country: shippingAddress ? shippingAddress.country : "",
    address: shippingAddress ? shippingAddress.address : "",
    unit: "",
    city: shippingAddress ? shippingAddress.city : "",
    c_state: shippingAddress ? shippingAddress.c_state : "",
    zip: shippingAddress ? shippingAddress.zip : "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormdData({ ...formData, [name]: value });
  };

  const { name, email, country, address, unit, city, c_state, zip, phone } =
    formData;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !country || !address || !city || !c_state || !zip) {
      setMessage("Please fill up all the fields!");
    } else {
      store.dispatch(
        addUser({
          name,
          email,
        })
      );
      store.dispatch(
        addShippingAddress({
          name,
          email,
          country,
          address,
          unit,
          city,
          c_state,
          zip,
          phone,
        })
      );

      navigate("/checkout/order/shipping");
    }
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div className="order">
      <div className="order__details">
        <OrderBreadcrumbs />
        <div className="order__contactInfo">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2>Contact information</h2>
            {!userInfo && (
              <p>
                Already have an account? <Link to="/signin">Log in</Link>
              </p>
            )}
          </div>
          <ValidationForm message={message} color="red" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            name="email"
            onChange={handleOnChange}
          />
        </div>
        <div className="order__shippingAddress">
          <h2>Shipping address</h2>
          <input
            type="text"
            placeholder="Country/region"
            name="country"
            value={country}
            onChange={handleOnChange}
          />
          <input
            type="text"
            placeholder="First name"
            value={name}
            name="name"
            onChange={handleOnChange}
          />
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={address}
            onChange={handleOnChange}
          />
          <input
            type="text"
            placeholder="Apartment, suite, etc. (optional)"
            name="unit"
            value={unit}
            onChange={handleOnChange}
          />
          <div style={{ display: "flex" }}>
            <input
              type="text"
              placeholder="City"
              name="city"
              value={city}
              onChange={handleOnChange}
            />
            <input
              type="text"
              placeholder="State"
              name="c_state"
              value={c_state}
              onChange={handleOnChange}
            />
            <input
              type="text"
              placeholder="ZIP code"
              name="zip"
              value={zip}
              onChange={handleOnChange}
            />
          </div>
          <input
            type="text"
            placeholder="Phone (optional)"
            name="phone"
            value={phone}
            onChange={handleOnChange}
          />
        </div>
        <div className="order__shippingAddress-footer">
          <Link to="/checkout">{`< Return to cart`}</Link>
          <button onClick={handleSubmit} type="button">
            Continue to shipping
          </button>
        </div>
      </div>
      <OrderSidebar />
    </div>
  );
};

export default Order;
