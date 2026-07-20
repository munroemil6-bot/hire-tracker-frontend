import React from 'react';
import { Link } from 'react-router-dom';

const Jobs = () => {
    const jobs = [
        { title: 'Software Engineer', department: 'Engineering', type: 'Full-time', salary: '$120k', description: 'Build modern web products and scale platform features.' },
        { title: 'HR Specialist', department: 'People Operations', type: 'Full-time', salary: '$75k', description: 'Support recruitment, onboarding, and employee engagement.' },
        { title: 'Product Designer', department: 'Design', type: 'Contract', salary: '$95k', description: 'Shape intuitive experiences for our internal tools and customer workflows.' },
    ];

    return (
        <div className="container-fluid">
            <div className="card shadow-sm p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h3 className="fw-bold mb-1">Browse jobs</h3>
                        <p className="text-muted mb-0">Choose a role and begin your application.</p>
                    </div>
                    <Link to="/applicant" className="btn btn-outline-secondary btn-sm">Back to dashboard</Link>
                </div>

                <div className="row g-3">
                    {jobs.map((job) => (
                        <div className="col-md-6" key={job.title}>
                            <div className="border rounded p-3 h-100">
                                <div className="d-flex justify-content-between align-items-start">
                                    <h5 className="fw-semibold">{job.title}</h5>
                                    <span className="badge bg-success">{job.type}</span>
                                </div>
                                <p className="text-muted mb-2">{job.description}</p>
                                <p className="small mb-2"><strong>Department:</strong> {job.department}</p>
                                <p className="small mb-3"><strong>Salary:</strong> {job.salary}</p>
                                <button className="btn btn-success btn-sm">Apply now</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Jobs;
