import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { useAuth } from '../../hooks/useAuth';
import Footer from '../../components/common/Footer';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [attendance, setAttendance] = useState([]);
    const [accomplishments, setAccomplishments] = useState([]);
    const [notifications, setNotifications] = useState([]);

    const loadData = async () => {
        try {
            const [attendanceRes, accomplishmentsRes, notificationsRes] = await Promise.all([
                api.get('/attendance/'),
                api.get('/accomplishments/'),
                api.get('/notifications/'),
            ]);
            setAttendance(attendanceRes.data || []);
            setAccomplishments(accomplishmentsRes.data || []);
            setNotifications(notificationsRes.data || []);
        } catch (error) {
            console.error('Failed to load employee dashboard data', error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-vh-100 d-flex flex-column">
        <div className="container-fluid flex-grow-1">
            <div className="row g-4">
                <div className="col-12">
                    <div className="card border-0 shadow-sm p-4 bg-primary text-white">
                        <div className="d-flex justify-content-between align-items-start gap-3">
                            <div>
                                <h2 className="fw-bold mb-2">Welcome back, {user?.name || user?.username || 'Employee'}</h2>
                                <p className="mb-0 opacity-75">Track your attendance, accomplishments, and updates from one place.</p>
                            </div>
                            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="card-title fw-bold mb-0">Today’s status</h5>
                                <Link to="/dashboard/attendance" className="btn btn-outline-primary btn-sm">View attendance</Link>
                            </div>
                            <p className="text-muted mb-3">Your latest attendance records are synced below.</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <span className="badge bg-success">Active</span>
                                <span className="fw-semibold">{attendance.length} record(s)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <h5 className="card-title fw-bold">Recent highlights</h5>
                            <ul className="mb-0 ps-3 text-muted">
                                {accomplishments.slice(0, 3).map((item) => (
                                    <li key={item.id}>{item.title}</li>
                                ))}
                                {!accomplishments.length && <li>No accomplishments submitted yet.</li>}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title fw-bold">Notifications</h5>
                            <div className="d-grid gap-2 mt-3">
                                {notifications.length ? notifications.slice(0, 4).map((item) => (
                                    <div key={item.id} className="border rounded p-2 text-muted">{item.message}</div>
                                )) : <div className="text-muted">No notifications yet.</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </div>
    );
};

export default Dashboard;
