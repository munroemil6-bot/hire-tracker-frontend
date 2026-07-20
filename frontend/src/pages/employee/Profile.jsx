import React from 'react';

const Profile = () => {
    return (
        <div className="container-fluid">
        <div className="card shadow-sm p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h3 className="fw-bold mb-1">Profile</h3>
                <p className="text-muted mb-0">Review your personal and professional details.</p>
            </div>
            <button className="btn btn-outline-secondary">Edit profile</button>
            </div>

            <div className="row g-4">
            <div className="col-md-6">
                <div className="border rounded p-3">
                <h5 className="fw-semibold">Personal details</h5>
                <p className="mb-1"><strong>Name:</strong> Sarah Kim</p>
                <p className="mb-1"><strong>Email:</strong> sarah@gmail.com</p>
                <p className="mb-0"><strong>Phone:</strong> +254 700 000 001</p>
                </div>
            </div>
            <div className="col-md-6">
                <div className="border rounded p-3">
                <h5 className="fw-semibold">Work details</h5>
                <p className="mb-1"><strong>Department:</strong> IT</p>
                <p className="mb-1"><strong>Employee No:</strong> EMP-1001</p>
                <p className="mb-0"><strong>Hire Date:</strong> 2024-01-10</p>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
    };

export default Profile;
