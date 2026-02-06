import React from "react";
import { Navigate } from "react-router-dom";
import Header from "../../components/Header";
import { tickets } from "../../data/tickets";
import { isSlaBreached } from "../../utils/slaUtils";
import { useAuth } from "../../context/AuthContext";
import { ROLES } from "../../utils/roles";

const SLAReport = () => {
  const { user, isAuthenticated } = useAuth();

  // 🔒 Not logged in
  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  const role = user.role;

  // ❌ Unauthorized roles
  const allowedRoles = [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGER];

  if (!allowedRoles.includes(role)) {
    return (
      <div>
        <Header />
        <h3 style={{ textAlign: "center", marginTop: "40px", color: "red" }}>
          Access Denied: SLA Report not allowed
        </h3>
      </div>
    );
  }

  // 📊 SLA stats
  const total = tickets.length;
  const breached = tickets.filter((ticket) => isSlaBreached(ticket)).length;
  const withinSla = total - breached;

  return (
    <div>
      <Header />
      <div style={{ maxWidth: "600px", margin: "40px auto" }}>
        <h2>SLA Report</h2>

        <p><b>Total Tickets:</b> {total}</p>

        <p style={{ color: "red" }}>
          <b>SLA Breached:</b> {breached}
        </p>

        <p style={{ color: "green" }}>
          <b>Within SLA:</b> {withinSla}
        </p>

        <p style={{ marginTop: "15px", fontStyle: "italic", color: "#666" }}>
          Visible to Super Admin / Admin / Manager only
        </p>
      </div>
    </div>
  );
};

export default SLAReport;
