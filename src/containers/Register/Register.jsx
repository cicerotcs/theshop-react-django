import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { ValidationForm } from "../../components";

import axios from "axios";

import "./Register.scss";
import "../../App.scss";

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { first_name, email, password } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!first_name || !email || !password) {
      setMessage("Please fill up all the fields.");
    } else {
      try {
        setIsLoading(true);
        await axios.post("/api/users/register", {
          name: first_name,
          email,
          password,
        });
        setIsLoading(false);
        setMessage("you have been successfully registered");
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      } catch (e) {
        setMessage("Something went wrong! Please refresh the page.");
      }
    }
    setFormData({ first_name: "", email: "", password: "" });
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div className="form">
      <div className="form__box">
        <h1>Create account</h1>
        <ValidationForm message={message} color="red" />
        <input
          type="text"
          placeholder="First Name"
          name="first_name"
          value={first_name}
          onChange={handleChange}
        />
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
          {isLoading ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  );
};

export default Register;
