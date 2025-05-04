// src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "./Context/AuthContext";


interface ProtectedRouteProps {

  allowedRole: string;
  children?: React.ReactNode; // Add this line
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRole, children }) => {
//   const { user } = useAuth();
  const role = localStorage.getItem("role_name");

  if (!role || role !== allowedRole) {
    return <Navigate to="/login" />;
  }

  return <>{children ? children : <Outlet />}</>;
};

export default ProtectedRoute;
