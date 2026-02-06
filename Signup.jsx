import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../../services/authService";
import { ROLES } from "../../utils/roles";

function Signup() {
  const navigate = useNavigate();

  // form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(ROLES.CUSTOMER);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ui states
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validations
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      setMsg("");
      return;
    }

    if (!email.includes("@")) {
      setError("Enter a valid email");
      setMsg("");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setMsg("");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password and Confirm Password must match");
      setMsg("");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMsg("Creating account...");

      const res = await signupUser({
        name,
        email,
        password,
        role,
      });

      setMsg(res?.data?.message || "Signup successful");

      // 🔁 redirect to login
      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (err) {
      setMsg("");
      setError(
        err?.response?.data?.message || "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "420px", margin: "60px auto" }}>
      <h2 style={{ textAlign: "center" }}>Signup</h2>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: "10px", marginTop: "8px" }}
        />

        {/* Email */}
        <label style={{ marginTop: "10px", display: "block" }}>
          Email
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "10px", marginTop: "8px" }}
        />

        {/* Role */}
        <label style={{ marginTop: "10px", display: "block" }}>
          Role
        </label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ width: "100%", padding: "10px", marginTop: "8px" }}
        >
          <option value={ROLES.ADMIN}>Admin</option>
          <option value={ROLES.MANAGER}>Manager</option>
          <option value={ROLES.AGENT}>Agent</option>
          <option value={ROLES.CUSTOMER}>Customer</option>
        </select>

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

        {/* Confirm Password */}
        <label style={{ marginTop: "10px", display: "block" }}>
          Confirm Password
        </label>
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
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
          {loading ? "Creating..." : "Signup"}
        </button>
      </form>

      {msg && (
        <p style={{ color: "green", marginTop: "10px" }}>
          {msg}
        </p>
      )}

      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>
          {error}
        </p>
      )}

      <p style={{ marginTop: "15px", textAlign: "center" }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Signup;
