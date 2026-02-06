import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ROLES } from "../../utils/roles";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔐 Dummy users (frontend login)
  const users = [
    { email: "superadmin@example.com", password: "superadmin123", role: ROLES.SUPER_ADMIN },
    { email: "admin@example.com", password: "admin123", role: ROLES.ADMIN },
    { email: "manager@example.com", password: "manager123", role: ROLES.MANAGER },
    { email: "agent@example.com", password: "agent123", role: ROLES.AGENT },
    { email: "customer@example.com", password: "customer123", role: ROLES.CUSTOMER },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);
    setError("");

    // 🔎 check user
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    // 🔐 AuthContext login
    login({
      id: Date.now(),
      name: foundUser.role,
      email: foundUser.email,
      role: foundUser.role,
    });

    setLoading(false);
    navigate("/dashboard");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "60px auto" }}>
      <h2 style={{ textAlign: "center" }}>Login</h2>

      <form onSubmit={handleSubmit}>
        {/* Email */}
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "10px", marginTop: "8px" }}
        />

        {/* Password */}
        <label style={{ marginTop: "10px", display: "block" }}>
          Password
        </label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "10px", marginTop: "8px" }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "15px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
      )}

      <p style={{ marginTop: "15px", textAlign: "center" }}>
        New user? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;
