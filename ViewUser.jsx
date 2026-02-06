import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import api from "../../services/api";
import { ROLES } from "../../utils/roles";
import { useAuth } from "../../context/AuthContext";

function ViewUser() {
  const { user } = useAuth();
  const role = user?.role;
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const res = await api.get(`/users/${id}`);
        setData(res.data);
      } catch (err) {
        setError("Failed to load user details");
      }
    };

    fetchUser();
  }, [id]);

  if (role !== ROLES.SUPER_ADMIN && role !== ROLES.ADMIN) {
    return (
      <>
        <Header />
        <h3 style={{ textAlign: "center", color: "red" }}>Access Denied</h3>
      </>
    );
  }

  if (!data && !error) {
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
      <div style={{ padding: "25px", maxWidth: "600px", margin: "30px auto" }}>
        <h2>View User</h2>

        {error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <>
            <p><b>Name:</b> {data?.name}</p>
            <p><b>Email:</b> {data?.email}</p>
            <p><b>Role:</b> {data?.role}</p>
            <p><b>Status:</b> {data?.status}</p>
          </>
        )}

        <button onClick={() => navigate("/users")}>Back</button>
      </div>
    </div>
  );
}

export default ViewUser;
