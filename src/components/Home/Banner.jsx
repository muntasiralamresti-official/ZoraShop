import React from "react";
import { Link } from "react-router";
import Slider from "react-slick";

const Banner = () => {
  const settings = {
    dots: true,
    slidesToShow: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,

    appendDots: (dots) => (
      <div>
        <ul className="flex gap-2 absolute bottom-6.5 left-1/2 -translate-x-1/2">
          {dots}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div>
        <button className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-brand"></button>
      </div>
    ),
  };

  return (
    <section className="pt-3 pb-13">
      <div className="container flex gap-7">
        <div className="w-full md:w-[66%]">
          <Slider {...settings}>
            <Link to="/">
              <img src="/Banner-2.png" alt="Banner-2" className="w-full" />
            </Link>
            <Link to="/">
              <img src="/Banner-1.png" alt="Banner-1" className="w-full" />
            </Link>
            <Link to="/">
              <img src="/Banner-3.png" alt="Banner-3" className="w-full" />
            </Link>
            <Link to="/">
              <img src="/Banner-4.png" alt="Banner-4" className="w-full" />
            </Link>
            <Link to="/">
              <img src="/Banner-5.png" alt="Banner-5" className="w-full" />
            </Link>
          </Slider>
        </div>
        <div className="w-full md:w-[34%] hidden md:flex flex-col space-y-7">
          <Link>
            <img
              src="/Banner-right-1.png"
              alt="Banner-right-1"
              className="w-full"
            />
          </Link>
          <Link>
            <img
              src="/Banner-right-2.png"
              alt="Banner-right-2"
              className="w-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
