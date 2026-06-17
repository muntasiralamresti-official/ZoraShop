import { useMemo, useSyncExternalStore } from "react";
import { useNavigate } from "react-router";
import Button from "../components/UI/Button";
import {
  getCart,
  removeFromCart,
  subscribeToCart,
  updateQuantity,
} from "../Services/cart";

const MyCart = ({ openCart, setOpenCart }) => {
  const navigate = useNavigate();
  const cart = useSyncExternalStore(subscribeToCart, getCart, () => []);

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
  };

  const handleQuantityChange = (id, delta) => {
    const currentItem = cart.find((item) => item.id === id);
    if (!currentItem) return;

    updateQuantity(id, currentItem.quantity + delta);
  };

  return (
    <>
      {openCart && (
        <div
          onClick={() => setOpenCart(false)}
          className="fixed inset-0 z-40 bg-black/50"
        />
      )}

      <div
        className={`fixed top-0 left-0 z-50 flex h-full w-full max-w-[400px] flex-col bg-white shadow-xl transition-transform duration-300 ${
          openCart ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between border-b p-4">
          <div>
            <h2 className="text-xl font-semibold">My Cart</h2>
            <p className="mt-1 text-sm text-secondary">
              {cartCount > 0
                ? `${cartCount} item${cartCount > 1 ? "s" : ""}`
                : "No items yet"}
            </p>
          </div>

          <Button
            onClick={() => setOpenCart(false)}
            className="!bg-transparent !p-0 !text-2xl !text-primary !shadow-none"
          >
            x
          </Button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-4 pb-28">
          {cart.length === 0 ? (
            <div className="flex h-[500px] flex-col items-center justify-center gap-4">
              <div className="text-5xl font-semibold text-brand">Cart</div>
              <p className="text-center text-lg text-secondary">
                Your cart is empty. Add products to see your total and checkout
                options.
              </p>

              <Button
                onClick={() => {
                  setOpenCart(false);
                  navigate("/shop");
                }}
                className="rounded-full bg-brand px-5 py-2 text-white transition hover:scale-105"
              >
                Start Shopping
              </Button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl bg-black px-3 py-3 shadow shadow-brand"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex gap-3">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-15 w-15 rounded-full border bg-white"
                    />
                    <div className="space-y-2">
                      <p className="font-medium text-white">{item.title}</p>
                      <p className="text-sm text-white">
                        ${item.price} x {item.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="h-9 w-9 rounded-full !bg-white/10 !text-white !shadow-none"
                      >
                        -
                      </Button>
                      <span className="w-8 text-center font-semibold text-white">
                        {item.quantity}
                      </span>
                      <Button
                        type="button"
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="h-9 w-9 rounded-full !bg-white/10 !text-white !shadow-none"
                      >
                        +
                      </Button>
                    </div>

                    <Button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      className="!bg-transparent !p-0 !text-sm !text-white !shadow-none"
                    >
                      Remove
                    </Button>
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-2">
                  <span className="text-xs text-white/70">Line total</span>
                  <span className="font-semibold text-white">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-auto w-full space-y-3 border-t bg-white p-4">
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
            className={`flex w-full justify-center ${
              cart.length === 0 ? "cursor-not-allowed opacity-60" : ""
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
