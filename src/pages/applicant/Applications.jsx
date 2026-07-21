import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

const Applications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadApplications = async () => {
            try {
                const response = await api.get('/applicants/');
                setApplications(Array.isArray(response.data) ? response.data : response.data?.results || []);
            } catch (error) {
                console.error('Failed to load applications', error);
            } finally {
                setLoading(false);
            }
        };

        loadApplications();
    }, []);

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

                {loading ? (
                    <div className="text-muted">Loading applications...</div>
                ) : applications.length === 0 ? (
                    <div className="alert alert-info">You have not submitted any applications yet.</div>
                ) : (
                    <div className="d-grid gap-3">
                        {applications.map((application) => (
                            <div className="border rounded p-3" key={application.id}>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <div>
                                        <h5 className="fw-semibold mb-1">{application.job_title}</h5>
                                        <p className="mb-0 text-muted">Submitted by: {application.user_name}</p>
                                    </div>
                                    <span className={`badge ${application.application_status === 'APPROVED' ? 'bg-success' : application.application_status === 'REJECTED' ? 'bg-danger' : 'bg-warning text-dark'}`}>
                                        {application.application_status || 'PENDING'}
                                    </span>
                                </div>
                                <p className="text-muted mb-1">Cover letter: {application.cover_letter?.slice(0, 150) || 'Not provided'}</p>
                                {application.interview_date ? (
                                    <p className="text-muted mb-0"><strong>Interview:</strong> {application.interview_date}</p>
                                ) : null}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Applications;
