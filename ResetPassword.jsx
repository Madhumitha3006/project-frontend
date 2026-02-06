import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../services/authService";

function ResetPassword() {
  const { token } = useParams(); // URL token
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError("All fields are required");
      setMsg("");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setMsg("");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setMsg("");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMsg("Resetting password...");

      const res = await resetPassword({
        token,
        newPassword: password,
      });

      setMsg(res?.data?.message || "Password reset successful");

      // 🔁 redirect to login
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      setMsg("");
      setError(
        err?.response?.data?.message || "Password reset failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "60px auto" }}>
      <h2 style={{ textAlign: "center" }}>Reset Password</h2>

      <form onSubmit={handleSubmit}>
        <label>New Password</label>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "10px", marginTop: "8px" }}
        />

        <label style={{ marginTop: "10px", display: "block" }}>
          Confirm Password
        </label>
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>

      {msg && <p style={{ color: "green", marginTop: "10px" }}>{msg}</p>}
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

      <p style={{ marginTop: "15px" }}>
        Back to <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default ResetPassword;
