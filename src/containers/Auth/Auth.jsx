import React, { useState, useEffect } from "react";

import "./Auth.scss";
import "../../App.scss";

import { ValidationForm } from "../../components";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { signin } from "../../features/authSlice";
import { store } from "../../store/store";

import { userInfo } from "../../utils/getLocalStorage";

import axios from "axios";

const Auth = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { email, password } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const { data } = await axios.post("/api/login", {
        username: email,
        password,
      });
      store.dispatch(signin(data));
      setIsLoading(false);
      window.location.replace("/");
    } catch (e) {
      if (e.response.status === 401) {
        setMessage("Email or password are wrong!");
      } else {
        setMessage("Email or password are missing.");
      }
      setIsLoading(false);
    }
    setFormData({ email: "", password: "" });
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div className="form">
      <div className="form__box">
        <h1>Welcome</h1>
        <ValidationForm message={message} color="red" />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <button type="button" onClick={handleSubmit}>
          {isLoading ? "Signing..." : "Sign in"}
        </button>
        <div className="auth__box-signup">
          <p>
            Don't have an account? <Link to="/signup">sign up</Link>
          </p>
          <Link to="/forgot-password">forgot password?</Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
