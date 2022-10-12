import React from "react";

import "./Cart.scss";
import "../../App.scss";

import { motion } from "framer-motion";

import { HiX } from "react-icons/hi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

import { useNavigate } from "react-router-dom";

import TableContainer from "@mui/material/TableContainer";

import { store } from "../../store/store";
import {
  add,
  remove,
  closeCart,
  removeAll,
} from "../../features/cartSlice/cartSlice";

const Cart = ({ showCart, products }) => {
  const navigate = useNavigate();

  const removeFromCart = (_id) => {
    store.dispatch(remove(_id));
  };

  const addToCart = ({ _id, title, price, image, countInStock }) => {
    store.dispatch(add({ _id, title, price, image, countInStock }));
  };

  const handleRemoveAll = (_id) => {
    store.dispatch(removeAll(_id));
  };

  const handleCheckout = () => {
    store.dispatch(closeCart());
    navigate("/checkout");
  };

  const subTotal =
    products && products.reduce((acc, item) => acc + item.qty * item.price, 0);

  return (
    <>
      {showCart && (
        <motion.div
          whileInView={{ x: [300, 0] }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          className="cart"
        >
          <div className="cart__close">
            <h2>cart</h2>
            <span>
              <HiX onClick={() => store.dispatch(closeCart())} />
            </span>
          </div>

          <TableContainer sx={{ maxHeight: 580, width: "100%" }}>
            {products &&
              products.map((product) => (
                <div className="cart__product" key={product._id}>
                  <div className="flex-center">
                    <div className="cart__product-img">
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
                    <span>{`$${parseFloat(product.totalPrice).toFixed(
                      2
                    )}`}</span>
                  </div>
                </div>
              ))}
            <div className="cart__subtotal">
              {subTotal > 0 && (
                <>
                  <p>Subtotal</p>
                  <span>{`$${subTotal.toFixed(2)}`}</span>
                </>
              )}
            </div>
          </TableContainer>

          <button
            onClick={handleCheckout}
            className="button-checkout"
            type="button"
          >
            continue to checkout
          </button>
        </motion.div>
      )}
    </>
  );
};

export default Cart;
