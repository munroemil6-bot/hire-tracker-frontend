import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const loadNotifications = async () => {
        try {
            const response = await api.get('/notifications/');
            setNotifications(response.data);
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
                <h5 className="card-title">{item.user_name}</h5>
                <p className="mb-0 text-muted">{item.message}</p>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
    };

export default Notifications;
