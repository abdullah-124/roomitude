import React from 'react'
import blank_image from '/images/blank_image.png'
import { CiShoppingCart } from "react-icons/ci";

function ProductCard({ item }) {
  return (
    <article className='p-2'>
      <div className='flex flex-col justify-between h-full '>
        <div className='relative rounded-lg overflow-hidden shadow'>
          {
            item.image ? <img src={item.image} alt="" />
            : <img src={blank_image} alt='blank image' />
          }
        </div>
        <div>
          <h2 className='text-sm font-medium pt-1'>{item.name}</h2>
          <div className='flex  justify-between'>
            <p className='text-lg text_hl font-bold'>{item.price}</p>
            <button className='btn text-2xl'>
            <CiShoppingCart/>
          </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ProductCard