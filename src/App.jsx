import React from 'react'
import { Routes, Route } from "react-router";
import './app.css'
import Home from './components/Home/Home'
import Footer from './components/Footer/Footer'
import Products from './components/Products/Products';
import About from './components/About/About';
import NotFound from './components/Notfound/NotFound';
import Signup from './components/Account/Signup';
import Verify_email from './components/Verify_email/Verify_email';
import Profile from './components/Profile/Profile';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <main className='min-h-[100vh] relative'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/about' element={<About />} />
        <Route path='/account' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/verify_email' element={<Verify_email />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
      <Footer />
    </main>
  )
}

export default App