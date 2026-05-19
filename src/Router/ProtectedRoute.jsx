import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContextProvider";

export default function ProtectedRoute() {
  const { users } = useAuth();

  const activeUser = users.find((u) => u.active);

  return activeUser ? <Outlet /> : <Navigate to="/auth/login" replace />;
}
