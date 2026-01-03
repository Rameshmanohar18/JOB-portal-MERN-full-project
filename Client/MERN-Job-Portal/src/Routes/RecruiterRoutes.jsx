import React from "react";
import PrivateRoute from "./PrivateRoute";

const RecruiterRoute = ({ children }) => {
  return (
    <PrivateRoute allowedRoles={["recruiter", "admin"]}>
      {children}
    </PrivateRoute>
  );
};

export default RecruiterRoute;
