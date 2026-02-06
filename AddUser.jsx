import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Header from "../../components/Header";
import api from "../../services/api";
import { ROLES } from "../../utils/roles";
import { useAuth } from "../../context/AuthContext";

function AddUser() {
  const { user, isAuthenticated } = useAuth();
  const role = user?.role;
  const navigate = useNavigate();

  // ✅ Hooks always at top
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: ROLES.CUSTOMER,
    status: "Active",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔒 Not logged in
  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  // 🔐 Role restriction
  if (role !== ROLES.SUPER_ADMIN && role !== ROLES.ADMIN) {
    return (
      <>
        <Header />
        <h3 style={{ textAlign: "center", color: "red", marginTop: "40px" }}>
          Access Denied
        </h3>
      </>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError("");
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🧪 Validation
    if (!userData.name || !userData.email) {
      setError("Name and Email are required");
      return;
    }

    if (!userData.email.includes("@")) {
      setError("Enter valid email");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await api.post("/users", userData);

      alert("User created successfully");
      navigate("/users");

    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to create user"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div style={{ padding: "25px", maxWidth: "500px", margin: "30px auto" }}>
        <h2>Add User</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            value={userData.name}
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
          />

          <select name="role" value={userData.role} onChange={handleChange}>
            <option value={ROLES.ADMIN}>Admin</option>
            <option value={ROLES.MANAGER}>Manager</option>
            <option value={ROLES.AGENT}>Agent</option>
            <option value={ROLES.CUSTOMER}>Customer</option>
          </select>

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create User"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
