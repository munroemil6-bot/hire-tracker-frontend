import axios from 'axios';

const runtimeApiUrl = (
    import.meta.env.VITE_API_URL ||
    import.meta.env.REACT_APP_API_URL ||
    'http://127.0.0.1:8000/api/'
).replace(/\/$/, '');

const api = axios.create({
    baseURL: runtimeApiUrl,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
