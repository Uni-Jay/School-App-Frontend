import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  GraduationCap,
  ShieldCheck,
  BookOpen,
  ClipboardList,
  CalendarCheck,
  FileText,
  FileSearch,
  DollarSign,
  CreditCard,
  Clock,
  Calendar,
  Megaphone,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path?: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { label: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/super_admin/dashboard" },
  { label: "Schools", icon: <Users size={20} />, path: "/super_admin/schools" },
  { label: "Parents", icon: <Users size={20} />, path: "/super_admin/parents" },
  { label: "Teachers", icon: <UserPlus size={20} />, path: "/super_admin/parents", },
  { label: "Students", icon: <GraduationCap size={20} />, path: "/super_admin/students" },
  { label: "Staff", icon: <Users size={20} />, path: "/super_admin/staff" },
  { label: "Admins", icon: <ShieldCheck size={20} />, path: "/super_admin/admins" },
  { label: "Roles", icon: <ShieldCheck size={20} />, path: "/super_admin/roles" },
  { label: "Subjects", icon: <BookOpen size={20} />, path: "/super_admin/subjects" },
  {
    label: "Classes",
    icon: <ClipboardList size={20} />,
    children: [
      { label: "Class", icon: <ClipboardList size={16} />, path: "/super_admin/classes" },
      { label: "Class Timetable", icon: <CalendarCheck size={16} />, path: "/super_admin/classes/timetable" },
      { label: "Class Teacher", icon: <UserPlus size={16} />, path: "/super_admin/classes/teacher" },
      { label: "Class Students", icon: <GraduationCap size={16} />, path: "/super_admin/classes/students" },
    ],
  },
  {
    label: "Exams",
    icon: <FileText size={20} />,
    children: [
      { label: "Exam Timetable", icon: <CalendarCheck size={16} />, path: "/super_admin/exams/timetable" },
      { label: "Exam Results", icon: <BarChart3 size={16} />, path: "/super_admin/exams/results" },
      { label: "Exam Questions", icon: <FileSearch size={16} />, path: "/super_admin/exams/questions" },
      { label: "Exam Grading", icon: <ClipboardList size={16} />, path: "/super_admin/exams/grading" },
    ],
  },
  {
    label: "Test",
    icon: <FileText size={20} />,
    children: [
      { label: "Test Timetable", icon: <CalendarCheck size={16} />, path: "/super_admin/tests/timetable" },
      { label: "Test Results", icon: <BarChart3 size={16} />, path: "/super_admin/tests/results" },
      { label: "Test Questions", icon: <FileSearch size={16} />, path: "/super_admin/tests/questions" },
      { label: "Test Grading", icon: <ClipboardList size={16} />, path: "/super_admin/tests/grading" },
    ],
  },
  {
    label: "Finances",
    icon: <DollarSign size={20} />,
    children: [
      { label: "School Fees", icon: <CreditCard size={16} />, path: "/super_admin/finances/school_fees" },
      { label: "Student Fees", icon: <CreditCard size={16} />, path: "/super_admin/finances/student_fees" },
      { label: "Staff Salary", icon: <DollarSign size={16} />, path: "/super_admin/finances/staff_salary" },
      { label: "Payments", icon: <CreditCard size={16} />, path: "/super_admin/finances/payments" },
    ],
  },
  { label: "Attendance", icon: <Clock size={20} />, path: "/super_admin/attendance" },
  { label: "Library", icon: <BookOpen size={20} />, path: "/super_admin/library" },
  { label: "Events", icon: <Calendar size={20} />, path: "/super_admin/events" },
  { label: "Notifications", icon: <Megaphone size={20} />, path: "/super_admin/notifications" },
  { label: "Announcement", icon: <Megaphone size={20} />, path: "/super_admin/announcement" },
  { label: "Reports", icon: <BarChart3 size={20} />, path: "/super_admin/reports" },
  { label: "Report Card", icon: <BarChart3 size={20} />, path: "/super_admin/report_card" },
  { label: "Settings", icon: <Settings size={20} />, path: "/super_admin/settings" },
  { label: "Logout", icon: <LogOut size={20} />, path: "/super_admin/logout" },
];

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleSidebar = () => setCollapsed(!collapsed);
  const toggleSubmenu = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label);
  };

  return (
    <div className={`bg-gray-800 text-white h-screen p-3 transition-all duration-300 ${collapsed ? "w-20" : "w-64"}`}>
        <div className="flex items-center justify-between mb-6">
            {!collapsed && <h1 className="text-lg font-bold">Super Admin</h1>}
            <button onClick={toggleSidebar} className="text-white">
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
            </button>
        </div>
        <ul>
            {navItems.map((item) => (
            <li key={item.label} className="mb-2">
                {item.path ? (
                <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                    `flex items-center gap-3 p-2 rounded hover:bg-gray-700 ${
                        isActive ? "bg-gray-700 font-semibold" : ""
                    }`
                    }
                >
                    {item.icon}
                    {!collapsed && <span>{item.label}</span>}
                </NavLink>
                ) : (
                <div
                    onClick={() => item.children && toggleSubmenu(item.label)}
                    className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 cursor-pointer"
                >
                    {item.icon}
                    {!collapsed && <span>{item.label}</span>}
                </div>
                )}
                {!collapsed && item.children && expandedItem === item.label && (
                <ul className="ml-6 mt-1">
                    {item.children.map((child) => (
                    <li key={child.label} className="mb-1">
                        <NavLink
                        to={child.path || "#"}
                        className={({ isActive }) =>
                            `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
                            isActive ? "bg-gray-700 font-semibold" : ""
                            }`
                        }
                        >
                        {child.icon}
                        <span>{child.label}</span>
                        </NavLink>
                    </li>
                    ))}
                </ul>
                )}
            </li>
            ))}
        </ul>
    </div>

  );
};

export default Sidebar;
