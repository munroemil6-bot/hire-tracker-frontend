import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
    <footer className="bg-primary text-white mt-5 py-4">
        <div className="container-fluid px-4">
            <div className="row g-3 align-items-start">
                <div className="col-md-4">
                    <h6 className="fw-bold mb-1">Matrix Corp</h6>
                    <p className="small mb-0 opacity-75">Empowering talent. Building futures.</p>
                    <p className="small mb-0 opacity-75">123 Business Ave, Suite 100</p>
                    <p className="small mb-0 opacity-75">contact@matrixcorp.com</p>
                </div>
                <div className="col-md-4">
                    <h6 className="fw-bold mb-1">Company</h6>
                    <p className="small mb-0 opacity-75">Matrix Corp is a leading workforce solutions company dedicated to connecting top talent with the right opportunities across all industries.</p>
                </div>
                <div className="col-md-4 text-md-end">
                    <Link to="/" className="btn btn-outline-light btn-sm">← Back to Home</Link>
                    <p className="small mt-2 mb-0 opacity-75">© {new Date().getFullYear()} Matrix Corp. All rights reserved.</p>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
