import React from "react";
import { MdArrowForward } from "react-icons/md";
import { Link, Links } from "react-router";
import ProductCard from "../UI/ProductCard";
import { useGetProductsQuery } from "../../Services/Api";

const FlashDeals = () => {
   const { data } = useGetProductsQuery();
  return (
    <section className="pb-13">
      <div className="container">
        <div className="flex justify-between">
          <h3 className="sub_head text-[#2E2E2E]">Flash Deals</h3>
          <Link to="/" className="view flex gap-4.5 items-center">
            View More{" "}
            <span className="flex ">
              {" "}
              <MdArrowForward />{" "}
            </span>
          </Link>
        </div>
        <Link
          to="/"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mt-5 gap-1 md:gap-6"
        >

          {data?.products?.slice(6, 10).map((item) => ( <ProductCard head={item.title} img={item.thumbnail} price={item.price} key={item.id}/> ))}
          {/* <ProductCard
            head="Headrest Executive Mesh Office Chairset"
            img="Flash-Product-card-5.png"
            price="10500"
            discount="-25% OFF"
          />
          <ProductCard
            head="Women fashion dress set"
            img="Flash-Product-card-2.png"
            price="1000"
            discount="-25% OFF"
          />
          <ProductCard
            head="Headrest Executive Mesh Office Chairset"
            img="Flash-Product-card-3.png"
            price="5000"
            discount="-25% OFF"
          />
          <ProductCard
            head="Women primarydress and red hat collections"
            img="Flash-Product-card-4.png"
            price="1000.00"
            discount="-25% OFF"
          /> */}
        </Link>
      </div>
    </section>
  );
};

export default FlashDeals;
