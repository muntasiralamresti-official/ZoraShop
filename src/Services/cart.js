const CART_KEY = "cart_items";
const CART_EVENT = "shopora-cart-updated";
const EMPTY_CART = [];

let cachedCartRaw = null;
let cachedCartSnapshot = EMPTY_CART;

const emitCartChange = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(CART_EVENT));
  }
};

const readCartSnapshot = () => {
  if (typeof window === "undefined") return EMPTY_CART;

  try {
    const raw = localStorage.getItem(CART_KEY);

    if (raw === cachedCartRaw) {
      return cachedCartSnapshot;
    }

    const parsed = raw ? JSON.parse(raw) : [];
    cachedCartRaw = raw;
    cachedCartSnapshot = Array.isArray(parsed) ? parsed : EMPTY_CART;

    return cachedCartSnapshot;
  } catch {
    cachedCartRaw = null;
    cachedCartSnapshot = EMPTY_CART;
    return cachedCartSnapshot;
  }
};

export const getCart = () => {
  return readCartSnapshot();
};

export const saveCart = (cart) => {
  if (typeof window === "undefined") return;

  const nextCart = Array.isArray(cart) ? cart : [];
  const nextRaw = JSON.stringify(nextCart);

  localStorage.setItem(CART_KEY, nextRaw);
  cachedCartRaw = nextRaw;
  cachedCartSnapshot = nextCart;
  emitCartChange();
};

export const addToCart = (product) => {
  const cart = getCart();
  const exists = cart.find((item) => item.id === product.id);

  if (exists) {
    saveCart(
      cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + (product.quantity || 1) }
          : item,
      ),
    );
    return;
  }

  saveCart([...cart, { ...product, quantity: product.quantity || 1 }]);
};

export const removeFromCart = (id) => {
  const cart = getCart().filter((item) => item.id !== id);
  saveCart(cart);
};

export const updateQuantity = (id, qty) => {
  const cart = getCart().map((item) =>
    item.id === id ? { ...item, quantity: qty } : item,
  ).filter((item) => item.quantity > 0);
  saveCart(cart);
};

export const clearCart = () => {
  if (typeof window === "undefined") return;

  localStorage.removeItem(CART_KEY);
  cachedCartRaw = null;
  cachedCartSnapshot = EMPTY_CART;
  emitCartChange();
};

export const getCartCount = () => {
  return getCart().reduce((acc, item) => acc + item.quantity, 0);
};

export const subscribeToCart = (listener) => {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleChange = () => listener();

  window.addEventListener(CART_EVENT, handleChange);
  window.addEventListener("storage", handleChange);

  return () => {
    window.removeEventListener(CART_EVENT, handleChange);
    window.removeEventListener("storage", handleChange);
  };
};
