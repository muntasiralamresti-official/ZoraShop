import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaRegCreditCard, FaStar } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import Button from "../UI/Button";

const Services = () => {
  return (
    <section className="pt-13 bg-white ">
      <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        <div className="flex gap-4.5 items-center justify-center">
          <CiDeliveryTruck className="text-6xl text-brand" />
          <div className="div">
            <h4 className="text-[20px] font-bold text-[#333333]">
              FREE SHIPPING
            </h4>
            <p className="text-[16px] font-medium text-[#757575]">
              Order via Campaign
            </p>
          </div>
        </div>
        <div className="flex gap-4.5 items-center justify-center">
          <FaStar className="text-6xl text-brand" />
          <div className="div">
            <h4 className="text-[20px] font-bold text-[#333333]">Best Price</h4>
            <p className="text-[16px] font-medium text-[#757575]">
              Quality products
            </p>
          </div>
        </div>
        <div className="flex gap-4.5 items-center justify-center">
          <FaClockRotateLeft className="text-5xl text-brand" />
          <div className="div">
            <h4 className="text-[20px] font-bold text-[#333333]">
              Free Retern
            </h4>
            <p className="text-[16px] font-medium text-[#757575]">
              Within 7 days returns
            </p>
          </div>
        </div>
        <div className="flex gap-4.5 items-center justify-center">
          <FaRegCreditCard className="text-5xl text-brand" />
          <div className="div">
            <h4 className="text-[20px] font-bold text-[#333333]">
              Secure Payment
            </h4>
            <p className="text-[16px] font-medium text-[#757575]">
              100% secure payment
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
