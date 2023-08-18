import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "./components/Logo/logo.png";
import Button from "../../common/Button/Button";

import "./Header.css";

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  const renderHeaderContent = () => {
    if (location.pathname !== "/login" && location.pathname !== "/register") {
      return (
        <>
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          <div className="button-container">
            {userName && (
              <span className="username">Welcome, {userName}! </span>
            )}
            <Button text="Logout" onClick={handleLogout} />
          </div>
        </>
      );
    } else {
      return (
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
      );
    }
  };

  return <header className="header">{renderHeaderContent()}</header>;
};

export default Header;
