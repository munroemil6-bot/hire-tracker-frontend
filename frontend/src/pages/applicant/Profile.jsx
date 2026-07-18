import React from 'react';

const Profile = () => {
    return (
        <div className="container-fluid">
        <div className="card shadow-sm p-4">
            <h3 className="fw-bold mb-3">Profile</h3>
            <div className="row g-3">
            <div className="col-md-6">
                <div className="border rounded p-3">
                <h5 className="fw-semibold">Contact details</h5>
                <p className="mb-1"><strong>Name:</strong> Jane Doe</p>
                <p className="mb-1"><strong>Email:</strong> jane@example.com</p>
                <p className="mb-0"><strong>Phone:</strong> +254 700 100 200</p>
                </div>
            </div>
            <div className="col-md-6">
                <div className="border rounded p-3">
                <h5 className="fw-semibold">Experience</h5>
                <p className="mb-1">Frontend developer with React and UI design experience.</p>
                <p className="mb-0">Interested in product and growth-focused teams.</p>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
    };

export default Profile;
