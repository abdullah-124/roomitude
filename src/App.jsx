import React from 'react'
import { Routes, Route } from "react-router";
import './app.css'
import Navbar from './components/Navbar'
import Home from './components/Home/Home'
import Footer from './components/Footer/Footer'
import Products from './components/Products/Products';

function App() {
  return (
    <main className=''>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
      </Routes>
      <Footer />
    </main>
  )
}

export default App