import { Routes, Route } from "react-router-dom";

import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Dashboard from "@/pages/dashboard/Dashboard";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* PROTECTED ROUTES */}
      <Route element={<ProtectedRoute />}>
  <Route element={<DashboardLayout />}>
    <Route path="/" element={<Dashboard />} />
  </Route>
</Route>

      {/* 404 */}
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
}