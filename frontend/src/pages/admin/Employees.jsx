import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

const Employees = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const loadEmployees = async () => {
        try {
            const response = await api.get('/employees/');
            setEmployees(response.data);
        } catch (error) {
            console.error('Failed to load employees', error);
        }
        };

        loadEmployees();
    }, []);

    return (
        <div>
        <h3 className="fw-bold mb-3">Employees</h3>
        <div className="row g-3">
            {employees.map((employee) => (
            <div className="col-md-6" key={employee.id}>
                <div className="card shadow-sm">
                <div className="card-body">
                    <h5 className="card-title">{employee.user_name}</h5>
                    <p className="mb-1 text-muted">Employee #: {employee.employee_number}</p>
                    <p className="mb-1 text-muted">Department: {employee.department_name || 'Unassigned'}</p>
                    <p className="mb-0 text-muted">Salary: {employee.salary}</p>
                </div>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
    };

export default Employees;
