import React, { useEffect } from 'react'
import { Routes, Route } from "react-router";
import { HashRouter as Router } from 'react-router';
import './App.css'
import Home from './components/Home/Home'
import Footer from './components/Footer/Footer'
import Products from './components/Products/Products';
import About from './components/About/About';
import NotFound from './components/Notfound/NotFound';
import Verify_email from './components/Verify_email/Verify_email';
import Profile from './components/Profile/Profile';
import Navbar from './components/Navbar/Navbar';
import ProtectedRoute from './utils/ProtectedRoute/ProtectedRoute';
import Wishlist from './components/Profile/Wishlist';
import UpdatePassword from './components/Profile/UpdatePassword';
import Account from './components/Profile/Account';
import Message from './components/Navbar/Message';
import Cart from './components/Profile/Cart/Cart';
import Checkout from './components/Profile/Order/Checkout';
import MyOrder from './components/Profile/Order/MyOrder';
import Invoice from './components/Profile/Order/Invoice';
import StripePayment from './components/Payment/StripePayment';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Register from './components/Account/RegisterForm';
import LoginForm from './components/Account/LoginForm';

function App() {
  return (
    <main className='min-h-[100vh] relative flex justify-between flex-col'>
      <Message />
      <Navbar />
      <main className='min-h-[80vh]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:category' element={<Products />} />
          <Route path='/products/info/:product_id' element={<ProductDetails />} />
          <Route path='/about' element={<About />} />
          <Route path='/account' element={<Register />} />
          <Route path='/account/register' element={<Register />} />
          <Route path='/account/login' element={<LoginForm />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/payment/stripe/:order_id' element={<StripePayment />} />
            <Route path="/profile" element={<Profile />}>
              <Route path="account" element={<Account />} />
              <Route path="orders" element={<MyOrder />} />
              <Route path="orders/:id" element={<Invoice />} />
              <Route path="cart" element={<Cart />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="update_password" element={<UpdatePassword />} />
            </Route>
          </Route>
          <Route path='/verify_email' element={<Verify_email />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </main>
  )
}

export default App