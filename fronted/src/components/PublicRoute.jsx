import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import Loader from "./Loader";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading, hasChecked } = useAuthStore();
  if (!hasChecked || isLoading) return <Loader />;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return children;
};

export default PublicRoute;