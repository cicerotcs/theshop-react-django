import React from "react";

import "./OrderBox.scss";

const OrderBox = ({
  email,
  address,
  unit,
  city,
  zip_code,
  country,
  method,
  price,
}) => {
  return (
    <div className="order__info">
      <div className="order__info-box">
        <p>Contact</p>
        <span>{email}</span>
      </div>
      <div className="order__info-box">
        <p>Ship to</p>
        <span>
          {address}, {unit}, {city}, {zip_code}, {country}
        </span>
      </div>
      {method && (
        <div
          style={{
            padding: 9.6,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p>Method</p>
          <span>
            {method} - ${`${price}`}
          </span>
        </div>
      )}
    </div>
  );
};

export default OrderBox;
