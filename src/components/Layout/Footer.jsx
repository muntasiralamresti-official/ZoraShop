import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { TfiHeadphoneAlt } from "react-icons/tfi";

import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="container">
        <div className="footer-content grid grid-cols-1 md:grid-cols-4 pt-15 pb-10 md:pb-21 gap-15 ">
          <div className="footer-content-list order-4 md:order-1 max-w-96">
            <Link to="/" className="hidden md:block">
              <img src="Logo.png" alt="" />
            </Link>
            <p className="max-w-96 pt-9 pb-6.5 hidden md:block ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex gap-5 text-[40px] text-brand">
              <FaFacebook />
              <FaTwitter />
              <FaLinkedin />
              <FaInstagram />
            </div>
          </div>
          <div className="footer-content-list order-2">
            <h4 className="text-[20px] text-[#333333] font-bold">
              QUICK LINKS
            </h4>
            <ul className="pt-5">
              <li className="pt-4 text-black/80">
                <Link to="/">About us</Link>
              </li>
              <li className="pt-4 text-black/80">
                <Link to="/">Contact us</Link>
              </li>
              <li className="pt-4 text-black/80">
                <Link to="/">Products</Link>
              </li>
              <li className="pt-4 text-black/80">
                <Link to="/">Login</Link>
              </li>
              <li className="pt-4 text-black/80">
                <Link to="/">Sign Up</Link>
              </li>
            </ul>
          </div>
          <div className="footer-content-list order-3">
            <h4 className="text-[20px] text-[#333333] font-bold">
              CUSTOMER AREA
            </h4>
            <ul className="pt-5">
              <li className="pt-4 text-black/80">
                <Link to="/">My Account</Link>
              </li>
              <li className="pt-4 text-black/80">
                <Link to="/">Orders</Link>
              </li>
              <li className="pt-4 text-black/80">
                <Link to="/">Terms</Link>
              </li>
              <li className="pt-4 text-black/80">
                <Link to="/">Privacy Policy</Link>
              </li>
              <li className="pt-4 text-black/80">
                <Link to="/">Shipping Information</Link>
              </li>
            </ul>
          </div>
          <div className="footer-content-list order-1 md:order-4">
            <h4 className="text-[20px] text-[#333333] font-bold">CONTACT</h4>
            <p className="pt-6 pb-8 max-w-85 text-[16px] font-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor{" "}
            </p>
            <div className="flex items-center gap-7">
              <TfiHeadphoneAlt className="text-5xl" />
              <div>
                <h4 className="text-4.5 text-primaryfont-normal">
                  Have any question?
                </h4>
                <p className="text-brand text-[28px] font-semibold">
                  099 456 789
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright flex justify-center md:justify-between pb-5 md:pb-0">
          <p className="text-[#757575]">
            Zora Shop - © 2026 All Rights Reserved
          </p>
          <div className="flex items-center ">
            <h4 className="text-4.5 font-medium text-brand hidden md:block">
              Pay With
            </h4>
            <Link to="/" className="hidden md:block">
              <img src="Pay.png" alt="pay" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
