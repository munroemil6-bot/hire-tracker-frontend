import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);

    const loadData = async () => {
        try {
            const [employeesRes, departmentsRes] = await Promise.all([api.get('/employees/'), api.get('/departments/')]);
            setEmployees(employeesRes.data);
            setDepartments(departmentsRes.data);
        } catch (error) {
            console.error('Failed to load employees', error);
        }
    };

    useEffect(() => {
        loadData();
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

            <div className="card shadow-sm mt-4">
                <div className="card-body">
                    <h5 className="fw-bold mb-3">Manage departments</h5>
                    <div className="row g-2">
                        {departments.map((department) => (
                            <div className="col-md-4" key={department.id}>
                                <div className="border rounded p-3">
                                    <strong>{department.name}</strong>
                                    <div className="small text-muted">{department.description || 'Department head office'}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Employees;
