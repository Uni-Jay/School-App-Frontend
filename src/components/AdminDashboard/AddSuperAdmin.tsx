import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  dob: string;
  religion?: string;
  image?: string;
  gender?: string;
  role: string;
  address?: string;
  school_id?: number;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState<Partial<User & { password: string }>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const API = import.meta.env.VITE_API_BASE_URL;

  const fetchUsers = async () => {
    const res = await axios.get(`${API}/users`);
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        data.append(key, value.toString());
      }
    });
    if (imageFile) {
      data.append("image", imageFile);
    }

    if (editingUserId !== null) {
      await axios.put(`${API}/users/${editingUserId}`, formData);
    } else {
      await axios.post(`${API}/users`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    setFormData({});
    setImageFile(null);
    setPreviewUrl(null);
    setEditingUserId(null);
    setShowModal(false);
    fetchUsers();
  };

  const handleEdit = (user: User) => {
    setEditingUserId(user.id);
    setFormData(user);
    setPreviewUrl(user.image || null);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`${API}/users/${id}`);
    fetchUsers();
  };

  const handleReactivate = async (id: number) => {
    await axios.patch(`${API}/users/${id}/reactivate`);
    fetchUsers();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">User Management</h2>
        <button
          onClick={() => {
            setFormData({});
            setImageFile(null);
            setPreviewUrl(null);
            setEditingUserId(null);
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add User
        </button>
      </div>

      {/* Table */}
      <div className="overflow-auto rounded shadow">
        <table className="w-full text-left table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>School</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-2">{user.full_name}</td>
                <td>{user.email}</td>
                <td>{user.phone_number}</td>
                <td>{user.role}</td>
                <td>{user.school_id || "N/A"}</td>
                <td className="flex gap-2 py-2">
                  <button onClick={() => handleEdit(user)} className="text-blue-500">Edit</button>
                  <button onClick={() => handleDelete(user.id)} className="text-red-500">Deactivate</button>
                  <button onClick={() => handleReactivate(user.id)} className="text-green-500">Reactivate</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg w-96 p-6 shadow-lg relative">
            <h3 className="text-lg font-bold mb-4">
              {editingUserId ? "Edit User" : "Add User"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.full_name || ""}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email || ""}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2 border rounded"
                required={!editingUserId}
                disabled={!!editingUserId}
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={formData.phone_number || ""}
                onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="date"
                value={formData.dob || ""}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              {!editingUserId && (
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password || ""}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              )}
              <input
                type="text"
                placeholder="Role"
                value={formData.role || ""}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setImageFile(file);
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setPreviewUrl(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                  } else {
                    setPreviewUrl(null);
                  }
                }}
                className="w-full p-2 border rounded"
              />
              {previewUrl && (
                <div className="mb-2">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-full mx-auto"
                  />
                </div>
              )}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setPreviewUrl(null);
                    setImageFile(null);
                  }}
                  className="text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-1 rounded"
                >
                  {editingUserId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
