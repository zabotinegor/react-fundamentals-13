import "./NoAccess.css";

import React from "react";
import { Link } from "react-router-dom";

const NoAccess: React.FC = () => {
  return (
    <div className="no-access-container">
      <h2>Access Denied</h2>
      <p>You do not have permission to access this page.</p>
      <p>
        If you believe this is an error, please contact the administrator or{" "}
        <Link to="/">return to the homepage</Link>.
      </p>
    </div>
  );
};

export default NoAccess;
