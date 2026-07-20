import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

const formatSalary = (value) => {
    const amount = Number(value);
    if (!Number.isFinite(amount)) {
        return 'Competitive salary';
    }

    return new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KES',
        maximumFractionDigits: 0,
    }).format(amount);
};

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [message, setMessage] = useState('');
    const [busyId, setBusyId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadJobs = async () => {
            try {
                const response = await api.get('/jobs/');
                const jobList = Array.isArray(response.data) ? response.data : response.data?.results || [];
                setJobs(jobList.filter((job) => job && job.id));
            } catch (error) {
                console.error('Failed to load jobs', error);
            } finally {
                setLoading(false);
            }
        };

        loadJobs();
    }, []);

    const handleApply = async (job) => {
        try {
            setBusyId(job.id);
            const formData = new FormData();
            formData.append('job', job.id);
            formData.append('resume', new File(['resume placeholder'], 'resume.txt', { type: 'text/plain' }));
            formData.append('cover_letter', `Application for ${job.title}`);

            await api.post('/applicants/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMessage(`Application submitted for ${job.title}`);
        } catch (error) {
            console.error('Failed to submit application', error);
            setMessage('Application could not be submitted right now.');
        } finally {
            setBusyId(null);
        }
    };

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

                {message ? <div className="alert alert-success">{message}</div> : null}

                {loading ? <div className="text-muted">Loading jobs...</div> : null}

                <div className="row g-3">
                    {jobs.length === 0 ? (
                        <div className="col-12">
                            <div className="alert alert-info mb-0">No admin-created jobs are available right now. Please check back later.</div>
                        </div>
                    ) : jobs.map((job) => (
                        <div className="col-md-6" key={job.id || job.title}>
                            <div className="border rounded p-3 h-100">
                                <div className="d-flex justify-content-between align-items-start">
                                    <h5 className="fw-semibold">{job.title}</h5>
                                    <span className="badge bg-success">Admin posted</span>
                                </div>
                                <p className="text-muted mb-2">{job.description}</p>
                                <p className="small mb-2"><strong>Department:</strong> {job.department_name || job.department || 'General'}</p>
                                <p className="small mb-3"><strong>Salary:</strong> {formatSalary(job.salary)}</p>
                                <button className="btn btn-success btn-sm" onClick={() => handleApply(job)} disabled={busyId === job.id}>
                                    {busyId === job.id ? 'Submitting...' : 'Apply now'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Jobs;
