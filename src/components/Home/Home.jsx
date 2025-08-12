import React from 'react'
import Header from './Header'
import Sponsors from './Sponsors'
import TopCategories from './TopCategories'
import FeaturedProducts from './FeaturedProducts'
import Products from '../Products/Products'
import { Link } from 'react-router'
import Features from './Features'

function Home() {
  return (
    <div>
        <Header />
        <Features />
        <Sponsors />
        <FeaturedProducts />
        <TopCategories />
        {/* <section>
          <Products pagination={false} />
          <div className='text-center my-5 mb-10'>
            <Link to='/products/' className='btn'>View more</Link>
          </div>
        </section> */}
    </div>
  )
}

export default Home