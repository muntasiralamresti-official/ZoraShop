import React from "react";
import { Link } from "react-router";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-badge-secondary">
      <div className="w-full max-w-md bg-white rounded-2xl border-primary border-2 p-8">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Create Account 🚀
          </h1>
          <p className="text-sm text-secondary">Join Zora and start shopping</p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          {/* Name */}
          <div>
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter your Name"
              className="w-full mt-1 px-4 py-2 border border-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>

          {/* Email */}
          <div>
            <Input
              label="Email"
              type="email"
              placeholder="Enter your Email"
              className="w-full mt-1 px-4 py-2 border border-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>

          {/* Password */}
          <div>
            <Input
              label="Password"
              type="password"
              placeholder="Enter your Password"
              className="w-full mt-1 px-4 py-2 border border-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Enter your Password"
              className="w-full mt-1 px-4 py-2 border border-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>

          {/* Button */}
          <Link to="/">
            <Button
              type="submit"
              className="w-full bg-brand text-white py-2 rounded-lg hover:bg-brandtransition duration-300"
            >
              Sign Up
            </Button>
          </Link>

          <div className="flex items-center gap-2 my-3">
            <div className="flex-1 h- bg-secondary/20"></div>
            <span className="text-xs text-secondary">OR</span>
            <div className="flex-1 h- bg-secondary/20"></div>
          </div>

          {/* Social Login */}
          <Link to="/" className="space-y-3">
            <Button className="w-full border border-secondary/30 py-2 rounded-lg  flex items-center justify-center gap-2">
              <img src="/google.png" alt="" className="w-8 h-8" />
              Continue with Google
            </Button>
            <Button className="w-full border border-secondary/30 py-2 rounded-lg  flex items-center justify-center gap-2">
              <img src="/facebook.png" alt="" className="w-8 h-8" />
              Continue with Facebook
            </Button>
          </Link>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-secondary mt-6">
          Already have an account?{" "}
          <Link to="/login">
            <span className="text-brand hover:underline">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
