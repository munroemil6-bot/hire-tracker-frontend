import React from 'react';

const AuthLayout = ({ children }) => {
    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center px-3 py-5" style={{ background: 'linear-gradient(135deg, #fffaf0 0%, #FEFBF3 100%)' }}>
            <div className="card p-4 p-md-5 w-100" style={{ maxWidth: 480 }}>
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
