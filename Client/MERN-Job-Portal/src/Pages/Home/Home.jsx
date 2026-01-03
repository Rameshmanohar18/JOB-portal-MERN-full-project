import React from "react";
import { Link } from "react-router-dom";
import {
  FiSearch,
  FiBriefcase,
  FiUsers,
  FiTrendingUp,
  FiCheckCircle,
  FiStar,
  FiArrowRight,
} from "react-icons/fi";
import JobCard from "../../components/jobs/JobCard";
import { useJobs } from "../../hooks/useJobs";
import { formatCurrency } from "../../utils/helpers";

const Home = () => {
  const { jobs, loading } = useJobs();

  const features = [
    {
      icon: FiBriefcase,
      title: "Smart Job Matching",
      description:
        "AI-powered job recommendations based on your skills and preferences",
    },
    {
      icon: FiUsers,
      title: "Direct Company Access",
      description: "Connect directly with hiring managers and recruiters",
    },
    {
      icon: FiTrendingUp,
      title: "Career Growth",
      description:
        "Find opportunities that match your career progression goals",
    },
    {
      icon: FiCheckCircle,
      title: "Verified Companies",
      description:
        "All companies are verified to ensure legitimate opportunities",
    },
  ];

  const stats = [
    { label: "Jobs Posted", value: "10,000+" },
    { label: "Companies", value: "500+" },
    { label: "Candidates Hired", value: "2,500+" },
    { label: "Countries", value: "50+" },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10" />
        <div className="relative px-8 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Find Your <span className="text-yellow-300">Dream Job</span> Here
            </h1>
            <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
              Discover thousands of job opportunities with all the information
              you need. Its your future. Come find it.
            </p>

            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg shadow-xl p-2">
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="flex-1">
                    <div className="relative">
                      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        placeholder="Job title, keywords, or company"
                        className="w-full pl-10 pr-4 py-3 border-0 focus:ring-0 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="relative">
                      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        placeholder="City, state, or remote"
                        className="w-full pl-10 pr-4 py-3 border-0 focus:ring-0 focus:outline-none"
                      />
                    </div>
                  </div>
                  <button className="btn btn-primary py-3 px-8 whitespace-nowrap">
                    Search Jobs
                  </button>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-4 text-white">
                <span className="text-sm">Popular Searches:</span>
                {[
                  "React Developer",
                  "Product Manager",
                  "Data Scientist",
                  "UX Designer",
                ].map((tag) => (
                  <button
                    key={tag}
                    className="text-sm bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-full transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose JobPortal?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide the best platform for both job seekers and employers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="card text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-primary-100 text-primary-600 mb-4">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Featured Jobs</h2>
            <p className="text-gray-600">Discover the latest opportunities</p>
          </div>
          <Link
            to="/jobs"
            className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            View all jobs
            <FiArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-6"></div>
                  <div className="space-y-3">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobs.slice(0, 4).map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-secondary-900 to-gray-900 rounded-2xl p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Advance Your Career?
          </h2>
          <p className="text-gray-300 mb-8">
            Join thousands of professionals who found their dream jobs through
            JobPortal
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/auth/register"
              className="btn btn-primary bg-white text-gray-900 hover:bg-gray-100 px-8 py-3"
            >
              Sign Up Free
            </Link>
            <Link
              to="/jobs"
              className="btn btn-outline border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3"
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
