import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJobs,
  fetchJobDetails,
  setFilters,
  clearFilters,
  setPage,
  selectJobs,
  selectCurrentJob,
  selectJobFilters,
  selectJobPagination,
  selectJobsLoading,
  selectJobsError,
} from "../store/slices/jobSlice";
import jobService from "../services/jobService";
import { debounce } from "../utils/helpers";

export const useJobs = () => {
  const dispatch = useDispatch();

  const jobs = useSelector(selectJobs);
  const currentJob = useSelector(selectCurrentJob);
  const filters = useSelector(selectJobFilters);
  const pagination = useSelector(selectJobPagination);
  const loading = useSelector(selectJobsLoading);
  const error = useSelector(selectJobsError);

  const [searchTerm, setSearchTerm] = useState(filters.search);

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((value) => {
      dispatch(setFilters({ search: value }));
    }, 500),
    [dispatch]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);       
  }, [searchTerm, debouncedSearch]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters));
  };

  const handlePageChange = (page) => {
    dispatch(setPage(page));
  };

  const loadJobs = () => {
    dispatch(fetchJobs({ ...filters, page: pagination.page }));
  };

  const getJob = (id) => {
    dispatch(fetchJobDetails(id));
  };

  const clearAllFilters = () => {
    dispatch(clearFilters());
    setSearchTerm("");
  };

  // Load jobs when filters or page change
  useEffect(() => {
    loadJobs();
  }, [filters, pagination.page]);

  return {
    jobs,
    currentJob,
    filters,
    pagination,
    loading,
    error,
    searchTerm,
    handleSearch,
    handleFilterChange,
    handlePageChange,
    loadJobs,
    getJob,
    clearAllFilters,
    ...jobService,
  };
};
