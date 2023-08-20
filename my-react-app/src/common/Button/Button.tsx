import React, { ButtonHTMLAttributes } from "react";

import "./Button.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const Button: React.FC<Props> = ({ text, ...props }) => {
  return (
    <button className="button" {...props}>
      {text}
    </button>
  );
};

export default Button;
