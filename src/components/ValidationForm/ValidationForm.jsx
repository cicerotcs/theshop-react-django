import React, { useState, useEffect } from "react";

import "./ValidationForm.scss";

const ValidationForm = ({ message, color }) => {
  const [validationForm, setValidationForm] = useState("");

  useEffect(() => {
    setValidationForm(message);
    setTimeout(() => {
      setValidationForm("");
    }, 3000);
  }, [message]);

  return <p style={{ color: `${color}`, fontSize: 12 }}>{validationForm}</p>;
};

export default ValidationForm;
