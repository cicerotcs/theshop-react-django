import React, { useState, useEffect } from "react";

import { store } from "../../store/store";
import { add, remove, removeAll } from "../../features/cartSlice/cartSlice";

import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { RiDeleteBin6Fill } from "react-icons/ri";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Loading } from "../../components";

import axios from "axios";

import "./Checkout.scss";
import "../../App.scss";

const Checkout = () => {
  const { cart } = useSelector((state) => state.cart);

  const [products, setProducts] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    async function getProducts() {
      const { data } = await axios.get("/api/products");
      setProducts(data.products);
    }

    getProducts();
  }, []);

  const removeFromCart = (_id) => {
    store.dispatch(remove(_id));
  };

  const addToCart = ({ _id, title, price, image, countInStock }) => {
    store.dispatch(add({ _id, title, price, image, countInStock }));
  };

  const handleRemoveAll = (_id) => {
    store.dispatch(removeAll(_id));
  };

  const total =
    cart && cart.reduce((acc, item) => acc + item.qty * item.price, 0);

  const quantity = cart && cart.reduce((acc, item) => acc + item.qty, 0);

  if (!cart) {
    return <Loading />;
  }

  return (
    <div className="checkout container">
      <Paper className="checkout__cart" sx={{ overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 700 }}>
          {cart && cart.length > 0 ? (
            cart.map((product) => (
              <div className="cart__product" key={product._id}>
                <div className="flex-center">
                  <div
                    style={{ marginRight: 60 }}
                    className="cart__product-img"
                  >
                    <img src={product.image} alt={product.title} />
                  </div>
                  <div className="cart__product-features">
                    <h3>{product.title}</h3>
                    <div className="cart__product-wrapper">
                      <span>{`$${product.price}`}</span>
                      <span className="product-multiplier">x</span>
                      <div className="cart__product-qty">
                        <AiOutlineMinus
                          onClick={() => removeFromCart(product._id)}
                        />
                        <input type="text" value={product.qty} readOnly />
                        <AiOutlinePlus onClick={() => addToCart(product)} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="cart__product-price">
                  <RiDeleteBin6Fill
                    onClick={() => handleRemoveAll(product._id)}
                  />
                  <span>{`$${parseFloat(product.totalPrice).toFixed(2)}`}</span>
                </div>
              </div>
            ))
          ) : (
            <p style={{ fontSize: 20, textAlign: "center", fontWeight: 700 }}>
              Your cart is empty
            </p>
          )}
        </TableContainer>
      </Paper>
      <div className="checkout__features">
        <div className="checkout__features-subtotal">
          <div className="checkout__features-total">
            <p>{`Subtotal (${quantity} items)`}</p>
            <span>{`$${total.toFixed(2)}`}</span>
          </div>
          <div className="checkout__features-total">
            <p>Discounts</p>
            <span>{`- $${0.0}`}</span>
          </div>
          <div className="checkout__features-total">
            <p style={{ fontSize: 20 }}>Total</p>
            <span style={{ fontSize: 20 }}>{`$${total.toFixed(2)}`}</span>
          </div>
          <button onClick={() => navigate("/checkout/order")} type="button">
            Continue to checkout
          </button>
        </div>
        <p
          style={{ fontWeight: 700, marginTop: 16, textTransform: "uppercase" }}
        >
          You may also like
        </p>
        <div className="checkout__features-products">
          {products &&
            products
              .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
              .slice(0, 4)
              .map((product) => (
                <div
                  onClick={() => addToCart(product)}
                  className="features-product"
                  key={product._id}
                >
                  <img src={product.image} alt={product.title} />
                  <p>{product.title}</p>
                  <span>${product.price}</span>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
