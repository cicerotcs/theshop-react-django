import React, { useState, useEffect } from "react";

import "./Products.scss";
import "../../App.scss";

import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Loading from "../Loading/Loading";
import Paginator from "../Paginator/Paginator";

import axios from "axios";

import { Link, useLocation } from "react-router-dom";

const Products = ({ keyword }) => {
  const [products, setProducts] = useState();
  const [numOfPages, setNumOfPages] = useState();

  const location = useLocation();

  useEffect(() => {
    async function getProducts() {
      const { data } = await axios.get(`/api/products${location.search}`);
      setProducts(data.products);
      setNumOfPages(data.pages);
    }

    getProducts();
  }, [location.search]);

  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", numOfPages);

  return (
    <>
      <div className="products container">
        {products ? (
          products.map((product) => (
            <Link
              to={`/products/${product._id}`}
              className="products__product"
              key={product._id}
            >
              <img src={product.image} alt={product.title} />
              <p className="product-title">{product.title}</p>
              <span className="product-price">{`$${product.price}`}</span>
              <Box sx={{ marginTop: 0.8 }}>
                <Rating
                  name="rating"
                  value={parseInt(product.rating)}
                  readOnly
                  precision={0.5}
                />
              </Box>
              <div className="product-footer" />
            </Link>
          ))
        ) : (
          <Loading />
        )}
      </div>
      <Paginator page={page} numOfPages={numOfPages} keyword={keyword} />
    </>
  );
};

export default Products;
