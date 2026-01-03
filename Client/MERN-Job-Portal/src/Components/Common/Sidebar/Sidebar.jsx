import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FiHome,
  FiBriefcase,
  FiFileText,
  FiStar,
  FiUser,
  FiSettings,
  FiLogOut,
  FiChevronRight,
  FiMessageSquare,
  FiBell,
  FiCalendar,
  FiTrendingUp,
} from "react-icons/fi";
import { useAuth } from "../../../hooks/useAuth";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState([]);

  const toggleItem = (itemName) => {
    setExpandedItems((prev) =>
      prev.includes(itemName)
        ? prev.filter((item) => item !== itemName)
        : [...prev, itemName]
    );
  };

  const candidateNavigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: FiHome,
      current: location.pathname === "/dashboard",
    },
    {
      name: "Jobs",
      icon: FiBriefcase,
      current: location.pathname.includes("/jobs"),
      children: [
        { name: "Browse Jobs", href: "/jobs" },
        { name: "Recommended", href: "/jobs/recommended" },
        { name: "Saved Jobs", href: "/dashboard/saved-jobs" },
      ],
    },
    {
      name: "Applications",
      href: "/dashboard/applications",
      icon: FiFileText,
      current: location.pathname.includes("/applications"),
    },
    {
      name: "Profile",
      icon: FiUser,
      current: location.pathname.includes("/profile"),
      children: [
        { name: "My Profile", href: "/dashboard/profile" },
        { name: "Resume", href: "/dashboard/resume" },
        { name: "Skills", href: "/dashboard/skills" },
      ],
    },
    {
      name: "Messages",
      href: "/dashboard/messages",
      icon: FiMessageSquare,
      current: location.pathname.includes("/messages"),
      badge: "3",
    },
    {
      name: "Interviews",
      href: "/dashboard/interviews",
      icon: FiCalendar,
      current: location.pathname.includes("/interviews"),
    },
    {
      name: "Analytics",
      href: "/dashboard/analytics",
      icon: FiTrendingUp,
      current: location.pathname.includes("/analytics"),
    },
  ];

  const recruiterNavigation = [
    {
      name: "Dashboard",
      href: "/recruiter/dashboard",
      icon: FiHome,
      current: location.pathname === "/recruiter/dashboard",
    },
    {
      name: "Jobs",
      icon: FiBriefcase,
      current: location.pathname.includes("/jobs"),
      children: [
        { name: "Post Job", href: "/recruiter/post-job" },
        { name: "Manage Jobs", href: "/recruiter/manage-jobs" },
        { name: "Job Analytics", href: "/recruiter/job-analytics" },
      ],
    },
    {
      name: "Applications",
      href: "/recruiter/applications",
      icon: FiFileText,
      current: location.pathname.includes("/applications"),
      badge: "12",
    },
    {
      name: "Candidates",
      icon: FiUser,
      current: location.pathname.includes("/candidates"),
      children: [
        { name: "All Candidates", href: "/recruiter/candidates" },
        { name: "Shortlisted", href: "/recruiter/shortlisted" },
        { name: "Hired", href: "/recruiter/hired" },
      ],
    },
    {
      name: "Company",
      href: "/recruiter/company",
      icon: FiHome,
      current: location.pathname.includes("/company"),
    },
    {
      name: "Reports",
      href: "/recruiter/reports",
      icon: FiTrendingUp,
      current: location.pathname.includes("/reports"),
    },
  ];

  const navigation =
    user?.role === "recruiter" ? recruiterNavigation : candidateNavigation;

  const handleLogout = async () => {
    await logout();
  };

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-white border-r border-gray-200">
      {/* Sidebar header */}
      <div className="flex items-center h-16 px-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">J</span>
          </div>
          <span className="ml-2 text-lg font-semibold text-gray-900">
            {user?.role === "recruiter" ? "Recruiter" : "Candidate"} Dashboard
          </span>
        </div>
      </div>

      {/* Sidebar content */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-4 space-y-1">
          {navigation.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = expandedItems.includes(item.name);

            return (
              <div key={item.name}>
                {hasChildren ? (
                  <>
                    <button
                      onClick={() => toggleItem(item.name)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        item.current
                          ? "bg-primary-50 text-primary-700"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <div className="flex items-center">
                        <item.icon className="mr-3 h-5 w-5" />
                        {item.name}
                        {item.badge && (
                          <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <FiChevronRight
                        className={`h-4 w-4 transition-transform ${
                          isExpanded ? "transform rotate-90" : ""
                        }`}
                      />
                    </button>

                    {isExpanded && (
                      <div className="ml-8 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <NavLink
                            key={child.name}
                            to={child.href}
                            className={({ isActive }) =>
                              `block px-3 py-2 text-sm rounded-lg transition-colors ${
                                isActive
                                  ? "bg-primary-50 text-primary-700"
                                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                              }`
                            }
                          >
                            {child.name}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        isActive
                          ? "bg-primary-50 text-primary-700"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`
                    }
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                    {item.badge && (
                      <span className="ml-auto px-2 py-0.5 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                )}
              </div>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="px-4 my-6">
          <div className="border-t border-gray-200"></div>
        </div>

        {/* Quick actions */}
        <div className="px-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Quick Actions
          </h3>
          <div className="space-y-2">
            <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg">
              <FiBriefcase className="mr-3 h-5 w-5 text-gray-400" />
              Post a Job
            </button>
            <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg">
              <FiUser className="mr-3 h-5 w-5 text-gray-400" />
              Find Candidates
            </button>
            <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg">
              <FiBell className="mr-3 h-5 w-5 text-gray-400" />
              Set Alerts
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar footer */}
      <div className="flex-shrink-0 p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-10 w-10 rounded-full"
                />
              ) : (
                <span className="text-primary-600 font-semibold">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </span>
              )}
            </div>
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
          <button
            onClick={handleLogout}
            className="ml-2 p-2 text-gray-400 hover:text-gray-600"
            title="Logout"
          >
            <FiLogOut className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-3">
          <NavLink
            to="/dashboard/settings"
            className="block w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg"
          >
            <FiSettings className="inline-block mr-2 h-4 w-4" />
            Account Settings
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
