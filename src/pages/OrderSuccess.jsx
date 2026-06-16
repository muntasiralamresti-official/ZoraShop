import { useEffect } from "react";
import { useNavigate } from "react-router";
import Button from "../components/UI/Button";

const OrderSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Success popup, then redirect to profile.
    alert("🎉 Order placed successfully! You can view it in your profile.");

    const t = setTimeout(() => {
      navigate("/user");
    }, 800);

    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-secondary/10">
      <div className="bg-white p-8 rounded-2xl shadow text-center">
        <h1 className="text-2xl font-bold text-green-600">
          🎉 Order Placed Successfully!
        </h1>

        <p className="text-secondary mt-2">Thank you for your purchase 💖</p>

        <Button
          onClick={() => navigate("/user")}
          className="mt-5 bg-brand text-white px-6 py-2 rounded"
        >
          Go to Profile
        </Button>
      </div>
    </div>
  );
};

export default OrderSuccess;
