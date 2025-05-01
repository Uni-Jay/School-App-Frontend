import React, { useState, useEffect } from "react";
import { Bell, Search } from "lucide-react";
// import axios from "axios";

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState<string[]>([]);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Simulated notifications from backend
    const interval = setInterval(() => {
      setNotifications((prev) => [...prev, `New alert ${prev.length + 1}`]);
    }, 10000); // every 10s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Load user from localStorage or API
    const storedUser = JSON.parse(localStorage.getItem("userData") || "{}");
    setUser(storedUser);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center w-full">
      {/* Logo */}
      <div className="text-xl font-bold text-orange-600">School Dashboard</div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex items-center w-1/3">
        <input
          type="text"
          placeholder="Search dashboard..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 border rounded-l-md focus:outline-none"
        />
        <button className="bg-orange-500 p-2 rounded-r-md text-white">
          <Search size={20} />
        </button>
      </form>

      {/* Icons */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <Bell className="text-gray-600 cursor-pointer" />
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1">
              {notifications.length}
            </span>
          )}
        </div>

        {/* Profile Image */}
        <div className="relative">
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${user?.image || "default.png"}`}
            alt="User Avatar"
            className="w-10 h-10 rounded-full cursor-pointer border"
            onClick={() => setShowProfile(!showProfile)}
          />
          {showProfile && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg p-4 rounded-lg w-64 z-50">
              <p className="font-bold">{user?.full_name}</p>
              <p className="text-sm text-gray-600">{user?.email}</p>
              <p className="text-sm">Role: {user?.role}</p>
              <p className="text-sm">School ID: {user?.school_id}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
