import React from 'react'
import { CiDeliveryTruck } from 'react-icons/ci'
import { FaRegCreditCard, FaStar } from 'react-icons/fa'
import { FaClockRotateLeft } from 'react-icons/fa6'

const Services = () => {
  return (
    <section className='py-[50px] px-[50px]'>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-[99px]">
            <div className='flex gap-[18px] items-center'>
                <CiDeliveryTruck className='text-6xl text-[#0198E9]'/>
                <div className="div">
                    <h4 className='text-[20px] font-bold text-[#333333]'>FREE SHIPPING</h4>
                    <p className='text-[16px] font-medium text-[#757575]'>Order via Campaign</p>
                </div>
            </div>
            <div className='flex gap-[18px] items-center'>
                <FaStar className='text-6xl text-[#0198E9]'/>
                <div className="div">
                    <h4 className='text-[20px] font-bold text-[#333333]'>Best Price</h4>
                    <p className='text-[16px] font-medium text-[#757575]'>Quality products</p>
                </div>
            </div>
            <div className='flex gap-[18px] items-center'>
                <FaClockRotateLeft className='text-5xl text-[#0198E9]'/>
                <div className="div">
                    <h4 className='text-[20px] font-bold text-[#333333]'>Free Retern</h4>
                    <p className='text-[16px] font-medium text-[#757575]'>Within 7 days returns</p>
                </div>
            </div>
            <div className='flex gap-[18px] items-center'>
                <FaRegCreditCard className='text-5xl text-[#0198E9]'/>
                <div className="div">
                    <h4 className='text-[20px] font-bold text-[#333333]'>Secure Payment</h4>
                    <p className='text-[16px] font-medium text-[#757575]'>100% secure payment</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Services