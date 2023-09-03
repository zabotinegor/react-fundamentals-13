import React from "react";
import { useSelector } from "react-redux";
import { selectRole } from "../store/user/selectors";
import { Role } from "../types/user";
import { Navigate } from "react-router-dom";
import { NOACCESS } from "../constants/Pages";

interface RolePrivateRouteProps {
  requiredRoles: Role[];
  children: React.ReactNode;
}

const RolePrivateRoute: React.FC<RolePrivateRouteProps> = ({
  requiredRoles,
  children,
}) => {
  const userRole = useSelector(selectRole);

  if (userRole && requiredRoles.includes(userRole)) {
    return children;
  } else {
    return <Navigate to={NOACCESS} replace />;
  }
};

export default RolePrivateRoute;
