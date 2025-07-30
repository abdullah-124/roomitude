import React from 'react'
import './app.css'
import Navbar from './components/Navbar'
import Home from './components/Home/Home'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <main className=''>
      <Navbar />
      <Home />
      <Footer />
    </main>
  )
}

export default App