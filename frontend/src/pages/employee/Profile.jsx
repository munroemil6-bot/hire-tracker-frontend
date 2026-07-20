import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { useAuth } from '../../hooks/useAuth';

const Profile = () => {
    const { user } = useAuth();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const response = await api.get('/employees/');
                const current = response.data?.[0] || null;
                setEmployee(current);
            } catch (error) {
                console.error('Failed to load employee profile', error);
            }
        };

        loadProfile();
    }, []);

    return (
        <div className="container-fluid">
            <div className="card shadow-sm p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h3 className="fw-bold mb-1">Profile</h3>
                        <p className="text-muted mb-0">Review your personal and professional details.</p>
                    </div>
                </div>

                <div className="row g-4">
                    <div className="col-md-6">
                        <div className="border rounded p-3">
                            <h5 className="fw-semibold">Personal details</h5>
                            <p className="mb-1"><strong>Name:</strong> {user?.name || user?.username || 'Employee'}</p>
                            <p className="mb-1"><strong>Email:</strong> {user?.email || 'employee@example.com'}</p>
                            <p className="mb-0"><strong>Phone:</strong> {employee?.phone || 'Not provided'}</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="border rounded p-3">
                            <h5 className="fw-semibold">Work details</h5>
                            <p className="mb-1"><strong>Department:</strong> {employee?.department_name || 'Unassigned'}</p>
                            <p className="mb-1"><strong>Employee No:</strong> {employee?.employee_number || '—'}</p>
                            <p className="mb-0"><strong>Hire Date:</strong> {employee?.hire_date || '—'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
