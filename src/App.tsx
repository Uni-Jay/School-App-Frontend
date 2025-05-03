import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import ProtectedRoute from "./components/ProtectedRoute";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import Dashboard from "./components/AdminDashboard/Dashboard";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
         {/* Super Admin Protected Route */}
        <Route element={<ProtectedRoute allowedRole="super_admin" />}>
            <Route path="/super_admin" element={<SuperAdminDashboard />}>
            <Route index element={<Dashboard />} />
              {/* <Route path="schools" element={<Schools />} />
              <Route path="parents" element={<Parents />} />
              <Route path="teachers" element={<Teachers />} />
              <Route path="students" element={<Students />} />
              <Route path="staff" element={<Staff />} />
              <Route path="admins" element={<Admins />} />
              <Route path="roles" element={<Roles />} />
              <Route path="subjects" element={<Subjects />} /> */}

              {/* Classes */}
              {/* <Route path="classes" element={<ClassList />} />
              <Route path="classes/timetable" element={<ClassTimetable />} />
              <Route path="classes/teacher" element={<ClassTeacher />} />
              <Route path="classes/students" element={<ClassStudents />} /> */}

              {/* Exams */}
              {/* <Route path="exams/timetable" element={<ExamTimetable />} />
              <Route path="exams/results" element={<ExamResults />} />
              <Route path="exams/questions" element={<ExamQuestions />} />
              <Route path="exams/grading" element={<ExamGrading />} /> */}

              {/* Tests */}
              {/* <Route path="tests/timetable" element={<TestTimetable />} />
              <Route path="tests/results" element={<TestResults />} />
              <Route path="tests/questions" element={<TestQuestions />} />
              <Route path="tests/grading" element={<TestGrading />} /> */}

              {/* Finances */}
              {/* <Route path="finances/school_fees" element={<SchoolFees />} />
              <Route path="finances/student_fees" element={<StudentFees />} />
              <Route path="finances/staff_salary" element={<StaffSalary />} />
              <Route path="finances/payments" element={<Payments />} /> */}

              {/* Misc */}
              {/* <Route path="attendance" element={<Attendance />} />
              <Route path="library" element={<Library />} />
              <Route path="events" element={<Events />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="announcement" element={<Announcement />} />
              <Route path="reports" element={<Reports />} />
              <Route path="report_card" element={<ReportCard />} />
              <Route path="settings" element={<Settings />} />
              <Route path="logout" element={<Logout />} />
            */}
            </Route>
        </Route>

        {/* Student */}
        <Route element={<ProtectedRoute allowedRole="student" />}>
          {/* <Route path="/student/dashboard/*" element={<StudentDashboard />} /> */}
        </Route>

        {/* Teacher */}
        <Route element={<ProtectedRoute allowedRole="teacher" />}>
          {/* <Route path="/teacher/dashboard/*" element={<TeacherDashboard />} /> */}
        </Route>

        {/* School Admin */}
        <Route element={<ProtectedRoute allowedRole="school_admin" />}>
          {/* <Route path="/school_admin/dashboard/*" element={<SchoolAdminDashboard />} /> */}
        </Route>

        {/* Parent */}
        <Route element={<ProtectedRoute allowedRole="parent" />}>
          {/* <Route path="/parent/dashboard/*" element={<ParentDashboard />} /> */}
        </Route>
        {/* Add other routes here */}
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
