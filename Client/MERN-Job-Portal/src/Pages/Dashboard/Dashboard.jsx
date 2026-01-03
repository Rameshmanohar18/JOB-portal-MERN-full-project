import React from "react";
import { Link } from "react-router-dom";
import {
  FiBriefcase,
  FiFileText,
  FiStar,
  FiBell,
  FiTrendingUp,
  FiCalendar,
  FiClock,
} from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";
import StatsCard from "../../components/dashboard/StatsCard";
import RecentActivity from "../../components/dashboard/RecentActivity";
import QuickActions from "../../components/dashboard/QuickActions";
import { formatDate } from "../../utils/helpers";

const Dashboard = () => {
  const { user } = useAuth();
  const isCandidate = user?.role === "candidate";
  const isRecruiter = user?.role === "recruiter";

  const candidateStats = [
    {
      title: "Applied Jobs",
      value: "12",
      change: "+2 this week",
      icon: FiBriefcase,
      color: "blue",
      href: "/dashboard/applications",
    },
    {
      title: "Saved Jobs",
      value: "8",
      change: "+1 today",
      icon: FiStar,
      color: "yellow",
      href: "/dashboard/saved-jobs",
    },
    {
      title: "Interviews",
      value: "3",
      change: "Next: Tomorrow",
      icon: FiCalendar,
      color: "green",
      href: "/dashboard/applications",
    },
    {
      title: "Profile Views",
      value: "45",
      change: "+5 today",
      icon: FiTrendingUp,
      color: "purple",
      href: "/dashboard/profile",
    },
  ];

  const recruiterStats = [
    {
      title: "Active Jobs",
      value: "8",
      change: "+2 this month",
      icon: FiBriefcase,
      color: "blue",
      href: "/recruiter/manage-jobs",
    },
    {
      title: "Total Applications",
      value: "156",
      change: "+12 today",
      icon: FiFileText,
      color: "green",
      href: "/recruiter/applications",
    },
    {
      title: "Interviews",
      value: "7",
      change: "Scheduled: 3",
      icon: FiCalendar,
      color: "yellow",
      href: "/recruiter/candidates",
    },
    {
      title: "Hired",
      value: "3",
      change: "This month",
      icon: FiTrendingUp,
      color: "purple",
      href: "/recruiter/candidates",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "application",
      title: "Application submitted",
      description: "You applied for Senior Frontend Developer at Google",
      time: "2 hours ago",
      icon: FiFileText,
      color: "green",
    },
    {
      id: 2,
      type: "interview",
      title: "Interview scheduled",
      description: "Phone interview with Meta scheduled for tomorrow at 2 PM",
      time: "1 day ago",
      icon: FiCalendar,
      color: "blue",
    },
    {
      id: 3,
      type: "profile",
      title: "Profile viewed",
      description: "Your profile was viewed by a recruiter from Microsoft",
      time: "2 days ago",
      icon: FiTrendingUp,
      color: "purple",
    },
    {
      id: 4,
      type: "job",
      title: "New job match",
      description: "We found 5 new jobs matching your preferences",
      time: "3 days ago",
      icon: FiBell,
      color: "yellow",
    },
  ];

  const quickActions = [
    {
      title: "Complete Profile",
      description: "Add missing information to your profile",
      progress: 75,
      action: "Complete Now",
      href: "/dashboard/profile",
      icon: FiBriefcase,
    },
    {
      title: "Upload Resume",
      description: "Keep your resume updated",
      progress: 100,
      action: "View Resume",
      href: "/dashboard/profile",
      icon: FiFileText,
    },
    {
      title: "Set Job Alerts",
      description: "Get notified about new opportunities",
      progress: 30,
      action: "Set Alerts",
      href: "/dashboard/settings",
      icon: FiBell,
    },
  ];

  const recommendedJobs = [
    {
      id: 1,
      title: "Senior React Developer",
      company: "Spotify",
      location: "New York, NY",
      type: "Full-time",
      salary: "$120,000 - $160,000",
      posted: "2 days ago",
      match: 95,
    },
    {
      id: 2,
      title: "Frontend Engineer",
      company: "Netflix",
      location: "Remote",
      type: "Full-time",
      salary: "$130,000 - $180,000",
      posted: "3 days ago",
      match: 88,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-primary-100">
              {isCandidate
                ? "Ready to find your next opportunity?"
                : "Manage your job postings and candidates"}
            </p>
            <div className="mt-4 flex items-center space-x-2 text-sm">
              <FiClock className="h-4 w-4" />
              <span>Last login: {formatDate(user?.lastLogin)}</span>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            {isCandidate && (
              <Link
                to="/jobs"
                className="btn bg-white text-primary-600 hover:bg-gray-100"
              >
                Browse Jobs
              </Link>
            )}
            {isRecruiter && (
              <Link
                to="/recruiter/post-job"
                className="btn bg-white text-primary-600 hover:bg-gray-100"
              >
                Post New Job
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {(isCandidate ? candidateStats : recruiterStats).map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="space-y-4">
              {quickActions.map((action) => (
                <QuickActions key={action.title} {...action} />
              ))}
            </div>
          </div>

          {/* Recommended Jobs (for candidates) */}
          {isCandidate && (
            <div className="card mt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Recommended For You
                </h2>
                <Link
                  to="/jobs"
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  View all
                </Link>
              </div>
              <div className="space-y-4">
                {recommendedJobs.map((job) => (
                  <div
                    key={job.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {job.title}
                        </h3>
                        <p className="text-sm text-gray-600">{job.company}</p>
                        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                          <span>{job.location}</span>
                          <span>•</span>
                          <span>{job.type}</span>
                          <span>•</span>
                          <span>{job.salary}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {job.match}% match
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                          {job.posted}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-3">
                      <button className="btn btn-primary py-1 px-4 text-sm">
                        Apply Now
                      </button>
                      <button className="btn btn-outline py-1 px-4 text-sm">
                        Save
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div>
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Activity
              </h2>
              <Link
                to="/dashboard/activity"
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                View all
              </Link>
            </div>
            <RecentActivity activities={recentActivities} />
          </div>

          {/* Profile Completion */}
          <div className="card mt-6">
            <h3 className="font-medium text-gray-900 mb-3">
              Profile Completion
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Overall</span>
                  <span className="font-medium">75%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-600 rounded-full"
                    style={{ width: "75%" }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Basic Info</span>
                    <span className="font-medium">100%</span>
                  </div>
                  <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Experience</span>
                    <span className="font-medium">60%</span>
                  </div>
                  <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-500 rounded-full"
                      style={{ width: "60%" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Skills</span>
                    <span className="font-medium">90%</span>
                  </div>
                  <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: "90%" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Education</span>
                    <span className="font-medium">50%</span>
                  </div>
                  <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: "50%" }}
                    />
                  </div>
                </div>
              </div>
              <Link
                to="/dashboard/profile"
                className="block w-full btn btn-outline text-sm"
              >
                Complete Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
