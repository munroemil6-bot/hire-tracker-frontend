import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import api from '../../api/axios';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login/', form);
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('user', JSON.stringify({ username: form.username }));
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <AuthLayout>
      <h2 className="mb-4 text-2xl font-semibold">Login</h2>
      <form onSubmit={handleSubmit}>
        <Input label="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <Input label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <Button type="submit">Sign In</Button>
      </form>
    </AuthLayout>
  );
};

export default Login;
