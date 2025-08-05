import React from 'react'
import blank_image from '/images/blank_image.png'
import { CiShoppingCart } from "react-icons/ci";

function ProductCard({ item }) {
  return (
    <article className='p-2'>
      <div className='flex flex-col justify-between h-full'>
        <div className='relative shadow'>
          {
            item.image ? <img src={item.image} alt="" />
            : <img src={blank_image} alt='blank image' />
          }
        </div>
        <div className='py-2 flex items-end justify-between'>
          <div>
            <h5 className='text_hl text-sm font-medium'>{item.name}</h5>
            <h3 className='text-xl font-bold'>{item.price} </h3>
          </div>
          <button className='btn text-2xl'>
            <CiShoppingCart/>
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard