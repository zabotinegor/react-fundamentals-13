import React from "react";
import { useSelector } from "react-redux";
import { selectRole } from "../store/user/selectors";
import { Role } from "../types/user";
import NoAccess from "../components/NoAccess/NoAccess";

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
    return <NoAccess />;
  }
};

export default RolePrivateRoute;
