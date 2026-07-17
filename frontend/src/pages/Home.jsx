import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="p-6">
      <h1 className="mb-4 text-3xl font-semibold">Hire Tracker</h1>
      <p className="mb-4 text-gray-600">Welcome to the hiring management system.</p>
      <div className="space-x-4">
        <Link to="/login" className="text-blue-600">Login</Link>
        <Link to="/register" className="text-blue-600">Register</Link>
      </div>
    </div>
  );
};

export default Home;
