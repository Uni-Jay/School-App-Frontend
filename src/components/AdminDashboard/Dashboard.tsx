import React, { useEffect, useState } from "react";
import GenderPieChart from "./GenderPieChart";
import EventCalendar from "./EventCalendar";

interface DashboardProps {
  userName: string;
}

const Dashboard: React.FC<DashboardProps> = ({ userName }) => {
  const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer); // cleanup
  }, []);

  return (
    <div className="bg-gray-100 p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">SuperAdmin Dashboard</h1>
        <div className="text-right">
          <p className="text-lg font-medium">Welcome, {userName}</p>
          <p className="text-sm text-gray-600">Time: {currentTime}</p>
        </div>
      </div>

      <div className="p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold">Welcome to the Admin Dashboard</h2>
        <p className="mt-2 text-gray-600">Here you can manage your application.</p>
      </div>

      <div className="mt-4 p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold">Statistics</h2>
        <GenderPieChart />
      </div>

      <div className="mt-4 p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold">Recent Activities</h2>
        <EventCalendar />
      </div>

      <div className="mt-4 p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold">Settings</h2>
        <p className="mt-2 text-gray-600">Manage your application settings here.</p>
      </div>
    </div>
  );
};

export default Dashboard;
