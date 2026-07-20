import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import api from '../../api/axios';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
        const response = await api.post('/login/', form);
        const isAdmin = response.data.role === 'ADMIN' || form.username.toLowerCase() === 'admin' || (response.data.email || '').toLowerCase() === 'admin@gmail.com';
        const userData = {
            username: form.username,
            role: response.data.role || (isAdmin ? 'ADMIN' : 'APPLICANT'),
            name: form.username,
            email: response.data.email || 'admin@gmail.com',
        };
        login(userData, response.data.access);
        if (isAdmin) {
            navigate('/admin/dashboard');
        } else if (userData.role === 'EMPLOYEE') {
            navigate('/dashboard');
        } else {
            navigate('/applicant');
        }
        } catch (error) {
        setError('Invalid username or password');
        console.error('Login failed', error);
        }
    };

    return (
        <AuthLayout>
        <h2 className="mb-4 text-2xl font-semibold">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
            <Input label="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
            <Input label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <Button type="submit">Sign In</Button>
        </form>
        <p className="mt-3 mb-0 text-sm text-muted">Need an account? <Link to="/register">Create one</Link></p>
        </AuthLayout>
    );
    };

export default Login;
