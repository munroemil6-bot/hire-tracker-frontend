import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import api from '../../api/axios';
import { useAuth } from '../../hooks/useAuth';

const emailPattern = /^\S+@\S+\.\S+$/;
const phonePattern = /^\d{10}$/;

const getApiErrorMessage = (error, fallbackMessage) => {
    if (!error.response) {
        return 'Cannot reach the backend. Start the Django server on http://127.0.0.1:8000 and try again.';
    }

    const data = error.response.data;
    if (typeof data?.detail === 'string') return data.detail;

    if (data && typeof data === 'object') {
        const firstError = Object.values(data).flat().find(Boolean);
        if (typeof firstError === 'string') return firstError;
    }

    return fallbackMessage;
};

const Register = () => {
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: 'APPLICANT',
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const validate = () => {
        const validationErrors = {};
        const firstName = form.first_name.trim();
        const lastName = form.last_name.trim();
        const username = form.username.trim();
        const email = form.email.trim();
        const phone = form.phone.trim();
        const password = form.password;
        const confirmPassword = form.confirmPassword;

        if (!firstName) {
            validationErrors.first_name = 'First name is required';
        } else if (firstName.length < 2 || firstName.length > 50) {
            validationErrors.first_name = 'First name must be 2-50 characters';
        }

        if (!lastName) {
            validationErrors.last_name = 'Last name is required';
        } else if (lastName.length < 2 || lastName.length > 50) {
            validationErrors.last_name = 'Last name must be 2-50 characters';
        }

        if (!username) {
            validationErrors.username = 'Username is required';
        } else if (username.length < 4 || username.length > 30) {
            validationErrors.username = 'Username must be 4-30 characters';
        }

        if (!email) {
            validationErrors.email = 'Email is required';
        } else if (!emailPattern.test(email)) {
            validationErrors.email = 'Enter a valid email address';
        }

        if (!phone) {
            validationErrors.phone = 'Phone number is required';
        } else if (!phonePattern.test(phone)) {
            validationErrors.phone = 'Phone number should be 10 digits';
        }

        if (!password) {
            validationErrors.password = 'Password is required';
        } else if (password.length < 4) {
            validationErrors.password = 'Password must be at least 4 characters';
        }

        if (!confirmPassword) {
            validationErrors.confirmPassword = 'Confirm password is required';
        } else if (password !== confirmPassword) {
            validationErrors.confirmPassword = 'Passwords must match';
        }

        return validationErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        const validationErrors = validate();
        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            return;
        }

        try {
            const payload = {
                first_name: form.first_name.trim(),
                last_name: form.last_name.trim(),
                username: form.username.trim(),
                email: form.email.trim(),
                phone: form.phone.trim(),
                password: form.password,
                role: form.role,
            };

            const response = await api.post('/register/', payload);
            const normalizedRole = String(response.data.role || 'APPLICANT').toUpperCase();
            const userData = {
                username: response.data.username,
                role: normalizedRole,
                name: `${response.data.first_name || ''} ${response.data.last_name || ''}`.trim() || response.data.username,
                email: response.data.email || form.email,
                phone: response.data.phone || form.phone,
            };
            if (!response.data.access) {
                throw new Error('The backend did not return an access token.');
            }

            login(userData, response.data.access);
            setMessage('Account created. Welcome to your dashboard.');
            const nextPath = normalizedRole === 'ADMIN' ? '/admin/dashboard' : normalizedRole === 'EMPLOYEE' ? '/dashboard' : '/applicant';
            setTimeout(() => navigate(nextPath), 400);
        } catch (error) {
            setMessage(getApiErrorMessage(error, 'Registration failed. Try another username or email.'));
            console.error('Registration failed', error);
        }
    };

    return (
        <AuthLayout>
            <h2 className="mb-4 text-2xl font-semibold">Create Account</h2>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleSubmit}>
                <div className="row g-3 mb-3">
                    <div className="col-md-6">
                        <Input
                            label="First Name"
                            value={form.first_name}
                            onChange={(e) => {
                                setForm({ ...form, first_name: e.target.value });
                                setErrors({ ...errors, first_name: undefined });
                            }}
                        />
                        {errors.first_name && <div className="text-danger small">{errors.first_name}</div>}
                    </div>
                    <div className="col-md-6">
                        <Input
                            label="Last Name"
                            value={form.last_name}
                            onChange={(e) => {
                                setForm({ ...form, last_name: e.target.value });
                                setErrors({ ...errors, last_name: undefined });
                            }}
                        />
                        {errors.last_name && <div className="text-danger small">{errors.last_name}</div>}
                    </div>
                </div>

                <Input
                    label="Username"
                    value={form.username}
                    onChange={(e) => {
                        setForm({ ...form, username: e.target.value });
                        setErrors({ ...errors, username: undefined });
                    }}
                />
                {errors.username && <div className="text-danger small mb-2">{errors.username}</div>}
                <Input
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={(e) => {
                        setForm({ ...form, email: e.target.value });
                        setErrors({ ...errors, email: undefined });
                    }}
                />
                {errors.email && <div className="text-danger small mb-2">{errors.email}</div>}
                <Input
                    label="Phone Number"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={form.phone}
                    onChange={(e) => {
                        const phone = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setForm({ ...form, phone });
                        setErrors({ ...errors, phone: undefined });
                    }}
                />
                {errors.phone && <div className="text-danger small mb-2">{errors.phone}</div>}

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
                <Input
                    label="Confirm Password"
                    type="password"
                    value={form.confirmPassword}
                    onChange={(e) => {
                        setForm({ ...form, confirmPassword: e.target.value });
                        setErrors({ ...errors, confirmPassword: undefined });
                    }}
                />
                {errors.confirmPassword && <div className="text-danger small mb-2">{errors.confirmPassword}</div>}
                <Button type="submit">Create account</Button>
            </form>
            <p className="mt-3 mb-0 text-sm text-muted">Already registered? <Link to="/login">Sign in</Link></p>
        </AuthLayout>
    );
};

export default Register;
