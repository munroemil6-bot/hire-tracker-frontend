import React from 'react';

const Accomplishments = () => {
    return (
        <div className="container-fluid">
        <div className="card shadow-sm p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
                <h3 className="fw-bold mb-1">Accomplishments</h3>
                <p className="text-muted mb-0">Highlight your recent milestones and achievements.</p>
            </div>
            <button className="btn btn-outline-primary">Add entry</button>
            </div>

            <div className="row g-3">
            <div className="col-md-6">
                <div className="border rounded p-3 h-100">
                <h5 className="fw-semibold">Launch of new onboarding flow</h5>
                <p className="text-muted mb-0">Delivered a smoother employee onboarding experience with clear guidance and automation.</p>
                </div>
            </div>
            <div className="col-md-6">
                <div className="border rounded p-3 h-100">
                <h5 className="fw-semibold">Improved team reporting</h5>
                <p className="text-muted mb-0">Helped improve weekly reporting accuracy across three departments.</p>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
    };

export default Accomplishments;
