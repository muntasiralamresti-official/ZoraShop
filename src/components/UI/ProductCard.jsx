import React from "react";
import { BiCart } from "react-icons/bi";
import { CiStar } from "react-icons/ci";
import { FaRegHeart, FaStar } from "react-icons/fa";

const ProductCard = ({ head, price, img, discount, heart }) => {
  return (
    <div className="p-2.5 bg-white border border-[#E9E9E9] rounded-2xl flex flex-col h-full">
      <div className="rounded-2xl overflow-hidden relative">
        <img src={img} alt="product" className="w-full" />
        {discount && (
          <p className="absolute top-0 left-0 py-1 px-3 bg-badge rounded text-white text-xs">
            {discount}
          </p>
        )}
        <span className="absolute top-5 right-3.5 text-3xl text-secondary/80cursor-pointer">
          {heart}
        </span>
      </div>
      <div className="pt-3.5 px-1 flex flex-col flex-grow">
        <div>
          <div className="flex items-center gap-1 text-yellow-400">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <CiStar />
            <span className="text-secondary">(0)</span>
          </div>
          <h4 className="text-xs md:text-lg font-normal text-primary py-2.5">
            {head}
          </h4>
        </div>
        <div className="flex justify-between items-center mt-auto">
          <p className="font-medium text-base md:text-2xl text-brand">
            {price}
          </p>
          <BiCart className="text-lg md:text-3xl text-brand" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
