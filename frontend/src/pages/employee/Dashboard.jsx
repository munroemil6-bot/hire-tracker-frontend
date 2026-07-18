import React from 'react';

const Dashboard = () => {
    return (
        <div className="container-fluid">
        <div className="row g-4">
            <div className="col-12">
            <div className="card border-0 shadow-sm p-4 bg-primary text-white">
                <h2 className="fw-bold mb-2">Welcome back</h2>
                <p className="mb-0 opacity-75">Track your attendance, accomplishments, and profile updates from one place.</p>
            </div>
            </div>

            <div className="col-md-6">
            <div className="card shadow-sm h-100">
                <div className="card-body">
                <h5 className="card-title fw-bold">Today’s status</h5>
                <p className="text-muted mb-3">You are currently on track for a productive day.</p>
                <div className="d-flex justify-content-between align-items-center">
                    <span className="badge bg-success">Active</span>
                    <span className="fw-semibold">Attendance synced</span>
                </div>
                </div>
            </div>
            </div>

            <div className="col-md-6">
            <div className="card shadow-sm h-100">
                <div className="card-body">
                <h5 className="card-title fw-bold">Recent highlights</h5>
                <ul className="mb-0 ps-3 text-muted">
                    <li>Completed weekly review</li>
                    <li>Submitted project update</li>
                    <li>Scheduled 1:1 meeting</li>
                </ul>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
    };

export default Dashboard;
