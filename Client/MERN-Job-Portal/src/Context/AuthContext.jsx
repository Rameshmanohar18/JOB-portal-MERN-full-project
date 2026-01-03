import React, { createContext, useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, logout } from "../store/slices/authSlice";
import authService from "../services/authService";
import toast from "react-hot-toast";

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on mount
    const token = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        dispatch(setCredentials({ user: userData, accessToken: token }));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.clear();
      }
    }
    setLoading(false);
  }, [dispatch]);

  const login = async (credentials) => {
    try {
      const data = await authService.login(credentials);
      toast.success("Login successful!");
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const data = await authService.register(userData);
      toast.success("Registration successful! Please login.");
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      throw error;
    }
  };

  const logoutUser = async () => {
    try {
      await authService.logout();
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      // Force logout even if API call fails
      localStorage.clear();
      dispatch(logout());
      window.location.href = "/auth/login";
    }
  };

  const updateProfile = async (data) => {
    try {
      const result = await authService.updateProfile(data);
      toast.success("Profile updated successfully");
      return result;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout: logoutUser,
    updateProfile,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    isRecruiter: user?.role === "recruiter",
    isCandidate: user?.role === "candidate",
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
