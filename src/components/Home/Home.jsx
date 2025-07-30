import React from 'react'
import Header from './Header'
import Sponsors from './Sponsors'
import TopCategories from './TopCategories'
import FeaturedProducts from './FeaturedProducts'

function Home() {
  return (
    <div>
        <Header />
        <Sponsors />
        <FeaturedProducts />
        <TopCategories />
    </div>
  )
}

export default Home