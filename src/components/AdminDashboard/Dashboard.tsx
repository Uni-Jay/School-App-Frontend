import React from "react";
import Sidebar from "./Sidebar"; // Adjust path as needed
import Content from "./Content"; // Adjust path as needed

const Dashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 bg-gray-100 p-4">
        <Content />
      </main>
    </div>
  );
};

export default Dashboard;
