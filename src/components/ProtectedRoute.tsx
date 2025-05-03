import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC<{ allowedRole: string }> = ({ allowedRole }) => {
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role_name");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== allowedRole) {
    return <Navigate to={`/${role}/dashboard`} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
