"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import type { AuthState, User } from "@/types";

// TODO: replace mock auth with real OAuth2/OIDC flow
// TODO: add token refresh logic before expiry

const MOCK_USER: User = {
  id: "usr_01HZ3KPQX8VBNMD9E4GY2A7W6F",
  email: "operator@nexus.dev",
  name: "Nexus Operator",
  role: "admin",
};

const MOCK_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: MOCK_USER,
    token: MOCK_TOKEN,
    isAuthenticated: true,
    loading: false,
  });

  // TODO: add error boundary for auth failures
  const login = useCallback(async (email: string, _password: string) => {
    setState((prev) => ({ ...prev, loading: true }));

    await new Promise((resolve) => setTimeout(resolve, 800));

    setState({
      user: { ...MOCK_USER, email },
      token: MOCK_TOKEN,
      isAuthenticated: true,
      loading: false,
    });
  }, []);

  const logout = useCallback(() => {
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
    });
  }, []);

  const refreshToken = useCallback(async () => {
    // TODO: implement actual token refresh endpoint call
    await new Promise((resolve) => setTimeout(resolve, 200));
    setState((prev) => ({
      ...prev,
      token: `${MOCK_TOKEN}.refreshed.${Date.now()}`,
    }));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (state.isAuthenticated) {
        refreshToken();
      }
    }, 300000);

    return () => clearInterval(interval);
  }, [state.isAuthenticated, refreshToken]);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
