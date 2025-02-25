"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/constants";

interface AuthContextType {
  isAuthenticated: boolean;
  checkAuth: () => Promise<void>;
  login: (name: string, email: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const checkAuth = async () => {
    try {
      // We're using the /dogs/breeds endpoint to check if the user is authenticated
      // because:
      // 1. It's a lightweight endpoint that doesn't return much data
      // 2. It requires authentication, so it will fail if the user isn't logged in
      // 3. We don't have a dedicated auth check endpoint in the provided API
      const response = await fetch(`${API_BASE_URL}/dogs/breeds`, {
        credentials: "include",
      });
      setIsAuthenticated(response.ok);
    } catch (error) {
      console.error("Error checking authentication:", error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (name: string, email: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
        credentials: "include",
      });

      if (response.ok) {
        setIsAuthenticated(true);
        router.push("/dogs");
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } finally {
      setIsAuthenticated(false);
      router.push("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
