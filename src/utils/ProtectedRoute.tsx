import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
