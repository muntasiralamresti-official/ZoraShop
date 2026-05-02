const ORDER_KEY = "orders";

export const getOrders = () =>
  JSON.parse(localStorage.getItem(ORDER_KEY)) || [];

export const saveOrder = (order) => {
  const orders = getOrders();
  orders.push(order);
  localStorage.setItem(ORDER_KEY, JSON.stringify(orders));
};

export const updateOrderStatus = (orderId, status) => {
  const orders = getOrders().map((o) =>
    o.id === orderId ? { ...o, status } : o
  );
  localStorage.setItem(ORDER_KEY, JSON.stringify(orders));
};

export const getOrderById = (id) =>
  getOrders().find((o) => o.id === Number(id));

export const getUserOrders = (userId) =>
  getOrders().filter((o) => o.userId === userId);