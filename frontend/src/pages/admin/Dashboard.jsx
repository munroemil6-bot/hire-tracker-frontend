import React from 'react';
import Card from '../../components/common/Card';

const Dashboard = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Departments">Manage departments</Card>
        <Card title="Employees">Manage employees</Card>
      </div>
    </div>
  );
};

export default Dashboard;
