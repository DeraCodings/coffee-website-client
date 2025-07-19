"use client";

import { ReusableInputProps } from "@/utils/types";
import React, { useState } from "react";


function ReusableInput({ label, placeholder, error, ...otherProps }:ReusableInputProps) {
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="input-container">
      <label htmlFor={otherProps.id}>{label}</label>
      <input
        type={otherProps.inputType}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        {...otherProps}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default ReusableInput;
