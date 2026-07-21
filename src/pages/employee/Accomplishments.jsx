import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import Footer from '../../components/common/Footer';

const Accomplishments = () => {
    const [entries, setEntries] = useState([]);
    const [form, setForm] = useState({ title: '', description: '', date: '' });

    const loadEntries = async () => {
        try {
            const response = await api.get('/accomplishments/');
            setEntries(response.data || []);
        } catch (error) {
            console.error('Failed to load accomplishments', error);
        }
    };

    useEffect(() => {
        loadEntries();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/accomplishments/', form);
            setForm({ title: '', description: '', date: '' });
            await loadEntries();
        } catch (error) {
            console.error('Failed to save accomplishment', error);
        }
    };

    return (
        <div className="min-vh-100 d-flex flex-column">
        <div className="container-fluid flex-grow-1">
            <div className="card shadow-sm p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h3 className="fw-bold mb-1">Accomplishments</h3>
                        <p className="text-muted mb-0">Highlight your recent milestones and achievements.</p>
                    </div>
                    <Link to="/dashboard" className="btn btn-outline-secondary btn-sm">← Back to dashboard</Link>
                </div>

                <form onSubmit={handleSubmit} className="border rounded p-3 mb-4">
                    <div className="row g-3">
                        <div className="col-md-4">
                            <label className="form-label">Title</label>
                            <input className="form-control" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Date</label>
                            <input type="date" className="form-control" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Description</label>
                            <textarea className="form-control" rows="3" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
                        </div>
                    </div>
                    <button className="btn btn-primary mt-3" type="submit">Save entry</button>
                </form>

                <div className="row g-3">
                    {entries.map((entry) => (
                        <div key={entry.id} className="col-md-6">
                            <div className="border rounded p-3 h-100">
                                <h5 className="fw-semibold">{entry.title}</h5>
                                <p className="text-muted mb-1">{entry.description}</p>
                                <small className="text-muted">{entry.date}</small>
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

export default Accomplishments;
