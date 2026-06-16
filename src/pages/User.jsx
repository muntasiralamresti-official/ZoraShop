import { useState } from "react";
import { getUserOrders } from "../Services/order";
import Button from "../components/UI/Button";
import { useNavigate } from "react-router";
import Direction from "../components/UI/Direction";

const User = () => {
  const [user] = useState(() => {
    return JSON.parse(localStorage.getItem("user"));
  });
  const [orders, setOrders] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) return [];
    return getUserOrders(storedUser.id);
  });

  const navigate = useNavigate();

  const getStatusColor = (status) => {
    if (status === "Pending") return "bg-yellow-100 text-yellow-600";
    if (status === "Delivered") return "bg-green-100 text-green-600";
    if (status === "Cancelled") return "bg-red-100 text-red-600";
  };

  const handleCancel = (orderId) => {
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const updated = allOrders.filter((o) => o.id !== orderId);

    localStorage.setItem("orders", JSON.stringify(updated));

    setOrders(updated.filter((o) => o.userId === user.id));
  };

  if (!user) {
    return (
      <div className="py-40 flex flex-col items-center justify-center gap-7">
        <img src="./Shopora.png" alt="logo" className="w-30 h-16" />

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
          <div className="text-center">
            <p className="text-secondary">No orders yet 😢</p>
            <p className="text-sm text-secondary/70 mt-2">
              When you place an order, it will show up here.
            </p>
          </div>
        ) : (
          orders.map((order) => {
            const itemsCount =
              order.items?.reduce((acc, it) => acc + (it.quantity || 1), 0) ||
              0;
            const firstItem = order.items?.[0];

            return (
              <div
                key={order.id}
                className="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-secondary mb-2">{order.date}</p>
                    <p className="font-semibold text-primary">
                      Order #{order.id}
                    </p>
                    <p className="text-sm text-secondary/70">
                      {itemsCount} item{itemsCount === 1 ? "" : "s"} •{" "}
                      {order.items?.length || 0} product(s)
                    </p>
                  </div>

                  <span
                    className={`px-2 py-1 text-xs rounded ${getStatusColor(order.status)}`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Items preview */}
                <div className="mt-4 space-y-2">
                  {firstItem && (
                    <div className="flex items-center gap-3">
                      <img
                        src={firstItem.thumbnail}
                        alt={firstItem.title}
                        className="w-12 h-12 rounded-lg object-cover bg-secondary/10"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-primary line-clamp-1">
                          {firstItem.title}
                        </p>
                        <p className="text-xs text-secondary">
                          {firstItem.quantity} × ${firstItem.price}
                        </p>
                      </div>
                    </div>
                  )}

                  {order.items?.length > 1 && (
                    <p className="text-sm text-secondary/70">
                      + {order.items.length - 1} more item(s) in this order
                    </p>
                  )}
                </div>

                <div className="flex justify-between items-center mt-4">
                  <p className="text-right font-bold">
                    Total:{" "}
                    <span className="text-brand">
                      ${order.total.toFixed(2)}
                    </span>
                  </p>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => navigate(`/order/${order.id}`)}
                      className="bg-brand text-white px-3 py-1 rounded text-sm"
                    >
                      View
                    </Button>

                    {order.status === "Pending" && (
                      <Button
                        onClick={() => handleCancel(order.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                      >
                        Cancel
                      </Button>
                    )}

                    {order.status === "Delivered" && (
                      <Button
                        onClick={() =>
                          navigate(`/shop/${order.items?.[0]?.id}`)
                        }
                        className="bg-secondary/10 text-primary px-3 py-1 rounded text-sm border border-secondary/10"
                      >
                        Buy Again
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default User;
