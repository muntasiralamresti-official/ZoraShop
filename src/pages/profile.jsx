import React from "react";
import { useNavigate } from "react-router";
import Button from "../components/UI/Button";

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  if (!user) {
    return (
      <div className="text-center mt-20">
        <p>You are not logged in 😐</p>
        <Button
          onClick={() => navigate("/Login")}
          className="mt-4 px-4 py-2 bg-brand text-white rounded"
        >
          Go to Login
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/5 p-5">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        {/* Profile Header */}
        <div className="flex items-center gap-5 border-b pb-5">
          <img
            src={user.image}
            alt="user"
            className="w-20 h-20 rounded-full border"
          />
          <div>
            <h2 className="text-xl font-semibold">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-secondary">{user.email}</p>
          </div>
        </div>

        {/* Sections */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-secondary-50 p-4 rounded-xl">
            <h3 className="font-semibold mb-2">📦 My Orders</h3>
            <p className="text-lg text-secondary">You have no recent orders.</p>
          </div>

          <div className="bg-secondary-50 p-4 rounded-xl">
            <h3 className="font-semibold mb-2">⚙️ Account Settings</h3>
            <p className="text-lg text-secondary">
              Manage your account preferences.
            </p>
          </div>
        </div>

        {/* Logout */}
        <div className="mt-8 text-right">
          <Button
            onClick={handleLogout}
            className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
