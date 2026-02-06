import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Ticket,
  Users,
  Bell,
  BookOpen,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { ROLES } from "../utils/roles";

function Sidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // 🔒 user இல்லைனா sidebar-ஐயே காட்ட வேண்டாம்
  if (!user) return null;

  const role = user.role;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="h-screen w-[260px] bg-slate-950 text-white flex flex-col border-r border-white/10">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <h1 className="text-xl font-bold tracking-wide">
          Helpdesk<span className="text-indigo-400">Pro</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Ticket Management System
        </p>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {/* Dashboard – everyone */}
        <NavLink to="/dashboard" className={navClass}>
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        {/* Tickets – everyone */}
        <NavLink to="/tickets" className={navClass}>
          <Ticket size={18} />
          Tickets
        </NavLink>

        {/* Users – Super Admin & Admin only */}
        {(role === ROLES.SUPER_ADMIN || role === ROLES.ADMIN) && (
          <NavLink to="/users" className={navClass}>
            <Users size={18} />
            Users
          </NavLink>
        )}

        {/* Notifications – Admin, Manager, Agent */}
        {(role === ROLES.ADMIN ||
          role === ROLES.MANAGER ||
          role === ROLES.AGENT) && (
          <NavLink to="/notifications" className={navClass}>
            <Bell size={18} />
            Notifications
          </NavLink>
        )}

        {/* Knowledge Base – all */}
        <NavLink to="/knowledge" className={navClass}>
          <BookOpen size={18} />
          Knowledge Base
        </NavLink>

        {/* Reports / SLA – Super Admin, Admin, Manager */}
        {(role === ROLES.SUPER_ADMIN ||
          role === ROLES.ADMIN ||
          role === ROLES.MANAGER) && (
          <NavLink to="/reports" className={navClass}>
            <BarChart3 size={18} />
            Reports
          </NavLink>
        )}

        {/* Settings – Super Admin & Admin */}
        {(role === ROLES.SUPER_ADMIN || role === ROLES.ADMIN) && (
          <NavLink to="/settings" className={navClass}>
            <Settings size={18} />
            Settings
          </NavLink>
        )}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          // ref={logoutBtnRef}   
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
          text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

/* 🔹 Active / inactive nav style */
const navClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all
  ${
    isActive
      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
      : "text-slate-300 hover:bg-white/5 hover:text-white"
  }`;

export default Sidebar;