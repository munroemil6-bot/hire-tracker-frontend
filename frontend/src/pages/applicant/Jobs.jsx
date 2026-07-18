import React from 'react';

const Jobs = () => {
    return (
        <div className="container-fluid">
        <div className="card shadow-sm p-4">
            <h3 className="fw-bold mb-3">Available roles</h3>
            <div className="row g-3">
            <div className="col-md-6">
                <div className="border rounded p-3 h-100">
                <h5 className="fw-semibold">Software Engineer</h5>
                <p className="text-muted mb-2">Build scalable applications for the product team.</p>
                <button className="btn btn-success btn-sm">Apply now</button>
                </div>
            </div>
            <div className="col-md-6">
                <div className="border rounded p-3 h-100">
                <h5 className="fw-semibold">HR Specialist</h5>
                <p className="text-muted mb-2">Support hiring and employee engagement initiatives.</p>
                <button className="btn btn-success btn-sm">Apply now</button>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
    };

export default Jobs;
