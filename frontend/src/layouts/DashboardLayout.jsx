import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const DashboardLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const links = [
        { to: '/admin/dashboard', label: 'Overview' },
        { to: '/admin/departments', label: 'Departments' },
        { to: '/admin/jobs', label: 'Jobs' },
        { to: '/admin/employees', label: 'Employees' },
        { to: '/admin/applicants', label: 'Applicants' },
        { to: '/admin/attendance', label: 'Attendance' },
        { to: '/admin/notifications', label: 'Notifications' },
    ];

    return (
        <div className="min-vh-100 bg-light">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
            <span className="navbar-brand fw-bold">Hire Tracker</span>
            <div className="ms-auto d-flex align-items-center gap-3">
            <span className="text-white">{user?.name || user?.username || 'Admin'} {user?.email ? `(${user.email})` : '(admin@gmail.com)'}</span>
            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Logout</button>
            </div>
        </nav>

        <div className="container-fluid py-4">
            <div className="row g-4">
            <aside className="col-lg-3">
                <div className="card shadow-sm">
                <div className="card-body">
                    <h5 className="card-title">Admin menu</h5>
                    <div className="d-grid gap-2 mt-3">
                    {links.map((link) => (
                        <NavLink key={link.to} to={link.to} className={({ isActive }) => `btn btn-sm ${isActive ? 'btn-primary' : 'btn-outline-secondary'}`}>
                        {link.label}
                        </NavLink>
                    ))}
                    </div>
                </div>
                </div>
            </aside>

            <main className="col-lg-9">
                <Outlet />
            </main>
            </div>
        </div>
        </div>
    );
    };

export default DashboardLayout;
