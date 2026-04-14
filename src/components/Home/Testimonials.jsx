import React from "react";
import Button from "../UI/Button";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { FaStarHalfStroke } from "react-icons/fa6";
import Reviews from "../UI/Reviews";
import Input from "../UI/Input";
import { IoStar } from "react-icons/io5";

const Testimonials = () => {
  return (
    <section className="bg-white my-8">
      <div className="container">
        {/* Ratting */}
        <div className="flex gap-12 items-center py-9 ">
          <div>
            <h3 className="text-xl text-primary font-medium mb-5">
              Customer reviews
            </h3>
            <div className="flex items-center gap-1 text-yellow-400">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalfStroke />
              <span className="text-secondary">4.6 out of 5</span>
            </div>
          </div>
          <Button>Write a Review</Button>
        </div>

        {/* Customers Review */}
        <div>
          <h3 className="text-2xl text-primary font-medium pb-7">
            Reviews <span>(4)</span>
          </h3>
          <Reviews />
        </div>

        {/* Add Review */}

        <div>
          <h3 className="text-2xl font-semibold text-primary">
            Add Your Review
          </h3>
          <p className="text-lg font-normal text-secondary/70 pt-4 pb-7">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor.{" "}
          </p>
          <div className="w-745 pb-8">
            <h4 className="text-lg font-normal text-primary pb-4">Name *</h4>
            <Input className="border-2 h-15" />
          </div>
          <div className="w-745 pb-8">
            <h4 className="text-lg font-normal text-primary pb-4">Email *</h4>
            <Input className="border-2 h-15" />
          </div>
          <div className="w-745 pb-8">
            <h4 className="text-lg font-normal text-primary pb-4">Review *</h4>
            <Input className="border-2 h-30" />
          </div>
          <div className="flex items-center gap-4">
            <h4 className="text-lg font-medium text-primary ">Rating</h4>
            <div className="flex items-center text-lg text-yellow-400 gap-1">
              <IoStar />
              <IoStar />
              <IoStar />
              <IoStar />
              <IoStar />
            </div>
          </div>
          <Button className="px-14 py-4 my-10">Submit </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
