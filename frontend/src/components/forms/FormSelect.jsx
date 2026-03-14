import React from 'react';

const FormSelect = ({ label, name, value, onChange, options, error, placeholder, ...props }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor={name}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 bg-gray-900/50 border ${
          error ? 'border-red-500' : 'border-gray-700'
        } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all`}
        {...props}
      >
        <option value="" disabled>{placeholder || `Select ${label}`}</option>
        {options.map((option) => (
          <option key={option.value || option} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default FormSelect;
