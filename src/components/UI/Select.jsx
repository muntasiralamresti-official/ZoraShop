import React from "react";

const Select = ({
  label,
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  error,
  className = "",
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 text-lg font-medium text-secondary">
          {label}
        </label>
      )}

      <select
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand 
        ${error ? "border-red-500" : "border-secondary-300"} ${className}`}
      >
        <option disabled hidden>
          {placeholder}
        </option>

        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="mt-1 text-lg text-red-500">{error}</p>}
    </div>
  );
};

export default Select;
