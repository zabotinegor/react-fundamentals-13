import React, { ChangeEvent } from "react";

import "./Input.css";

interface InputProps {
  type: "text" | "password";
  placeholder?: string;
  value: string | number;
  onChange: (value: string) => void;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className="custom-input"
    />
  );
};

export default Input;
