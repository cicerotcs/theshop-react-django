import React, { useState, useEffect } from "react";

import "./Product.scss";
import "../../App.scss";

import { userInfo } from "../../utils/getLocalStorage";

import Box from "@mui/material/Box";
import Loading from "../../components/Loading/Loading";
import Rating from "@mui/material/Rating";
import Review from "../../components/Review/Review";

import axios from "axios";

import { store } from "../../store/store";
import { add, openCart } from "../../features/cartSlice/cartSlice";
import { useParams } from "react-router-dom";

const Product = () => {
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    rating: "",
    title: "",
    comment: "",
  });
  const [message, setMessage] = useState("");

  const { id } = useParams();

  useEffect(() => {
    async function getProduct() {
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct({
        ...data,
        price: parseFloat(data.price),
      });
    }
    getProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const { rating, title, comment } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !comment || rating === "") {
      setMessage("Please fill up all the fields.");
    } else {
      const bodyParameters = {
        title,
        comment,
        rating: parseInt(rating),
      };
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };
      try {
        setIsLoading(true);
        await axios.post(
          `/api/products/${id}/reviews/`,
          bodyParameters,
          config
        );
        setIsLoading(false);
        setMessage("You have successfully submited a new comment");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } catch (e) {
        setMessage(e.response.data[0]);
        setIsLoading(false);
      }
    }

    setFormData({ rating: "", title: "", comment: "" });

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const addToCart = ({ _id, title, price, image, countInStock }) => {
    store.dispatch(add({ _id, title, price, image, countInStock }));
    store.dispatch(openCart());
  };

  return (
    <>
      <div className="product container">
        {!product ? (
          <Loading />
        ) : (
          <>
            <div className="product__img">
              <img src={product.image} alt={product.title} />
            </div>
            <div className="product__desc">
              <h1 className="product-header">{product.title}</h1>
              <Box>
                <Rating
                  name="rating"
                  value={parseInt(product.rating)}
                  readOnly
                />
              </Box>
              <div className="product-divider" />
              <div className="flex-center">
                <span className="product__desc-price">{`$${product.price.toFixed(
                  2
                )}`}</span>
                <button
                  disabled={product.countInStock < 1}
                  onClick={() => addToCart(product)}
                  type="button"
                >
                  {product.countInStock > 0 ? "Add to cart" : "Out of Stock"}
                </button>
              </div>

              <p className="product_desc-details">{product.description}</p>
            </div>
          </>
        )}
      </div>
      <Review
        message={message}
        handleChange={handleChange}
        rating={rating}
        title={title}
        comment={comment}
        isLoading={isLoading}
        product={product}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default Product;
