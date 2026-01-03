import { api } from "./api";
import {
  setCredentials,
  logout as logoutAction,
} from "../store/slices/authSlice";
import store from "../store";

export const authService = {
  login: async (credentials) => {
    try {
      const response = await api.login(credentials);
      const { user, accessToken, refreshToken } = response.data;

      // Store tokens
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      // Update Redux store
      store.dispatch(setCredentials({ user, accessToken }));

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await api.register(userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      await api.logout();
    } finally {
      // Clear local storage
      localStorage.clear();

      // Update Redux store
      store.dispatch(logoutAction());

      // Redirect to login
      window.location.href = "/auth/login";
    }
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("accessToken");
  },

  getAccessToken: () => {
    return localStorage.getItem("accessToken");
  },

  updateProfile: async (data) => {
    try {
      const response = await api.updateProfile(data);
      const { user } = response.data;

      // Update local storage
      localStorage.setItem("user", JSON.stringify(user));

      // Update Redux store
      store.dispatch(setCredentials({ user }));

      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default authService;
