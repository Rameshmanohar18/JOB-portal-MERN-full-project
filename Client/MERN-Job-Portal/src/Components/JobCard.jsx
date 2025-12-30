import React from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaClock,
  FaDollarSign,
} from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

const JobCard = ({ job }) => {
  const getExperienceText = (level) => {
    const levels = {
      entry: "0-2 years",
      mid: "2-5 years",
      senior: "5+ years",
      executive: "10+ years",
    };
    return levels[level] || level;
  };

  const getSalaryText = (salary) => {
    if (salary.isNegotiable) return "Negotiable";

    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: salary.currency || "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    return `${formatter.format(salary.min)} - ${formatter.format(salary.max)} ${
      salary.period
    }`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-200">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            {job.company.logo && (
              <img
                src={job.company.logo}
                alt={job.company.name}
                className="w-12 h-12 rounded-full mr-4 object-cover"
              />
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                <Link to={`/jobs/${job._id}`} className="hover:text-blue-600">
                  {job.title}
                </Link>
              </h3>
              <p className="text-gray-600">{job.company.name}</p>
            </div>
          </div>

          <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>

          <div className="flex flex-wrap gap-3 mb-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                job.employmentType === "full-time"
                  ? "bg-blue-100 text-blue-800"
                  : job.employmentType === "part-time"
                  ? "bg-green-100 text-green-800"
                  : "bg-purple-100 text-purple-800"
              }`}
            >
              {job.employmentType.replace("-", " ").toUpperCase()}
            </span>

            <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
              {job.experienceLevel.toUpperCase()}
            </span>

            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                job.location === "remote"
                  ? "bg-indigo-100 text-indigo-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {job.location.toUpperCase()}
            </span>

            {job.featured && (
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                FEATURED
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="flex items-center text-gray-600">
              <FaMapMarkerAlt className="mr-2" />
              <span>{job.workLocation?.city || "Remote"}</span>
            </div>

            <div className="flex items-center text-gray-600">
              <FaBriefcase className="mr-2" />
              <span>{getExperienceText(job.experienceLevel)}</span>
            </div>

            <div className="flex items-center text-gray-600">
              <FaDollarSign className="mr-2" />
              <span>{getSalaryText(job.salary)}</span>
            </div>

            <div className="flex items-center text-gray-600">
              <FaClock className="mr-2" />
              <span>
                {formatDistanceToNow(new Date(job.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {job.skills.slice(0, 5).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded"
              >
                {skill}
              </span>
            ))}
            {job.skills.length > 5 && (
              <span className="px-2 py-1 text-xs font-medium text-gray-500">
                +{job.skills.length - 5} more
              </span>
            )}
          </div>
        </div>

        <div className="ml-4">
          <Link
            to={`/jobs/${job._id}`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
