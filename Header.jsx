import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROLES } from "../utils/roles";

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // 🔒  no user header is not shown
  if (!user) return null;

  const role = user.role;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="flex items-center gap-6 px-6 py-4 bg-white border-b border-slate-200 shadow-sm">
      {/* 🏠 Dashboard – everyone */}
      <Link
        to="/dashboard"
        className="font-semibold text-slate-700 hover:text-indigo-600"
      >
        Dashboard
      </Link>

      {/* 👥 Users – Super Admin & Admin only */}
      {(role === ROLES.SUPER_ADMIN || role === ROLES.ADMIN) && (
        <Link
          to="/users"
          className="font-semibold text-slate-700 hover:text-indigo-600"
        >
          Users
        </Link>
      )}

      {/* 🎫 Tickets – all roles */}
      <Link
        to="/tickets"
        className="font-semibold text-slate-700 hover:text-indigo-600"
      >
        Tickets
      </Link>

      {/* ➕ Create Ticket */}
      {(role === ROLES.CUSTOMER ||
        role === ROLES.ADMIN ||
        role === ROLES.MANAGER ||
        role === ROLES.SUPER_ADMIN) && (
        <Link
          to="/tickets/create"
          className="font-semibold text-slate-700 hover:text-indigo-600"
        >
          Create Ticket
        </Link>
      )}

      {/* 📊 SLA Report */}
      {(role === ROLES.SUPER_ADMIN ||
        role === ROLES.ADMIN ||
        role === ROLES.MANAGER) && (
        <Link
          to="/sla-report"
          className="font-semibold text-slate-700 hover:text-indigo-600"
        >
          SLA Report
        </Link>
      )}

      {/* 🚪 Logout */}
      <button
        // ref={logoutBtnRef}   
        onClick={handleLogout}
        className="ml-auto px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold"
      >
        Logout
      </button>
    </nav>
  );
}

export default Header;