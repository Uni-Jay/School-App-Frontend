import React from "react";
import GenderPieChart from "./GenderPieChart";
// import { Outlet } from "react-router-dom";

const Dashboard: React.FC = () => {
  return (
    <div>
      <text className="text-2xl font-bold">Admin Dashboard</text>
        <div className="mt-4 p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold">Welcome to the Admin Dashboard</h2>
            <p className="mt-2 text-gray-600">Here you can manage your application.</p>
        </div>
        <div className="mt-4 p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold">Statistics</h2>
            <GenderPieChart />
        </div>
        <div className="mt-4 p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold">Recent Activities</h2>
            <p className="mt-2 text-gray-600">Check the recent activities of your application.</p>
        </div>
        <div className="mt-4 p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold">Settings</h2>
            <p className="mt-2 text-gray-600">Manage your application settings here.</p>
        </div>
    </div>
  );
};

export default Dashboard;
