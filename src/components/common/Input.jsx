import React from 'react';

const Input = ({ label, ...props }) => {
  return (
    <div className="mb-3 flex flex-col">
      {label && <label className="mb-1 text-sm font-medium">{label}</label>}
      <input className="rounded border border-gray-300 px-3 py-2" {...props} />
    </div>
  );
};

export default Input;
