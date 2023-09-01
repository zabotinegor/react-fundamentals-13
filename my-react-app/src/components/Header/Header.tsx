import "./Header.css";

import { useLocation, useNavigate } from "react-router-dom";
import logo from "./components/Logo/logo.png";
import Button from "../../common/Button/Button";
import { LOGIN, REGISTRATION, TOKEN } from "../../constants/Pages";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store/user/reducer";
import { selectUser } from "../../store/user/selectors";
import { LogoutRequest } from "../../types/user";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const removeSensetiveData = () => {
    localStorage.removeItem(TOKEN);
    navigate(LOGIN);
  };

  const handleLogout = () => {
    const logoutRequest: LogoutRequest = {
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
            {user.name && (
              <span className="username">Welcome, {user.name}! </span>
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
