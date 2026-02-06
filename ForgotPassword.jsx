import React, { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../services/authService";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      setMsg("");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMsg("Sending reset link...");

      // 🔐 backend call
      if (forgotPassword) {
        const res = await forgotPassword({ email });
        setMsg(res?.data?.message || "Reset link sent to your email");
      } else {
        // 🧪 fallback (frontend-only project)
        setTimeout(() => {
          setMsg("Reset link sent (demo mode)");
        }, 1000);
      }
    } catch (err) {
      setMsg("");
      setError(
        err?.response?.data?.message || "Unable to send reset link"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "60px auto" }}>
      <h2 style={{ textAlign: "center" }}>Forgot Password</h2>

      <form onSubmit={handleSubmit}>
        <label>Email</label>

        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "8px",
          }}
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
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      {msg && (
        <p style={{ color: "green", marginTop: "10px" }}>{msg}</p>
      )}

      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
      )}

      <p style={{ marginTop: "15px" }}>
        Back to <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default ForgotPassword;
