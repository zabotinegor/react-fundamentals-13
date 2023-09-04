import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { LOGIN, NOACCESS } from "../constants/Pages";
import {
  selectRole,
  selectStorageToken,
  selectUser,
} from "../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../store/user/reducer";
import { Request } from "../types/common";

interface AuthPrivateRouteProps {
  children: React.ReactNode;
}

const AuthPrivateRoute: React.FC<AuthPrivateRouteProps> = ({ children }) => {
  const dispatch = useDispatch();
  const token = useSelector(selectStorageToken);
  const user = useSelector(selectUser);
  const userRole = useSelector(selectRole);
  const navigate = useNavigate();

  const isTokenValid = token && token !== "";

  useEffect(() => {
    if (
      isTokenValid &&
      (!user || !user.name || user.name === "" || !userRole)
    ) {
      const request: Request = {
        handleAPIError: (status) => {
          if (status === 401) {
            navigate(LOGIN, { replace: true });
          } else if (status === 403) {
            navigate(NOACCESS, { replace: true });
          }
        },
      };

      dispatch(actions.getUserInfo(request));
    }
  }, []);

  if (isTokenValid) {
    return children;
  } else {
    return <Navigate to={LOGIN} replace />;
  }
};

export default AuthPrivateRoute;
