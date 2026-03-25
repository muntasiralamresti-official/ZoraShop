import React from 'react'
import Banner from '../components/Home/Banner'
import Category from '../components/Home/Category'
import FlashDeals from '../components/Home/FlashDeals'
import FeaturedProduct from '../components/Home/FeaturedProduct'
import Footer from '../components/Layout/Footer'
import Services from '../components/UI/Services'

const Home = () => {
  return (
    <>
      <Banner/>
      <Category/>
      <FlashDeals/>
      <FeaturedProduct/>
      <Services/>
      <Footer/>
    </>
  )
}

export default Home