import React from 'react';

const Button = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
