import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { NextArrow, PrevArrow } from "../components/UI/Arrows";
import { IoChevronForward, IoStar, IoStarSharp } from "react-icons/io5";
import { FaHeart, FaCheckCircle } from "react-icons/fa";
import Button from "../components/UI/Button";
import { Link, useNavigate, useParams } from "react-router";
import Testimonials from "../components/Home/Testimonials";
import { useGetProductDetailsQuery } from "../Services/Api";
import { addToWishlist, getWishlist } from "../Services/wishlist";
import { addToCart } from "../Services/cart";

const ProductDetails = () => {
  const { id } = useParams();
  const { data } = useGetProductDetailsQuery(id);

  const [liked, setLiked] = useState(() => {
    const wishlist = getWishlist();
    return wishlist.some((item) => item?.id === Number(id));
  });

  const [quantity, setQuantity] = useState(1);

  const sliderRef1 = useRef(null);
  const sliderRef2 = useRef(null);

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setNav1(sliderRef1.current);
    setNav2(sliderRef2.current);
  }, []);

  const increaseQty = () => {
    setQuantity((prev) => (prev < data?.stock ? prev + 1 : prev));
  };
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleWishlist = () => {
    addToWishlist({
      id: data.id,
      title: data.title,
      thumbnail: data.thumbnail,
      price: data.price,
      discountPercentage: data.discountPercentage,
      rating: data.rating,
    });
    setLiked(true);
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

  return (
    <>
      <section className="py-8 md:py-14">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-25 justify-between pb-10">

          {/* Product Images */}
          <div>
            {/* Breadcrumb — truncate long category/title on small screens */}
            <p className="flex flex-wrap pb-6 items-center text-sm md:text-base text-primary gap-y-1">
              <span>Shop</span>
              <IoChevronForward className="mx-1" />
              <span className="flex gap-1 capitalize items-center">
                {data?.category}
                <IoChevronForward className="mx-1" />
              </span>
              <span className="text-secondary/70 capitalize truncate max-w-[160px] sm:max-w-none">
                {data?.title}
              </span>
            </p>

            {/* Image sliders:
                - Mobile: main image full width, thumbnails as horizontal strip below
                - md+: original side-by-side with vertical thumbnail strip */}
            <div className="flex flex-col gap-3 md:hidden">
              <Slider
                {...settingsLarge}
                asNavFor={nav2}
                ref={(slider) => (sliderRef1.current = slider)}
              >
                {data?.images.map((item) => (
                  <div key={item}>
                    <img src={item} alt="" className="w-full rounded-md object-contain max-h-72" />
                  </div>
                ))}
              </Slider>
              {/* Horizontal thumbnails on mobile */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {data?.images.map((item, i) => (
                  <button
                    key={item}
                    onClick={() => sliderRef1.current?.slickGoTo(i)}
                    className="flex-shrink-0 w-16 h-16 border border-secondary/20 rounded overflow-hidden"
                  >
                    <img src={item} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop: side-by-side grid with vertical thumbnails */}
            <div className="hidden md:grid grid-cols-4 gap-4 lg:gap-10">
              <Slider
                className="col-span-3"
                {...settingsLarge}
                asNavFor={nav2}
                ref={(slider) => (sliderRef1.current = slider)}
              >
                {data?.images.map((item) => (
                  <div key={item}>
                    <img src={item} alt="" className="w-full" />
                  </div>
                ))}
              </Slider>
              <Slider
                asNavFor={nav1}
                ref={(slider) => (sliderRef2.current = slider)}
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

            {/* Share row */}
            <div className="flex items-center gap-3 pt-5">
              <h3 className="text-sm md:text-base">Share</h3>
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
          <div className="pt-0 md:pt-10">
            <h2 className="font-medium text-xl md:text-2xl lg:text-26 text-primary">
              {data?.title}
            </h2>

            {/* Stars + Wishlist */}
            <div className="flex flex-wrap gap-3 pt-4 pb-6 items-center">
              <div className="flex items-center gap-1">
                <span className="text-secondary text-sm">{data?.rating}</span>
                {[...Array(5)].map((_, i) =>
                  i < Math.round(data?.rating) ? (
                    <IoStar key={i} className="text-yellow-400 text-base md:text-xl" />
                  ) : (
                    <IoStarSharp key={i} className="text-secondary-300 text-base md:text-xl" />
                  )
                )}
                <span className="text-secondary text-sm">{data?.total}</span>
              </div>
              <span className="text-secondary/20 hidden sm:inline">|</span>
              <div
                onClick={handleWishlist}
                className="flex items-center gap-2 cursor-pointer"
              >
                <FaHeart className={liked ? "text-red-500" : "text-secondary"} />
                <span className="text-sm md:text-base">Add to Wishlist</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex flex-wrap items-center gap-3 pb-5">
              <h3 className="text-brand text-2xl md:text-4xl font-semibold">
                ${(data?.price * quantity).toFixed(2)}
              </h3>
              <p className="text-base md:text-xl text-secondary/40 line-through">
                ${((data?.price + data?.discountPercentage) * quantity).toFixed(2)}
              </p>
              <p className="bg-badge py-1 px-3 text-white rounded-full text-sm">
                - ${(data?.discountPercentage * quantity).toFixed(2)}
              </p>
            </div>

            {/* Brand / SKU / Status */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 items-center text-primary/50 text-sm md:text-base pb-6">
              <p>
                <span className="font-bold text-primary">Brand:</span> {data?.brand}
              </p>
              <p>
                <span className="font-bold text-primary">SKU:</span> {data?.sku}
              </p>
              <span className="flex gap-1 items-center">
                <FaCheckCircle className="text-green-500" />
                {data?.availabilityStatus}
              </span>
            </div>

            {/* Description snippet */}
            <div className="max-w-[598px] pb-6">
              <h4 className="text-base md:text-lg text-secondary font-normal pb-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam
              </h4>
            </div>

            {/* Quantity + Buttons */}
            <div className="flex flex-wrap items-center gap-4 md:gap-7">
              {/* Quantity control */}
              <div className="flex items-center gap-2">
                <h3 className="text-secondary/80 text-sm md:text-base">Qty:</h3>
                <div className="flex items-center bg-secondary/30 rounded-full overflow-hidden">
                  <Button
                    onClick={decreaseQty}
                    className="px-3 py-2 text-lg rounded-full text-white hover:text-primary bg-brand"
                  >
                    -
                  </Button>
                  <span className="px-4 py-2 bg-white text-lg md:text-xl font-medium min-w-[2.5rem] text-center">
                    {quantity}
                  </span>
                  <Button
                    onClick={increaseQty}
                    className="px-3 py-2 text-lg rounded-full text-white hover:text-primary bg-brand"
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* CTA buttons — stack on very small screens */}
              <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                <Button
                  onClick={() => {
                    addToCart({
                      id: data.id,
                      title: data.title,
                      price: data.price,
                      thumbnail: data.thumbnail,
                      quantity: quantity,
                    });
                  }}
                  className="flex-1 sm:flex-none bg-brand text-white font-medium text-base md:text-xl py-3 px-6 md:px-11 rounded-md hover:bg-brand/80"
                >
                  Add to Cart
                </Button>
                <Button
                  onClick={() => navigate("/checkout")}
                  className="flex-1 sm:flex-none !text-primary hover:bg-brand/80 hover:!text-white bg-brand/10 font-bold border-2 border-brand text-base md:text-xl py-3 px-6 md:px-11 rounded-md"
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details Lower Section */}
      <section className="bg-white mb-12">
        <div className="container px-4 md:px-6">
          <div className="bg-white pt-5 border-b-2 md:border-b-3 border-b-secondary/10 pb-8">
            <h3 className="text-xl md:text-2xl text-brand font-medium pb-6 md:pb-11">
              Product details of {data?.title}
            </h3>
            <h4 className="text-lg md:text-2xl text-primary font-bold pb-4 md:pb-5 font-secondary">
              Everything You Need to Know About This Product
            </h4>
            <div className="pl-4 md:pl-6 text-primary text-sm md:text-lg font-secondary space-y-4">
              <ol className="list-disc space-y-2">
                <li><b>Availability:</b> {data?.availabilityStatus}</li>
                <li><b>Minimum Order:</b> {data?.minimumOrderQuantity}</li>
                <li><b>Warranty:</b> {data?.warrantyInformation}</li>
                <li><b>Shipping:</b> {data?.shippingInformation}</li>
                <li><b>Return Policy:</b> {data?.returnPolicy}</li>
              </ol>
            </div>
          </div>
          <h4 className="text-lg md:text-2xl text-primary font-bold py-4 md:py-5 font-secondary">
            Built with Quality & Precision
          </h4>
          <p className="text-sm md:text-lg text-secondary pb-6 font-secondary">
            {data?.description}
          </p>
        </div>
      </section>

      <Testimonials key={id} reviews={data?.reviews} productId={id} />
    </>
  );
};

export default ProductDetails;