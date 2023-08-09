import React from "react";
import "./Button.css";

interface Props {
  text: string;
  onClick?: () => void;
}

const Button: React.FC<Props> = ({ text, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
