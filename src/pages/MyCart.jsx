import { useNavigate } from "react-router";
import Button from "../components/UI/Button";
import { getCart, removeFromCart } from "../Services/cart";
import { useEffect, useState } from "react";
import LoadingTwo from "../components/UI/LoadingTwo";

const MyCart = ({ openCart, setOpenCart }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(getCart());
  }, [openCart]);

  const handleRemove = (id) => {
    removeFromCart(id);
    setCart(getCart());
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <>
      {openCart && (
        <div
          onClick={() => setOpenCart(false)}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-[400px] bg-white z-50
        transition-all duration-300
        ${openCart ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-4 border-b flex justify-between">
          <h2 className="text-xl font-semibold">My Cart</h2>
          <Button onClick={() => setOpenCart(false)} className="!bg-transparent !shadow-none !p-0 !text-primary text-2xl">✖</Button>
        </div>

        <div className="p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[500px] gap-4">

                 <div className="text-6xl">🛒</div>

                 <p className="text-secondary text-lg">
                   Your cart is empty… let’s fix that 😉
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
                className="flex justify-between items-center px-3 py-2 shadow shadow-brand rounded-2xl bg-black"
              >
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

                <Button onClick={() => handleRemove(item.id)} className="bg-transparent">❌</Button>
              </div>
            ))
          )}
        </div>

        <div className="absolute bottom-0 w-full p-4 border-b space-y-3">
          <div className="flex justify-between  border-b">
            <span className="text-xl">Subtotal -</span>
            <span className="text-xl font-bold">${subtotal.toFixed(2)}</span>
          </div>
        <Button onClick={() => { setOpenCart(false);  navigate("/checkout"); }} className="flex justify-center w-full">
          Check Out
        </Button>
        </div>

      </div>
    </>
  );
};

export default MyCart;
