import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import userStore from "../store/userStore";

const PrivateRoute = (permissionLevels) => {
  const user = userStore((state) => state.user.user);

  const isAuthenticated = user && permissionLevels.includes(user.level);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
