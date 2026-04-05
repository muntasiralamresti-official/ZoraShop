import React from 'react'
import Button from '../UI/Button'
import { FaStar } from 'react-icons/fa'
import { CiStar } from 'react-icons/ci'
import { FaStarHalfStroke } from 'react-icons/fa6'

const Testimonials = () => {
  return (
    <section>
        <div className='container'>
            <div className='flex gap-12 items-center pb-9'>
                <div>
                    <h3 className='text-xl text-primary font-medium mb-5'>Customer reviews</h3>
                    <div className='flex items-center gap-1 text-amber-300'>
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStarHalfStroke />
                                    <span className='text-secondary'>4.6 out of 5</span>
                    </div>
                </div>
                <Button>Write a Review</Button>
            </div>

            <div>
                <h3 className='text-2xl text-primary font-medium'>Reviews <span>(4)</span></h3>
            </div>
        </div>
    </section>
  )
}

export default Testimonials