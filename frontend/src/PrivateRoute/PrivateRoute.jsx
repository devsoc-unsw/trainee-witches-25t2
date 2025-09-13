import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // If not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;