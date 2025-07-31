import React from 'react'
import { Routes, Route } from "react-router";
import './app.css'
import Navbar from './components/Navbar'
import Home from './components/Home/Home'
import Footer from './components/Footer/Footer'
import Products from './components/Products/Products';
import About from './components/About/About';
import NotFound from './components/Notfound/NotFound';
import Signup from './components/Account/Signup';

function App() {
  return (
    <main className='min-h-[100vh] relative'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/about' element={<About />} />
        <Route path='/account' element={<Signup />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
      <Footer />
    </main>
  )
}

export default App