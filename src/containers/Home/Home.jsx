import React from "react";

import "./Home.scss";

import { useLocation } from "react-router-dom";

import { Products } from "../../components/";

const Home = () => {
  const location = useLocation();

  const { state } = location;

  return (
    <div className="hero">
      <h1>Latest Products</h1>
      <Products keyword={state} />
    </div>
  );
};

export default Home;
