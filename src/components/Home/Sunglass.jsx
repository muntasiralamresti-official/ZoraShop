import React from "react";
import { MdArrowForward } from "react-icons/md";
import { Link } from "react-router";
import ProductCard from "../UI/ProductCard";
import { useGetProductsQuery } from "../../Services/Api";

const Sunglass = () => {
  const { data } = useGetProductsQuery({
    limit: 4,
    skip: 0,
    category: "sunglasses",
  });
  return (
    <section className="pb-13">
      <div className="container">
        <div className="flex justify-between">
          <h3 className="sub_head text-[#2E2E2E]">Flash Deals</h3>
          <Link
            to={`/shop?category=${encodeURIComponent("sunglasses")}`}
            className="view flex gap-4.5 items-center"
          >
            View More{" "}
            <span className="flex ">
              {" "}
              <MdArrowForward />{" "}
            </span>
          </Link>
        </div>
        {/* <Link
          to={`/shop/${item.id}`}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mt-5 gap-1 md:gap-6"
        >
          {data?.products?.map((item) => (
            <ProductCard
              head={item.title}
              img={item.thumbnail}
              price={item.price}
              discount={item.discountPercentage}
              key={item.id}
            />
          ))}
        </Link> */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mt-5 gap-6">
          {data?.products?.map((item) => (
            <Link to={`/shop/${item.id}`} key={item.id}>
              <ProductCard
                id={item.id}
                head={item.title}
                img={item.thumbnail}
                price={item.price}
                discount={item.discountPercentage}
                rating={item.rating}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sunglass;
