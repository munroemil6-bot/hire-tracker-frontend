import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute = ({ children, role }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="p-4 text-center">Loading account...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const normalizedRole = String(user.role || '').toUpperCase();
    const requiredRole = role ? String(role).toUpperCase() : null;
    const isAdminAccount = normalizedRole === 'ADMIN' || user.isStaff || user.isSuperuser;

    if (requiredRole && normalizedRole !== requiredRole) {
        if (isAdminAccount) {
            return <Navigate to="/admin/dashboard" replace />;
        }
        return <Navigate to="/applicant" replace />;
    }

    return children;
};

export default ProtectedRoute;
