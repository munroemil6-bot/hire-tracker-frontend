import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import Card from '../../components/common/Card';

const Dashboard = () => {
    const [stats, setStats] = useState({ departments: 0, jobs: 0, employees: 0, applicants: 0, pendingApplicants: 0, approvedApplicants: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStats = async () => {
            try {
                const [departmentsRes, jobsRes, employeesRes, applicantsRes] = await Promise.all([
                    api.get('/departments/'),
                    api.get('/jobs/'),
                    api.get('/employees/'),
                    api.get('/applicants/'),
                ]);

                const applicants = Array.isArray(applicantsRes.data) ? applicantsRes.data : [];
                setStats({
                    departments: departmentsRes.data?.length || 0,
                    jobs: jobsRes.data?.length || 0,
                    employees: employeesRes.data?.length || 0,
                    applicants: applicants.length,
                    pendingApplicants: applicants.filter((item) => item.application_status === 'PENDING').length,
                    approvedApplicants: applicants.filter((item) => item.application_status === 'APPROVED').length,
                });
            } catch (error) {
                console.error('Failed to load admin stats', error);
            } finally {
                setLoading(false);
            }
        };

        loadStats();
    }, []);

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold">Admin Dashboard</h2>
                    <p className="text-muted mb-0">Monitor hiring activity and team operations.</p>
                </div>
            </div>

            {loading ? (
                <div className="text-muted">Loading dashboard...</div>
            ) : (
                <div className="row g-3">
                    <div className="col-md-6 col-xl-3">
                        <Card title="Departments">
                            <div className="display-6 fw-bold">{stats.departments}</div>
                        </Card>
                    </div>
                    <div className="col-md-6 col-xl-3">
                        <Card title="Jobs">
                            <div className="display-6 fw-bold">{stats.jobs}</div>
                        </Card>
                    </div>
                    <div className="col-md-6 col-xl-3">
                        <Card title="Employees">
                            <div className="display-6 fw-bold">{stats.employees}</div>
                        </Card>
                    </div>
                    <div className="col-md-6 col-xl-3">
                        <Card title="Applicants">
                            <div className="display-6 fw-bold">{stats.applicants}</div>
                        </Card>
                    </div>
                    <div className="col-md-6 col-xl-3">
                        <Card title="Pending">
                            <div className="display-6 fw-bold">{stats.pendingApplicants}</div>
                        </Card>
                    </div>
                    <div className="col-md-6 col-xl-3">
                        <Card title="Approved">
                            <div className="display-6 fw-bold">{stats.approvedApplicants}</div>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
