import { useNavigate } from "react-router";
import Button from "../components/UI/Button";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      
      <div className="bg-white p-8 rounded-2xl shadow text-center">
        <h1 className="text-2xl font-bold text-green-600">
          🎉 Order Placed Successfully!
        </h1>

        <p className="text-gray-500 mt-2">
          Thank you for your purchase 💖
        </p>

        <Button
          onClick={() => navigate("/shop")}
          className="mt-5 bg-brand text-white px-6 py-2 rounded"
        >
          Continue Shopping
        </Button>
      </div>

    </div>
  );
};

export default OrderSuccess;