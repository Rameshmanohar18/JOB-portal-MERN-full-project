import React from "react";
import {
  FaCheckCircle,
  FaClock,
  FaUserCheck,
  FaVideo,
  FaTimesCircle,
  FaStar,
} from "react-icons/fa";

const ApplicationStatusTracker = ({ status, currentStage }) => {
  const stages = [
    { key: "application", label: "Applied", icon: FaCheckCircle },
    { key: "screening", label: "Screening", icon: FaUserCheck },
    { key: "interview", label: "Interview", icon: FaVideo },
    { key: "offer", label: "Offer", icon: FaStar },
    { key: "hired", label: "Hired", icon: FaCheckCircle },
  ];

  const statusConfig = {
    applied: { color: "bg-blue-500", label: "Applied", icon: FaClock },
    under_review: {
      color: "bg-yellow-500",
      label: "Under Review",
      icon: FaClock,
    },
    shortlisted: {
      color: "bg-green-500",
      label: "Shortlisted",
      icon: FaUserCheck,
    },
    interviewing: {
      color: "bg-purple-500",
      label: "Interviewing",
      icon: FaVideo,
    },
    selected: { color: "bg-green-600", label: "Selected", icon: FaCheckCircle },
    rejected: { color: "bg-red-500", label: "Rejected", icon: FaTimesCircle },
    withdrawn: {
      color: "bg-gray-500",
      label: "Withdrawn",
      icon: FaTimesCircle,
    },
  };

  const currentStatus = statusConfig[status] || statusConfig.applied;
  const currentStageIndex = stages.findIndex(
    (stage) => stage.key === currentStage
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <currentStatus.icon
            className={`text-${
              currentStatus.color.split("-")[1]
            }-500 mr-3 text-xl`}
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Application Status
            </h3>
            <p
              className={`text-${
                currentStatus.color.split("-")[1]
              }-600 font-medium`}
            >
              {currentStatus.label}
            </p>
          </div>
        </div>
        <p className="text-gray-600 text-sm">
          Your application is currently {currentStatus.label.toLowerCase()}.
          {status === "under_review" &&
            " The recruiter will review your application soon."}
          {status === "shortlisted" &&
            " Congratulations! Your application has been shortlisted."}
          {status === "interviewing" &&
            " You have been invited for an interview."}
        </p>
      </div>

      <div className="relative">
        {/* Progress bar */}
        <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
          <div
            className="h-1 bg-blue-500 transition-all duration-500"
            style={{ width: `${(currentStageIndex + 1) * 25}%` }}
          />
        </div>

        {/* Stages */}
        <div className="flex justify-between relative">
          {stages.map((stage, index) => {
            const isActive = index <= currentStageIndex;
            const isCurrent = stage.key === currentStage;

            return (
              <div key={stage.key} className="flex flex-col items-center">
                <div
                  className={`
                  w-10 h-10 rounded-full flex items-center justify-center mb-2
                  ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-400"
                  }
                  ${isCurrent ? "ring-4 ring-blue-100" : ""}
                  transition-all duration-300
                `}
                >
                  <stage.icon className="text-lg" />
                </div>
                <span
                  className={`
                  text-sm font-medium
                  ${isActive ? "text-blue-600" : "text-gray-500"}
                `}
                >
                  {stage.label}
                </span>
                {isCurrent && (
                  <span className="text-xs text-gray-500 mt-1">Current</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-8 border-t pt-6">
        <h4 className="text-lg font-semibold mb-4">Status History</h4>
        <div className="space-y-4">
          {/* This would be populated with actual status history from API */}
          <div className="flex items-start">
            <div className="bg-green-100 rounded-full p-2 mr-3">
              <FaCheckCircle className="text-green-600" />
            </div>
            <div>
              <p className="font-medium">Application submitted</p>
              <p className="text-sm text-gray-500">2 days ago</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-blue-100 rounded-full p-2 mr-3">
              <FaUserCheck className="text-blue-600" />
            </div>
            <div>
              <p className="font-medium">Under review</p>
              <p className="text-sm text-gray-500">1 day ago</p>
              <p className="text-sm text-gray-600 mt-1">
                Your application is being reviewed by the hiring team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationStatusTracker;
