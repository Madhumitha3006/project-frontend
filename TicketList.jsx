import React from "react";
import { Link, Navigate } from "react-router-dom";
import Header from "../../components/Header";
import { tickets } from "../../data/tickets";
import { useAuth } from "../../context/AuthContext";
import { ROLES } from "../../utils/roles";

function TicketList() {
  const { user, isAuthenticated } = useAuth();

  // 🔒 Not logged in
  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  const role = user.role;

  /* ===============================
     🎯 ROLE-BASED FILTERING
     =============================== */
  const filteredTickets = tickets.filter((t) => {
    // 👤 Customer → own tickets only
    if (role === ROLES.CUSTOMER) {
      return t.customerId === user.id;
    }

    // 🧑‍💻 Agent → assigned tickets only
    if (role === ROLES.AGENT) {
      return t.assignedToId === user.id;
    }

    // 👔 Manager / Admin / Super Admin → all tickets
    return true;
  });

  return (
    <div>
      <Header />

      <div style={{ maxWidth: "900px", margin: "40px auto" }}>
        <h2>Tickets</h2>

        {/* ➕ CREATE TICKET — only CUSTOMER */}
        {role === ROLES.CUSTOMER && (
          <div style={{ marginBottom: "15px" }}>
            <Link to="/tickets/create">
              <button style={{ padding: "8px 15px", cursor: "pointer" }}>
                ➕ Create Ticket
              </button>
            </Link>
          </div>
        )}

        {/* 📭 EMPTY STATE */}
        {filteredTickets.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "30px" }}>
            No tickets found
          </p>
        ) : (
          <table
            border="1"
            width="100%"
            cellPadding="8"
            style={{ borderCollapse: "collapse" }}
          >
            <thead style={{ background: "#f2f2f2" }}>
              <tr>
                <th>ID</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredTickets.map((t) => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{t.title}</td>
                  <td>{t.status}</td>
                  <td>
                    <Link to={`/tickets/${t.id}`}>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* 📝 ROLE NOTE */}
        <p style={{ marginTop: "15px", fontStyle: "italic", color: "#666" }}>
          Logged in as <b>{role}</b>
        </p>
      </div>
    </div>
  );
}

export default TicketList;
