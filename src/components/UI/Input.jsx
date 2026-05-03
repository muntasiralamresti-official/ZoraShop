import React from "react";

const Input = ({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error,
  className = "",
  ...props
}) => {
  if (type === "checkbox" || type === "radio") {
  return (
    <label className="flex items-center gap-2 cursor-pointer text-secondary">
      <input
        type={type}
        className="w-4 h-4 accent-brand"
        value={value}
        onChange={onChange}
        {...props}
      />
      {label}
    </label>
  );
  }

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-1 text-lg font-medium text-secondary">
          {label}
        </label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 border rounded-lg outline-none transition
        ${error ? "border-red-500 focus:ring-red-300" : "border-secondary-300 focus:ring-brand"}
        focus:ring-2 ${className}`}
        {...props}
      />

      {error && <p className="mt-1 text-lg text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
