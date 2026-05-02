const CART_KEY = "cart_items";

export const getCart = () => {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
};

export const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const addToCart = (product) => {
  const cart = getCart();

  const exists = cart.find((item) => item.id === product.id);

  if (exists) {
    exists.quantity += product.quantity || 1;
  } else {
    cart.push({ ...product, quantity: product.quantity || 1 });
  }

  saveCart(cart);
};

export const removeFromCart = (id) => {
  const cart = getCart().filter((item) => item.id !== id);
  saveCart(cart);
};

export const updateQuantity = (id, qty) => {
  const cart = getCart().map((item) =>
    item.id === id ? { ...item, quantity: qty } : item
  );
  saveCart(cart);
};

export const getCartCount = () => {
  return getCart().reduce((acc, item) => acc + item.quantity, 0);
};