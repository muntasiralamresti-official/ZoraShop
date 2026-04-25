import React from "react";
import { MdArrowForward } from "react-icons/md";
import { Link } from "react-router";
import ProductCard from "../UI/ProductCard";
import { IoIosArrowDown } from "react-icons/io";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useGetProductsQuery } from "../../Services/Api";
import Loading from "../UI/Loading";
import Error from "../UI/Error";

const FeaturedProduct = () => {
  const { data, isLoading, error } = useGetProductsQuery({
    limit: 20,
    skip: 0,
  });
  return (
    <section className="pb-[50px]">
      <div className="container">
        <div className="flex justify-between">
          <h3 className="sub_head text-[#2E2E2E]">Featured Product</h3>

          <Link to="/shop" className="view flex gap-4.5 items-center">
            View More{" "}
            <span className="flex ">
              {" "}
              <MdArrowForward />{" "}
            </span>
          </Link>
        </div>
        <div
          to="Shop"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mt-5 gap-1 md:gap-6"
        >
          {isLoading ? (
            <Loading />
          ) : error ? (
            <div className="col-span-3 flex justify-center items-center">
              {/* <Error /> */}
            </div>
          ) : (
            data?.products?.map((item) => (
              <Link to={`/shop/${item.id}`} >
              <ProductCard
                key={item.id}
                head={item.title}
                img={item.thumbnail}
                price={item.price}
                discount={item.discountPercentage}
              />
              </Link>
            ))
          )}
        </div>
      </div>
      <div className="flex justify-center pt-10">
        <Link
          to="/shop"
          className=" flex items-center gap-1 bg-[#34ADED] py-2.5 px-7 rounded-4xl text-white text-[16px] font-semibold"
        >
          Show more{" "}
          <span>
            <IoIosArrowDown />
          </span>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProduct;