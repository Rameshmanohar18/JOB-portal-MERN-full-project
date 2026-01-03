import { api } from "./api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const jobService = {
  // Queries
  useJobs: (filters = {}) => {
    return useQuery({
      queryKey: ["jobs", filters],
      queryFn: () => api.getJobs(filters),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  },

  useJob: (id) => {
    return useQuery({
      queryKey: ["job", id],
      queryFn: () => api.getJob(id),
      enabled: !!id,
    });
  },

  useMyJobs: (filters = {}) => {
    return useQuery({
      queryKey: ["myJobs", filters],
      queryFn: () => api.getMyJobs(filters),
    });
  },

  useRecommendedJobs: () => {
    return useQuery({
      queryKey: ["recommendedJobs"],
      queryFn: () => api.getRecommendedJobs(),
    });
  },

  useSavedJobs: () => {
    return useQuery({
      queryKey: ["savedJobs"],
      queryFn: () => api.getSavedJobs(),
    });
  },

  // Mutations
  useCreateJob: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (data) => api.createJob(data),
      onSuccess: () => {
        queryClient.invalidateQueries(["jobs"]);
        queryClient.invalidateQueries(["myJobs"]);
      },
    });
  },

  useUpdateJob: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ id, data }) => api.updateJob(id, data),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(["job", variables.id]);
        queryClient.invalidateQueries(["jobs"]);
        queryClient.invalidateQueries(["myJobs"]);
      },
    });
  },

  useDeleteJob: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (id) => api.deleteJob(id),
      onSuccess: () => {
        queryClient.invalidateQueries(["jobs"]);
        queryClient.invalidateQueries(["myJobs"]);
      },
    });
  },

  useSaveJob: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (jobId) => api.saveJob(jobId),
      onSuccess: () => {
        queryClient.invalidateQueries(["savedJobs"]);
        queryClient.invalidateQueries(["jobs"]);
      },
    });
  },

  useUnsaveJob: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (jobId) => api.unsaveJob(jobId),
      onSuccess: () => {
        queryClient.invalidateQueries(["savedJobs"]);
        queryClient.invalidateQueries(["jobs"]);
      },
    });
  },
};

export default jobService;
