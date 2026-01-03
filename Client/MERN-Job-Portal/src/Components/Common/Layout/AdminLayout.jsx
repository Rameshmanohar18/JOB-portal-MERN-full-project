import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiBriefcase,
  FiBarChart2,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiBell,
  FiUser,
  FiChevronDown,
  FiShield,
  FiFileText,
  FiDollarSign,
  FiCalendar,
  FiMessageSquare,
  FiDatabase,
  FiServer,
} from "react-icons/fi";
import { useAuth } from "../../../hooks/useAuth";
import NotificationBell from "../../notifications/NotificationBell";
import LoadingSpinner from "../Loading/LoadingSpinner";

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: FiHome,
      current: location.pathname === "/admin",
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: FiUsers,
      current: location.pathname.includes("/admin/users"),
    },
    {
      name: "Jobs",
      href: "/admin/jobs",
      icon: FiBriefcase,
      current: location.pathname.includes("/admin/jobs"),
    },
    {
      name: "Companies",
      href: "/admin/companies",
      icon: FiShield,
      current: location.pathname.includes("/admin/companies"),
    },
    {
      name: "Applications",
      href: "/admin/applications",
      icon: FiFileText,
      current: location.pathname.includes("/admin/applications"),
    },
    {
      name: "Analytics",
      href: "/admin/analytics",
      icon: FiBarChart2,
      current: location.pathname.includes("/admin/analytics"),
    },
    {
      name: "Reports",
      href: "/admin/reports",
      icon: FiDollarSign,
      current: location.pathname.includes("/admin/reports"),
    },
    {
      name: "System Logs",
      href: "/admin/logs",
      icon: FiDatabase,
      current: location.pathname.includes("/admin/logs"),
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: FiSettings,
      current: location.pathname.includes("/admin/settings"),
    },
  ];

  const stats = [
    { name: "Total Users", value: "1,234", change: "+12%", icon: FiUsers },
    { name: "Active Jobs", value: "567", change: "+5%", icon: FiBriefcase },
    { name: "Applications", value: "8,901", change: "+23%", icon: FiFileText },
    { name: "Revenue", value: "$45,678", change: "+8%", icon: FiDollarSign },
  ];

  const recentActivities = [
    {
      id: 1,
      user: "John Doe",
      action: "created a new job",
      time: "2 min ago",
      type: "job",
    },
    {
      id: 2,
      user: "Jane Smith",
      action: "updated profile",
      time: "15 min ago",
      type: "user",
    },
    {
      id: 3,
      user: "Bob Johnson",
      action: "applied for job",
      time: "1 hour ago",
      type: "application",
    },
    {
      id: 4,
      user: "System",
      action: "scheduled backup",
      time: "2 hours ago",
      type: "system",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden bg-black bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
            <Link to="/admin" className="flex items-center">
              <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <FiShield className="h-5 w-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-white">
                JobPortal Admin
              </span>
            </Link>
            <button
              className="lg:hidden text-gray-400 hover:text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <FiX className="h-6 w-6" />
            </button>
          </div>

          {/* Sidebar content */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    item.current
                      ? "bg-gray-800 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      item.current
                        ? "text-white"
                        : "text-gray-400 group-hover:text-white"
                    }`}
                  />
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Admin info */}
            <div className="mt-8 px-4">
              <div className="p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center">
                      <span className="text-white font-bold">
                        {user?.name?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-400">Administrator</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Last login:</span>
                    <span>Today, 10:30 AM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar footer */}
          <div className="p-4 border-t border-gray-800">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-2 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
            >
              <FiLogOut className="mr-3 h-5 w-5 text-gray-400" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top navbar */}
        <div className="sticky top-0 z-10 bg-white shadow-sm">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-600"
                onClick={() => setSidebarOpen(true)}
              >
                <FiMenu className="h-6 w-6" />
              </button>
              <div className="ml-4">
                <h1 className="text-lg font-semibold text-gray-900">
                  {navigation.find((item) => item.current)?.name || "Dashboard"}
                </h1>
                <p className="text-sm text-gray-500">Administration Panel</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <NotificationBell />

              {/* Search */}
              <div className="hidden lg:block">
                <div className="relative">
                  <input
                    type="search"
                    placeholder="Search..."
                    className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* User menu */}
              <div className="relative">
                <button
                  className="flex items-center space-x-3 focus:outline-none"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-600 font-semibold">
                        {user?.name?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.name}
                      </p>
                      <p className="text-xs text-gray-500">Administrator</p>
                    </div>
                    <FiChevronDown className="h-5 w-5 text-gray-500" />
                  </div>
                </button>

                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-40 ring-1 ring-black ring-opacity-5">
                      <div className="px-4 py-2 border-b">
                        <p className="text-sm font-medium text-gray-900">
                          {user?.name}
                        </p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                      <Link
                        to="/admin/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <FiUser className="mr-3 h-4 w-4 text-gray-400" />
                        My Profile
                      </Link>
                      <Link
                        to="/admin/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <FiSettings className="mr-3 h-4 w-4 text-gray-400" />
                        Settings
                      </Link>
                      <div className="border-t border-gray-100">
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          <FiLogOut className="mr-3 h-4 w-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <main className="py-6">
          <div className="px-4 sm:px-6 lg:px-8">
            {/* Stats overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat) => (
                <div key={stat.name} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {stat.name}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 mt-2">
                        {stat.value}
                      </p>
                    </div>
                    <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                      <stat.icon className="h-6 w-6 text-indigo-600" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="text-sm text-green-600 font-medium">
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">
                      from last month
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Page content */}
            <div className="bg-white rounded-lg shadow">
              <React.Suspense fallback={<LoadingSpinner />}>
                <Outlet />
              </React.Suspense>
            </div>

            {/* Recent activity sidebar */}
            <div className="mt-8 lg:grid lg:grid-cols-3 lg:gap-8">
              <div className="lg:col-span-2">
                {/* Main content goes here */}
              </div>
              <div className="mt-8 lg:mt-0">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Recent Activity
                  </h3>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start">
                        <div className="flex-shrink-0">
                          <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center ${
                              activity.type === "job"
                                ? "bg-blue-100"
                                : activity.type === "user"
                                ? "bg-green-100"
                                : activity.type === "application"
                                ? "bg-yellow-100"
                                : "bg-gray-100"
                            }`}
                          >
                            {activity.type === "job" && (
                              <FiBriefcase className="h-4 w-4 text-blue-600" />
                            )}
                            {activity.type === "user" && (
                              <FiUsers className="h-4 w-4 text-green-600" />
                            )}
                            {activity.type === "application" && (
                              <FiFileText className="h-4 w-4 text-yellow-600" />
                            )}
                            {activity.type === "system" && (
                              <FiServer className="h-4 w-4 text-gray-600" />
                            )}
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            {activity.user} {activity.action}
                          </p>
                          <p className="text-xs text-gray-500">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                    View all activity →
                  </button>
                </div>

                {/* System status */}
                <div className="mt-6 bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    System Status
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          CPU Usage
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          42%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: "42%" }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          Memory
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          78%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-500 rounded-full"
                          style={{ width: "78%" }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          Database
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          65%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: "65%" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Last backup:</span>
                      <span className="font-medium">2 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
