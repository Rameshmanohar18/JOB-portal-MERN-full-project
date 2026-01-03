import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api";

// Async thunks
export const fetchApplications = createAsyncThunk(
  "applications/fetchApplications",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await api.getApplications(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchApplication = createAsyncThunk(
  "applications/fetchApplication",
  async (applicationId, { rejectWithValue }) => {
    try {
      const response = await api.getApplication(applicationId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchJobApplications = createAsyncThunk(
  "applications/fetchJobApplications",
  async ({ jobId, params = {} }, { rejectWithValue }) => {
    try {
      const response = await api.getJobApplications(jobId, params);
      return { jobId, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createApplication = createAsyncThunk(
  "applications/createApplication",
  async ({ jobId, applicationData }, { rejectWithValue }) => {
    try {
      const response = await api.applyJob(jobId, applicationData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateApplicationStatus = createAsyncThunk(
  "applications/updateApplicationStatus",
  async ({ applicationId, status, notes }, { rejectWithValue }) => {
    try {
      const response = await api.updateApplicationStatus(applicationId, {
        status,
        notes,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addInterview = createAsyncThunk(
  "applications/addInterview",
  async ({ applicationId, interviewData }, { rejectWithValue }) => {
    try {
      const response = await api.addInterview(applicationId, interviewData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateInterview = createAsyncThunk(
  "applications/updateInterview",
  async (
    { applicationId, interviewId, interviewData },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.updateInterview(
        applicationId,
        interviewId,
        interviewData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteApplication = createAsyncThunk(
  "applications/deleteApplication",
  async (applicationId, { rejectWithValue }) => {
    try {
      await api.deleteApplication(applicationId);
      return applicationId;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const bulkUpdateApplications = createAsyncThunk(
  "applications/bulkUpdateApplications",
  async ({ applicationIds, status }, { rejectWithValue }) => {
    try {
      const response = await api.bulkUpdateApplications({
        applicationIds,
        status,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  applications: [],
  currentApplication: null,
  jobApplications: {},
  filters: {
    status: "",
    search: "",
    dateRange: "",
    jobId: "",
    candidateId: "",
    recruiterId: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  },
  loading: false,
  error: null,
  creating: false,
  updating: false,
  deleting: false,
  stats: {
    total: 0,
    byStatus: {
      applied: 0,
      under_review: 0,
      shortlisted: 0,
      interview: 0,
      rejected: 0,
      offered: 0,
      hired: 0,
    },
    byDate: {},
  },
};

const applicationSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1; // Reset to first page when filters change
    },
    clearFilters: (state) => {
      state.filters = {
        status: "",
        search: "",
        dateRange: "",
        jobId: "",
        candidateId: "",
        recruiterId: "",
        sortBy: "createdAt",
        sortOrder: "desc",
      };
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    setLimit: (state, action) => {
      state.pagination.limit = action.payload;
      state.pagination.page = 1;
    },
    setSort: (state, action) => {
      const { sortBy, sortOrder } = action.payload;
      state.filters.sortBy = sortBy;
      state.filters.sortOrder = sortOrder;
    },
    resetApplication: (state) => {
      state.currentApplication = null;
      state.error = null;
    },
    resetApplications: () => initialState,
    updateApplicationInList: (state, action) => {
      const updatedApplication = action.payload;
      state.applications = state.applications.map((app) =>
        app._id === updatedApplication._id ? updatedApplication : app
      );

      // Update in jobApplications if exists
      if (
        updatedApplication.job &&
        state.jobApplications[updatedApplication.job]
      ) {
        state.jobApplications[updatedApplication.job] = state.jobApplications[
          updatedApplication.job
        ].map((app) =>
          app._id === updatedApplication._id ? updatedApplication : app
        );
      }

      // Update current application if it's the one being updated
      if (
        state.currentApplication &&
        state.currentApplication._id === updatedApplication._id
      ) {
        state.currentApplication = updatedApplication;
      }
    },
    addNoteToApplication: (state, action) => {
      const { applicationId, note } = action.payload;

      // Update in applications list
      state.applications = state.applications.map((app) => {
        if (app._id === applicationId) {
          return {
            ...app,
            notes: [...(app.notes || []), note],
          };
        }
        return app;
      });

      // Update in jobApplications if exists
      Object.keys(state.jobApplications).forEach((jobId) => {
        state.jobApplications[jobId] = state.jobApplications[jobId].map(
          (app) => {
            if (app._id === applicationId) {
              return {
                ...app,
                notes: [...(app.notes || []), note],
              };
            }
            return app;
          }
        );
      });

      // Update current application
      if (
        state.currentApplication &&
        state.currentApplication._id === applicationId
      ) {
        state.currentApplication = {
          ...state.currentApplication,
          notes: [...(state.currentApplication.notes || []), note],
        };
      }
    },
    updateStats: (state, action) => {
      const applications = action.payload;
      const stats = {
        total: applications.length,
        byStatus: {
          applied: 0,
          under_review: 0,
          shortlisted: 0,
          interview: 0,
          rejected: 0,
          offered: 0,
          hired: 0,
        },
        byDate: {},
      };

      applications.forEach((app) => {
        // Count by status
        if (stats.byStatus[app.status] !== undefined) {
          stats.byStatus[app.status]++;
        }

        // Count by date (group by month)
        const date = new Date(app.createdAt);
        const monthYear = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}`;
        stats.byDate[monthYear] = (stats.byDate[monthYear] || 0) + 1;
      });

      state.stats = stats;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch applications
      .addCase(fetchApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = action.payload.data;
        state.pagination = action.payload.pagination || state.pagination;
        applicationSlice.caseReducers.updateStats(state, {
          payload: action.payload.data,
          type: "applications/updateStats",
        });
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch single application
      .addCase(fetchApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.currentApplication = action.payload.data;
      })
      .addCase(fetchApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch job applications
      .addCase(fetchJobApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobApplications.fulfilled, (state, action) => {
        state.loading = false;
        const { jobId, data } = action.payload;
        state.jobApplications[jobId] = data.data;
      })
      .addCase(fetchJobApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create application
      .addCase(createApplication.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(createApplication.fulfilled, (state, action) => {
        state.creating = false;
        state.applications.unshift(action.payload.data);
        applicationSlice.caseReducers.updateStats(state, {
          payload: state.applications,
          type: "applications/updateStats",
        });
      })
      .addCase(createApplication.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload;
      })

      // Update application status
      .addCase(updateApplicationStatus.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateApplicationStatus.fulfilled, (state, action) => {
        state.updating = false;
        const updatedApplication = action.payload.data;

        // Update in applications list
        state.applications = state.applications.map((app) =>
          app._id === updatedApplication._id ? updatedApplication : app
        );

        // Update in jobApplications if exists
        if (
          updatedApplication.job &&
          state.jobApplications[updatedApplication.job]
        ) {
          state.jobApplications[updatedApplication.job] = state.jobApplications[
            updatedApplication.job
          ].map((app) =>
            app._id === updatedApplication._id ? updatedApplication : app
          );
        }

        // Update current application if it's the one being updated
        if (
          state.currentApplication &&
          state.currentApplication._id === updatedApplication._id
        ) {
          state.currentApplication = updatedApplication;
        }

        applicationSlice.caseReducers.updateStats(state, {
          payload: state.applications,
          type: "applications/updateStats",
        });
      })
      .addCase(updateApplicationStatus.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      })

      // Add interview
      .addCase(addInterview.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(addInterview.fulfilled, (state, action) => {
        state.updating = false;
        const updatedApplication = action.payload.data;

        // Update in applications list
        state.applications = state.applications.map((app) =>
          app._id === updatedApplication._id ? updatedApplication : app
        );

        // Update current application
        if (
          state.currentApplication &&
          state.currentApplication._id === updatedApplication._id
        ) {
          state.currentApplication = updatedApplication;
        }
      })
      .addCase(addInterview.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      })

      // Update interview
      .addCase(updateInterview.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateInterview.fulfilled, (state, action) => {
        state.updating = false;
        const updatedApplication = action.payload.data;

        // Update in applications list
        state.applications = state.applications.map((app) =>
          app._id === updatedApplication._id ? updatedApplication : app
        );

        // Update current application
        if (
          state.currentApplication &&
          state.currentApplication._id === updatedApplication._id
        ) {
          state.currentApplication = updatedApplication;
        }
      })
      .addCase(updateInterview.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      })

      // Delete application
      .addCase(deleteApplication.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })
      .addCase(deleteApplication.fulfilled, (state, action) => {
        state.deleting = false;
        const deletedId = action.payload;

        // Remove from applications list
        state.applications = state.applications.filter(
          (app) => app._id !== deletedId
        );

        // Remove from jobApplications
        Object.keys(state.jobApplications).forEach((jobId) => {
          state.jobApplications[jobId] = state.jobApplications[jobId].filter(
            (app) => app._id !== deletedId
          );
        });

        // Clear current application if it's the one being deleted
        if (
          state.currentApplication &&
          state.currentApplication._id === deletedId
        ) {
          state.currentApplication = null;
        }

        applicationSlice.caseReducers.updateStats(state, {
          payload: state.applications,
          type: "applications/updateStats",
        });
      })
      .addCase(deleteApplication.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload;
      })

      // Bulk update applications
      .addCase(bulkUpdateApplications.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(bulkUpdateApplications.fulfilled, (state, action) => {
        state.updating = false;
        const { updatedApplications } = action.payload;

        // Update all applications in the list
        updatedApplications.forEach((updatedApp) => {
          state.applications = state.applications.map((app) =>
            app._id === updatedApp._id ? updatedApp : app
          );

          // Update in jobApplications if exists
          if (updatedApp.job && state.jobApplications[updatedApp.job]) {
            state.jobApplications[updatedApp.job] = state.jobApplications[
              updatedApp.job
            ].map((app) => (app._id === updatedApp._id ? updatedApp : app));
          }
        });

        applicationSlice.caseReducers.updateStats(state, {
          payload: state.applications,
          type: "applications/updateStats",
        });
      })
      .addCase(bulkUpdateApplications.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      });
  },
});

export const {
  setFilters,
  clearFilters,
  setPage,
  setLimit,
  setSort,
  resetApplication,
  resetApplications,
  updateApplicationInList,
  addNoteToApplication,
  updateStats,
} = applicationSlice.actions;

// Selectors
export const selectApplications = (state) => state.applications.applications;
export const selectCurrentApplication = (state) =>
  state.applications.currentApplication;
export const selectJobApplications = (state, jobId) =>
  state.applications.jobApplications[jobId] || [];
export const selectApplicationFilters = (state) => state.applications.filters;
export const selectApplicationPagination = (state) =>
  state.applications.pagination;
export const selectApplicationsLoading = (state) => state.applications.loading;
export const selectApplicationsError = (state) => state.applications.error;
export const selectApplicationCreating = (state) => state.applications.creating;
export const selectApplicationUpdating = (state) => state.applications.updating;
export const selectApplicationDeleting = (state) => state.applications.deleting;
export const selectApplicationStats = (state) => state.applications.stats;

// Filtered applications selector
export const selectFilteredApplications = (state) => {
  const { applications, filters } = state.applications;

  return applications
    .filter((application) => {
      // Filter by status
      if (filters.status && application.status !== filters.status) {
        return false;
      }

      // Filter by job ID
      if (filters.jobId && application.job?._id !== filters.jobId) {
        return false;
      }

      // Filter by candidate ID
      if (
        filters.candidateId &&
        application.candidate?._id !== filters.candidateId
      ) {
        return false;
      }

      // Filter by recruiter ID
      if (
        filters.recruiterId &&
        application.recruiter?._id !== filters.recruiterId
      ) {
        return false;
      }

      // Filter by search term
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const matchesSearch =
          application.job?.title?.toLowerCase().includes(searchTerm) ||
          application.job?.company?.toLowerCase().includes(searchTerm) ||
          application.candidate?.name?.toLowerCase().includes(searchTerm) ||
          application.candidate?.email?.toLowerCase().includes(searchTerm) ||
          application.status?.toLowerCase().includes(searchTerm);

        if (!matchesSearch) return false;
      }

      // Filter by date range
      if (filters.dateRange) {
        const applicationDate = new Date(application.createdAt);
        const now = new Date();
        let startDate;

        switch (filters.dateRange) {
          case "today":
            startDate = new Date(now.setHours(0, 0, 0, 0));
            break;
          case "week":
            startDate = new Date(now.setDate(now.getDate() - 7));
            break;
          case "month":
            startDate = new Date(now.setMonth(now.getMonth() - 1));
            break;
          case "3months":
            startDate = new Date(now.setMonth(now.getMonth() - 3));
            break;
          default:
            return true;
        }

        if (applicationDate < startDate) return false;
      }

      return true;
    })
    .sort((a, b) => {
      // Sorting
      const order = filters.sortOrder === "asc" ? 1 : -1;

      switch (filters.sortBy) {
        case "createdAt":
          return (new Date(a.createdAt) - new Date(b.createdAt)) * order;
        case "updatedAt":
          return (new Date(a.updatedAt) - new Date(b.updatedAt)) * order;
        case "status":
          return a.status.localeCompare(b.status) * order;
        case "jobTitle":
          return (a.job?.title || "").localeCompare(b.job?.title || "") * order;
        case "candidateName":
          return (
            (a.candidate?.name || "").localeCompare(b.candidate?.name || "") *
            order
          );
        default:
          return (new Date(a.createdAt) - new Date(b.createdAt)) * order;
      }
    });
};

// Grouped applications selectors
export const selectApplicationsByStatus = (state) => {
  const applications = selectApplications(state);
  return applications.reduce((acc, app) => {
    if (!acc[app.status]) {
      acc[app.status] = [];
    }
    acc[app.status].push(app);
    return acc;
  }, {});
};

export const selectApplicationsByJob = (state) => {
  const applications = selectApplications(state);
  return applications.reduce((acc, app) => {
    if (app.job) {
      if (!acc[app.job._id]) {
        acc[app.job._id] = {
          job: app.job,
          applications: [],
        };
      }
      acc[app.job._id].applications.push(app);
    }
    return acc;
  }, {});
};

export const selectApplicationsByCandidate = (state) => {
  const applications = selectApplications(state);
  return applications.reduce((acc, app) => {
    if (app.candidate) {
      if (!acc[app.candidate._id]) {
        acc[app.candidate._id] = {
          candidate: app.candidate,
          applications: [],
        };
      }
      acc[app.candidate._id].applications.push(app);
    }
    return acc;
  }, {});
};

// Statistics selectors
export const selectApplicationCount = (state) => state.applications.stats.total;
export const selectApplicationCountByStatus = (state, status) =>
  state.applications.stats.byStatus[status] || 0;
export const selectApplicationTrend = (state) => {
  const byDate = state.applications.stats.byDate;
  const dates = Object.keys(byDate).sort();

  if (dates.length < 2) return 0;

  const recent = byDate[dates[dates.length - 1]];
  const previous = byDate[dates[dates.length - 2]];

  if (previous === 0) return 100;
  return ((recent - previous) / previous) * 100;
};

// Status count selectors
export const selectAppliedCount = (state) =>
  state.applications.stats.byStatus.applied || 0;
export const selectUnderReviewCount = (state) =>
  state.applications.stats.byStatus.under_review || 0;
export const selectShortlistedCount = (state) =>
  state.applications.stats.byStatus.shortlisted || 0;
export const selectInterviewCount = (state) =>
  state.applications.stats.byStatus.interview || 0;
export const selectRejectedCount = (state) =>
  state.applications.stats.byStatus.rejected || 0;
export const selectOfferedCount = (state) =>
  state.applications.stats.byStatus.offered || 0;
export const selectHiredCount = (state) =>
  state.applications.stats.byStatus.hired || 0;

// Helper function to get application by ID
export const selectApplicationById = (state, applicationId) =>
  state.applications.applications.find((app) => app._id === applicationId) ||
  null;

export default applicationSlice.reducer;
