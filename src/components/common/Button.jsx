import React from 'react';

const Button = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`btn btn-primary px-4 py-2 ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
