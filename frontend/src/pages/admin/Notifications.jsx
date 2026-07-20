import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

const kindLabel = (kind) => {
    switch (kind) {
        case 'APPLICATION_APPROVED': return 'Application approved';
        case 'APPLICATION_REJECTED': return 'Application rejected';
        case 'NEW_JOB_POSTED': return 'New job posted';
        case 'ATTENDANCE_REMINDER': return 'Attendance reminder';
        case 'COMPANY_ANNOUNCEMENT': return 'Company announcement';
        default: return 'General update';
    }
};

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const loadNotifications = async () => {
            try {
                const response = await api.get('/notifications/');
                setNotifications(response.data || []);
            } catch (error) {
                console.error('Failed to load notifications', error);
            }
        };

        loadNotifications();
    }, []);

    return (
        <div>
            <h3 className="fw-bold mb-3">Notifications</h3>
            <div className="d-grid gap-3">
                {notifications.map((item) => (
                    <div className="card shadow-sm" key={item.id}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <h5 className="card-title mb-1">{item.user_name}</h5>
                                    <p className="mb-0 text-muted">{item.message}</p>
                                </div>
                                <span className="badge bg-info text-dark">{kindLabel(item.kind)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notifications;
