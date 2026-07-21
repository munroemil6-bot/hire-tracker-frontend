import React from 'react';

const AuthLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">{children}</div>
        </div>
    );
    };

export default AuthLayout;
