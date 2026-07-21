import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [token, setToken] = useState(() => localStorage.getItem('accessToken') || null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    const login = (userData, accessToken) => {
        const normalizedUser = {
            ...userData,
            role: String(userData?.role || 'APPLICANT').toUpperCase(),
        };
        localStorage.setItem('user', JSON.stringify(normalizedUser));
        localStorage.setItem('accessToken', accessToken);
        setUser(normalizedUser);
        setToken(accessToken);
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
    };

export default AuthProvider;
