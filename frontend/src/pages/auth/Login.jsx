import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import api from '../../api/axios';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
    const [form, setForm] = useState({ identifier: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const payload = {
                username: form.identifier,
                password: form.password,
            };
            const response = await api.post('/login/', payload);
            const normalizedRole = String(response.data.role || '').toUpperCase();
            const isAdmin = normalizedRole === 'ADMIN' || (response.data.email || '').toLowerCase() === 'admin@gmail.com';
            const userData = {
                username: response.data.username || response.data.email || form.identifier,
                role: isAdmin ? 'ADMIN' : (normalizedRole || 'APPLICANT'),
                name: response.data.username || response.data.email || form.identifier,
                email: response.data.email || form.identifier,
                isStaff: isAdmin,
                isSuperuser: isAdmin,
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
            setError('Invalid username/email or password');
            console.error('Login failed', error);
        }
    };

    return (
        <AuthLayout>
            <h2 className="mb-4 text-2xl font-semibold">Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <Input label="Username or Email" value={form.identifier} onChange={(e) => setForm({ ...form, identifier: e.target.value })} />
                <Input label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <Button type="submit">Sign In</Button>
            </form>
            <p className="mt-3 mb-0 text-sm text-muted">Need an account? <Link to="/register">Create one</Link></p>
        </AuthLayout>
    );
};

export default Login;
