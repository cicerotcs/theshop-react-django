import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { BrowserRouter } from "react-router-dom";

import { Footer } from "./containers";
import { Navbar } from "./components";

import { Provider } from "react-redux";

import { store } from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Navbar />
      <App />
      <Footer />
    </Provider>
  </BrowserRouter>
);
