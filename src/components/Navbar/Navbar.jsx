import React from "react";

import "./Navbar.scss";

import { BsCart2 } from "react-icons/bs";
import { AiOutlineLogin } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

import MenuMobile from "../MenuMobile/MenuMobile";
import SearchBox from "../SearchBox/SearchBox";
import NavBarMenu from "../NavBarMenu/NavBarMenu";

import { useSelector } from "react-redux";

import { store } from "../../store/store";
import { openCart } from "../../features/cartSlice/cartSlice";
import { signout } from "../../features/authSlice";

import { Link } from "react-router-dom";

import { userInfo } from "../../utils/getLocalStorage";

import Cart from "../Cart/Cart";

const Navbar = () => {
  const { cart, showCart } = useSelector((state) => state.cart);

  const handleSignout = () => {
    store.dispatch(signout());
    window.location.replace("/");
  };

  return (
    <nav className="nav">
      <div className="nav__top">
        <MenuMobile />
        <div className="nav__logo">
          <Link to="/" className="logo">
            theshop
          </Link>
        </div>
        <SearchBox />
        <div className="nav__icons">
          <div className="nav__icons-container">
            {userInfo ? (
              <>
                <div className="nav__profile">
                  <NavBarMenu />
                </div>

                <AiOutlineLogin onClick={handleSignout} />
              </>
            ) : (
              <Link to="/signin">
                <CgProfile style={{ marginTop: 5 }} />
              </Link>
            )}
          </div>
          <div onClick={() => store.dispatch(openCart())}>
            <BsCart2 />
            <span className="cart-badge">
              {cart.length === 0 ? "0" : cart.length}
            </span>
          </div>
        </div>
      </div>
      <div className="nav__down">
        <SearchBox />
        <div className="nav__down-links">
          <Link to="/">Home</Link>
          <a href="#catalogue">Catalogue</a>
          <a href="#deals">Deals</a>
          <a href="#new-season">New Season</a>
        </div>
      </div>
      {showCart && <Cart showCart={showCart} products={cart} />}
    </nav>
  );
};

export default Navbar;
