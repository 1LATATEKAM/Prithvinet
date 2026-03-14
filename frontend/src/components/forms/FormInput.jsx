import React from 'react';

const FormInput = ({ label, name, type = 'text', value, onChange, error, placeholder, ...props }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 bg-gray-900/50 border ${
          error ? 'border-red-500' : 'border-gray-700'
        } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default FormInput;
