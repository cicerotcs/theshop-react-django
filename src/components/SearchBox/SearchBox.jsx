import React, { useState } from "react";

import "./SearchBox.scss";

import { useNavigate, useLocation } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

const SearchBox = () => {
  const [keyword, setKeyword] = useState({ input: "" });

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKeyword({
      ...keyword,
      [name]: value,
    });
  };

  const { input } = keyword;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.input) {
      navigate(`/?keyword=${keyword.input}&page=1`, { state: keyword.input });
    } else {
      navigate(location.pathname);
    }
    setKeyword({ input: "" });
  };

  return (
    <div className="nav__searchbar">
      <input
        type="text"
        placeholder="Search 40000+ products"
        onChange={handleChange}
        name="input"
        value={input}
      />
      <BsSearch onClick={handleSubmit} />
    </div>
  );
};

export default SearchBox;
