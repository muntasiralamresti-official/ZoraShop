import { useMemo, useState } from "react";

import { useNavigate } from "react-router";
import Input from "../components/UI/Input";
import { clearCart, getCart } from "../Services/cart";
import { saveOrder } from "../Services/order";

const Checkout = () => {
  const [cart] = useState(() => getCart());

  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("cod"); // cod | mfs | card
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  // (demo) card inputs UI only
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const subtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart],
  );

  const isCartEmpty = cart.length === 0;

  const createOrder = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("⚠️ Please login to place order");
      navigate("/login");
      return null;
    }

    const orderId = new Date().getTime();

    return {
      id: orderId,
      userId: user.id,
      userName: user.firstName,
      items: cart,
      total: subtotal,
      paymentMethod,
      date: new Date().toLocaleString(),
      status: "Pending",
    };
  };

  const handleCashOnDelivery = () => {
    const order = createOrder();
    if (!order) return;

    saveOrder(order);
    clearCart();

    navigate("/success");
  };

  const handleOnlinePayment = async () => {
    setError("");

    if (paymentMethod === "card") {
      if (!cardNumber.trim() || !cardExpiry.trim() || !cardCvv.trim()) {
        setError("Please fill card details.");
        return;
      }
    }

    setIsProcessing(true);
    try {
      // Demo payment simulation (no backend/payment gateway integrated)
      await new Promise((r) => setTimeout(r, 1200));

      const order = createOrder();
      if (!order) return;

      saveOrder(order);
      clearCart();

      navigate("/success");
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePlaceOrder = () => {
    setError("");

    if (isCartEmpty) {
      setError("Your cart is empty. Add products to place order.");
      return;
    }

    if (paymentMethod === "cod") {
      handleCashOnDelivery();
      return;
    }

    // Online payments (MFS / Card)
    handleOnlinePayment();
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
          <div className="pt-5">
            <h3 className="font-semibold mb-3">Payment Options</h3>

            <div className="grid gap-3">
              {/* COD */}
              <button
                type="button"
                onClick={() => setPaymentMethod("cod")}
                className={`text-left border rounded-2xl p-4 transition ${
                  paymentMethod === "cod"
                    ? "border-brand bg-brand/10"
                    : "bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  <div>
                    <p className="font-semibold">Cash on Delivery (COD)</p>
                    <p className="text-sm text-secondary">
                      Pay when you receive the order.
                    </p>
                  </div>
                </div>
              </button>

              {/* MFS Online */}
              <button
                type="button"
                onClick={() => setPaymentMethod("mfs")}
                className={`text-left border rounded-2xl p-4 transition ${
                  paymentMethod === "mfs"
                    ? "border-brand bg-brand/10"
                    : "bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    checked={paymentMethod === "mfs"}
                    onChange={() => setPaymentMethod("mfs")}
                  />
                  <div>
                    <p className="font-semibold">MFS Online</p>
                    <p className="text-sm text-secondary">
                      Mobile banking via MFS.
                    </p>
                  </div>
                </div>
              </button>

              {/* Card */}
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`text-left border rounded-2xl p-4 transition ${
                  paymentMethod === "card"
                    ? "border-brand bg-brand/10"
                    : "bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                  />
                  <div>
                    <p className="font-semibold">Card Payment</p>
                    <p className="text-sm text-secondary">
                      Visa / MasterCard / Debit.
                    </p>
                  </div>
                </div>
              </button>
            </div>

            {/* Online fields */}
            {(paymentMethod === "mfs" || paymentMethod === "card") && (
              <div className="mt-4 p-4 rounded-2xl border bg-secondary/10">
                {paymentMethod === "mfs" ? (
                  <div>
                    <p className="font-semibold">MFS Online payment</p>
                    <p className="text-sm text-secondary mt-1">
                      Click <b>Pay Now</b> to continue (demo).
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="font-semibold">Card details</p>

                    <Input
                      className="w-full border p-2 rounded"
                      placeholder="Card Number"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        className="w-full border p-2 rounded"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                      />
                      <Input
                        className="w-full border p-2 rounded"
                        placeholder="CVV"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
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

          {error && <p className="text-red-600 text-sm mt-4">{error}</p>}

          {/* Place Order / Pay Now */}
          <button
            onClick={handlePlaceOrder}
            disabled={isProcessing || isCartEmpty}
            className={`mt-6 w-full py-3 rounded transition ${
              isProcessing || isCartEmpty
                ? "bg-secondary/40 text-secondary cursor-not-allowed"
                : "bg-brand text-white hover:scale-[1.01]"
            }`}
          >
            {isProcessing
              ? "Processing…"
              : paymentMethod === "cod"
                ? "Place Order 🚀"
                : "Pay Now 💳"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
