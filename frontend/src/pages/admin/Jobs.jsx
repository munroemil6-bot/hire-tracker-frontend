import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [form, setForm] = useState({ title: '', description: '', salary: '', deadline: '', department: '' });

    const loadData = async () => {
        try {
        const [jobsRes, departmentsRes] = await Promise.all([api.get('/jobs/'), api.get('/departments/')]);
        setJobs(jobsRes.data);
        setDepartments(departmentsRes.data);
        } catch (error) {
        console.error('Failed to load jobs', error);
        }
    };

    useEffect(() => { loadData(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        await api.post('/jobs/', form);
        setForm({ title: '', description: '', salary: '', deadline: '', department: '' });
        loadData();
        } catch (error) {
        console.error('Failed to create job', error);
        }
    };

    return (
        <div>
        <h3 className="fw-bold mb-3">Jobs</h3>
        <form className="card p-3 mb-4 shadow-sm" onSubmit={handleSubmit}>
            <div className="row g-3">
            <div className="col-md-4"><input className="form-control" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
            <div className="col-md-4"><input className="form-control" placeholder="Salary" value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} /></div>
            <div className="col-md-4"><input className="form-control" type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} /></div>
            <div className="col-md-6"><input className="form-control" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
            <div className="col-md-4">
                <select className="form-select" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}>
                <option value="">Select department</option>
                {departments.map((department) => <option key={department.id} value={department.id}>{department.name}</option>)}
                </select>
            </div>
            <div className="col-md-2"><button className="btn btn-primary w-100" type="submit">Post</button></div>
            </div>
        </form>

        <div className="row g-3">
            {jobs.map((job) => (
            <div className="col-md-6" key={job.id}>
                <div className="card shadow-sm">
                <div className="card-body">
                    <h5 className="card-title">{job.title}</h5>
                    <p className="card-text text-muted">{job.description}</p>
                    <div className="small text-muted">Salary: {job.salary} • Deadline: {job.deadline}</div>
                </div>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
    };

export default Jobs;
