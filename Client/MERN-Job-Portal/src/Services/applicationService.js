import { api } from "./api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const applicationService = {
  // Queries
  useApplications: (filters = {}) => {
    return useQuery({
      queryKey: ["applications", filters],
      queryFn: () => api.getApplications(filters),
    });
  },

  useApplication: (id) => {
    return useQuery({
      queryKey: ["application", id],
      queryFn: () => api.getApplication(id),
      enabled: !!id,
    });
  },

  useJobApplications: (jobId, filters = {}) => {
    return useQuery({
      queryKey: ["jobApplications", jobId, filters],
      queryFn: () => api.getJobApplications(jobId, filters),
      enabled: !!jobId,
    });
  },

  // Mutations
  useApplyJob: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ jobId, data }) => api.applyJob(jobId, data),
      onSuccess: () => {
        queryClient.invalidateQueries(["applications"]);
        queryClient.invalidateQueries(["jobs"]);
      },
    });
  },

  useUpdateApplicationStatus: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ id, status }) => api.updateApplicationStatus(id, status),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(["application", variables.id]);
        queryClient.invalidateQueries(["applications"]);
        queryClient.invalidateQueries(["jobApplications"]);
      },
    });
  },
};

export default applicationService;
