import React, { useContext } from 'react'
import ProductCard from '../Cards/ProductCard'
import useWishlist from '../../context/WishlistContext'

function Wishlist() {
  const {items_count_in_wishlist, items_in_wishlist} = useWishlist()


  if(items_count_in_wishlist<=0)return <h2 className='p-3 text-2xl'>Wishlist is empty</h2>
  return (
    <div>
      <h1 className='pb-3'>MY WISHLIST <span className='font-bold'>({items_count_in_wishlist || 0})</span></h1>
      <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3'>
        {
          items_in_wishlist.map((item,idx)=>(
            <ProductCard key={idx} item={item.product} listed={true} />
          ))
        }
      </div>
    </div>
  )
}

export default Wishlist