import React from "react";
import "./Input.css";

interface InputProps {
  type: "text" | "password";
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ type, placeholder }) => {
  return (
    <input type={type} placeholder={placeholder} className="custom-input" />
  );
};

export default Input;
