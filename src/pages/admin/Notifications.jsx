import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

const KIND_OPTIONS = [
    { value: 'COMPANY_ANNOUNCEMENT', label: 'Company announcement' },
    { value: 'ATTENDANCE_REMINDER', label: 'Attendance reminder' },
    { value: 'NEW_JOB_POSTED', label: 'New job posted' },
    { value: 'APPLICATION_APPROVED', label: 'Application approved' },
    { value: 'APPLICATION_REJECTED', label: 'Application rejected' },
];

const kindLabel = (kind) => KIND_OPTIONS.find((o) => o.value === kind)?.label || 'General update';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [form, setForm] = useState({ message: '', kind: 'COMPANY_ANNOUNCEMENT', recipient: 'all', employee_id: '' });
    const [sending, setSending] = useState(false);
    const [error, setError] = useState('');

    const loadData = async () => {
        try {
            const [notifRes, empRes] = await Promise.all([api.get('/notifications/'), api.get('/employees/')]);
            setNotifications(notifRes.data || []);
            setEmployees(empRes.data || []);
        } catch (err) {
            console.error('Failed to load data', err);
        }
    };

    useEffect(() => { loadData(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.message.trim()) return;
        setSending(true);
        setError('');
        try {
            const payload = { message: form.message, kind: form.kind };
            if (form.recipient === 'specific' && form.employee_id) {
                payload.employee_id = form.employee_id;
            }
            await api.post('/notifications/', payload);
            setForm({ message: '', kind: 'COMPANY_ANNOUNCEMENT', recipient: 'all', employee_id: '' });
            loadData();
        } catch (err) {
            setError('Failed to send notification. Please try again.');
            console.error(err);
        } finally {
            setSending(false);
        }
    };

    return (
        <div>
            <h3 className="fw-bold mb-3">Notifications</h3>

            <form className="card p-3 mb-4 shadow-sm" onSubmit={handleSubmit}>
                <h6 className="fw-semibold mb-3">Post a notification</h6>
                {error && <div className="alert alert-danger py-2">{error}</div>}
                <div className="row g-3">
                    <div className="col-md-4">
                        <select className="form-select" value={form.kind} onChange={(e) => setForm({ ...form, kind: e.target.value })}>
                            {KIND_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <select className="form-select" value={form.recipient} onChange={(e) => setForm({ ...form, recipient: e.target.value, employee_id: '' })}>
                            <option value="all">All employees</option>
                            <option value="specific">Specific employee</option>
                        </select>
                    </div>
                    {form.recipient === 'specific' && (
                        <div className="col-md-4">
                            <select className="form-select" value={form.employee_id} onChange={(e) => setForm({ ...form, employee_id: e.target.value })} required>
                                <option value="">Select employee</option>
                                {employees.map((emp) => <option key={emp.id} value={emp.id}>{emp.user_name}</option>)}
                            </select>
                        </div>
                    )}
                    <div className="col-12">
                        <textarea className="form-control" rows={2} placeholder="Write your message..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
                    </div>
                    <div className="col-12">
                        <button className="btn btn-primary" type="submit" disabled={sending}>{sending ? 'Sending...' : 'Send notification'}</button>
                    </div>
                </div>
            </form>

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
                {!notifications.length && <p className="text-muted">No notifications yet.</p>}
            </div>
        </div>
    );
};

export default Notifications;
