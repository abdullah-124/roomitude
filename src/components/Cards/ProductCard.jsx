import React from 'react'
import blank_image from '/images/blank_image.png'
import { CiShoppingCart } from "react-icons/ci";
import Product_card_badge from './Product_card_badge';

function ProductCard({ item }) {
  const { name, image, price, exact_price, discount, is_featured } = item;
  return (
    <article className='pb-3'>
      <div className='flex flex-col justify-between h-full '>
        <div className='relative rounded-lg overflow-hidden shadow border border-gray-200'>
          <Product_card_badge is_featured={is_featured} discount={discount} />
          <img
            className='object-cover w-full h-full hover:scale-110 transition-all duration-500'
            src={item?.image ? image : blank_image}
            alt="Product" />
        </div>
        <div>
          <h2 className='text-sm font-medium pt-1'>{name}</h2>
          <div className='flex  justify-between'>
            <div className='flex items-center gap-1'>
              <p className='text-xl text_hl font-bold'>{exact_price}$</p>
              {
                discount && <div className='text-sm'>
                  <del>{price}</del>
                </div>
              }
            </div>
            <button className='btn text-2xl'>
              <CiShoppingCart />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ProductCard