import React, { useState } from "react";
import axios from "axios";

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/auth/login`;

    try {
      const res = await axios.post(apiUrl, formData);
      const { access_token } = res.data;

      const payload = JSON.parse(atob(access_token.split('.')[1]));
      const identity = JSON.parse(payload.sub);

      localStorage.setItem("token", access_token);
      localStorage.setItem("user_model_id", identity.user_id);
      localStorage.setItem("school_id", identity.school_id || "");
      localStorage.setItem("role_name", identity.role);

      alert("Login successful!");
      // Optionally navigate to dashboard
        // navigate("/dashboard"); // Uncomment if you have a dashboard route
    } catch (err: any) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-orange-400 to-yellow-300 justify-center items-center px-4">
      <div className="bg-white shadow-2xl rounded-xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1 text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
