import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Header from "../../components/Header";
import { PRIORITY } from "../../data/ticketConstants";
import { useAuth } from "../../context/AuthContext";
import { ROLES } from "../../utils/roles";

const CreateTicket = () => {
  const { user, isAuthenticated } = useAuth();

  // ✅ Hooks always top
  const [ticket, setTicket] = useState({
    subject: "",
    description: "",
    priority: "Low",
  });

  // 🔒 Not logged in
  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  const role = user.role;

  // ❌ Only customers allowed
  if (role !== ROLES.CUSTOMER) {
    return (
      <>
        <Header />
        <h3 style={{ textAlign: "center", color: "red", marginTop: "40px" }}>
          Only Customers can create tickets
        </h3>
      </>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!ticket.subject || !ticket.description) {
      alert("Subject & Description required");
      return;
    }

    alert("Ticket created (frontend)");

    setTicket({
      subject: "",
      description: "",
      priority: "Low",
    });
  };

  return (
    <div>
      <Header />
      <div style={{ maxWidth: "500px", margin: "40px auto" }}>
        <h2>Create Ticket</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Subject"
            value={ticket.subject}
            onChange={(e) =>
              setTicket({ ...ticket, subject: e.target.value })
            }
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />

          <textarea
            placeholder="Description"
            value={ticket.description}
            onChange={(e) =>
              setTicket({ ...ticket, description: e.target.value })
            }
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />

          <select
            value={ticket.priority}
            onChange={(e) =>
              setTicket({ ...ticket, priority: e.target.value })
            }
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          >
            {PRIORITY.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <button type="submit" style={{ width: "100%", padding: "10px" }}>
            Create Ticket
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTicket;
