import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { NextArrow, PrevArrow } from "../components/ui/Arrows";
import { IoChevronForward, IoStar, IoStarSharp } from "react-icons/io5";
import { FaCheck, FaCheckCircle, FaHeart, FaStar } from "react-icons/fa";
import { CiShoppingBasket, CiStar } from "react-icons/ci";
import Button from "../components/UI/Button";
import { Link, useParams } from "react-router";
import Testimonials from "../components/Home/Testimonials";
import { useGetProductDetailsQuery } from "../Services/Api";

const ProductDetails = () => {
  const {id} = useParams();
  const { data } = useGetProductDetailsQuery(id);
  const [liked, setLiked] = useState(false);

  

  const [selectedSize, setSelectedSize] = useState("xl");
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [quantity, setQuantity] = useState(1);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);

  const increaseQty = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQty = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const settingsLarge = {
    dots: false,
    slidesToShow: 1,
    arrows: false,
  };

  const settingSmalls = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const SIZES = ["S", "M", "L", "X", "XL", "XXL"];
  return (
    <>
      <section className="py-14 ">
        <div className="container grid grid-cols-2 gap-25 justify-between pb-10">
          {/* Product Details image */}
          <div>
            <p className="flex pb-6 items-center text-base text-primary">
              Shop
              <span>
                <IoChevronForward />
              </span>
              
              <span className="flex gap-1 capitalize items-center">
               {data?.category}
                <IoChevronForward />
              </span>
              <span className="text-secondary/70 capitalize">
               {data?.title}
              </span>
            </p>
            <div className="grid grid-cols-4 gap-10">
              <Slider
                className="max-w-xl col-span-3"
                {...settingsLarge}
                asNavFor={nav2}
                ref={(slider) => (sliderRef1 = slider)}
              >
                {data?.images.map((item) => (
                <div key={item}>
                  <img src={item} alt="" className="w-full" />
                </div>

                ))}
                
              </Slider>
              <Slider
                asNavFor={nav1}
                ref={(slider) => (sliderRef2 = slider)}
                slidesToShow={4}
                swipeToSlide={true}
                focusOnSelect={true}
                {...settingSmalls}
              >
                {data?.images.map((item) => (
                <div key={item}>
                  <img src={item} alt="" className="w-full" />
                </div>
                ))}
                
              </Slider>
            </div>
            <div className="flex items-center gap-3 pt-5">
              <h3>Share</h3>
              <Link to="/" className="flex items-center gap-2">
                <img src="/icon-1.png" alt="png" />
                <img src="/icon-2.png" alt="png" />
                <img src="/icon-3.png" alt="png" />
                <img src="/icon-4.png" alt="png" />
                <img src="/icon-5.png" alt="png" />
              </Link>
            </div>
          </div>
          {/* Product Short Details */}
          <div className="pt-10">
            <h2 className="font-medium text-26 text-primary max-w-[611px]">
             {data?.title}
            </h2>

            {/* Star */}
            <div className="flex gap-3 pt-5 pb-8 items-center">
              <div className="flex items-center gap-1  ">
                <span className="text-secondary ">{data?.rating}</span>
                {[...Array(5)].map((_, i) => (
                   i < Math.round(data?.rating)
                     ? <IoStar key={i} className="text-yellow-400 text-xl" />
                     : <IoStarSharp key={i} className="text-gray-300 text-xl" />
                 ))}

                <span className="text-secondary">{data?.total}</span>
                
              </div>
              <span className="text-secondary/20">|</span>
              {/* <div className="flex items-center gap-4">
                <CiShoppingBasket className="text-primary text-3xl font-medium" />
                <p className="text-base text-primary font-bold">
                  {data?.stock} <span className="font-normalnormal">Stock</span>
                </p>
              </div> */}
              {/* <span className="text-secondary/20">|</span> */}
              <div onClick={()=> setLiked(!liked)} className="flex items-center gap-4 cursor-pointer">
                <FaHeart  className={liked ? "text-red-500" : "text-gray-400"} />
                <p className="text-lg text-brand ">Add to wishlist</p>
              </div>
            </div>

            {/* Price  */}

            <div className="flex items-center gap-5 pb-6">
              <h3 className="text-brand text-4xl font-semibold">${(data?.price * quantity).toFixed(2)}</h3>

              <p className="text-xl text-secondary/40 line-through">
               $ {((data?.price + data?.discountPercentage)* quantity).toFixed(2)}
              </p>
              <p className="bg-badge py-1 px-3 text-white rounded-full">- ${(data?.discountPercentage * quantity).toFixed(2)}</p>
            </div>

            {/* Code & details */}

            <div className="flex gap-3 items-center text-primary/50 text-base pb-8">
              <p className="">
                <span className="font-bold text-primary">Brand:</span> {data?.brand}
              </p>
              <p className="">
                <span className="font-bold text-primary">SKU:</span> {data?.sku}
              </p>
              <span className="flex gap-1 items-center">
                <FaCheckCircle className="text-green-500" />
                {data?.availabilityStatus}
              </span>
            </div>

            {/* details */}

            <div className="max-w-[598px] pb-8">
              <h4 className="text-lg text-secondary font-normal pb-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam
              </h4>
            </div>

            {/* Size */}

            {/* <div className="flex gap-4 items-center pb-8">
              <p className="text-lg">Size:</p>
              {SIZES.map((item) => (
                <label
                  key={item}
                  htmlFor={item}
                  className={`uppercase cursor-pointer py-1 px-3 border border-secondary/10 ${selectedSize === item && "bg-brand text-white"} `}
                >
                  {item}
                  <input
                    onChange={(e) => setSelectedSize(e.target.value)}
                    value={item}
                    type="radio"
                    name="size"
                    id={item}
                    hidden
                  />
                </label>
              ))}
            </div> */}
            {/* Quantity */}

            <div className="flex items-center gap-9">
              <div className="gap-2 flex items-center">
                <h3 className="text-secondary/80 ">Quantity: </h3>
                <div className="flex items-center bg-secondary/30 rounded-md overflow-hidden ">
                  <button
                    onClick={decreaseQty}
                    className="px-3 py-2 text-lg text-secondary/50"
                  >
                    {" "}
                    -
                  </button>

                  <span className="px-3 py-1.5 bg-white text-lg font-medium">
                    {" "}
                    {quantity}
                  </span>

                  <button
                    onClick={increaseQty}
                    className="px-3 py-2 text-lg text-secondary/50"
                  >
                    +
                  </button>
                </div>
              </div>
              <Button className="bg-brand text-white font-medium text-xl py-3 px-11 rounded-md">
                Add Cart
              </Button>
              <Button className="!text-brand bg-brand/10 font-bold border-2 border-brand text-xl py-3 px-11 rounded-md">
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Details Lower Section */}

      <section className="bg-white mb-12">
        <div className="container">
          <div className="bg-white pt-5 border-b-3 border-b-secondary/10 pb-8">
            <h3 className="text-2xl text-brand font-medium pb-11">
              Producr details of {data?.title}
            </h3>
            <h4 className="text-2xl text-primary font-bold pb-5 font-secondary">
              Everything You Need to Know About This Product
            </h4>

            <div className="flex justify-between pl-6 text-primary text-lg font-secondary">
              <ol className="list-disc">
                <li><b>Availability:</b> {data?.availabilityStatus}</li>
                <li><b>Minimum Order:</b> {data?.minimumOrderQuantity}</li>
                <li><b>Warranty:</b> {data?.warrantyInformation}</li>
              </ol>
              <ol className="list-disc">
                <li><b>Shipping:</b> {data?.shippingInformation}</li>
                <li><b>Return Policy:</b> {data?.returnPolicy}</li>
              </ol>
            </div>
          </div>
          <h4 className="text-2xl text-primary font-bold py-5 font-secondary">
            Built with Quality & Precision
          </h4>
          <p className="text-lg text-secondary pb-6 font-secondary">
            {data?.description}
          </p>
          {/* <p className="text-lg text-secondary pb-5 font-secondary">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident, similique sunt in culpa qui officia deserunt mollitia
            animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis
            est et expedita{" "}
          </p> */}
        </div>
      </section>
      <Testimonials reviews={data?.reviews} />
    </>
  );
};

export default ProductDetails;
