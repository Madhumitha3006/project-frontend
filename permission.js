// src/utils/permission.js
import { ROLES } from "./roles";

/* ===============================
   🔐 Generic permission checker
   =============================== */
export const hasPermission = (role, allowedRoles = []) => {
  if (!role) return false;

  // role lowercase normalize (safety)
  const currentRole = role.toLowerCase();

  return allowedRoles.includes(currentRole);
};

/* ===============================
   📊 Dashboard access
   (ALL roles)
   =============================== */
export const canAccessDashboard = (role) => {
  return hasPermission(role, Object.values(ROLES));
};

/* ===============================
   👥 User Management
   (ONLY superadmin & admin)
   =============================== */
export const canManageUsers = (role) => {
  return hasPermission(role, [
    ROLES.SUPER_ADMIN,
    ROLES.ADMIN,
  ]);
};

/* ===============================
   👁️ View user list
   =============================== */
export const canViewUsers = (role) => {
  return hasPermission(role, [
    ROLES.SUPER_ADMIN,
    ROLES.ADMIN,
  ]);
};

/* ===============================
   🎫 Create Ticket
   =============================== */
export const canCreateTicket = (role) => {
  return hasPermission(role, [
    ROLES.CUSTOMER,
    ROLES.ADMIN,
    ROLES.MANAGER,
    ROLES.SUPER_ADMIN,
  ]);
};

/* ===============================
   🎫 View Tickets
   =============================== */
export const canViewTickets = (role) => {
  return hasPermission(role, Object.values(ROLES));
};

/* ===============================
   🎫 Update / Work on Tickets
   =============================== */
export const canUpdateTicket = (role) => {
  return hasPermission(role, [
    ROLES.SUPER_ADMIN,
    ROLES.ADMIN,
    ROLES.MANAGER,
    ROLES.AGENT,
  ]);
};

/* ===============================
   📊 SLA / Escalation / Reports
   =============================== */
export const canViewSLA = (role) => {
  return hasPermission(role, [
    ROLES.SUPER_ADMIN,
    ROLES.ADMIN,
    ROLES.MANAGER,
  ]);
};

/* ===============================
   🔁 Extra helpers (useful later)
   =============================== */

// check admin level
export const isAdminLevel = (role) => {
  return hasPermission(role, [
    ROLES.SUPER_ADMIN,
    ROLES.ADMIN,
  ]);
};

// check agent level
export const isAgentLevel = (role) => {
  return hasPermission(role, [
    ROLES.AGENT,
  ]);
};
