import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="container-fluid">
            <div className="card shadow-sm p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h3 className="fw-bold mb-1">Profile</h3>
                        <p className="text-muted mb-0">Keep your details and documents up to date.</p>
                    </div>
                    <Link to="/applicant" className="btn btn-outline-secondary btn-sm">Back to dashboard</Link>
                </div>

                <div className="row g-3">
                    <div className="col-md-6">
                        <div className="border rounded p-3">
                            <h5 className="fw-semibold">Contact details</h5>
                            <p className="mb-1"><strong>Name:</strong> {user?.name || user?.username || 'Applicant'}</p>
                            <p className="mb-1"><strong>Email:</strong> {user?.email || 'applicant@gmail.com'}</p>
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
