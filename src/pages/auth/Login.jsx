import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import api from '../../api/axios';
import { useAuth } from '../../hooks/useAuth';

const emailPattern = /^\S+@\S+\.\S+$/;

const getLoginErrorMessage = (error) => {
    if (!error.response) {
        return 'Cannot reach the backend. Start the Django server on http://127.0.0.1:8000 and try again.';
    }

    return typeof error.response.data?.detail === 'string'
        ? error.response.data.detail
        : 'Invalid username/email or password';
};

const Login = () => {
    const [form, setForm] = useState({ identifier: '', password: '' });
    const [errors, setErrors] = useState({});
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const validate = () => {
        const validationErrors = {};
        if (!form.identifier.trim()) {
            validationErrors.identifier = 'Username or email is required';
        } else if (form.identifier.includes('@') && !emailPattern.test(form.identifier.trim())) {
            validationErrors.identifier = 'Enter a valid email address';
        }

        if (!form.password) {
            validationErrors.password = 'Password is required';
        } else if (form.password.length < 4) {
            validationErrors.password = 'Password must be at least 4 characters';
        }

        return validationErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const validationErrors = validate();
        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            return;
        }

        try {
            const payload = {
                username: form.identifier.trim(),
                password: form.password,
            };
            const response = await api.post('/login/', payload);
            const normalizedRole = String(response?.data?.role || '').toUpperCase();
            const isAdmin = normalizedRole === 'ADMIN' || (response?.data?.email || '').toLowerCase() === 'admin@gmail.com';
            const userData = {
                username: response?.data?.username || response?.data?.email || form.identifier,
                role: isAdmin ? 'ADMIN' : (normalizedRole || 'APPLICANT'),
                name: response?.data?.username || response?.data?.email || form.identifier,
                email: response?.data?.email || form.identifier,
                isStaff: isAdmin,
                isSuperuser: isAdmin,
            };
            login(userData, response?.data?.access || response?.data?.refresh);
            if (isAdmin) {
                navigate('/admin/dashboard');
            } else if (userData.role === 'EMPLOYEE') {
                navigate('/dashboard');
            } else {
                navigate('/applicant');
            }
        } catch (error) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            setError(getLoginErrorMessage(error));
            console.error('Login failed', error);
        }
    };

    return (
        <AuthLayout>
            <h2 className="mb-4 text-2xl font-semibold">Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <Input
                    label="Username or Email"
                    value={form.identifier}
                    onChange={(e) => {
                        setForm({ ...form, identifier: e.target.value });
                        setErrors({ ...errors, identifier: undefined });
                    }}
                />
                {errors.identifier && <div className="text-danger small mb-2">{errors.identifier}</div>}
                <Input
                    label="Password"
                    type="password"
                    value={form.password}
                    onChange={(e) => {
                        setForm({ ...form, password: e.target.value });
                        setErrors({ ...errors, password: undefined });
                    }}
                />
                {errors.password && <div className="text-danger small mb-2">{errors.password}</div>}
                <Button type="submit">Sign In</Button>
            </form>
            <p className="mt-3 mb-0 text-sm text-muted">Need an account? <Link to="/register">Create one</Link></p>
        </AuthLayout>
    );
};

export default Login;
