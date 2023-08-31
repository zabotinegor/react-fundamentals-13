import React from "react";
import { Navigate } from "react-router-dom";
import { LOGIN } from "../constants/Pages";
import { selectStorageToken } from "../store/user/selectors";
import { useSelector } from "react-redux";

interface AuthPrivateRouteProps {
  children: React.ReactNode;
}

const AuthPrivateRoute: React.FC<AuthPrivateRouteProps> = ({ children }) => {
  const token = useSelector(selectStorageToken);
  const isTokenValid = token && token !== "";

  return isTokenValid ? children : <Navigate to={LOGIN} replace />;
};

export default AuthPrivateRoute;
