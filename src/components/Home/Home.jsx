import React from 'react'
import Header from './Header'
import Sponsors from './Sponsors'
import TopCategories from './TopCategories'
import FeaturedProducts from './FeaturedProducts'
import Products from '../Products/Products'

function Home() {
  return (
    <div>
        <Header />
        <Sponsors />
        <FeaturedProducts />
        <TopCategories />
        <Products />
    </div>
  )
}

export default Home