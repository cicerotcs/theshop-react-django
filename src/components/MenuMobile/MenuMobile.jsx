import React, { useState } from "react";

import "./MenuMobile.scss";

import { motion } from "framer-motion";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";

import { userInfo } from "../../utils/getLocalStorage";

const MenuMobile = () => {
  const [toggle, setToggle] = useState(false);

  const handleClose = () => {
    setToggle(false);
  };

  return (
    <div className="navbar__mobile">
      {!toggle && (
        <span className="navbar__mobile-open">
          <HiMenuAlt4 onClick={() => setToggle(true)} />
        </span>
      )}

      {toggle && (
        <motion.div
          whileInView={{ x: [300, 0] }}
          transition={{ duration: 0.85, ease: "easeOut" }}
        >
          <span className="navbar__mobile-close">
            <HiX onClick={() => setToggle(false)} />
          </span>
          <ul className="navbar__links">
            <li>
              <Link to="/" onClick={handleClose}>
                Home
              </Link>
              <Link>Catalogue</Link>
              <Link>Deals</Link>
              <Link>Contact</Link>
            </li>
          </ul>
          <ul className="navbar__auth-mobile">
            {!userInfo ? (
              <>
                <Link to="/signin" className="profile" onClick={handleClose}>
                  Sign in
                </Link>
                <Link to="signup" className="profile" onClick={handleClose}>
                  Sign up
                </Link>
              </>
            ) : (
              <>
                <Link to="/profile" className="profile" onClick={handleClose}>
                  Profile
                </Link>
                <Link to="/myorders" className="profile" onClick={handleClose}>
                  My Orders
                </Link>
              </>
            )}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default MenuMobile;
