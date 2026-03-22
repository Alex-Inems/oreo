"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// In a real application these would be verified server-side.
// For this demo, a single admin account is accepted.
const ADMIN_EMAIL = "admin@cars26.com";
const ADMIN_PASSWORD = "velocity2025";

interface AdminUser {
  email: string;
  role: "admin";
}

interface AdminAuthContextType {
  admin: AdminUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cars26_admin");
      if (stored) {
        setAdmin(JSON.parse(stored));
      }
    } catch {
      localStorage.removeItem("cars26_admin");
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate network latency
    await new Promise<void>((r) => setTimeout(r, 900));

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const user: AdminUser = { email, role: "admin" };
      setAdmin(user);
      localStorage.setItem("cars26_admin", JSON.stringify(user));
      return { success: true };
    }
    return { success: false, error: "Invalid credentials. Please try again." };
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem("cars26_admin");
  };

  return (
    <AdminAuthContext.Provider value={{ admin, isLoading, login, logout, isAuthenticated: !!admin }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
