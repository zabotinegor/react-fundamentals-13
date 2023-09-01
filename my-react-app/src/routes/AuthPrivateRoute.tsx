import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { LOGIN } from "../constants/Pages";
import {
  selectRole,
  selectStorageToken,
  selectUser,
} from "../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../store/user/reducer";

interface AuthPrivateRouteProps {
  children: React.ReactNode;
}

const AuthPrivateRoute: React.FC<AuthPrivateRouteProps> = ({ children }) => {
  const dispatch = useDispatch();
  const token = useSelector(selectStorageToken);
  const user = useSelector(selectUser);
  const userRole = useSelector(selectRole);
  const isTokenValid = token && token !== "";

  useEffect(() => {
    if (
      isTokenValid &&
      (!user || !user.name || user.name === "" || !userRole)
    ) {
      dispatch(actions.userMeRequest());
    }
  }, []);

  if (isTokenValid) {
    return children;
  } else {
    return <Navigate to={LOGIN} replace />;
  }
};

export default AuthPrivateRoute;
