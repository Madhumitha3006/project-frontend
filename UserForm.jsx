import React, { useState } from "react";
import { ROLES } from "../utils/roles";

function UserForm({ title, buttonText, initialData = {}, onSubmit }) {
  const [form, setForm] = useState({
    name: initialData.name || "",
    email: initialData.email || "",
    role: initialData.role || ROLES.CUSTOMER,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", marginBottom: "15px" }}
        >
          <option value={ROLES.SUPER_ADMIN}>Superadmin</option>
          <option value={ROLES.ADMIN}>Admin</option>
          <option value={ROLES.MANAGER}>Manager</option>
          <option value={ROLES.AGENT}>Agent</option>
          <option value={ROLES.CUSTOMER}>Customer</option>
        </select>

        <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default UserForm;
