import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  return (
    <>{!isAuthenticated && !isLoading ? <Navigate to="/" /> : <Outlet />}</>
  );
};

export default ProtectRoute;
