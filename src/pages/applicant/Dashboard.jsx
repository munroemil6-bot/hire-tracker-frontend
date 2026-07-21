import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { useAuth } from '../../hooks/useAuth';
import Footer from '../../components/common/Footer';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState('Software Engineer');
    const [applications, setApplications] = useState([]);

    const roles = [
        { title: 'Software Engineer', dept: 'IT', salary: '$120k', description: 'Build modern web products and scale platform features.' },
        { title: 'HR Specialist', dept: 'HR', salary: '$75k', description: 'Support recruitment, onboarding, and employee engagement.' },
    ];

    useEffect(() => {
        const loadApplications = async () => {
            try {
                const response = await api.get('/applicants/');
                setApplications(Array.isArray(response.data) ? response.data : response.data?.results || []);
            } catch (error) {
                console.error('Failed to load applicant applications', error);
            }
        };

        loadApplications();
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
                    <div className="card border-0 shadow-sm p-4 bg-success text-white">
                        <div className="d-flex justify-content-between align-items-start gap-3">
                            <div>
                                <h2 className="fw-bold mb-2">Welcome, {user?.name || user?.username || 'Applicant'}</h2>
                                <p className="mb-0 opacity-75">Browse roles, apply online, and track your hiring progress from one place.</p>
                            </div>
                            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                </div>

                <div className="col-lg-7">
                    <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="card-title fw-bold mb-0">Choose where to apply</h5>
                                <Link to="/applicant/jobs" className="btn btn-outline-success btn-sm">View all jobs</Link>
                            </div>
                            <div className="d-grid gap-3">
                                {roles.map((role) => (
                                    <div key={role.title} className={`border rounded p-3 ${selectedRole === role.title ? 'border-success bg-light' : ''}`}>
                                        <div className="d-flex justify-content-between align-items-start">
                                            <div>
                                                <h6 className="fw-semibold mb-1">{role.title}</h6>
                                                <p className="text-muted mb-1">{role.description}</p>
                                                <small className="text-muted">{role.dept} • {role.salary}</small>
                                            </div>
                                            <button className="btn btn-success btn-sm" onClick={() => setSelectedRole(role.title)}>Select</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-5">
                    <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <h5 className="card-title fw-bold">Your applicant profile</h5>
                            <div className="mt-3">
                                <p className="mb-2"><strong>Username:</strong> {user?.username || 'applicant'}</p>
                                <p className="mb-2"><strong>Email:</strong> {user?.email || 'applicant@gmail.com'}</p>
                                <p className="mb-2"><strong>Selected role:</strong> {selectedRole}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="fw-bold mb-0">Application status</h5>
                                <Link to="/applicant/applications" className="btn btn-outline-success btn-sm">View all</Link>
                            </div>
                            {applications.length === 0 ? (
                                <p className="text-muted mb-0">No applications submitted yet.</p>
                            ) : (
                                <div className="d-grid gap-2">
                                    {applications.slice(0, 4).map((app) => (
                                        <div key={app.id} className="d-flex justify-content-between align-items-center border rounded p-2">
                                            <span className="fw-semibold">{app.job_title || 'Job application'}</span>
                                            <span className={`badge ${
                                                app.application_status === 'APPROVED' ? 'bg-success' :
                                                app.application_status === 'REJECTED' ? 'bg-danger' : 'bg-warning text-dark'
                                            }`}>{app.application_status || 'PENDING'}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <div className="row g-3">
                        <div className="col-md-6">
                            <div className="card shadow-sm h-100">
                                <div className="card-body">
                                    <h6 className="fw-bold">Application guidance</h6>
                                    <p className="text-muted small mb-3">Submit your application by clicking a job and following the application flow.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card shadow-sm h-100">
                                <div className="card-body">
                                    <h6 className="fw-bold">Browse jobs</h6>
                                    <p className="text-muted small mb-3">Explore all open positions and apply directly.</p>
                                    <Link to="/applicant/jobs" className="btn btn-outline-success btn-sm">View jobs</Link>
                                </div>
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