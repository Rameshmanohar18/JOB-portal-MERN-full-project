import axiosInstance from "../config/axiosConfig";

export const api = {
  // Auth
  login: (credentials) => axiosInstance.post("/auth/login", credentials),
  register: (userData) => axiosInstance.post("/auth/register", userData),
  logout: () => axiosInstance.post("/auth/logout"),
  refreshToken: (refreshToken) =>
    axiosInstance.post("/auth/refresh-token", { refreshToken }),
  forgotPassword: (email) =>
    axiosInstance.post("/auth/forgot-password", { email }),
  resetPassword: (data) => axiosInstance.post("/auth/reset-password", data),

  // Users
  getProfile: () => axiosInstance.get("/users/profile"),
  updateProfile: (data) => axiosInstance.put("/users/profile", data),
  updatePassword: (data) => axiosInstance.put("/users/password", data),
  uploadAvatar: (formData) =>
    axiosInstance.post("/users/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  // Jobs
  getJobs: (params) => axiosInstance.get("/jobs", { params }),
  getJob: (id) => axiosInstance.get(`/jobs/${id}`),
  createJob: (data) => axiosInstance.post("/jobs", data),
  updateJob: (id, data) => axiosInstance.put(`/jobs/${id}`, data),
  deleteJob: (id) => axiosInstance.delete(`/jobs/${id}`),
  getMyJobs: (params) => axiosInstance.get("/jobs/my-jobs", { params }),
  getRecommendedJobs: () => axiosInstance.get("/jobs/recommended"),
  saveJob: (jobId) => axiosInstance.post(`/jobs/${jobId}/save`),
  unsaveJob: (jobId) => axiosInstance.delete(`/jobs/${jobId}/save`),
  getSavedJobs: () => axiosInstance.get("/jobs/saved"),

  // Applications
  applyJob: (jobId, data) => axiosInstance.post(`/applications/${jobId}`, data),
  getApplications: (params) => axiosInstance.get("/applications", { params }),
  getApplication: (id) => axiosInstance.get(`/applications/${id}`),
  updateApplicationStatus: (id, status) =>
    axiosInstance.put(`/applications/${id}/status`, { status }),
  getJobApplications: (jobId, params) =>
    axiosInstance.get(`/applications/job/${jobId}`, { params }),

  // Files
  uploadResume: (formData) =>
    axiosInstance.post("/upload/resume", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  deleteResume: (id) => axiosInstance.delete(`/upload/resume/${id}`),

  // Notifications
  getNotifications: (params) => axiosInstance.get("/notifications", { params }),
  markAsRead: (id) => axiosInstance.put(`/notifications/${id}/read`),
  markAllAsRead: () => axiosInstance.put("/notifications/read-all"),
  deleteNotification: (id) => axiosInstance.delete(`/notifications/${id}`),

  // Admin
  getUsers: (params) => axiosInstance.get("/admin/users", { params }),
  getUser: (id) => axiosInstance.get(`/admin/users/${id}`),
  updateUser: (id, data) => axiosInstance.put(`/admin/users/${id}`, data),
  deleteUser: (id) => axiosInstance.delete(`/admin/users/${id}`),
  getStats: () => axiosInstance.get("/admin/stats"),
  getAnalytics: (period) =>
    axiosInstance.get(`/admin/analytics?period=${period}`),

  getApplications: (params) => axiosInstance.get("/applications", { params }),
  getApplication: (id) => axiosInstance.get(`/applications/${id}`),
  applyJob: (jobId, data) => axiosInstance.post(`/applications/${jobId}`, data),
  updateApplicationStatus: (id, data) =>
    axiosInstance.put(`/applications/${id}/status`, data),
  getJobApplications: (jobId, params) =>
    axiosInstance.get(`/applications/job/${jobId}`, { params }),
  addInterview: (applicationId, data) =>
    axiosInstance.post(`/applications/${applicationId}/interviews`, data),
  updateInterview: (applicationId, interviewId, data) =>
    axiosInstance.put(
      `/applications/${applicationId}/interviews/${interviewId}`,
      data
    ),
  deleteApplication: (id) => axiosInstance.delete(`/applications/${id}`),
  bulkUpdateApplications: (data) =>
    axiosInstance.post("/applications/bulk-update", data),
  getApplicationStats: () => axiosInstance.get("/applications/stats"),
  exportApplications: (params) =>
    axiosInstance.get("/applications/export", {
      params,
      responseType: "blob",
    }),
};

export default api;
