import React from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";
import Card from "../common/UI/Card";

const StatsCard = ({
  title,
  value,
  change,
  icon: Icon,
  color = "blue",
  href,
}) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
    purple: "bg-purple-100 text-purple-600",
    red: "bg-red-100 text-red-600",
  };

  const isPositive = change && !change.includes("-");

  const content = (
    <Card padding="md" hover className="h-full">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <div
              className={`flex items-center mt-2 text-sm ${
                isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {isPositive ? (
                <FiArrowUpRight className="h-4 w-4 mr-1" />
              ) : (
                <FiArrowDownRight className="h-4 w-4 mr-1" />
              )}
              <span>{change}</span>
            </div>
          )}
        </div>
        <div
          className={`h-12 w-12 rounded-lg ${colorClasses[color]} flex items-center justify-center`}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  );

  if (href) {
    return (
      <Link to={href} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
};

export default StatsCard;
