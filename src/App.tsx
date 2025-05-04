// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/Context/AuthContext";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import ProtectedRoute from "./components/ProtectedRoute";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import Dashboard from "./components/AdminDashboard/Dashboard";
import CourseManager from "./components/AdminDashboard/AdminCourse";
import UserManagement from "./components/AdminDashboard/AddSuperAdmin";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/super_admin/*"
          element={
            <AuthProvider>
              <ProtectedRoute allowedRole="super_admin">
                <SuperAdminDashboard />
              </ProtectedRoute>
            </AuthProvider>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="courses" element={<CourseManager/>} />
          <Route path="admins" element={<UserManagement/>} />
        </Route>

        {/* Add other role-based routes (student, teacher, etc.) below here */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
