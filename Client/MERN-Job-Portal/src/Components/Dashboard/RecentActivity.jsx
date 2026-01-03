import React from "react";
import { FiCheckCircle, FiClock, FiAlertCircle, FiInfo } from "react-icons/fi";
import { formatRelativeTime } from "../../utils/helpers";

const RecentActivity = ({ activities = [] }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case "application":
        return <FiCheckCircle className="h-5 w-5 text-green-500" />;
      case "interview":
        return <FiClock className="h-5 w-5 text-blue-500" />;
      case "profile":
        return <FiInfo className="h-5 w-5 text-purple-500" />;
      default:
        return <FiAlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case "application":
        return "bg-green-100";
      case "interview":
        return "bg-blue-100";
      case "profile":
        return "bg-purple-100";
      default:
        return "bg-yellow-100";
    }
  };

  if (activities.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No recent activity</p>
      </div>
    );
  }

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {activities.map((activity, activityIdx) => (
          <li key={activity.id}>
            <div className="relative pb-8">
              {activityIdx !== activities.length - 1 && (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              )}
              <div className="relative flex items-start space-x-3">
                <div className="relative">
                  <div
                    className={`h-8 w-8 rounded-full ${getActivityColor(
                      activity.type
                    )} flex items-center justify-center ring-8 ring-white`}
                  >
                    {getActivityIcon(activity.type)}
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div>
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">
                        {activity.title}
                      </p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      {activity.description}
                    </p>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    <time dateTime={activity.time}>{activity.time}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;
