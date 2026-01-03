import React, { useState } from "react";
import { FiGrid, FiList, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import JobCard from "../../components/jobs/JobCard";
import JobFilters from "../../components/jobs/JobFilters";
import JobSearch from "../../components/jobs/JobSearch";
import Pagination from "../../Components/Common/UI/Pagination";
import LoadingSpinner from "../../components/common/Loading/LoadingSpinner";
import { useJobs } from "../../hooks/useJobs";

const Jobs = () => {
  const {
    jobs,
    loading,
    pagination,
    handlePageChange,
    searchTerm,
    handleSearch,
  } = useJobs();
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  return (
    <div className="py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Find Your Dream Job
        </h1>
        <p className="text-gray-600">
          Discover {pagination.total} opportunities waiting for you
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <JobFilters />

        {/* Main Content */}
        <div className="flex-1">
          {/* Search and Controls */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <JobSearch value={searchTerm} onChange={handleSearch} />
              </div>

              <div className="flex items-center space-x-4">
                <div className="hidden md:block text-sm text-gray-500">
                  Showing{" "}
                  {pagination.total > 0
                    ? (pagination.page - 1) * pagination.limit + 1
                    : 0}{" "}
                  -{" "}
                  {Math.min(
                    pagination.page * pagination.limit,
                    pagination.total
                  )}{" "}
                  of {pagination.total} jobs
                </div>

                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleViewModeChange("grid")}
                    className={`p-2 rounded-l-lg ${
                      viewMode === "grid"
                        ? "bg-primary-100 text-primary-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <FiGrid className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleViewModeChange("list")}
                    className={`p-2 rounded-r-lg ${
                      viewMode === "list"
                        ? "bg-primary-100 text-primary-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <FiList className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          )}

          {/* Empty State */}
          {!loading && jobs.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
                <FiBriefcase className="h-full w-full" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No jobs found
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
            </div>
          )}

          {/* Jobs Grid/List */}
          {!loading && jobs.length > 0 && (
            <>
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 lg:grid-cols-2"
                    : "grid-cols-1"
                }`}
              >
                {jobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="mt-8">
                  <Pagination
                    currentPage={pagination.page}
                    totalPages={pagination.pages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}

          {/* Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="text-2xl font-bold text-primary-600 mb-2">
                {pagination.total.toLocaleString()}
              </div>
              <div className="text-gray-600">Total Jobs</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {((pagination.total / 1000) * 150).toFixed(0)}+
              </div>
              <div className="text-gray-600">Hired This Month</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">98%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
