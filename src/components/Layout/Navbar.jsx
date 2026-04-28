import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Input from "../UI/Input";
import { IoSearch } from "react-icons/io5";
import Button from "../UI/Button";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";
import { IoChevronForward } from "react-icons/io5";
import SearchBox from "../UI/SearchBox";

const Navbar = () => {
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };


  const catagories = [
    "Women's Fashion",
    "men's Fashion",
    "Kid's Fashion",
    "Home & Lifestyle",
    "Arts & Crafts",
    "Computer & Electronics",
    "Food & Grocery",
  ];

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
            {/* <Input placeholder="'I'm looking for..." className="border-none" />
            <Button className="rounded-l-none px-4">
              <IoSearch className="text-[28px]" />
            </Button> */}
            <SearchBox/>
          </div>

          {/* Button */}
          <div className="flex gap-5 sm:gap-10  order-2 md:order-3 text-nowrap">
              {user ? (
                <div className="flex items-center gap-3">

                  <Link to="/profile" className="flex items-center gap-2">
                    <img src={user.image} className="w-8 h-8 rounded-full" />
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
            <Link
              to="/Wishlist"
              className="flex gap-1.5 font-normal text-base items-center"
            >
              <FaRegHeart className="text-xl" />{" "}
              <span className="hidden md:block">Wishlist</span>{" "}
            </Link>
            <Link
              to="/MyCart"
              className="flex gap-1.5 font-normal text-base items-center"
            >
              <FaBasketShopping className="text-xl" />{" "}
              <span className="hidden md:block">My Cart</span>{" "}
              <span className="w-5 h-5 bg-red-500 flex items-center justify-center rounded-full text-white text-[12px]">
                1
              </span>
            </Link>
          </div>
        </div>
      </nav>
      <div className="container flex items-center justify-center pb-2.5 border-b border-b-[#EFEEEE]">
        <ul className="flex gap-4.5 md:gap-14 whitespace-nowrap overflow-x-auto">
          {catagories.map((item, i) => (
            <li key={i}>
              <Link
                to="/"
                className="font-medium text-[14px] md:text-base text-primary uppercase whitespace-nowrap"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>

        <IoChevronForward className="text-xl text-primarymd:hidden shrink-0" />
      </div>
    </header>
  );
};

export default Navbar;
