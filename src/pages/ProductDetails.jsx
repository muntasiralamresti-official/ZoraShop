import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { NextArrow, PrevArrow } from "../components/ui/Arrows";
import { IoChevronForward, IoStar, IoStarSharp } from "react-icons/io5";
import { FaCheck, FaCheckCircle, FaHeart, FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import Button from "../components/UI/Button";
import { Link } from "react-router";
import Testimonials from "../components/Home/Testimonials";

const ProductDetails = () => {
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
              Home{" "}
              <span>
                <IoChevronForward />
              </span>{" "}
              Men’s fashion{" "}
              <span>
                {" "}
                <IoChevronForward />
              </span>{" "}
              <span className="text-secondary/70">
                Men's Stand Collar Leather Jacket{" "}
              </span>
            </p>
            <div className="grid grid-cols-4 gap-10">
              <Slider
                className="max-w-xl col-span-3"
                {...settingsLarge}
                asNavFor={nav2}
                ref={(slider) => (sliderRef1 = slider)}
              >
                <div>
                  <img src="/Features-1.png" alt="" className="w-full" />
                </div>
                <div>
                  <img src="/Features-2.png" alt="" className="w-full" />
                </div>
                <div>
                  <img src="/Features-3.png" alt="" className="w-full" />
                </div>
                <div>
                  <img src="/Features-4.png" alt="" className="w-full" />
                </div>
              </Slider>
              <Slider
                asNavFor={nav1}
                ref={(slider) => (sliderRef2 = slider)}
                slidesToShow={4}
                swipeToSlide={true}
                focusOnSelect={true}
                {...settingSmalls}
              >
                <div>
                  <img src="/Features-1.png" alt="" className="w-3/4" />
                </div>
                <div>
                  <img src="/Features-2.png" alt="" className="w-3/4" />
                </div>
                <div>
                  <img src="/Features-3.png" alt="" className="w-3/4" />
                </div>
                <div>
                  <img src="/Features-4.png" alt="" className="w-3/4" />
                </div>
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
              Super Skinny Rib Trouser & Joggers for Men By Sowdagar Trouser
            </h2>

            {/* Star */}
            <div className="flex gap-3 pt-5 pb-8 items-center">
              <div className="flex items-center gap-1  ">
                <span className="text-secondary ">4.0</span>

                <IoStar className="text-2xl text-yellow-400" />
                <IoStar className="text-2xl text-yellow-400" />
                <IoStar className="text-2xl text-yellow-400" />
                <IoStar className="text-2xl text-yellow-400" />
                <IoStarSharp className="text-2xl text-gray-400" />
                <span className="text-secondary">(223)</span>
              </div>
              <span className="text-secondary/20">|</span>
              <div className="flex items-center gap-4">
                <FaCheck className="text-green-500" />
                <p className="text-base text-primary font-bold">
                  4,320 <span className="font-normalnormal">Sold</span>
                </p>
              </div>
              <span className="text-secondary/20">|</span>
              <div className="flex items-center gap-4">
                <FaHeart className="text-secondary/30" />
                <p className="text-lg text-brand ">Add to wishlist</p>
              </div>
            </div>

            {/* Price  */}

            <div className="flex items-center gap-5 pb-6">
              <h3 className="text-brand text-4xl font-semibold">$976.33</h3>
              <p className="text-xl text-secondary/40 line-through">
                $1,020.99
              </p>
              <p className="bg-badge py-1 px-3 text-white">20%</p>
            </div>

            {/* Code & details */}

            <div className="flex gap-3 items-center text-primary/50 text-base pb-8">
              <p className="">
                <span className="font-bold text-primary">SKU:</span> 12314124124
              </p>
              <span className="flex gap-1 items-center">
                <FaCheckCircle className="text-green-500" />
                In Stock
              </span>
            </div>

            {/* details */}

            <div className="max-w-[598px] pb-8">
              <h4 className="text-lg text-secondary font-normal pb-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam
              </h4>
              <ol className="list-disc pl-5 space-y-3 text-secondary">
                <li>Direct Full Array</li>
                <li>Quantum Dot Technology</li>
                <li>Ambient Mode</li>
                <li>One Remote Control</li>
              </ol>
            </div>

            {/* Size */}

            <div className="flex gap-4 items-center pb-8">
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
            </div>
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
              Producr details of LED Monitor With High Quality In The World
            </h3>
            <h4 className="text-2xl text-primary font-bold pb-5 font-secondary">
              See the best picture no matter where you sit
            </h4>

            <div className="flex justify-between pl-6 text-primary text-lg font-secondary">
              <ol className="list-disc">
                <li>Size : M, L, XL</li>
                <li>Product Type : Jogger</li>
                <li>Main Material : Cotton</li>
                <li>Gender : Male</li>
                <li>Waist : Mid-rise</li>
                <li>Zip : Fly</li>
              </ol>
              <ol className="list-disc">
                <li>Zipper : Yes</li>
                <li>Pocket : Two front and One Back Pockets.</li>
                <li>100% Authentic Product</li>
                <li>
                  Product color may slightly vary due to our photography and
                  Sometimes it’s vary on our devices
                </li>
              </ol>
            </div>
          </div>
          <h4 className="text-2xl text-primary font-bold py-5 font-secondary">
            Powerful intelligence for perfection
          </h4>
          <p className="text-lg text-secondary pb-6 font-secondary">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
            qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
            sed quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
            nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
            aliquid ex ea commodi consequatur? Quis autem vel eum iure
            reprehenderit qui in ea voluptate velit esse quam nihil molestiae
            consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
            pariatur?
          </p>
          <p className="text-lg text-secondary pb-5 font-secondary">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident, similique sunt in culpa qui officia deserunt mollitia
            animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis
            est et expedita{" "}
          </p>
        </div>
      </section>
      <Testimonials />
    </>
  );
};

export default ProductDetails;
