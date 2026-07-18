import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

const Departments = () => {
    const [departments, setDepartments] = useState([]);
    const [form, setForm] = useState({ name: '', description: '' });

    const loadDepartments = async () => {
        try {
        const response = await api.get('/departments/');
        setDepartments(response.data);
        } catch (error) {
        console.error('Failed to load departments', error);
        }
    };

    useEffect(() => {
        loadDepartments();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        await api.post('/departments/', form);
        setForm({ name: '', description: '' });
        loadDepartments();
        } catch (error) {
        console.error('Failed to create department', error);
        }
    };

    return (
        <div>
        <h3 className="fw-bold mb-3">Departments</h3>
        <form className="card p-3 mb-4 shadow-sm" onSubmit={handleSubmit}>
            <div className="row g-3">
            <div className="col-md-4">
                <input className="form-control" placeholder="Department name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="col-md-6">
                <input className="form-control" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="col-md-2">
                <button className="btn btn-primary w-100" type="submit">Add</button>
            </div>
            </div>
        </form>

        <div className="row g-3">
            {departments.map((dept) => (
            <div className="col-md-6" key={dept.id}>
                <div className="card shadow-sm">
                <div className="card-body">
                    <h5 className="card-title">{dept.name}</h5>
                    <p className="card-text text-muted">{dept.description}</p>
                </div>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
    };

export default Departments;
