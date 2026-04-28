import React from "react";
import { Link } from "react-router";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";

const Forget = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-badge-secondary">
      <div className="w-full max-w-md bg-white rounded-2xl border-primary border-2 p-8">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-secondary-800">
            Forgot Password 🔐
          </h1>
          <p className="text-lg text-secondary">
            Enter your email to reset your password
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          {/* Email */}
          <div>
            <Input
              label="Email"
              type="email"
              placeholder="Enter your Email"
              className="w-full mt-1 px-4 py-2 border border-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>

          {/* Button */}
          <Button
            type="submit"
            className="w-full bg-brand text-white py-2 rounded-lg hover:bg-brandtransition duration-300"
          >
            Send Reset Link
          </Button>
        </form>

        {/* Back to Login */}
        <p className="text-center text-lg text-secondary mt-6">
          Remember your password?{" "}
          <Link to="/login">
            <span className="text-brand hover:underline">Back to Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Forget;
