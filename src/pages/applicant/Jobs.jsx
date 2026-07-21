import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import Footer from '../../components/common/Footer';

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
            const payload = {
                job: job.id,
                cover_letter: `I am applying for ${job.title}`,
            };

            const res = await api.post('/applicants/', payload);
            if (res && (res.status === 201 || res.status === 200)) {
                setMessage(`Application sent for ${job.title}`);
            } else {
                setMessage('Application submitted.');
            }
        } catch (error) {
            console.error('Failed to submit application', error);
            if (error.response) {
                if (error.response.status === 401) {
                    setMessage('You must be signed in to apply.');
                } else if (error.response.status === 403) {
                    setMessage(error.response.data.detail || 'You are not allowed to apply for this job.');
                } else if (error.response.data && error.response.data.detail) {
                    setMessage(error.response.data.detail);
                } else {
                    setMessage('Application could not be submitted right now.');
                }
            } else {
                setMessage('Application could not be submitted right now.');
            }
        } finally {
            setBusyId(null);
        }
    };

    return (
        <div className="min-vh-100 d-flex flex-column">
        <div className="container-fluid flex-grow-1">
            <div className="card shadow-sm p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h3 className="fw-bold mb-1">Browse jobs</h3>
                        <p className="text-muted mb-0">Choose a role and begin your application.</p>
                    </div>
                    <Link to="/applicant" className="btn btn-outline-secondary btn-sm">← Back to dashboard</Link>
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
        <Footer />
        </div>
    );
};

export default Jobs;
