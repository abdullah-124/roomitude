import React from 'react'
import product_header from '/images/product_header.png'

function ProductsHeader({setQuery}) {
  const options = ['trending', 'best_sellers', 'featured', 'discount']
  return (
    <div className='relative mb-10 '>
      <img src={product_header} alt="" className='object-cover absolute w-full h-full -z-10' />
      <div className=' text-center z-10 py-10 bg-[#0000009c] text-white rounded-lg'>
        <h2 className='text-2xl font-bold'>Shop</h2>
        <p className='py-1'>Home/Shop</p>
        <ul className='flex justify-center items-center flex-wrap my-3 text-sm'>
          <li><p className='navLink'>All</p></li>
          {
            options.map((option, idx) => (
              <li key={idx}><p onClick={()=>handaleParams(option)} className='navLink'>{option}</p></li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default ProductsHeader