import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Input from "../components/UI/Input";
import { getCart } from "../Services/cart";
import { saveOrder } from "../Services/order";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(getCart());
  }, []);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const handleOrder = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("⚠️ Please login to place order");
      navigate("/login");
      return;
    }

    const order = {
      id: Date.now(),
      userId: user.id,
      userName: user.firstName,
      items: cart,
      total: subtotal,
      date: new Date().toLocaleString(),
      status: "Pending",
    };

    saveOrder(order);

    localStorage.removeItem("cart_items"); // clear cart

    navigate("/success");
  };

  return (
    <section className="bg-secondary/10 py-10">
      <div className="container grid md:grid-cols-2 gap-8">

        {/* Billing Info */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">Billing Details</h2>

          <div className="space-y-4">
            <Input
              className="w-full border p-2 rounded"
              placeholder="Full Name"
            />
            <Input className="w-full border p-2 rounded" placeholder="Email" />
            <Input className="w-full border p-2 rounded" placeholder="Phone" />
            <Input
              className="w-full border p-2 rounded"
              placeholder="Address"
            />
          </div>

          {/* Payment */}
          <div className="space-y-2 pt-3">
  <Input
    type="radio"
    name="payment"
    label="Cash on Delivery"
    defaultChecked
  />

  <Input
    type="radio"
    name="payment"
    label="Online Payment"
  />
</div>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">Your Order</h2>

          <div className="space-y-4 max-h-[300px] overflow-y-auto">
            {cart.length === 0 ? (
              <p>Cart is empty 😢</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-3 items-center">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-14 h-14 rounded object-cover"
                  />

                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-secondary">
                      ${item.price} × {item.quantity}
                    </p>
                  </div>

                  <span className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Total */}
          <div className="border-t mt-4 pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Place Order */}
          <button
            onClick={handleOrder}
            className="bg-brand text-white px-6 py-3 rounded"
          >
            Place Order 🚀
          </button>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
