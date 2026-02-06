// src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, isAuthenticated } = useAuth();

  /* ===============================
     ❌ Not logged in / user missing
     =============================== */
  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  /* ===============================
     ❌ Role not allowed
     =============================== */
  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  /* ===============================
     ✅ Allowed
     =============================== */
  return children;
}

export default ProtectedRoute;
