import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Input from "../UI/Input";
import { IoSearch } from "react-icons/io5";
import Button from "../UI/Button";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";
import { IoChevronForward } from "react-icons/io5";
import SearchBox from "../UI/SearchBox";
import { useGetCategoryListQuery } from "../../Services/Api";
import { useRef } from "react";
import { getCartCount } from "../../Services/cart";
import { getWishlistCount } from "../../Services/wishlist";

const Navbar = ({ setOpenCart }) => {
const { data } = useGetCategoryListQuery();

const [active, setActive] = useState(null);
const [autoScroll, setAutoScroll] = useState(true);
const scrollRef = useRef(null);
const [direction, setDirection] = useState("right");



// My Cart

const [count, setCount] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCount(getCartCount());
  }, 500);

  return () => clearInterval(interval);
}, []);


// Wishlist

 const [wishCount, setWishCount] = useState(0);

 useEffect(() => {
  const interval = setInterval(() => {
    setWishCount(getWishlistCount());
  }, 500);

  return () => clearInterval(interval);
}, []);
  
  // User
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  useEffect(() => {
  if (!autoScroll) return;

  const interval = setInterval(() => {
    if (!scrollRef.current) return;

    const el = scrollRef.current;

    if (direction === "right") {
      el.scrollLeft += 1;

      if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
        setDirection("left"); // reverse
      }
    } else {
      el.scrollLeft -= 1;

      if (el.scrollLeft <= 0) {
        setDirection("right"); // reverse again
      }
    }
  }, 0);

  return () => clearInterval(interval);
}, [autoScroll, direction]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };



  return (
    <header>
      <nav className="py-8">
        <div className="container flex justify-between items-center flex-wrap md:flex-nowrap gap-5">
          {/* Logo Image */}
          <div className="logo-img">
            <Link to="/" className="order-1">
              <img src="/Logo.png" alt="logo" />
            </Link>

            {/* Search Bar */}
          </div>
          <div className="search-bar bg-[#F1F1F1] flex items-center rounded-md h-fit w-full order-3 md:order-2">
            <SearchBox/>
          </div>

          {/* Button */}
          <div className="flex gap-5 sm:gap-10  order-2 md:order-3 text-nowrap">
              {user ? (
                <div className="flex items-center gap-3">

                  <Link to="/profile" className="flex items-center gap-2">
                    <img src={user.image} className="w-8 h-8 rounded-full border-2 bg-brand/20" />
                    <span>{user.firstName}</span>
                  </Link>

                </div>
              ) : (
                <Link
                      to="/Login"
                      className="flex gap-1.5 font-normal text-base items-center"
                    >
                      <FaRegUser className="text-xl" />{" "}
                      <span className="hidden md:block">Login</span>{" "}
                    </Link>
              )}
            <Link to="/wishlist"  className="relative flex gap-1.5 font-normal text-base items-center" >
              <FaRegHeart className="text-xl" />
              <span className="hidden md:block">Wishlist</span>
                {wishCount > 0 && (
                  <span className="absolute -top-2 -right-3 w-5 h-5 bg-red-500 flex items-center justify-center rounded-full text-white text-[12px]">
                    {wishCount}
                  </span>
                )}
            </Link>
            
            <div onClick={() => setOpenCart(true)} className="relative flex gap-1.5 cursor-pointer items-center">
              <FaBasketShopping className="text-xl" />{" "}
              <span className="hidden md:block">My Cart</span>{" "}
              <span className="absolute -top-2 -right-3 w-5 h-5 bg-red-500 flex items-center justify-center rounded-full text-white text-[12px]">
                {count}
              </span>
            </div>
          </div>
        </div>
      </nav>
      <div className="container flex items-center justify-center pb-2.5 border-b border-b-[#EFEEEE]">

  <ul
    ref={scrollRef}
    className="flex gap-6 md:gap-14 whitespace-nowrap overflow-x-auto scroll-smooth"
  >
    {data?.map((item, i) => (
      <li key={i}>
        <Link
          to={`/Shop?category=${item}`}
          onClick={() => {
            setActive(item);
            setAutoScroll(false); // stop auto scroll
          }}
          className={`relative font-medium text-[14px] md:text-base uppercase whitespace-nowrap transition-all duration-300
            ${
              active === item
                ? "text-blue-600"
                : "text-primary hover:text-brand"
            }
          `}
        >
          {item}

          {/* underline */}
          {active === item && (
            <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-blue-600"></span>
          )}
        </Link>
      </li>
    ))}
  </ul>

  <IoChevronForward className="text-xl text-primary md:hidden shrink-0" />
</div>
    </header>
  );
};

export default Navbar;
