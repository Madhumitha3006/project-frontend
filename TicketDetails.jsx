 import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import Header from "../../components/Header";
import { tickets } from "../../data/tickets";
import { useAuth } from "../../context/AuthContext";
import { ROLES } from "../../utils/roles";
import { PRIORITY, TICKET_STATUS } from "../../data/ticketConstants";
import { isSlaBreached } from "../../utils/slaUtils";

function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const role = user?.role;
  const [ticket, setTicket] = useState(null);

  // 🔒 Not logged in
  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    const t = tickets.find((x) => x.id === parseInt(id));
    if (!t) {
      navigate("/tickets");
      return;
    }

    // 🔐 Role based access
    if (
      (role === ROLES.CUSTOMER && t.customerId !== user.id) ||
      (role === ROLES.AGENT && t.assignedToId !== user.id)
    ) {
      navigate("/tickets");
      return;
    }

    setTicket(t);
  }, [id, role, user, navigate]);

  if (!ticket) return <p style={{ textAlign: "center" }}>Loading...</p>;

  const canUpdate = role !== ROLES.CUSTOMER;
  const slaBreached = isSlaBreached(ticket);

  const handleUpdate = () => {
    alert("Ticket updated (frontend only)");
  };

  return (
    <div>
      <Header />

      <div style={{ maxWidth: "700px", margin: "30px auto" }}>
        <h2>Ticket #{ticket.id}</h2>

        <p><b>Subject:</b> {ticket.title}</p>
        <p><b>Description:</b> {ticket.description}</p>

        {/* Priority */}
        <p>
          <b>Priority:</b>{" "}
          {canUpdate ? (
            <select
              value={ticket.priority}
              onChange={(e) => {
                const updated = { ...ticket, priority: e.target.value };
                setTicket(updated);

                if (isSlaBreached(updated)) {
                  alert("⚠️ SLA breached – escalation triggered");
                }
              }}
            >
              {PRIORITY.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          ) : (
            ticket.priority
          )}
        </p>

        {/* Status */}
        <p>
          <b>Status:</b>{" "}
          {canUpdate ? (
            <select
              value={ticket.status}
              onChange={(e) =>
                setTicket({ ...ticket, status: e.target.value })
              }
            >
              {TICKET_STATUS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          ) : (
            ticket.status
          )}
        </p>

        {/* SLA */}
        <p>
          <b>SLA:</b>{" "}
          <span style={{ color: slaBreached ? "red" : "green" }}>
            {slaBreached ? "Breached" : "Within SLA"}
          </span>
        </p>

        {canUpdate && (
          <button
            onClick={handleUpdate}
            style={{ marginTop: "15px", padding: "8px 14px" }}
          >
            Update Ticket
          </button>
        )}
      </div>
    </div>
  );
}

export default TicketDetails;
