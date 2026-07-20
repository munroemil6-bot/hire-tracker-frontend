import React from 'react';

const Card = ({ title, children, className = '' }) => {
  return (
    <div className={`card shadow-sm h-100 ${className}`.trim()}>
      {title ? (
        <div className="card-body">
          <h5 className="card-title fw-bold">{title}</h5>
          {children}
        </div>
      ) : (
        <div className="card-body">{children}</div>
      )}
    </div>
  );
};

export default Card;
