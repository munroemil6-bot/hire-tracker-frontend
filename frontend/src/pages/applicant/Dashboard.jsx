import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

const Dashboard = () => {
    const { user } = useAuth();
    const [selectedRole, setSelectedRole] = useState('Software Engineer');

    const roles = [
        { title: 'Software Engineer', dept: 'IT', salary: '$120k', description: 'Build modern web products and scale platform features.' },
        { title: 'HR Specialist', dept: 'HR', salary: '$75k', description: 'Support recruitment, onboarding, and employee engagement.' },
    ];

    return (
        <div className="container-fluid">
        <div className="row g-4">
            <div className="col-12">
            <div className="card border-0 shadow-sm p-4 bg-success text-white">
                <h2 className="fw-bold mb-2">Welcome, {user?.name || user?.username || 'Applicant'}</h2>
                <p className="mb-0 opacity-75">Choose a role that fits your profile and apply from your personalized dashboard.</p>
            </div>
            </div>

            <div className="col-lg-7">
            <div className="card shadow-sm h-100">
                <div className="card-body">
                <h5 className="card-title fw-bold">Choose where to apply</h5>
                <div className="d-grid gap-3 mt-3">
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
                <h5 className="card-title fw-bold">Your profile</h5>
                <div className="mt-3">
                    <p className="mb-2"><strong>Username:</strong> {user?.username || 'applicant'}</p>
                    <p className="mb-2"><strong>Role:</strong> Applicant</p>
                    <p className="mb-2"><strong>Selected role:</strong> {selectedRole}</p>
                    <p className="mb-0"><strong>Status:</strong> <span className="badge bg-warning text-dark">Ready to apply</span></p>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
    };

export default Dashboard;