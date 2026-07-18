import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

const Applicants = () => {
    const [applicants, setApplicants] = useState([]);

    useEffect(() => {
        const loadApplicants = async () => {
        try {
            const response = await api.get('/applicants/');
            setApplicants(response.data);
        } catch (error) {
            console.error('Failed to load applicants', error);
        }
        };

        loadApplicants();
    }, []);

    return (
        <div>
        <h3 className="fw-bold mb-3">Applicants</h3>
        <div className="row g-3">
            {applicants.map((applicant) => (
            <div className="col-md-6" key={applicant.id}>
                <div className="card shadow-sm">
                <div className="card-body">
                    <h5 className="card-title">{applicant.user_name}</h5>
                    <p className="mb-1 text-muted">Applied for: {applicant.job_title}</p>
                    <p className="mb-1 text-muted">Status: {applicant.application_status}</p>
                    <p className="mb-0 text-muted">Cover letter: {applicant.cover_letter?.slice(0, 90)}...</p>
                </div>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
    };

export default Applicants;
