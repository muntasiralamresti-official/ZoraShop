import React, { useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import Forget from "./pages/Forget";
import Register from "./pages/Register";
import Wishlist from "./pages/Wishlist";
import ProductDetails from "./pages/ProductDetails";
import MyCart from "./pages/MyCart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import OrderDetails from "./pages/OrderDetails";
import User from "./pages/User";

const SearchRedirect = () => {
  const { search } = useLocation();

  return <Navigate to={`/shop${search}`} replace />;
};

const App = () => {
  const [openCart, setOpenCart] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/search" element={<SearchRedirect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget" element={<Forget />} />

        <Route path="/" element={<Layout setOpenCart={setOpenCart} />}>
          <Route index element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route
            path="/shop/:id"
            element={<ProductDetails setOpenCart={setOpenCart} />}
          />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/user" element={<User />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<OrderSuccess />} />
          <Route path="/order/:id" element={<OrderDetails />} />
        </Route>
      </Routes>
      <MyCart openCart={openCart} setOpenCart={setOpenCart} />
    </BrowserRouter>
  );
};

export default App;
