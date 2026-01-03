import React from "react";
import {
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
  FiCalendar,
  FiBriefcase,
  FiUser,
  FiX,
  FiCheck,
  FiTrash2,
} from "react-icons/fi";
import { formatRelativeTime } from "../../utils/helpers";
import LoadingSpinner from "../common/Loading/LoadingSpinner";

const NotificationList = ({
  notifications,
  loading,
  onMarkAsRead,
  onDelete,
  onClose,
}) => {
  const getIcon = (type) => {
    switch (type) {
      case "application":
        return <FiBriefcase className="h-5 w-5 text-blue-500" />;
      case "interview":
        return <FiCalendar className="h-5 w-5 text-green-500" />;
      case "message":
        return <FiUser className="h-5 w-5 text-purple-500" />;
      case "system":
        return <FiInfo className="h-5 w-5 text-gray-500" />;
      default:
        return <FiAlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getIconColor = (type) => {
    switch (type) {
      case "application":
        return "bg-blue-100";
      case "interview":
        return "bg-green-100";
      case "message":
        return "bg-purple-100";
      case "system":
        return "bg-gray-100";
      default:
        return "bg-yellow-100";
    }
  };

  if (loading) {
    return (
      <div className="py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="py-8 text-center">
        <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
          <FiBell className="h-full w-full" />
        </div>
        <p className="text-gray-500">No notifications yet</p>
      </div>
    );
  }

  return (
    <div className="max-h-96 overflow-y-auto">
      {notifications.map((notification) => (
        <div
          key={notification._id}
          className={`px-4 py-3 hover:bg-gray-50 transition-colors ${
            !notification.isRead ? "bg-blue-50" : ""
          }`}
        >
          <div className="flex items-start">
            <div
              className={`flex-shrink-0 h-10 w-10 rounded-full ${getIconColor(
                notification.type
              )} flex items-center justify-center`}
            >
              {getIcon(notification.type)}
            </div>
            <div className="ml-3 flex-1">
              <div className="flex items-start justify-between">
                <p className="text-sm font-medium text-gray-900">
                  {notification.title}
                </p>
                <div className="flex items-center space-x-1">
                  {!notification.isRead && (
                    <button
                      onClick={() => onMarkAsRead(notification._id)}
                      className="p-1 text-gray-400 hover:text-green-500"
                      title="Mark as read"
                    >
                      <FiCheck className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => onDelete(notification._id)}
                    className="p-1 text-gray-400 hover:text-red-500"
                    title="Delete"
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-600">
                {notification.message}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {formatRelativeTime(notification.createdAt)}
                </span>
                {notification.actionUrl && (
                  <a
                    href={notification.actionUrl}
                    onClick={onClose}
                    className="text-xs font-medium text-primary-600 hover:text-primary-700"
                  >
                    View
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
