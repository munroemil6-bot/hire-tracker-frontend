import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-700 p-4 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link to="/">Hire Tracker</Link>
          <div className="space-x-4">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/login">Logout</Link>
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-6xl p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
