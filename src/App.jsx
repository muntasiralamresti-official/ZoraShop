import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Login from './pages/Login'
import Forget from './pages/Forget'
import Register from './pages/Register'
import Wishlist from './pages/Wishlist'
import ProductDetails from './pages/ProductDetails'
import Apitest from './pages/Apitest'
import MyCart from './pages/MyCart'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/Login" element={<Login/>} />
          <Route path="/Register" element={<Register/>} />
          <Route path="/Forget" element={<Forget />} />
          <Route path="/api" element={<Apitest />} />
        <Route path='/' element={<Layout />}> 
          <Route index element={<Home/>} />
          <Route path="/Shop" element={<Shop/>} />
          <Route path="/My Cart" element={<MyCart/>} />
          <Route path="/Shop/:id" element={<ProductDetails/>} />
          <Route path="/Wishlist" element={<Wishlist />} />

        </Route >
      </Routes>
   </BrowserRouter>
  )
}

export default App