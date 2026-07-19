import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContextProvider";

export default function ProtectedRoute() {
  const { user } = useAuth();
console.log('user', user)
  return user ? <Outlet /> : <Navigate to="/auth/login" replace />;
}
