import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { Pencil, Trash2, Eye, Plus, Search } from "lucide-react";

interface Course {
  id: number;
  course_name: string;
  course_code: string;
  school_id: number;
  super_admin_id: number;
}

const CourseManager: React.FC = () => {
  const { token, user_id, school_id, role } = useAuth();
  const apiBase = import.meta.env.VITE_API_BASE_URL;

  const [courses, setCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newCourse, setNewCourse] = useState({ course_name: "", course_code: "" });
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [viewedCourse, setViewedCourse] = useState<Course | null>(null);

  useEffect(() => {
    fetchCourses();
    console.log("User Role:", role); // Debug log
  }, []);

  const fetchCourses = async () => {
    const res = await axios.get(`${apiBase}/course/all`);
    setCourses(res.data);
  };

  const handleAddCourse = async () => {
    const lowerRole = role?.toLowerCase();
    if (lowerRole !== "super_admin" && lowerRole !== "school_super_admin") {
      alert("Only school admins can add courses.");
      return;
    }

    const courseData = {
      ...newCourse,
      school_id,
      super_admin_id: user_id,
    };

    try {
      await axios.post(`${apiBase}/course/add`, courseData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowModal(false);
      setNewCourse({ course_name: "", course_code: "" });
      fetchCourses();
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to add course");
    }
  };

  const handleEdit = (course: Course) => {
    setSelectedCourse(course);
    setNewCourse({ course_name: course.course_name, course_code: course.course_code });
    setEditMode(true);
    setShowModal(true);
  };

  const handleUpdateCourse = async () => {
    try {
      await axios.put(`${apiBase}/course/edit/${selectedCourse?.id}`, newCourse, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowModal(false);
      setEditMode(false);
      setSelectedCourse(null);
      fetchCourses();
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to update course");
    }
  };

  const handleView = async (id: number) => {
    try {
      const res = await axios.get(`${apiBase}/course/${id}`);
      setViewedCourse(res.data);
    } catch (err: any) {
      alert("Could not fetch course details.");
    }
  };

  const handleDeactivate = async (id: number) => {
    alert(`Soft delete requested for course ID ${id}`);
  };

  const filteredCourses = courses.filter((c) =>
    c.course_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.course_code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lowerRole = role?.toLowerCase();
  const canAddCourse = lowerRole === "super_admin" || lowerRole === "school_super_admin";

  return (
    <div className="p-6">
      <div className="flex  justify-between mb-4 items-center">
        <h2 className="text-2xl font-bold">Course Management</h2>
        {/* <div className="text-sm text-gray-500 mb-2 ">Current role: {role}</div> */}
        {canAddCourse && (
          <button
            onClick={() => {
              setShowModal(true);
              setNewCourse({ course_name: "", course_code: "" });
              setEditMode(false);
              setViewedCourse(null);
            }}
            className="bg-orange-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-orange-600"
          >
            <Plus size={18} />
            Add Course
          </button>
        )}
      </div>

      <div className="flex items-center mb-4">
        <input
            type="text"
            placeholder="Search by course name or code..."
            className="border px-4 py-2 rounded"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
            onClick={() => fetchCourses()} // You can link this to actual search logic if needed
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
            <Search size={24} />
        </button>
      </div>


      <table className="w-full border rounded-lg overflow-hidden shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-4 py-2">Course Name</th>
            <th className="text-left px-4 py-2">Course Code</th>
            <th className="text-left px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.map((course) => (
            <tr key={course.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{course.course_name}</td>
              <td className="px-4 py-2">{course.course_code}</td>
              <td className="px-4 py-2 flex gap-3">
                <button onClick={() => handleEdit(course)} title="Edit">
                  <Pencil className="text-blue-600 hover:scale-110" />
                </button>
                <button onClick={() => handleDeactivate(course.id)} title="Delete">
                  <Trash2 className="text-red-600 hover:scale-110" />
                </button>
                <button onClick={() => handleView(course.id)} title="View">
                  <Eye className="text-green-600 hover:scale-110" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Modal */}
      {viewedCourse && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-xl font-bold mb-4">Course Details</h3>
            <p><strong>Name:</strong> {viewedCourse.course_name}</p>
            <p><strong>Code:</strong> {viewedCourse.course_code}</p>
            <p><strong>School ID:</strong> {viewedCourse.school_id}</p>
            <p><strong>Admin ID:</strong> {viewedCourse.super_admin_id}</p>
            <button
              className="mt-4 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              onClick={() => setViewedCourse(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-xl font-bold mb-4">{editMode ? "Edit Course" : "Add New Course"}</h3>
            <input
              type="text"
              placeholder="Course Name"
              value={newCourse.course_name}
              onChange={(e) => setNewCourse({ ...newCourse, course_name: e.target.value })}
              className="w-full mb-4 px-4 py-2 border rounded"
            />
            <input
              type="text"
              placeholder="Course Code"
              value={newCourse.course_code}
              onChange={(e) => setNewCourse({ ...newCourse, course_code: e.target.value })}
              className="w-full mb-4 px-4 py-2 border rounded"
            />
            <div className="flex justify-between">
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditMode(false);
                  setSelectedCourse(null);
                }}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={editMode ? handleUpdateCourse : handleAddCourse}
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
              >
                {editMode ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManager;
