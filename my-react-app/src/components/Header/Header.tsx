import "./Header.css";

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "./components/Logo/logo.png";
import Button from "../../common/Button/Button";
import { LOGIN, REGISTRATION, TOKEN, USER_NAME } from "../../constants/Pages";
import { LogoutRequest } from "../../types";
import { useDispatch } from "react-redux";
import { actions } from "../../store/user/reducer";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const userName = localStorage.getItem(USER_NAME);

  const removeSensetiveData = () => {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER_NAME);
    navigate(LOGIN);
  };

  const handleLogout = () => {
    const logoutRequest: LogoutRequest = {
      token: localStorage.getItem(TOKEN) || "",
      handleSuccess: () => {
        removeSensetiveData();
      },
      handleAPIError: () => {
        console.error("API error occurred");
        removeSensetiveData();
      },
      handleError: (error) => {
        console.error(error);
        removeSensetiveData();
      },
    };

    dispatch(actions.logoutRequest(logoutRequest));
  };

  const renderHeaderContent = () => {
    if (location.pathname !== LOGIN && location.pathname !== REGISTRATION) {
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
