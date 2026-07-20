import React from 'react';
import { Link } from 'react-router-dom';

const Applications = () => {
    const applications = [
        { title: 'Software Engineer', status: 'Pending review', date: '2026-07-10', badge: 'warning' },
        { title: 'HR Specialist', status: 'Interview scheduled', date: '2026-06-22', badge: 'info' },
    ];

    return (
        <div className="container-fluid">
            <div className="card shadow-sm p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h3 className="fw-bold mb-1">My applications</h3>
                        <p className="text-muted mb-0">Track the progress of every application you submit.</p>
                    </div>
                    <Link to="/applicant" className="btn btn-outline-secondary btn-sm">Back to dashboard</Link>
                </div>

                <div className="d-grid gap-3">
                    {applications.map((application) => (
                        <div className="border rounded p-3" key={application.title}>
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="fw-semibold mb-0">{application.title}</h5>
                                <span className={`badge bg-${application.badge} text-dark`}>{application.status}</span>
                            </div>
                            <p className="text-muted mt-2 mb-0">Submitted on {application.date}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Applications;
