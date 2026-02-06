import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Header from "../../components/Header";
import api from "../../services/api";
import { ROLES } from "../../utils/roles";
import { useAuth } from "../../context/AuthContext";

function UserList() {
  const { user, isAuthenticated } = useAuth();
  const role = user?.role;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔒 Not logged in
  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  // 🔐 Role restriction
  if (role !== ROLES.SUPER_ADMIN && role !== ROLES.ADMIN) {
    return (
      <>
        <Header />
        <h3 style={{ textAlign: "center", marginTop: "40px", color: "red" }}>
          Access Denied – Only Admin & Superadmin
        </h3>
      </>
    );
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await api.get("/users");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <Header />

      <div style={{ padding: "20px" }}>
        <h2>User Management</h2>

        <Link to="/users/add">
          <button style={{ marginBottom: "15px" }}>+ Add User</button>
        </Link>

        {loading ? (
          <p>Loading users...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : users.length === 0 ? (
          <p>No users found</p>
        ) : (
          <table border="1" width="100%" cellPadding="8">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>{u.status}</td>
                  <td>
                    <Link to={`/users/view/${u.id}`}>View</Link>{" "}
                    |{" "}
                    <Link to={`/users/edit/${u.id}`}>Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default UserList;
