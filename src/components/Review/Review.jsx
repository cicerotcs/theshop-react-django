import React from "react";

import { Link } from "react-router-dom";
import { ValidationForm } from "../../components";
import { userInfo } from "../../utils/getLocalStorage";

import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

import "./Review.scss";

const Review = ({
  message,
  handleChange,
  rating,
  title,
  comment,
  isLoading,
  handleSubmit,
  product,
}) => {
  return (
    <div className="product__reviews">
      <h2>Reviews</h2>
      <ValidationForm message={message} color="red" />
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        {userInfo ? (
          <div className="product__review-form">
            <select onChange={handleChange} name="rating" value={rating}>
              <option value="">Select...</option>
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </select>
            <input
              type="text"
              placeholder="comment title"
              onChange={handleChange}
              name="title"
              value={title}
            />
            <textarea
              type="text"
              placeholder="Write a review"
              onChange={handleChange}
              name="comment"
              value={comment}
            />
            <button type="button" onClick={handleSubmit}>
              {isLoading ? "Submiting..." : "Submit"}
            </button>
          </div>
        ) : (
          <div className="signin-warning">
            <p>
              Please <Link to="/signin">sign in</Link> to comment on this
              product.
            </p>
          </div>
        )}
        <TableContainer sx={{ maxHeight: 440 }}>
          {product && product.reviews.length === 0 && (
            <div
              style={{
                padding: 16,
                border: "1px solid var(--secondary-color",
              }}
            >
              <p>No reviews</p>
            </div>
          )}
          {product &&
            product.reviews.map((review) => (
              <React.Fragment key={review._id}>
                <div className="product__review-item">
                  <div className="product__review-item-name">
                    <p>{review.name}</p>
                  </div>

                  <div className="product__review-item-rating">
                    <div className="flex-center">
                      <Box>
                        <Rating name="rating" value={review.rating} readOnly />
                      </Box>
                      <p style={{ marginLeft: 10, fontSize: 12 }}>
                        {review.createdAt.substring(0, 10)}
                      </p>
                    </div>
                    <h3>{review.title}</h3>
                    <p>{review.comment}</p>
                  </div>
                </div>
                <div className="product-divider" />
              </React.Fragment>
            ))}
        </TableContainer>
      </Paper>
    </div>
  );
};

export default Review;
