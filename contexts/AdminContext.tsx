"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import type { ReactNode } from "react";

/* ---------------- TYPES ---------------- */

type AdminUser = {
  email: string;
  name: string;
};

interface AdminContextType {
  isAuthenticated: boolean;
  adminUser: AdminUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

/* ---------------- CONTEXT ---------------- */

const AdminContext = createContext<AdminContextType | undefined>(undefined);

/* ---------------- PROVIDER ---------------- */

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  // ✅ Safe localStorage usage (client only)
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem("adminAuth");
      if (stored) {
        const data: AdminUser = JSON.parse(stored);
        setAdminUser(data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Invalid stored auth data");
      localStorage.removeItem("adminAuth");
    }
  }, []);

  /* ---------------- LOGIN ---------------- */

  const login = async (email: string, password: string) => {
    await new Promise((res) => setTimeout(res, 500));

    if (email === "admin@gulfempire.com" && password === "admin123") {
      const user: AdminUser = {
        email,
        name: "Admin User",
      };

      setAdminUser(user);
      setIsAuthenticated(true);

      if (typeof window !== "undefined") {
        localStorage.setItem("adminAuth", JSON.stringify(user));
      }

      return true;
    }

    return false;
  };

  /* ---------------- LOGOUT ---------------- */

  const logout = () => {
    setAdminUser(null);
    setIsAuthenticated(false);

    if (typeof window !== "undefined") {
      localStorage.removeItem("adminAuth");
    }
  };

  return (
    <AdminContext.Provider
      value={{ isAuthenticated, adminUser, login, logout }}
    >
      {children}
    </AdminContext.Provider>
  );
}

/* ---------------- HOOK ---------------- */

export function useAdmin() {
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }

  return context;
}