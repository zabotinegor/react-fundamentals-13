import React from "react";
import logo from "./components/Logo/logo.png";
import Button from "../../common/Button/Button";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="button-container">
        {/* add button text to const */}
        <Button text="Logout" />
      </div>
    </header>
  );
};

export default Header;
