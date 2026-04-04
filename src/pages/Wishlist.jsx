import React from "react";
import { Link } from "react-router";
import { FaHeart, FaTrash } from "react-icons/fa";
import ProductCard from "../components/UI/ProductCard";

const Wishlist = () => {


  return (
    <section heart={<FaHeart className='text-red-600'/>} className="container bg-[#f5f7fb] py-10">
      
      <div >
        <h1 className="text-2xl font-bold text-primary flex items-center pb-3">
          My Wishlist
        </h1>
        <p className="text-sm text-gray-500 pb-3">
          Your saved favorite items
        </p>
      </div>

      
        <Link to='/Shop' className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mt-5 gap-1 md:gap-6'>

        <ProductCard head="Headrest Executive Mesh Office Chairset" img="Features-1.png" price="৳10500" heart={<FaHeart className='text-red-600'/>}/>
        <ProductCard head="Women fashion dress set" img="Features-2.png" price="৳1000" heart={<FaHeart className='text-red-600'/>}/>
        <ProductCard head="Headrest Executive Mesh Office Chairset" img="Features-3.png" price="৳5000" heart={<FaHeart className='text-red-600'/>}/>
        <ProductCard head="Headrest Executive Mesh Office Chairset" img="Features-4.png" price="৳1000" heart={<FaHeart className='text-red-600'/>}/>
        <ProductCard head="Headrest Executive Mesh Office Chairset" img="Features-5.png" price="৳10500" heart={<FaHeart className='text-red-600'/>}/>
        <ProductCard head="Women fashion dress set" img="Features-6.png" price="৳1000" heart={<FaHeart className='text-red-600'/>}/>
        <ProductCard head="Headrest Executive Mesh Office Chairset" img="Features-7.png" price="৳5000" heart={<FaHeart className='text-red-600'/>}/>
        <ProductCard head="Women black dress and red hat collectio0" img="Features-8.png" price="৳1000" heart={<FaHeart className='text-red-600'/>}/>
        </Link>
      </section >
  );
};

export default Wishlist;