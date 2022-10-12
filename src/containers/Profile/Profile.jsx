import React, { useState, useEffect } from "react";

import { userInfo } from "../../utils/getLocalStorage";
import { ValidationForm } from "../../components";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import "./Profile.scss";
import "../../App.scss";

const Profile = () => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (userInfo) {
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };
      async function getUser() {
        const { data } = await axios.get("/api/profile", config);
        setUser(data);
      }
      getUser();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { first_name, email, password } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bodyParameters = {
      name: first_name || user.name,
      email: email || user.email,
      password: password || "",
    };
    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    };

    if (!first_name && !email && !password) {
      setMessage("No changes occurred.");
    } else {
      try {
        setIsLoading(true);
        await axios.put("/api/profile/edit", bodyParameters, config);
        setIsLoading(false);
        setMessage("You have successfully updated your profile.");
      } catch (e) {
        console.warn(e);
        if (e) {
          setMessage("Something went wrong! Please refresh the page.");
        }
        setIsLoading(false);
      }
    }
    setFormData({ first_name: "", email: "", password: "" });
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div className="form container">
      <div className="form__box">
        <h1>Profile</h1>
        <ValidationForm message={message} color="red" />
        <input
          type="text"
          placeholder={user && user.name}
          name="first_name"
          value={first_name}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder={user && user.email}
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
          {isLoading ? "Updating..." : "Update"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
