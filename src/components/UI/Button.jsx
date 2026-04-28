import React from "react";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  loading = false,
  disabled = false,
  className = "",
  ...props
}) => {
  const baseStyle =
    "px-6 py-3 rounded-lg cursor-pointer font-medium transition duration-200 focus:outline-none";

  const variants = {
    primary: "bg-brand text-white",
    secondary: "bg-secondary-200 text-secondary-800 hover:bg-secondary-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
    outline:
      "border border-secondary-300 text-secondary-700 hover:bg-secondary/20",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${baseStyle} ${variants[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
