import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

const Attendance = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadAttendance = async () => {
        try {
            const response = await api.get('/attendance/');
            setRecords(response.data || []);
        } catch (error) {
            console.error('Failed to load attendance', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAttendance();
    }, []);

    const handleClockIn = async () => {
        try {
            await api.post('/attendance/clock_in/');
            await loadAttendance();
        } catch (error) {
            console.error('Failed to clock in', error);
        }
    };

    const handleClockOut = async (id) => {
        try {
            await api.post(`/attendance/${id}/clock_out/`);
            await loadAttendance();
        } catch (error) {
            console.error('Failed to clock out', error);
        }
    };

    return (
        <div className="container-fluid">
            <div className="card shadow-sm p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h3 className="fw-bold mb-1">Attendance</h3>
                        <p className="text-muted mb-0">Keep your work hours up to date.</p>
                    </div>
                    <button className="btn btn-primary" onClick={handleClockIn}>Clock in</button>
                </div>

                {loading ? <div className="text-muted">Loading attendance...</div> : (
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead>
                                <tr>
                                    <th>Clock In</th>
                                    <th>Clock Out</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {records.map((record) => (
                                    <tr key={record.id}>
                                        <td>{record.clock_in}</td>
                                        <td>{record.clock_out || '—'}</td>
                                        <td><span className={`badge ${record.clock_out ? 'bg-success' : 'bg-warning text-dark'}`}>{record.clock_out ? 'Completed' : 'Active'}</span></td>
                                        <td>
                                            {!record.clock_out ? <button className="btn btn-outline-secondary btn-sm" onClick={() => handleClockOut(record.id)}>Clock out</button> : <span className="text-muted">Done</span>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Attendance;
