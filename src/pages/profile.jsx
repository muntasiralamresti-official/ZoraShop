import { useEffect, useState } from "react";
import { getUserOrders } from "../Services/order";
import Button from "../components/UI/Button";
import { useNavigate } from "react-router";
import Direction from "../components/UI/Direction";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    if (status === "Pending") return "bg-yellow-100 text-yellow-600";
    if (status === "Delivered") return "bg-green-100 text-green-600";
    if (status === "Cancelled") return "bg-red-100 text-red-600";
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    if (storedUser) {
      setOrders(getUserOrders(storedUser.id));
    }
  }, []);

  const handleCancel = (orderId) => {
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const updated = allOrders.filter((o) => o.id !== orderId);

    localStorage.setItem("orders", JSON.stringify(updated));

    setOrders(updated.filter((o) => o.userId === user.id));
  };

 if (!user) {
  return (
    <div className="py-40 flex flex-col items-center justify-center gap-7">

      
      <img src="./Logo.png" alt="logo" className="w-30 h-16" />

      <p className="text-2xl font-semibold text-center">
        Explore Your Shopping Experience
      </p>

      <Direction onClick={() => navigate("/login")}>
       Continue with Login
      </Direction>

    </div>
  );
}

  return (
    <div className="container py-10">
      {/* 👤 Profile Card */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <div className="flex items-center gap-4">
          <img src={user.image} className="w-20 h-20 rounded-full border" />
          <div>
            <h2 className="text-xl font-bold">{user.firstName}</h2>
            <p className="text-secondary/50">{user.email}</p>
          </div>
        </div>

        <hr className="my-5" />

        <div className="flex justify-between">
          <div>
            <h3 className="font-semibold">📦 My Orders</h3>
            <p className="text-secondary text-sm">
              {orders.length === 0
                ? "You have no recent orders."
                : `${orders.length} orders found`}
            </p>
          </div>

          <Button
            onClick={() => {
              localStorage.removeItem("user");
              window.location.reload();
            }}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Order List */}
      <div className="space-y-4">
        {orders.length === 0 ? (
          <p className="text-center text-secondary">No orders yet 😢</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="bg-white p-5 rounded-xl shadow">
              <p className="text-sm text-secondary mb-2">{order.date}</p>

              {/* Items */}
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.title}</span>
                  <span>
                    {item.quantity} × ${item.price}
                  </span>
                </div>
              ))}

              {/* Status + Actions */}
              <div className="flex justify-between items-center mt-3">
                {/* Status */}
                <span
                  className={`px-2 py-1 text-xs rounded ${getStatusColor(order.status)}`}
                >
                  {order.status}
                </span>

                <div className="flex gap-2">
                  {/* Details */}
                  <Button
                    onClick={() => navigate(`/order/${order.id}`)}
                    className="bg-brand text-white px-3 py-1 rounded text-sm"
                  >
                    Details
                  </Button>

                  {/* Cancel */}
                  {order.status === "Pending" && (
                    <Button
                      onClick={() => handleCancel(order.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </div>

              <p className="text-right font-bold mt-2">
                Total: ${order.total.toFixed(2)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;
