import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Login from './pages/Login'
import Forget from './pages/Forget'
import Register from './pages/Register'
import Wishlist from './pages/Wishlist'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}> 
          <Route index element={<Home/>} />
          <Route path="Shop" element={<Shop/>} />
          <Route path="Login" element={<Login/>} />
          <Route path="Register" element={<Register/>} />
          <Route path="Forget" element={<Forget />} />
          <Route path="Wishlist" element={<Wishlist />} />

        </Route >
      </Routes>
   </BrowserRouter>
  )
}

export default App