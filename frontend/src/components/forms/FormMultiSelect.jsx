import React from 'react';

const FormMultiSelect = ({ label, name, selectedOptions, onChange, options, error, ...props }) => {
  const handleToggle = (optionValue) => {
    const newSelection = selectedOptions.includes(optionValue)
      ? selectedOptions.filter(val => val !== optionValue)
      : [...selectedOptions, optionValue];
    
    onChange({ target: { name, value: newSelection } });
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <div className="grid grid-cols-2 gap-2 p-3 bg-gray-900/50 border border-gray-700 rounded-md max-h-40 overflow-y-auto">
        {options.map((option) => {
          const value = option.value || option;
          const labelText = option.label || option;
          const isSelected = selectedOptions.includes(value);
          
          return (
            <button
              key={value}
              type="button"
              onClick={() => handleToggle(value)}
              className={`text-left px-2 py-1 text-xs rounded transition-colors ${
                isSelected 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' 
                  : 'bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-600'
              }`}
            >
              {labelText}
            </button>
          );
        })}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default FormMultiSelect;
