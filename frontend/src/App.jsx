import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import Departments from "./pages/admin/Departments";
import Jobs from "./pages/admin/Jobs";
import Employees from "./pages/admin/Employees";
import Applicants from "./pages/admin/Applicants";
import Attendance from "./pages/admin/Attendance";
import Notifications from "./pages/admin/Notifications";
import EmployeeDashboard from "./pages/employee/Dashboard";
import ApplicantDashboard from "./pages/applicant/Dashboard";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={<ProtectedRoute role="ADMIN"><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="departments" element={<Departments />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="employees" element={<Employees />} />
            <Route path="applicants" element={<Applicants />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="notifications" element={<Notifications />} />
        </Route>

        <Route path="/dashboard" element={<ProtectedRoute><EmployeeDashboard /></ProtectedRoute>} />
        <Route path="/applicant" element={<ProtectedRoute><ApplicantDashboard /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
        </Routes>
    );
    }

export default App;