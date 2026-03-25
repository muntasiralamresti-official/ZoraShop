import React from 'react'
import { FaBook, FaGift, FaGifts, FaHome, FaPaw, FaShoppingBasket, FaTools, FaTshirt } from 'react-icons/fa'
import { GiDiamondRing, GiLargeDress } from 'react-icons/gi'
import { MdArrowForward, MdArrowForwardIos, MdHealthAndSafety, MdOutlineLocalGroceryStore, MdWatch } from 'react-icons/md'
import { Link } from 'react-router'

const Category = () => {
  const categories = [
    {
     title: "Health & Household",
     icon : MdHealthAndSafety
    },
    {
     title: "Kids Fashion",
     icon : FaTshirt
    },
    {
     title: "Toys",
     icon : FaGift
    },
    {
     title: "Groceries",
     icon : MdOutlineLocalGroceryStore
    },
    {
     title: "Home & Lifestyle",
     icon : FaHome
    },
    {
     title: "Men Fashion",
     icon : FaTshirt
    },
    {
     title: "Women’s Fashion",
     icon : GiLargeDress
    },
    {
     title: "Stationary & Books",
     icon : FaBook
    },
    {
     title: "Leather Goods",
     icon : FaShoppingBasket
    },
    {
     title: "Jewelleries",
     icon : FaGift
    },
    {
     title: "Watches",
     icon : MdWatch
    },
    {
     title: "Mens Fashion",
     icon : GiDiamondRing
    },
    {
     title: "Tools & Hardware",
     icon : FaTools
    },
    {
     title: "Pet Supplies",
     icon : FaPaw
    },
    {
     title: "Seasonal",
     icon : FaGifts
    },


  ]
  return (
    <section className='pb-[45px]'>
      <div className="container">
        <h3 className='sub_head'>Category</h3>
        <div className='mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5'>

          {
            categories.map((item) => (
                <Link key={item.title} to="/" className='p-4 shadow flex items-center rounded-xl justify-between'>
                   <div className='flex gap-2.5 items-center'>
                     <item.icon className='text-3xl text-[#0970CD]' />
                     <p className='font-normal text-base text-secondary'>{item.title}</p>
                   </div>
                   <MdArrowForwardIos className='text-[#999999] ' />
                </Link>
              ))
          }
        </div>
      </div>
    </section>
  )
}

export default Category