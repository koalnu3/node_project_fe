import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ user }) => {
  const isAuthenticated =
    user.level === "admin" ||
    user.level === "customer" ||
    user.level === "teacher";

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
