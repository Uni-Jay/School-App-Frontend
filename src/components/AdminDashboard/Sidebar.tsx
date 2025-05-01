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
  ChevronRight
} from "lucide-react";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { label: "Dashboard", icon: <LayoutDashboard size={20} /> },
  { label: "Parents", icon: <Users size={20} /> },
  { label: "Teachers", icon: <UserPlus size={20} /> },
  { label: "Students", icon: <GraduationCap size={20} /> },
  { label: "Admins", icon: <ShieldCheck size={20} /> },
  { label: "Subjects", icon: <BookOpen size={20} /> },
  {
    label: "Classes",
    icon: <ClipboardList size={20} />,
    children: [
      { label: "Class", icon: <ClipboardList size={16} /> },
      { label: "Class Timetable", icon: <CalendarCheck size={16} /> },
      { label: "Class Teacher", icon: <UserPlus size={16} /> },
    ],
  },
  {
    label: "Exams",
    icon: <FileText size={20} />,
    children: [
      { label: "Exam Timetable", icon: <CalendarCheck size={16} /> },
      { label: "Exam Questions", icon: <FileSearch size={16} /> },
    ],
  },
  {
    label: "Test",
    icon: <FileText size={20} />,
    children: [
      { label: "Test Timetable", icon: <CalendarCheck size={16} /> },
      { label: "Test Questions", icon: <FileSearch size={16} /> },
    ],
  },
  {
    label: "Finances",
    icon: <DollarSign size={20} />,
    children: [
      { label: "School Fees", icon: <CreditCard size={16} /> },
      { label: "Staff Salary", icon: <DollarSign size={16} /> },
    ],
  },
  { label: "Attendance", icon: <Clock size={20} /> },
  { label: "Events", icon: <Calendar size={20} /> },
  { label: "Announcement", icon: <Megaphone size={20} /> },
  { label: "Report Card", icon: <BarChart3 size={20} /> },
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
            <div
              onClick={() => item.children && toggleSubmenu(item.label)}
              className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 cursor-pointer"
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </div>
            {!collapsed && item.children && expandedItem === item.label && (
              <ul className="ml-6 mt-1">
                {item.children.map((child) => (
                  <li key={child.label} className="flex items-center gap-2 p-2 rounded hover:bg-gray-700 cursor-pointer">
                    {child.icon} <span>{child.label}</span>
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
