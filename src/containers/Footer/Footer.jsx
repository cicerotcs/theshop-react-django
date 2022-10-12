import React from "react";

import "./Footer.scss";
import "../../App.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__logo">
          <h2>THESHOP</h2>
        </div>
        <div
          className="product-divider"
          style={{ backgroundColor: "var(--gray-color)", marginTop: 64 }}
        />
        <div className="footer__links">
          <div className="footer__links-link">
            <h3>Delivery and Pick Up</h3>
            <Link>Delivery offers</Link>
            <Link>Standard delivery</Link>
            <Link>2 day delivery</Link>
            <Link>Same day delivery</Link>
            <Link>Direct to boot</Link>
            <Link>Service desk</Link>
          </div>
          <div className="footer__links-link">
            <h3>Payments</h3>
            <Link>Paypal</Link>
            <Link>Afterpay</Link>
            <Link>Zip</Link>
            <Link>Lay-by</Link>
            <Link>Gift Cards</Link>
          </div>
          <div className="footer__links-link">
            <h3>About THESHOP</h3>
            <Link>About Us</Link>
            <Link>Careers at BIG W</Link>
            <Link>Sustainability</Link>
            <Link>Community</Link>
            <Link>Competitions</Link>
          </div>
          <div className="footer__links-link">
            <h3>Help</h3>
            <Link>FAQs</Link>
            <Link>COVID-19</Link>
            <Link>Return Policies</Link>
            <Link>Product Recalls</Link>
            <Link>Notices</Link>
          </div>
          <div className="footer__links-link">
            <h3>Useful Links</h3>
            <Link>Track my order</Link>
            <Link>Contact Us</Link>
            <Link>THESHOP App</Link>
          </div>
        </div>
        <div
          className="product-divider"
          style={{ backgroundColor: "var(--gray-color)", marginTop: 64 }}
        />
        <div className="footer__links-terms">
          <div>
            <Link>
              Terms and Conditions <span>|</span>
            </Link>
            <Link>
              Privacy at Big W <span>|</span>
            </Link>
            <Link>Contact Us</Link>
          </div>
          <p>©THESHOP</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
