// Import React hooks and axios
import { createContext, useState, useEffect, useContext } from "react";
import api from "../api/axios";

// Create context
export const AuthContext = createContext();

// AuthProvider component - wraps the entire app
export function AuthProvider({ children }) {
  // State management
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // For loading cookies

  // Check if user is already logged in (on app load)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Call /me endpoint to check if cookie is valid
        const response = await api.get("/auth/me");

        if (response.data && response.data.user) {
          setIsAuthenticated(true);
          setUser(response.data.user);
        }
      } catch (error) {
        // Cookie invalid or expired, user not logged in
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (username, password) => {
    try {
      const response = await api.post("/auth/login", { username, password });

      // Backend returns user data on success
      if (response.data) {
        setIsAuthenticated(true);
        setUser(response.data.user || { username });
        return { success: true };
      }
    } catch (error) {
      console.error("Login error:", error);
      setIsAuthenticated(false);
      setUser(null);
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  // Register function
  const register = async (username, email, password, fullName, phone) => {
    try {
      const response = await api.post("/auth/register", {
        username,
        email,
        password,
        fullName,
        phone,
      });

      // After successful registration, auto-login
      if (response.data) {
        setIsAuthenticated(true);
        setUser(response.data.user || { username, email });
        return { success: true };
      }
    } catch (error) {
      console.error("Register error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      // Even if API fails, clear local state
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  // Provide state and functions to all child components
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for easy access to auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
