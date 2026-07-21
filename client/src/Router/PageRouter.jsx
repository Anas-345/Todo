import { Route, Routes } from "react-router";
import Auth from "../pages/Auth/Auth";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import DashboardLayout from "../pages/Dashboard/DashboardLayout";
import Todos from "../pages/Todos";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ProtectedRoute from "./ProtectedRoute";
import PublicLayout from "../pages/Frontend/PublicLayout";
import Home from "../pages/Frontend/Home";

export default function PageRouter() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="todo" element={<Todos />} />
        </Route>
      </Route>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="auth" element={<Auth />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>
      </Route>
    </Routes>
  );
}
