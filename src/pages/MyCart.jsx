import { useNavigate } from "react-router";
import Button from "../components/UI/Button";
import { getCart, removeFromCart } from "../Services/cart";
import { useMemo, useState } from "react";

const MyCart = ({ openCart, setOpenCart }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(() => getCart());

  const cartCount = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart],
  );

  const subtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart],
  );

  const handleRemove = (id) => {
    removeFromCart(id);
    setCart(getCart());
  };

  const updateQuantity = (id, delta) => {
    const existingCart = getCart();
    const nextCart = existingCart
      .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
      .filter((item) => item.quantity > 0);

    localStorage.setItem("cart_items", JSON.stringify(nextCart));
    setCart(nextCart);
  };

  return (
    <>
      {openCart && (
        <div
          onClick={() => setOpenCart(false)}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-full max-w-[400px] bg-white z-50
        transition-all duration-300
        ${openCart ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-4 border-b flex justify-between">
          <div>
            <h2 className="text-xl font-semibold">My Cart</h2>
            <p className="text-sm text-secondary mt-1">
              {cartCount > 0 ? `${cartCount} item${cartCount > 1 ? "s" : ""}` : "No items yet"}
            </p>
          </div>

          <Button
            onClick={() => setOpenCart(false)}
            className="!bg-transparent !shadow-none !p-0 !text-primary text-2xl"
          >
            ✖
          </Button>
        </div>

        <div className="p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[500px] gap-4">
              <div className="text-6xl">✨</div>
              <p className="text-secondary text-lg text-center">
                Cart empty — add products to see your total & checkout options.
              </p>

              <Button
                onClick={() => navigate("/shop")}
                className="bg-brand text-white px-5 py-2 rounded-full hover:scale-105 transition"
              >
                Start Shopping 🚀
              </Button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="px-3 py-3 shadow shadow-brand rounded-2xl bg-black"
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="flex gap-3">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-15 w-15 rounded-full border bg-white"
                    />
                    <div className="space-y-2">
                      <p className="font-medium text-white">{item.title}</p>
                      <p className="text-sm text-white">
                        ${item.price} × {item.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="!bg-white/10 !shadow-none !text-white w-9 h-9 rounded-full"
                      >
                        −
                      </Button>
                      <span className="text-white font-semibold w-8 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        type="button"
                        onClick={() => updateQuantity(item.id, +1)}
                        className="!bg-white/10 !shadow-none !text-white w-9 h-9 rounded-full"
                      >
                        +
                      </Button>
                    </div>

                    <Button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      className="bg-transparent !shadow-none !p-0 !text-white"
                    >
                      ❌
                    </Button>
                  </div>
                </div>

                <div className="mt-2 flex justify-between items-center border-t border-white/10 pt-2">
                  <span className="text-xs text-white/70">Line total</span>
                  <span className="text-white font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="absolute bottom-0 w-full p-4 border-b space-y-3">
          <div className="flex justify-between border-b pb-3">
            <span className="text-xl">Subtotal -</span>
            <span className="text-xl font-bold">${subtotal.toFixed(2)}</span>
          </div>

          <Button
            onClick={() => {
              setOpenCart(false);
              navigate("/checkout");
            }}
            disabled={cart.length === 0}
            className={`flex justify-center w-full ${
              cart.length === 0 ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            Check Out
          </Button>
        </div>
      </div>
    </>
  );
};

export default MyCart;

