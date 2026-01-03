// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
// import { Provider } from "react-redux";
// import store from "./store";

// // Layout Components
// import MainLayout from "./layouts/MainLayout";
// import AuthLayout from "./layouts/AuthLayout";
// import AdminLayout from "./layouts/AdminLayout";

// // Auth Components
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import ForgotPassword from "./pages/auth/ForgotPassword";
// import ResetPassword from "./pages/auth/ResetPassword";

// // Main Pages
// import Home from "./pages/Home";
// import Jobs from "./pages/jobs/Jobs";
// import JobDetails from "./pages/jobs/JobDetails";
// import Companies from "./pages/Companies";

// // Dashboard Pages
// import Dashboard from "./pages/dashboard/Dashboard";
// import Profile from "./pages/dashboard/Profile";
// import Applications from "./pages/dashboard/Applications";
// import SavedJobs from "./pages/dashboard/SavedJobs";
// import JobAlerts from "./pages/dashboard/JobAlerts";

// // Recruiter Pages
// import PostJob from "./pages/recruiter/PostJob";
// import ManageJobs from "./pages/recruiter/ManageJobs";
// import JobApplications from "./pages/recruiter/JobApplications";
// import Candidates from "./pages/recruiter/Candidates";

// // Admin Pages
// import AdminDashboard from "./pages/admin/Dashboard";
// import ManageUsers from "./pages/admin/ManageUsers";
// import SiteSettings from "./pages/admin/SiteSettings";
// import Reports from "./pages/admin/Reports";

// // Protected Route
// import ProtectedRoute from "./components/ProtectedRoute";

// // Context
// import { AuthProvider } from "./context/AuthContext";
// import { SocketProvider } from "./context/SocketContext";

// function App() {
//   return (
//     <Provider store={store}>
//       <AuthProvider>
//         <SocketProvider>
//           <Router>
//             <Toaster
//               position="top-right"
//               toastOptions={{
//                 duration: 4000,
//                 style: {
//                   background: "#363636",
//                   color: "#fff",
//                 },
//                 success: {
//                   duration: 3000,
//                   theme: {
//                     primary: "green",
//                     secondary: "black",
//                   },
//                 },
//               }}
//             />
//             <Routes>
//               {/* Public Routes */}
//               <Route path="/" element={<MainLayout />}>
//                 <Route index element={<Home />} />
//                 <Route path="jobs" element={<Jobs />} />
//                 <Route path="jobs/:id" element={<JobDetails />} />
//                 <Route path="companies" element={<Companies />} />
//               </Route>

//               {/* Auth Routes */}
//               <Route path="/auth" element={<AuthLayout />}>
//                 <Route path="login" element={<Login />} />
//                 <Route path="register" element={<Register />} />
//                 <Route path="forgot-password" element={<ForgotPassword />} />
//                 <Route
//                   path="reset-password/:token"
//                   element={<ResetPassword />}
//                 />
//               </Route>

//               {/* Protected Dashboard Routes */}
//               <Route
//                 path="/dashboard"
//                 element={
//                   <ProtectedRoute>
//                     <MainLayout />
//                   </ProtectedRoute>
//                 }
//               >
//                 <Route index element={<Dashboard />} />
//                 <Route path="profile" element={<Profile />} />
//                 <Route path="applications" element={<Applications />} />
//                 <Route path="saved-jobs" element={<SavedJobs />} />
//                 <Route path="job-alerts" element={<JobAlerts />} />
//               </Route>

//               {/* Recruiter Routes */}
//               <Route
//                 path="/recruiter"
//                 element={
//                   <ProtectedRoute allowedRoles={["recruiter", "admin"]}>
//                     <MainLayout />
//                   </ProtectedRoute>
//                 }
//               >
//                 <Route path="post-job" element={<PostJob />} />
//                 <Route path="manage-jobs" element={<ManageJobs />} />
//                 <Route
//                   path="jobs/:id/applications"
//                   element={<JobApplications />}
//                 />
//                 <Route path="candidates" element={<Candidates />} />
//               </Route>

