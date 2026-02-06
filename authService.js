// src/services/authService.js
import api from "./api";

/* ================================
   🔐 AUTH APIs
================================ */

// ✅ Login
export const loginUser = async (data) => {
  try {
    // 👉 REAL BACKEND LOGIN
    const response = await api.post("/auth/login", data);

    /**
     * Expected backend response:
     * {
     *   token: "jwt-token",
     *   user: {
     *     id: 1,
     *     name: "Admin",
     *     role: "super_admin"
     *   }
     * }
     */

    const { token, user } = response.data;

    // 🔐 Save auth details
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("role", user.role);
    localStorage.setItem("isLoggedIn", "true");

    return user;
  } catch (error) {
    // 👉 MOCK LOGIN (backend illa na)
    console.warn("Backend not available, using mock login");

    const mockUser = {
      id: 1,
      name: "Mock Super Admin",
      role: "super_admin", // change: admin / manager / agent / customer
    };

    localStorage.setItem("token", "mock-token");
    localStorage.setItem("user", JSON.stringify(mockUser));
    localStorage.setItem("role", mockUser.role);
    localStorage.setItem("isLoggedIn", "true");

    return mockUser;
  }
};

// ✅ Signup
export const signupUser = async (data) => {
  const response = await api.post("/auth/signup", data);
  return response.data;
};

// ✅ Forgot Password
export const forgotPassword = async (data) => {
  const response = await api.post("/auth/forgot-password", data);
  return response.data;
};

// ✅ Reset Password
export const resetPassword = async (token, data) => {
  const response = await api.post(`/auth/reset-password/${token}`, data);
  return response.data;
};

// ✅ Logout
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("role");
  localStorage.removeItem("isLoggedIn");

  window.location.href = "/";
};

// ✅ Get current user (helper)
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// ✅ Check auth
export const isUserLoggedIn = () => {
  return localStorage.getItem("isLoggedIn") === "true";
};
