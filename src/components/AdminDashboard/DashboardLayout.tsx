import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const DashboardLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <Navbar />
      {/* Sidebar component for navigation */}
      <Sidebar />
      <main className="flex-1 bg-gray-100 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
