import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectCurrentUser,
  selectIsAuthenticated,
  selectUserRole,
  logout as logoutAction,
} from "../Store/Slices/AuthSlice";
import authService from "../services/authService";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const role = useSelector(selectUserRole);

  const login = async (credentials) => {
    try {
      const data = await authService.login(credentials);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      dispatch(logoutAction());
      navigate("/auth/login");
    }
  };

  const updateProfile = async (data) => {
    try {
      const result = await authService.updateProfile(data);
      return result;
    } catch (error) {
      throw error;
    }
  };

  return {
    user,
    isAuthenticated,
    role,
    login,
    logout,
    updateProfile,
    isAdmin: role === "admin",
    isRecruiter: role === "recruiter",
    isCandidate: role === "candidate",
  };
};
