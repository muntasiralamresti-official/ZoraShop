import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaHeart, FaTrash } from "react-icons/fa";
import ProductCard from "../components/UI/ProductCard";
import Loading from "../components/UI/Loading";
import { getWishlist, removeFromWishlist } from "../Services/wishlist";
import Button from "../components/UI/Button";
// import { getWishlist, removeFromWishlist } from "../utils/wishlist";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = getWishlist();
    setWishlist(data);
    setLoading(false);
  }, []);

  return (
    <section className="container bg-[#f5f7fb] py-10">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FaHeart className="text-red-500" /> My Wishlist
        </h1>
      </div>

      <div className="grid grid-cols-4 gap-6 pt-6">
        {loading ? (
          <div className="col-span-full flex justify-center items-center h-[300px]">
            <Loading />
          </div>
        ) : wishlist.length === 0 ? (
          <p className="col-span-full text-center py-20">
            No Wishlist Items 😢
          </p>
        ) : (
          wishlist.map((item) => (
            <div key={item.id} className="relative">
              <Link to={`/shop/${item.id}`}>
                <ProductCard
                  head={item.title}
                  img={item.thumbnail}
                  price={item.price}
                  rating={item.rating}
                />
              </Link>

              {/* Delete */}
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  removeFromWishlist(item.id);
                  setWishlist(getWishlist());
                }}
                className="absolute top-2 right-2 bg-white p-2 rounded-full shadow"
              >
                <FaTrash className="text-red-500" />
              </Button>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Wishlist;