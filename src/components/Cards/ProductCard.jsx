import React from 'react'
import { CiShoppingCart } from "react-icons/ci";

function ProductCard({ item }) {
  return (
    <article className='p-2'>
      <div>
        <div className='relative'>
          <img src={item.image} alt="" />
        </div>
        <div className='py-2 flex items-center justify-between'>
          <div>
            <h5 className='text_hl font-medium'>{item.name}</h5>
            <h3 className='text-xl font-bold'>{item.price} </h3>
          </div>
          <CiShoppingCart className='text-4xl p-1 bg-[var(--sbg)] text-white rounded'/>
        </div>
      </div>
    </article>
  )
}

export default ProductCard