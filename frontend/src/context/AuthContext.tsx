import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { User, AuthState } from "@/types/movie";
import api from "@/lib/api";
import toast from "react-hot-toast";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setAuthState({ user: null, isAuthenticated: false, isLoading: false });
        return;
      }

      try {
        const response = await api.get('/auth/me');
        if (response.data.success) {
          setAuthState({
            user: {
              id: response.data.data._id,
              email: response.data.data.email,
              role: response.data.data.role
            },
            isAuthenticated: true,
            isLoading: false
          });
        }
      } catch (error) {
        localStorage.removeItem('token');
        setAuthState({ user: null, isAuthenticated: false, isLoading: false });
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));

    try {
      const response = await api.post('/auth/login', { email, password });

      if (response.data.success) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);

        setAuthState({
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
          },
          isAuthenticated: true,
          isLoading: false,
        });
        toast.success("Welcome back!");
        return true;
      }
    } catch (error: any) {
      const message = error.response?.data?.error || "Login failed";
      toast.error(message);
    }

    setAuthState((prev) => ({ ...prev, isLoading: false }));
    return false;
  }, []);

  const register = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));

    try {
      const response = await api.post('/auth/register', { name, email, password });

      if (response.data.success) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);

        setAuthState({
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
          },
          isAuthenticated: true,
          isLoading: false,
        });
        toast.success("Account created!");
        return true;
      }
    } catch (error: any) {
      const message = error.response?.data?.error || "Registration failed";
      toast.error(message);
    }

    setAuthState((prev) => ({ ...prev, isLoading: false }));
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    toast.success("Logged out successfully");
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
