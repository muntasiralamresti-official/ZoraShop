import React from 'react'
import Banner from '../components/Home/Banner'
import Category from '../components/Home/Category'
import FeaturedProduct from '../components/Home/FeaturedProduct'
import Sunglass from '../components/Home/Sunglass'

const Home = () => {
  return (
    <>
      <Banner/>
      <Category/>
      <Sunglass/>
      <FeaturedProduct/>
    </>
  )
}

export default Home