import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import Header from "../../components/Header";
import api from "../../services/api";
import { ROLES } from "../../utils/roles";
import { useAuth } from "../../context/AuthContext";

function EditUser() {
  const { user, isAuthenticated } = useAuth();
  const role = user?.role;
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ Hooks at top
  const [userData, setUserData] = useState(null);
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
        <h3 style={{ textAlign: "center", color: "red" }}>Access Denied</h3>
      </>
    );
  }

  // 📡 Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/users/${id}`);
        setUserData(res.data);
      } catch (err) {
        setError("Failed to load user details");
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 🧪 validation
    if (!userData.name || !userData.email) {
      setError("Name and Email required");
      return;
    }

    if (!userData.email.includes("@")) {
      setError("Enter valid email");
      return;
    }

    try {
      setLoading(true);
      await api.put(`/users/${id}`, userData);

      alert("User updated successfully");
      navigate("/users");

    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to update user"
      );
    } finally {
      setLoading(false);
    }
  };

  // ⏳ Loading state
  if (!userData) {
    return (
      <>
        <Header />
        <p style={{ textAlign: "center", marginTop: "40px" }}>Loading...</p>
      </>
    );
  }

  return (
    <div>
      <Header />

      <div style={{ padding: "25px", maxWidth: "500px", margin: "30px auto" }}>
        <h2>Edit User</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Name"
            value={userData.name || ""}
            onChange={(e) =>
              setUserData({ ...userData, name: e.target.value })
            }
          />

          <input
            placeholder="Email"
            value={userData.email || ""}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />

          <select
            value={userData.role || ROLES.CUSTOMER}
            onChange={(e) =>
              setUserData({ ...userData, role: e.target.value })
            }
          >
            <option value={ROLES.ADMIN}>Admin</option>
            <option value={ROLES.MANAGER}>Manager</option>
            <option value={ROLES.AGENT}>Agent</option>
            <option value={ROLES.CUSTOMER}>Customer</option>
          </select>

          <select
            value={userData.status || "Active"}
            onChange={(e) =>
              setUserData({ ...userData, status: e.target.value })
            }
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
