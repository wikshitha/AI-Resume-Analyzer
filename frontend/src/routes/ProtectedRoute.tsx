import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  exp: number;
};

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode<DecodedToken>(token);

    const isExpired = decoded.exp * 1000 < Date.now();

    if (isExpired) {
      localStorage.removeItem("token");
      return <Navigate to="/login" replace />;
    }
  } catch {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}