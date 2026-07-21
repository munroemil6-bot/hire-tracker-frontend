import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import Footer from '../../components/common/Footer';

const Attendance = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

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
            const response = await api.post('/attendance/clock_in/');
            setMessage(response.data.clock_out ? 'Session already completed.' : 'Clocked in successfully.');
            await loadAttendance();
        } catch (error) {
            console.error('Failed to clock in', error);
            setMessage('Failed to clock in. Please try again.');
        }
    };

    const handleClockOut = async (id) => {
        try {
            const response = await api.post(`/attendance/${id}/clock_out/`);
            setMessage(response.data.clock_out ? 'Clocked out successfully.' : 'Session is still active.');
            await loadAttendance();
        } catch (error) {
            console.error('Failed to clock out', error);
            setMessage('Failed to clock out. Please try again.');
        }
    };

    return (
        <div className="min-vh-100 d-flex flex-column">
        <div className="container-fluid flex-grow-1">
            <div className="card shadow-sm p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h3 className="fw-bold mb-1">Attendance</h3>
                        <p className="text-muted mb-0">Keep your work hours up to date.</p>
                    </div>
                    <div className="d-flex gap-2">
                        <Link to="/dashboard" className="btn btn-outline-secondary btn-sm">← Back to dashboard</Link>
                        <button className="btn btn-primary" onClick={handleClockIn}>Clock in</button>
                    </div>
                </div>

                {message ? <div className="alert alert-info">{message}</div> : null}

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
        <Footer />
        </div>
    );
};

export default Attendance;
