import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

const Applicants = () => {
    const [applicants, setApplicants] = useState([]);
    const [busyId, setBusyId] = useState(null);

    const loadApplicants = async () => {
        try {
            const response = await api.get('/applicants/');
            setApplicants(response.data);
        } catch (error) {
            console.error('Failed to load applicants', error);
        }
    };

    useEffect(() => {
        loadApplicants();
    }, []);

    const handleAction = async (id, action) => {
        try {
            setBusyId(id);
            if (action === 'remove') {
                await api.delete(`/applicants/${id}/remove/`);
            } else {
                await api.post(`/applicants/${id}/${action}/`);
            }
            await loadApplicants();
        } catch (error) {
            console.error(`${action} failed`, error);
        } finally {
            setBusyId(null);
        }
    };

    return (
        <div>
            <h3 className="fw-bold mb-3">Applicants</h3>
            <div className="row g-3">
                {applicants.map((applicant) => (
                    <div className="col-md-6" key={applicant.id}>
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <h5 className="card-title mb-1">{applicant.user_name}</h5>
                                        <p className="mb-1 text-muted">Applied for: {applicant.job_title}</p>
                                    </div>
                                    <span className={`badge ${applicant.application_status === 'APPROVED' ? 'bg-success' : applicant.application_status === 'REJECTED' ? 'bg-danger' : 'bg-warning text-dark'}`}>
                                        {applicant.application_status || 'PENDING'}
                                    </span>
                                </div>
                                <p className="mb-2 text-muted small">Cover letter: {applicant.cover_letter?.slice(0, 90) || 'Not provided'}...</p>
                                <div className="d-flex gap-2 mt-3 flex-wrap">
                                    {applicant.application_status !== 'APPROVED' && (
                                        <button className="btn btn-success btn-sm" onClick={() => handleAction(applicant.id, 'approve')} disabled={busyId === applicant.id}>
                                            {busyId === applicant.id ? 'Processing...' : 'Approve'}
                                        </button>
                                    )}
                                    {applicant.application_status !== 'REJECTED' && (
                                        <button className="btn btn-warning btn-sm" onClick={() => handleAction(applicant.id, 'decline')} disabled={busyId === applicant.id}>
                                            {busyId === applicant.id ? 'Processing...' : 'Reject'}
                                        </button>
                                    )}
                                    <button className="btn btn-outline-danger btn-sm" onClick={() => handleAction(applicant.id, 'remove')} disabled={busyId === applicant.id}>
                                        {busyId === applicant.id ? 'Removing...' : 'Remove'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Applicants;
