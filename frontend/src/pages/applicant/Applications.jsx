import React from 'react';

const Applications = () => {
    return (
        <div className="container-fluid">
        <div className="card shadow-sm p-4">
            <h3 className="fw-bold mb-3">My applications</h3>
            <div className="d-grid gap-3">
            <div className="border rounded p-3">
                <div className="d-flex justify-content-between align-items-center">
                <h5 className="fw-semibold mb-0">Software Engineer</h5>
                <span className="badge bg-warning text-dark">Pending</span>
                </div>
                <p className="text-muted mt-2 mb-0">Submitted on 2026-07-10</p>
            </div>
            <div className="border rounded p-3">
                <div className="d-flex justify-content-between align-items-center">
                <h5 className="fw-semibold mb-0">HR Specialist</h5>
                <span className="badge bg-success">Approved</span>
                </div>
                <p className="text-muted mt-2 mb-0">Submitted on 2026-06-22</p>
            </div>
            </div>
        </div>
        </div>
    );
    };

export default Applications;
