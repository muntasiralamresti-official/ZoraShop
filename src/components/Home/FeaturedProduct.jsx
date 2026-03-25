import React from 'react'
import { MdArrowForward } from 'react-icons/md'
import { Link } from 'react-router'
import ProductCard from '../UI/ProductCard'
import { IoIosArrowDown } from 'react-icons/io'


const FeaturedProduct = () => {
  return (
    <section className='pb-[50px]'>
      <div className="container">
        <div className='flex justify-between'>
          <h3 className='sub_head text-[#2E2E2E]'>Featured Product</h3>
          
          <Link to='/' className='view flex gap-4.5 items-center'>
          View More <span className='flex '> <MdArrowForward /> </span>
          </Link>
          
        </div>
        <Link to='/' className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mt-5 gap-1 md:gap-6'>
        <ProductCard head="Headrest Executive Mesh Office Chairset" img="Features-1.png" price="৳10500"/>
        <ProductCard head="Women fashion dress set" img="Features-2.png" price="৳1000"/>
        <ProductCard head="Headrest Executive Mesh Office Chairset" img="Features-3.png" price="৳5000"/>
        <ProductCard head="Headrest Executive Mesh Office Chairset" img="Features-4.png" price="৳1000"/>
        <ProductCard head="Headrest Executive Mesh Office Chairset" img="Features-5.png" price="৳10500"/>
        <ProductCard head="Women fashion dress set" img="Features-6.png" price="৳1000"/>
        <ProductCard head="Headrest Executive Mesh Office Chairset" img="Features-7.png" price="৳5000"/>
        <ProductCard head="Women black dress and red hat collectio0" img="Features-8.png" price="৳1000"/>
        <ProductCard head="Headrest Executive Mesh Office Chairset" img="Features-9.png" price="৳10500"/>
        <ProductCard head="Women fashion dress set" img="Features-10.png" price="৳1000"/>
        <ProductCard head="Headrest Executive Mesh Office Chairset" img="Features-11.png" price="৳5000"/>
        <ProductCard head="Women black dress and red hat collectio0" img="Features-12.png" price="৳1000"/>
        <ProductCard head="Headrest Executive Mesh Office Chairset" img="Features-13.png" price="৳10500"/>
        <ProductCard head="Women fashion dress set" img="Features-14.png" price="৳1000"/>
        <ProductCard head="Headrest Executive Mesh Office Chairset" img="Features-15.png" price="৳5000"/>
        <ProductCard head="Women black dress and red hat collectio0" img="Features-16.png" price="৳1000"/>
        </Link>
      </div>
      <div className='flex justify-center pt-10'>
        <Link to="/" className=' flex items-center gap-1 bg-[#34ADED] py-2.5 px-7 rounded-4xl text-white text-[16px] font-semibold'>
      Show more <span><IoIosArrowDown /></span>
      </Link>
      </div>
    </section>
  )
}

export default FeaturedProduct