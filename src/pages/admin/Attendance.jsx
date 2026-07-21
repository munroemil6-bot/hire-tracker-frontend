import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

const Attendance = () => {
    const [attendance, setAttendance] = useState([]);

    useEffect(() => {
        const loadAttendance = async () => {
        try {
            const response = await api.get('/attendance/');
            setAttendance(response.data);
        } catch (error) {
            console.error('Failed to load attendance', error);
        }
        };

        loadAttendance();
    }, []);

    return (
        <div>
        <h3 className="fw-bold mb-3">Attendance</h3>
        <div className="row g-3">
            {attendance.map((record) => (
            <div className="col-md-6" key={record.id}>
                <div className="card shadow-sm">
                <div className="card-body">
                    <h5 className="card-title">{record.employee_name}</h5>
                    <p className="mb-1 text-muted">Clock in: {record.clock_in}</p>
                    <p className="mb-0 text-muted">Clock out: {record.clock_out || 'Still active'}</p>
                </div>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
    };

export default Attendance;
