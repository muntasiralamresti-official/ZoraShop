import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import { useLoginMutation } from "../Services/Api";

const Login = () => {
  const navigate = useNavigate();

  const [login] = useLoginMutation();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const log = await login(loginData).unwrap();

      localStorage.setItem("user", JSON.stringify(log));

      navigate("/");
      window.location.reload();
    } catch (err) {
      alert(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-badge-secondary">
      <div className="w-full max-w-md bg-white rounded-2xl border-primary border-2 p-8">
        {/* Logo / Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-primary">Welcome Back 👋</h1>
          <p className="text-lg text-secondary">
            Login to your Zora Shop account
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleLogin}>
          {/* Username */}
          <div>
            <Input
              label="Username"
              type="text"
              placeholder="Enter your Username"
              onChange={(e) =>
                setLoginData((prev) => ({ ...prev, username: e.target.value }))
              }
              className="w-full mt-1 px-4 py-2 border border-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>
          {/* Password */}
          <div>
            <Input
              label="Password"
              type="Password"
              placeholder="Enter your Password"
              onChange={(e) =>
                setLoginData((prev) => ({ ...prev, password: e.target.value }))
              }
              className="w-full mt-1 px-4 py-2 border border-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>

          {/* Options */}

          <div className="flex items-center justify-between text-lg pb-1">
            <Input
              type="checkbox"
              label="Remember me"
              className="accent-brand flex items-center gap-2 text-secondary"
            />
            <Link to="/Forget" className="text-brand hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Button */}

          <Button
            type="submit"
            className="w-full bg-brand text-white py-2 rounded-lg hover:bg-brandtransition duration-300"
          >
            Login
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-2 my-3">
          <div className="flex-1 h- bg-secondary/20"></div>
          <span className="text-lg text-secondary">OR</span>
          <div className="flex-1 h- bg-secondary/20"></div>
        </div>

        {/* Social Login */}

        <div className="space-y-3">
          <Link to="/" className="block">
            <Button className="w-full border border-secondary/30 py-2 rounded-lg flex items-center justify-center gap-2">
              <img src="/google.png" className="w-8 h-8" />
              Continue with Google
            </Button>
          </Link>

          <Link to="/" className="block">
            <Button className="w-full border border-secondary/30 py-2 rounded-lg flex items-center justify-center gap-2">
              <img src="/facebook.png" className="w-8 h-8" />
              Continue with Facebook
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center text-lg text-secondary mt-6">
          Don’t have an account?{" "}
          <Link to="/Register">
            <span className="text-brand cursor-pointer hover:underline">
              Sign up
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
