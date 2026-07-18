import React from 'react';

const Attendance = () => {
    return (
        <div className="container-fluid">
        <div className="card shadow-sm p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
                <h3 className="fw-bold mb-1">Attendance</h3>
                <p className="text-muted mb-0">Keep your work hours up to date.</p>
            </div>
            <button className="btn btn-primary">Clock in</button>
            </div>

            <div className="table-responsive">
            <table className="table table-hover align-middle">
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Clock In</th>
                    <th>Clock Out</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>2026-07-17</td>
                    <td>09:00</td>
                    <td>17:00</td>
                    <td><span className="badge bg-success">Completed</span></td>
                </tr>
                <tr>
                    <td>2026-07-16</td>
                    <td>08:45</td>
                    <td>16:30</td>
                    <td><span className="badge bg-success">Completed</span></td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
        </div>
    );
    };

export default Attendance;
