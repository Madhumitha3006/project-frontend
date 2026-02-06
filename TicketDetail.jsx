import React from "react";
import { useParams, Navigate } from "react-router-dom";
import Header from "../../components/Header";
import { tickets } from "../../data/tickets";
import { useAuth } from "../../context/AuthContext";
import { ROLES } from "../../utils/roles";
import { isSlaBreached } from "../../utils/slaUtils";

function TicketDetail() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();

  // 🔒 Not logged in
  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  const ticket = tickets.find((t) => t.id === Number(id));

  // ❌ Ticket not found
  if (!ticket) {
    return <Navigate to="/tickets" replace />;
  }

  const role = user.role;

  // 🔒 Customer can see only own ticket (optional rule)
  if (role === ROLES.CUSTOMER && ticket.customer !== user.name) {
    return (
      <>
        <Header />
        <h3 style={{ textAlign: "center", color: "red", marginTop: "40px" }}>
          Access denied: You can view only your tickets
        </h3>
      </>
    );
  }

  const slaBreached = isSlaBreached(ticket);

  return (
    <div>
      <Header />

      <div style={{ maxWidth: "700px", margin: "40px auto" }}>
        <h2>Ticket #{ticket.id}</h2>

        <p><b>Customer:</b> {ticket.customer}</p>
        <p><b>Subject:</b> {ticket.subject}</p>
        <p><b>Description:</b> {ticket.description}</p>
        <p><b>Status:</b> {ticket.status}</p>
        <p><b>Priority:</b> {ticket.priority}</p>

        <p>
          <b>SLA Status:</b>{" "}
          <span style={{ color: slaBreached ? "red" : "green" }}>
            {slaBreached ? "Breached" : "Within SLA"}
          </span>
        </p>

        {/* 🧠 Future scope */}
        {/* Manager / Agent → status update */}
        {/* Customer → comments add */}
        {/* Attachments section */}
      </div>
    </div>
  );
}

export default TicketDetail;
