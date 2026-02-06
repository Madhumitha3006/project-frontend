// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

/* ===============================
   1️⃣ Create Context
   =============================== */
const AuthContext = createContext();

/* ===============================
   2️⃣ Provider
   =============================== */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  /* 🔄 Restore user on refresh */
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("LocalStorage parse error:", error);
      localStorage.removeItem("user");
    }
  }, []);

  /* 🔐 LOGIN */
  const login = (data) => {
    if (!data) {
      console.error("Login failed: no user data");
      return;
    }

    const userData = {
      id: data.id || null,
      name: data.name || "",
      email: data.email || "",
      role: data.role || "",
    };

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  /* 🚪 LOGOUT */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    role: user?.role,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/* ===============================
   3️⃣ Custom Hook
   =============================== */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
