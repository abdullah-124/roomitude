import React, { useEffect, useState } from 'react'
import blank_image from '/images/blank_image.png'
import { CiShoppingCart } from "react-icons/ci";
import Product_card_badge from './Product_card_badge';
import ProductQuickViewModal from '../Modal/ProductQuickViewModal';

function ProductCard({ item, listed=false }) {
  const { id, name, image, price, exact_price, discount, is_featured } = item;
  const product = {id,name,image, exact_price, discount, is_featured}
  const [modal, setModal] = useState(false)
  useEffect(() => {
    if (modal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modal]);

  return (
    <article className='card pb-3'>
      <div className='flex flex-col justify-between h-full '>
        <div className='relative overflow-hidden shadow aspect-[4/4]'>
          <Product_card_badge setModal={setModal} product={product} listed={listed} />
          <img
            className='object-cover w-full h-full hover:scale-110 transition-all duration-500'
            src={item?.image ? image : blank_image}
            alt="Product" />
        </div>
        <div>
          <h2 className='title text-base font-medium pt-1'>{name}</h2>
          <div className='flex items-center gap-1'>
            <p className='text-xl text_hl font-bold'>{exact_price}$</p>
            {
              discount && <div className='text-sm'>
                <del>{price}</del>
              </div>
            }
          </div>
        </div>
      </div>
      {
        /* this is modal section */
        modal && <ProductQuickViewModal setModal={setModal} product={item} />
      }

    </article>
  )
}

export default ProductCard