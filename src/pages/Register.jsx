
import React from "react";
import { Link } from "react-router";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 my-10">
      <div className="w-full max-w-md bg-white rounded-2xl border-primary border-2 p-8">

        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Create Account 🚀</h1>
          <p className="text-sm text-gray-500">
            Join Nirvoya and start shopping
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4">

          {/* Name */}
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              placeholder="Create password"
              className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm text-gray-600">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Button */}
          <Link to="/">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
          </Link>

          <div className="flex items-center gap-2 my-3">
          <div className="flex-1 h- bg-gray-200"></div>
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h- bg-gray-200"></div>
        </div>

        {/* Social Login */}
        <Link to='/' className="space-y-3">
          <button className="w-full border border-gray-200 py-2 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
            <img src="/google.png" alt="" className="w-8 h-8" />
            Continue with Google
          </button>
          <button className="w-full border border-gray-200 py-2 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
            <img src="/facebook.png" alt="" className="w-8 h-8" />
            Continue with Facebook
          </button>
        </Link>



        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login">
            <span className="text-blue-500 hover:underline">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;