import React from 'react'

function ProductsHeader() {
  return (
    <div className='mb-10'>
        <h2 className='text-xl text-center font-medium'>Our Products</h2>
        <ul className='flex justify-center flex-wrap my-3 text-sm'>
          <li><a className='navLink' href="">All</a></li>
          <li><a className='navLink' href="">Newest</a></li>
          <li><a className='navLink' href="">Trending</a></li>
          <li><a className='navLink' href="">Best Sellers</a></li>
          <li><a className='navLink' href="">Featured</a></li>
        </ul>
      </div>
  )
}

export default ProductsHeader