import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const QuickActions = ({
  title,
  description,
  progress,
  action,
  href,
  icon: Icon,
}) => {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className="h-10 w-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <Icon className="h-5 w-5 text-primary-600" />
          </div>
        </div>
        <div className="ml-4">
          <h4 className="text-sm font-medium text-gray-900">{title}</h4>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
          {progress !== undefined && (
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-600 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <Link
        to={href}
        className="flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
      >
        {action}
        <FiArrowRight className="ml-1 h-4 w-4" />
      </Link>
    </div>
  );
};

export default QuickActions;
