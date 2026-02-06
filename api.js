// src/services/api.js
import axios from "axios";

/* ================================
   ✅ Axios Instance
================================ */
const api = axios.create({
  baseURL: "http://localhost:5000", // 🔁 Backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

/* ================================
   ✅ REQUEST INTERCEPTOR
   - Token auto attach
================================ */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ================================
   ✅ RESPONSE INTERCEPTOR
   - Handle 401 (Unauthorized)
   - Clear auth safely
================================ */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user"); // 🔁 add this (AuthContext sync)

      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

/* ================================
   🔐 AUTH APIs
================================ */
export const loginUser = (data) => api.post("/auth/login", data);
export const signupUser = (data) => api.post("/auth/signup", data);
export const forgotPassword = (data) =>
  api.post("/auth/forgot-password", data);
export const resetPassword = (token, data) =>
  api.post(`/auth/reset-password/${token}`, data);

/* ================================
   👤 USERS APIs
================================ */
export const getUsers = () => api.get("/users");
export const getUserById = (id) => api.get(`/users/${id}`);
export const addUser = (data) => api.post("/users", data);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/users/${id}`);

/* ================================
   🎫 TICKETS APIs
================================ */
export const getTickets = () => api.get("/tickets");
export const getTicketById = (id) => api.get(`/tickets/${id}`);
export const createTicket = (data) => api.post("/tickets", data);
export const updateTicket = (id, data) => api.put(`/tickets/${id}`, data);
export const deleteTicket = (id) => api.delete(`/tickets/${id}`);

/* ================================
   📊 SLA / REPORT APIs (future ready)
================================ */
export const getSlaReport = () => api.get("/reports/sla");

/* ================================
   ✅ EXPORT DEFAULT INSTANCE
================================ */
export default api;
