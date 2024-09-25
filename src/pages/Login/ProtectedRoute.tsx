import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const token = localStorage.getItem("authToken"); 

  return isAuthenticated && token ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;