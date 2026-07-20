import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { useAuth } from '../../hooks/useAuth';

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

    const latestStatus = applications[0]?.application_status || 'PENDING';

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="container-fluid">
            <div className="row g-4">
                <div className="col-12">
                    <div className="card border-0 shadow-sm p-4 bg-success text-white">
                        <div className="d-flex justify-content-between align-items-start gap-3">
                            <div>
                                <h2 className="fw-bold mb-2">Welcome, {user?.name || user?.username || 'Applicant'}</h2>
                                <p className="mb-0 opacity-75">Browse roles, apply online, upload your documents, and track your hiring progress from one place.</p>
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
                                <p className="mb-0"><strong>Status:</strong> <span className={`badge ${latestStatus === 'APPROVED' ? 'bg-success' : latestStatus === 'REJECTED' ? 'bg-danger' : 'bg-warning text-dark'}`}>{latestStatus}</span></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <div className="row g-3">
                        <div className="col-md-4">
                            <div className="card shadow-sm h-100">
                                <div className="card-body">
                                    <h6 className="fw-bold">Resume</h6>
                                    <p className="text-muted small mb-3">Upload your resume for faster applications.</p>
                                    <button className="btn btn-outline-success btn-sm">Upload resume</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card shadow-sm h-100">
                                <div className="card-body">
                                    <h6 className="fw-bold">Cover letter</h6>
                                    <p className="text-muted small mb-3">Share a tailored note for each opportunity.</p>
                                    <button className="btn btn-outline-success btn-sm">Upload cover letter</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card shadow-sm h-100">
                                <div className="card-body">
                                    <h6 className="fw-bold">Applications</h6>
                                    <p className="text-muted small mb-3">Track your status from review to interview.</p>
                                    <Link to="/applicant/applications" className="btn btn-outline-success btn-sm">View status</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;