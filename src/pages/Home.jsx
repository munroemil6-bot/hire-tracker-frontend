import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center px-3">
        <div className="card shadow-lg p-4 p-md-5" style={{ maxWidth: 760 }}>
            <h1 className="display-5 fw-bold mb-3">Hire Tracker</h1>
            <p className="lead text-muted mb-4">A modern hiring platform for managing departments, jobs, applicants, employees, and attendance in one place.</p>
            <div className="d-flex flex-wrap gap-3">
            <Link to="/login" className="btn btn-primary">Login</Link>
            <Link to="/register" className="btn btn-outline-secondary">Create Account</Link>
            </div>
        </div>
        </div>
    );
    };

export default Home;