//               {/* Admin Routes */}
//               <Route
//                 path="/admin"
//                 element={
//                   <ProtectedRoute allowedRoles={["admin"]}>
//                     <AdminLayout />
//                   </ProtectedRoute>
//                 }
//               >
//                 <Route index element={<AdminDashboard />} />
//                 <Route path="users" element={<ManageUsers />} />
//                 <Route path="settings" element={<SiteSettings />} />
//                 <Route path="reports" element={<Reports />} />
//               </Route>

//               {/* Catch all route */}
//               <Route path="*" element={<Navigate to="/" replace />} />
//             </Routes>
//           </Router>
//         </SocketProvider>
//       </AuthProvider>
//     </Provider>
//   );
// }

// export default App;

import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoadingSpinner from "./components/common/Loading/LoadingSpinner";

// Lazy load layouts
const MainLayout = React.lazy(() =>
  import("./components/common/Layout/MainLayout")
);
const AuthLayout = React.lazy(() =>
  import("./components/common/Layout/AuthLayout")
);
const AdminLayout = React.lazy(() =>
  import("./components/common/Layout/AdminLayout")
);

// Lazy load pages
const Home = React.lazy(() => import("./Pages/Home/Home"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Jobs = React.lazy(() => import("./Pages/Jobs/Jobs"));
const JobDetails = React.lazy(() => import("./pages/jobs/JobDetails"));
const Dashboard = React.lazy(() => import("./Pages/Dashboard/Dashboard"));
const Profile = React.lazy(() => import("./pages/dashboard/Profile"));
const Applications = React.lazy(() => import("./pages/dashboard/Applications"));
const SavedJobs = React.lazy(() => import("./pages/dashboard/SavedJobs"));
const PostJob = React.lazy(() => import("./pages/recruiter/PostJob"));
const ManageJobs = React.lazy(() => import("./pages/recruiter/ManageJobs"));
const JobApplications = React.lazy(() =>
  import("./pages/recruiter/JobApplications")
);
const AdminDashboard = React.lazy(() => import("./pages/admin/AdminDashboard"));
const ManageUsers = React.lazy(() => import("./pages/admin/ManageUsers"));

// Private Route components
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";
import RecruiterRoute from "./routes/RecruiterRoute";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />

      <Suspense fallback={<LoadingSpinner fullScreen />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="jobs/:id" element={<JobDetails />} />
            <Route path="companies" element={<div>Companies Page</div>} />
          </Route>

          {/* Auth Routes */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route
              path="forgot-password"
              element={<div>Forgot Password</div>}
            />
            <Route path="reset-password" element={<div>Reset Password</div>} />
          </Route>

          {/* Candidate Dashboard */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute allowedRoles={["candidate"]}>
                <MainLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="applications" element={<Applications />} />
            <Route path="saved-jobs" element={<SavedJobs />} />
            <Route path="settings" element={<div>Settings</div>} />
          </Route>

          {/* Recruiter Dashboard */}
          <Route
            path="/recruiter"
            element={
              <RecruiterRoute>
                <MainLayout />
              </RecruiterRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="post-job" element={<PostJob />} />
            <Route path="manage-jobs" element={<ManageJobs />} />
            <Route path="applications/:jobId" element={<JobApplications />} />
            <Route path="candidates" element={<div>Candidates</div>} />
          </Route>

          {/* Admin Dashboard */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="jobs" element={<ManageJobs />} />
            <Route path="analytics" element={<div>Analytics</div>} />
            <Route path="settings" element={<div>Settings</div>} />
          </Route>

          {/* Error Routes */}
          <Route path="/404" element={<div>404 Not Found</div>} />
          <Route path="/401" element={<div>401 Unauthorized</div>} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
