import React from "react";
import { Navigate } from "react-router-dom";
import Header from "../../components/Header";
import { tickets } from "../../data/tickets";
import { isSlaBreached } from "../../utils/slaUtils";
import { useAuth } from "../../context/AuthContext";
import { ROLES } from "../../utils/roles";

const EscalationList = () => {
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
          Access Denied: SLA Escalations not allowed
        </h3>
      </div>
    );
  }

  // ✅ SLA breached tickets
  const escalatedTickets = tickets.filter((ticket) =>
    isSlaBreached(ticket)
  );

  return (
    <div>
      <Header />
      <div style={{ maxWidth: "700px", margin: "40px auto" }}>
        <h2>Escalated Tickets</h2>

        {escalatedTickets.length === 0 ? (
          <p>No escalations found 🎉</p>
        ) : (
          <ul>
            {escalatedTickets.map((ticket) => (
              <li key={ticket.id}>
                Ticket #{ticket.id} – SLA breached (auto escalated)
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EscalationList;
