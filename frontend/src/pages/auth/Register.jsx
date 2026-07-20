import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import api from '../../api/axios';
import { useAuth } from '../../hooks/useAuth';

const Register = () => {
    const [form, setForm] = useState({ username: '', email: '', password: '123456', role: 'APPLICANT' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await api.post('/register/', { ...form, password: '123456' });
        const userData = {
            username: response.data.username,
            role: 'APPLICANT',
            name: response.data.username,
            email: response.data.email || 'admin@gmail.com',
        };
        login(userData, response.data.access || 'demo-token');
        setMessage('Account created. Welcome to your applicant dashboard.');
        setTimeout(() => navigate('/applicant'), 400);
        } catch (error) {
        setMessage('Registration failed. Try another username.');
        console.error('Registration failed', error);
        }
    };

    return (
        <AuthLayout>
        <h2 className="mb-4 text-2xl font-semibold">Create Applicant Account</h2>
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={handleSubmit}>
            <Input label="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
            <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <Input label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <Button type="submit">Create account</Button>
        </form>
        <p className="mt-3 mb-0 text-sm text-muted">Already registered? <Link to="/login">Sign in</Link></p>
        </AuthLayout>
    );
    };

export default Register;
