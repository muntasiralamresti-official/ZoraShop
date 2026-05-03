import { useParams } from "react-router";
import { getOrderById } from "../Services/order";

const OrderDetails = () => {
  const { id } = useParams();
  const order = getOrderById(id);

  if (!order) return <p className="p-10">Order not found 😢</p>;

  return (
    <div className="container py-10">

      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-bold mb-2">
          📦 Order #{order.id}
        </h2>

        <p className="text-secondary mb-3">{order.date}</p>

        <span className="px-3 py-1 rounded bg-secondary/10 text-sm">
          {order.status}
        </span>

        <div className="mt-5 space-y-3">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div className="flex gap-3 items-center">
                <img
                  src={item.thumbnail}
                  className="w-12 h-12 rounded"
                />
                <span>{item.title}</span>
              </div>

              <span>
                {item.quantity} × ${item.price}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 text-right font-bold text-lg">
          Total: ${order.total.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;