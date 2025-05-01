import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterForm: React.FC = () => {
  const navigate = useNavigate(); // 👈 useNavigate hook

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    dob: "",
    religion: "",
    gender: "",
    address: "",
    password: "",
    image: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === "avatar" && files) {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/auth/register`;

    const formPayload = new FormData();
    formPayload.append("full_name", formData.full_name);
    formPayload.append("email", formData.email);
    formPayload.append("phone_number", formData.phone_number);
    formPayload.append("dob", formData.dob);
    formPayload.append("religion", formData.religion);
    formPayload.append("gender", formData.gender);
    formPayload.append("address", formData.address);
    formPayload.append("password", formData.password);
    formPayload.append("role", "super_admin");

    if (formData.image) {
      formPayload.append("image", formData.image);
    }

    try {
      const res = await axios.post(apiUrl, formPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(res.data.message);

      // 👉 Navigate to login on success
      navigate("/login");
    } catch (error: any) {
      alert(error.response?.data?.error || "Registration failed.");
    }
  };

  return (
    <div className="py-16 px-4 bg-gray-100 min-h-screen flex items-center justify-center flex-col">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-4xl font-bold text-center mb-4">Welcome to the Registration Page</h1>
        <p className="text-lg text-gray-600">Please fill in the details below to register.</p>
      </div>

      <div className="flex rounded-xl overflow-hidden shadow-lg max-w-5xl w-full">
        {/* Left Side */}
        <div className="w-1/2 bg-black flex items-center justify-center p-6">
          <img
            src="/images/school.jpg"
            alt="School"
            className="rounded-lg shadow-md w-full h-auto object-cover"
          />
        </div>

        {/* Right Side */}
        <div className="w-1/2 bg-orange-500 flex items-center justify-center p-6">
          <div className="bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-xl w-full max-w-md text-white">
            <h2 className="text-2xl font-bold text-center mb-4">Register Super Admin</h2>

            <form onSubmit={handleSubmit}>
              {[ 
                { name: "full_name", type: "text", label: "Full Name" },
                { name: "email", type: "email", label: "Email" },
                { name: "phone_number", type: "text", label: "Phone Number" },
                { name: "dob", type: "date", label: "Date of Birth" },
                { name: "religion", type: "text", label: "Religion" },
                { name: "address", type: "text", label: "Address" },
                { name: "password", type: "password", label: "Password" },
              ].map((field) => (
                <div className="mb-3" key={field.name}>
                  <label className="block mb-1">{field.label}</label>
                  <input
                    className="w-full px-3 py-2 rounded bg-white/30 text-black placeholder-white focus:outline-none"
                    type={field.type}
                    name={field.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}

              <div className="mb-3">
                <label className="block mb-1">Gender</label>
                <select
                  name="gender"
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-white/30 text-black"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="mb-5">
                <label className="block mb-1">Avatar</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full text-black"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
