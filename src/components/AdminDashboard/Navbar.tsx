import React, { useState, useEffect } from "react";
import { Bell, Search, Moon, Sun } from "lucide-react";

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState<string[]>([]);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [darkMode, setDarkMode] = useState(false);

  // Notifications
  useEffect(() => {
    const interval = setInterval(() => {
      setNotifications((prev) => [...prev, `New alert ${prev.length + 1}`]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Load user data
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData") || "{}");
    setUser(storedUser);
  }, []);

  // Toggle dark mode class on root element
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    window.location.href = "/login"; // or use navigate() from react-router
  };

  return (
    <div className="shadow-md p-4 flex justify-between items-center w-full bg-orange-100 dark:bg-gray-800 dark:text-white">
      {/* Logo */}
      <div className="text-xl font-bold text-orange-600 dark:text-white">School Dashboard</div>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex items-center w-1/3">
        <input
          type="text"
          placeholder="Search dashboard..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 border rounded-l-md focus:outline-none dark:bg-gray-700 dark:text-white"
        />
        <button className="bg-orange-500 p-2 rounded-r-md text-white">
          <Search size={20} />
        </button>
      </form>

      {/* Right Icons */}
      <div className="flex items-center gap-4">
        {/* Dark/Light Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-orange-200 dark:hover:bg-gray-700"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <Bell className="text-gray-700 dark:text-white cursor-pointer" />
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1">
              {notifications.length}
            </span>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${user?.image || "default.png"}`}
            alt="User Avatar"
            className="w-10 h-10 rounded-full cursor-pointer border"
            onClick={() => setShowProfile(!showProfile)}
          />
          {showProfile && (
            <div className="absolute right-0 mt-2 bg-white dark:bg-gray-900 shadow-lg p-4 rounded-lg w-64 z-50 text-sm">
              <p className="font-bold">{user?.full_name}</p>
              <p className="text-gray-600 dark:text-gray-300">{user?.email}</p>
              <p className="text-gray-700 dark:text-gray-400">Role: <span className="font-medium">{user?.role}</span></p>
              <p className="text-gray-700 dark:text-gray-400">School ID: {user?.school_id}</p>
              <button
                onClick={handleLogout}
                className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
