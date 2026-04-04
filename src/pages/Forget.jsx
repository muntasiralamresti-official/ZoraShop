import React from "react";
import { Link } from "react-router";

const Forget = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl border-primary border-2 p-8">

        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Forgot Password 🔐</h1>
          <p className="text-sm text-gray-500">
            Enter your email to reset your password
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4">

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Send Reset Link
          </button>
        </form>

        {/* Back to Login */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Remember your password?{" "}
          <Link to="/login">
            <span className="text-blue-500 hover:underline">Back to Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Forget;